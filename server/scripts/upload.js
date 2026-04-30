/**
 * Upload Script — Vigneshwaran Portfolio
 * ----------------------------------------
 * Supports: JPG, JPEG, PNG, WEBP, TIF, TIFF, NEF, CR2, ARW, DNG, RW2, ORF
 *
 * RAW files (NEF etc.) are converted to high-quality JPEG by sharp before upload
 * so they stay under Cloudinary free tier's 10MB limit.
 * Quality is set to 95 — no resize, full resolution kept.
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Photo from "../src/models/Photo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(__dirname, "../assets");

const RAW_EXTS    = [".nef", ".cr2", ".arw", ".dng", ".rw2", ".orf", ".sr2", ".pef", ".x3f"];
const RASTER_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"];
const ALL_EXTS    = [...RAW_EXTS, ...RASTER_EXTS];

const isRaw = (file) => RAW_EXTS.includes(path.extname(file).toLowerCase());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function buildUrl(publicId) {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${publicId}`;
}

/**
 * All formats → JPEG q95, no resize, strip metadata
 * NEF RAW from Z6 Mark II at q95 = ~6-8MB, under Cloudinary 10MB free limit
 */
async function prepareBuffer(filePath) {
  return sharp(filePath)
    .withMetadata(false)
    .jpeg({ quality: 95, progressive: true, mozjpeg: true })
    .toBuffer();
}

async function uploadCategory(folderName, category) {
  const dir = path.join(ASSETS_DIR, folderName);

  const files = fs.readdirSync(dir).filter((f) =>
    ALL_EXTS.includes(path.extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.log(`  📂  assets/${folderName}/ is empty — skipping`);
    return;
  }

  console.log(`\n📁  ${folderName.toUpperCase()} → category: "${category}" — ${files.length} file(s)`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const baseName = path.basename(file, path.extname(file));
    const publicId = `vigneshwaran/${category}/${baseName}`;

    const existing = await Photo.findOne({ publicId });
    if (existing) {
      console.log(`  ✅  Already uploaded: ${file}`);
      continue;
    }

    try {
      const raw = isRaw(file);
      console.log(`  ⬆️   Uploading ${raw ? "[RAW→JPG]" : "[IMG]"}: ${file}`);

      const buffer = await prepareBuffer(filePath);
      const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);
      console.log(`       Converted size: ${sizeMB}MB`);

      const meta = await sharp(buffer).metadata();

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { public_id: publicId, overwrite: false, resource_type: "image" },
          (err, res) => (err ? reject(err) : resolve(res))
        );
        stream.end(buffer);
      });

      const url = buildUrl(result.public_id);
      await Photo.create({
        title: baseName.replace(/[-_]/g, " "),
        category,
        url,
        publicId: result.public_id,
        blurData: "",
        width: result.width || meta.width || 0,
        height: result.height || meta.height || 0,
        featured: false,
        visible: true,
      });

      console.log(`  ✅  Done: ${url}`);
    } catch (err) {
      console.error(`  ❌  Failed: ${file} — ${err.message}`);
    }
  }
}

async function main() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected\n");

  const rawFolders = fs.existsSync(ASSETS_DIR)
    ? fs.readdirSync(ASSETS_DIR).filter((n) => fs.statSync(path.join(ASSETS_DIR, n)).isDirectory())
    : [];

  if (rawFolders.length === 0) {
    console.log("⚠️  No folders found in server/assets/ — nothing to upload.");
    await mongoose.disconnect();
    return;
  }

  console.log(`📂  Found folders: ${rawFolders.join(", ")}`);

  for (const folder of rawFolders) {
    await uploadCategory(folder, folder.toLowerCase());
  }

  console.log("\n🎉  Upload complete!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
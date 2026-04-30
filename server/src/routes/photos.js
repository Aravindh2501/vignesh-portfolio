import { Router } from "express";
import Photo from "../models/Photo.js";

const router = Router();

// GET /api/photos — all visible photos
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit = 100 } = req.query;
    const filter = { visible: true };
    if (category) filter.category = category.toLowerCase();
    if (featured === "true") filter.featured = true;

    const photos = await Photo.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ success: true, data: photos });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/photos/categories — dynamically built from what's in the DB
router.get("/categories", async (req, res) => {
  try {
    // Get all unique category names that have at least 1 visible photo
    const distinctCategories = await Photo.distinct("category", { visible: true });

    const result = await Promise.all(
      distinctCategories.sort().map(async (category) => {
        const cover = await Photo.findOne({ category, visible: true })
          .sort({ createdAt: -1 })
          .select("url blurData width height");
        const count = await Photo.countDocuments({ category, visible: true });
        return {
          id: category,
          label: category.charAt(0).toUpperCase() + category.slice(1), // "outdoor" → "Outdoor"
          description: "",
          coverPhoto: cover,
          count,
        };
      })
    );

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/photos/:id
router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: photo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

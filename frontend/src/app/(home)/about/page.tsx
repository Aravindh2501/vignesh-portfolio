import type { Metadata } from "next";
import ProfileCard from "@/components/profile-card";
import CardContainer from "@/components/card-container";
import Footer from "@/components/footer";
import VectorCombined from "@/components/vector-combined";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "About",
  description: "About Vignesh — Photographer based in Chennai",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row w-full">
      {/* LEFT — fixed bg image */}
      <div className="w-full h-[70vh] lg:w-1/2 lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3">
        <div className="w-full h-full relative bg-[url(/avatar.jpg)] bg-top bg-cover rounded-xl">
          <div className="absolute right-0 bottom-0">
            <VectorCombined title="About" position="bottom-right" />
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2" />

      {/* RIGHT — scrollable */}
      <div className="w-full lg:w-1/2 space-y-3 pb-3">
        <ProfileCard />

        {/* About text */}
        <CardContainer>
          <div className="flex flex-col p-12 gap-[128px]">
            <h1 className="text-3xl">About</h1>
            <div className="flex flex-col gap-4 font-light">
              <p>{siteConfig.about.intro}</p>
              <p>{siteConfig.about.body}</p>
              <p>{siteConfig.about.approach}</p>
            </div>
          </div>
        </CardContainer>

        {/* Stats */}
        <CardContainer>
          <div className="grid grid-cols-2 gap-px">
            {siteConfig.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-8 gap-2"
              >
                <span className="text-4xl font-light">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest opacity-50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </CardContainer>

        {/* Camera & Lenses */}
        <CardContainer>
          <div className="flex flex-col p-12 gap-[128px]">
            <div className="flex flex-col text-3xl">
              <h1>Camera</h1>
              <h1>& Lenses</h1>
            </div>
            <div className="flex flex-col gap-4 font-light">
              <p>{siteConfig.camera.intro}</p>
              <p>{siteConfig.camera.body}</p>
            </div>
          </div>
        </CardContainer>

        {/* Gear list */}
        {siteConfig.gear.map((item) => (
          <CardContainer key={`${item.brand}-${item.model}`}>
            <div className="flex items-center justify-between p-6">
              <h1 className="text-lg">{item.brand}</h1>
              <p className="text-sm">{item.model}</p>
            </div>
          </CardContainer>
        ))}

        <Footer />
      </div>
    </div>
  );
};


export default AboutPage;


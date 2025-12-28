import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { ScreenshotsSection } from "@/components/sections/screenshots";
import { DifferentiatorsSection } from "@/components/sections/differentiators";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <DifferentiatorsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

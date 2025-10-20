import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { DifferentiatorsSection } from "@/components/sections/differentiators";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <DifferentiatorsSection />
      <CTASection />
      <Footer />
    </main>
  );
}

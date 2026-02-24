import { Cases } from "@/components/Cases";
import { Hero } from "@/components/Hero";
import { SectorsDashboard } from "@/components/SectorsDashboard";
import { Services } from "@/components/Services";
import { StatsSection } from "@/components/StatsSection";
import { Timeline } from "@/components/Timeline";
import { TRLSection } from "@/components/TRLSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <Timeline />
      <Services />
      <SectorsDashboard />
      <TRLSection />
      <Cases />
    </main>
  );
}

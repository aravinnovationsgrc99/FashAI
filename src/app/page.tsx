import Hero from "@/components/sections/Hero";
import EditorialIntro from "@/components/sections/EditorialIntro";
import Projects from "@/components/sections/Projects";
import UpcomingCampaign from "@/components/sections/UpcomingCampaign";
import Faces from "@/components/sections/Faces";
import Gallery from "@/components/sections/Gallery";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <EditorialIntro />
      <Projects />
      <UpcomingCampaign />
      <Faces />
      <Gallery />
      <ContactSection />
    </>
  );
}

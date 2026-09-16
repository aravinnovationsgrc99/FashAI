import Hero from "@/components/sections/Hero";
import EditorialIntro from "@/components/sections/EditorialIntro";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import HomeManifesto from "@/components/sections/HomeManifesto";
import HomeGalleryPreview from "@/components/sections/HomeGalleryPreview";
import HomeContactInvitation from "@/components/sections/HomeContactInvitation";

export default function Home() {
  return (
    <>
      <Hero />
      <EditorialIntro />
      <HomeFeaturedProjects />
      <HomeUpcomingFeature />
      <HomeManifesto />
      <HomeGalleryPreview />
      <HomeContactInvitation />
    </>
  );
}


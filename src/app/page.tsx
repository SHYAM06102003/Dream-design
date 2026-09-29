import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { GallerySection } from "@/components/sections/GallerySection";
import { buildGallery, interiorDesignPoints, interiorGallery } from "@/data/gallery";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { beforeAfter } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Land to dream home — land surveying, architecture & construction",
  description:
    "From bare land to finished home. Land surveying, house planning, architectural and floor plan design, 3D visualisation, construction contracts, renovation and full project coordination.",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <JourneySection />
      <ProjectsSection limit={3} />
      <BeforeAfterSlider item={beforeAfter} />
      <ProcessSection />
      <WhyChooseUs />
      <AboutSection />
      <GallerySection
        eyebrow={buildGallery.eyebrow}
        title={buildGallery.title}
        description={buildGallery.description}
        items={buildGallery.items}
        featureFirst
        action={<ArrowLink href="/process">How a project runs</ArrowLink>}
      />
      <GallerySection
        eyebrow={interiorGallery.eyebrow}
        title={interiorGallery.title}
        description={interiorGallery.description}
        items={interiorGallery.items}
        points={interiorDesignPoints}
        pointsTitle="Interior design is a sequence, not a mood board."
        pointsDescription="Layout, daylight, circulation, storage, materials and lighting are decided in that order. Changing any one of them later costs money, so they are settled while the plan is still on paper."
        action={<ArrowLink href="/services">Planning and design services</ArrowLink>}
      />
      <TestimonialsSection />
      <section id="enquiry" className="surface-inset py-11 lg:py-17">
        <EnquiryForm className="shell" />
      </section>
      <CtaBanner />
    </>
  );
}

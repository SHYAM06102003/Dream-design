import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "One team across land surveying, architecture and construction — how we work, what we hold to, and the way a project runs from first meeting to handover.",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title="One team.\nEvery stage of your home."
        description={site.tagline}
      />
      <AboutSection />
      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}

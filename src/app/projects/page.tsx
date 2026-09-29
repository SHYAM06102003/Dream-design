import type { Metadata } from "next";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { projectsIntro } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/projects",
  title: "Projects",
  description:
    "Residential projects taken from bare land to finished home — new builds, 3D design visualisation, renovations and extensions.",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow={projectsIntro.eyebrow}
        title={projectsIntro.title}
        description={projectsIntro.description}
      />
      <ProjectsSection heading={false} />
      <CtaBanner />
    </>
  );
}

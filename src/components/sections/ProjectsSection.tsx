import { projects, projectsIntro } from "@/data/projects";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

/**
 * Selected residences grid — the visual centrepiece of the site.
 * The first project runs full width to break the grid rhythm.
 */
export function ProjectsSection({
  limit,
  heading = true,
}: {
  limit?: number;
  /** `false` when the route already renders its own page header. */
  heading?: boolean;
}) {
  const visible = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <section id="projects" className={cn("py-11 lg:py-17", heading ? "surface-inset" : "")}>
      <div className="shell">
        {heading ? (
          <Reveal>
            <SectionHeading
              eyebrow={projectsIntro.eyebrow}
              title={projectsIntro.title}
              description={projectsIntro.description}
              action={<ArrowLink href="/projects">All projects</ArrowLink>}
            />
          </Reveal>
        ) : null}

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-x-10 lg:gap-y-20">
          {visible.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 0.06}
              className={index === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} size={index === 0 ? "feature" : "standard"} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

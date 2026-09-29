import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** `feature` spans two columns for the first project. */
  size?: "feature" | "standard";
  priority?: boolean;
};

export function ProjectCard({ project, size = "standard", priority = false }: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          className={cn(
            "frame",
            size === "feature" ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes={
              size === "feature"
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            className="object-cover"
          />
          {project.isPlaceholder ? (
            <span className="absolute top-4 left-4 rounded-sm bg-surface px-3 py-2 text-caption font-medium text-primary">
              Sample project
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
          <div>
            <h3 className="text-title-sm md:text-title">{project.title}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-secondary">
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-secondary">
                —
              </span>
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-secondary">
                —
              </span>
              <span>{project.area}</span>
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-secondary text-primary transition-all duration-fast ease-standard group-hover:border-primary group-hover:bg-primary group-hover:text-inverse-strong"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.4} />
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-body text-secondary">
          {project.summary}
        </p>
      </Link>
    </article>
  );
}

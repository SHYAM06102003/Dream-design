import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Axonometric } from "@/components/drawings/Axonometric";
import { FloorPlan } from "@/components/drawings/FloorPlan";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappMessages } from "@/lib/whatsapp";
import { formatIndex } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

type ProjectPageProps = {
  /** Next.js 16: dynamic route params are async. */
  params: Promise<{ slug: string }>;
};

/** Pre-renders every project at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({
      path: "/projects",
      title: "Project not found",
      description: "This project could not be found.",
    });
  }

  return pageMetadata({
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: project.image.src,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const moreWork = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Header */}
      <PageHeader
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.summary}
        meta={
          <dl className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {[
              { term: "Location", value: project.location },
              { term: "Built-up area", value: project.area },
              { term: "Year", value: project.year },
              { term: "Type", value: project.category },
            ].map((item) => (
              <div key={item.term}>
                <dt className="text-caption font-medium text-secondary">
                  {item.term}
                </dt>
                <dd className={`mt-1.5 text-lede ${item.term === "Location" && project.isPlaceholder ? "placeholder" : ""}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {project.isPlaceholder ? (
        <p className="placeholder border-b border-line bg-surface px-5 py-3 text-center text-caption">
          Sample project shown to demonstrate the layout. Location, area and year are placeholders
          and will be replaced with a real project.
        </p>
      ) : null}

      {/* Hero image */}
      <section className="bg-surface py-10 md:py-14">
        <div className="shell">
          <Reveal>
            <div className="frame aspect-[16/10] w-full md:aspect-[16/9]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-surface pb-11 lg:pb-17">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-title">The project</h2>
                <p className="mt-6 text-lede text-secondary">
                  {project.description}
                </p>
                <h3 className="mt-10 text-title">Design thinking</h3>
                <p className="mt-4 text-lede text-secondary">{project.concept}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="mt-10 text-title">Scope delivered</h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t border-line py-3 text-body"
                    >
                      <Check className="size-4 shrink-0 text-accent" strokeWidth={1.6} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.12}>
                <div className="rounded-md border border-line p-7">
                  <h2 className="text-body font-medium">Land → home journey</h2>
                  <ol className="mt-5 space-y-3">
                    {project.journey.map((step, index) => (
                      <li key={step} className="flex items-center gap-3 text-body">
                        <span className="text-title-sm font-semibold text-accent">
                          {formatIndex(index)}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>

                  <WhatsAppButton
                    className="mt-7 w-full"
                    message={whatsappMessages.project(project.title)}
                  >
                    Discuss a similar project
                    <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </WhatsAppButton>

                  <Link
                    href="/contact#enquiry"
                    className="mt-4 block text-center text-caption text-secondary underline underline-offset-4 transition-colors hover:text-primary"
                  >
                    Send the full form
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Drawings */}
      <section className="border-y border-line py-11 lg:py-17">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-6">
                <p className="eyebrow">Planning</p>
                <h2 className="mt-6 text-title">The drawings the estimate is built on</h2>
                <p className="mt-5 max-w-md text-secondary">
                  Every project starts as a measured drawing. These sample plans show the level of
                  detail a client reviews and approves before construction begins — and the exact
                  documents the estimate is priced against.
                </p>
                <p className="placeholder mt-4 text-caption">
                  Sample drawings — replace with this project&rsquo;s approved set.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <figure className="h-full border border-line bg-surface p-5 md:p-8">
                <FloorPlan className="h-auto w-full" />
                <figcaption className="mt-5 text-caption text-secondary">
                  Ground floor plan
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="h-full border border-line bg-surface p-5 md:p-8">
                <Axonometric className="h-auto w-full" />
                <figcaption className="mt-5 text-caption text-secondary">
                  Massing study
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-11 lg:py-17">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-6 text-title">From site to finished home</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {project.gallery.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <figure>
                  <div className="frame aspect-[4/3] w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-caption text-secondary">
                    {photo.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* More work */}
      <section className="border-t border-line py-11 lg:py-17">
        <div className="shell">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-title">More projects</h2>
            <Link href="/projects" className="arrow-link">
              <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
              All projects
            </Link>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-12">
            {moreWork.map((item) => (
              <Reveal key={item.id}>
                <ProjectCard project={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

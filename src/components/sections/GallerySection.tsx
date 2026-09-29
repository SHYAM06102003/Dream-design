import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/data/images";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

type GalleryProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly GalleryItem[];
  /** Rendered to the right of the section heading. */
  action?: React.ReactNode;
  /** Renders the first item full width for a stronger opening frame. */
  featureFirst?: boolean;
  /** Optional checklist rendered under the frames. */
  points?: readonly string[];
  pointsTitle?: string;
  pointsDescription?: string;
};

/**
 * Image band with a caption and a line of context under every frame.
 * The frame is the media, the hairline is the only divider, and the caption
 * never sits on the photograph — see components/image-cover.md §3.
 */
export function GallerySection({
  eyebrow,
  title,
  description,
  items,
  action,
  featureFirst = false,
  points,
  pointsTitle,
  pointsDescription,
}: GalleryProps) {
  return (
    <section className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} action={action} />
        </Reveal>

        <ul
          className={cn(
            "mt-14 grid gap-x-8 gap-y-12 lg:mt-20",
            featureFirst ? "lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item, index) => {
            const photo = images[item.image];

            return (
              <Reveal
                as="li"
                key={item.id}
                delay={index * 0.07}
                className={cn(
                  featureFirst && item.span === "wide" && "lg:col-span-2",
                  !featureFirst && item.span === "wide" && "sm:col-span-2",
                )}
              >
                <figure>
                  <div
                    className={cn(
                      "frame w-full",
                      item.span === "wide" ? "aspect-[16/10]" : "aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={item.alt}
                      fill
                      sizes={
                        item.span === "wide"
                          ? "(min-width: 1024px) 66vw, 100vw"
                          : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      }
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="text-caption font-medium text-primary">{item.caption}</p>
                    <p className="mt-2 text-body text-secondary">{item.note}</p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>

        {points && points.length > 0 ? (
          <Reveal>
            <div className="mt-16 grid gap-8 border-t border-line pt-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow">How it is decided</p>
                <h3 className="mt-6 text-title">{pointsTitle}</h3>
                {pointsDescription ? (
                  <p className="mt-5 text-body text-secondary">{pointsDescription}</p>
                ) : null}
              </div>
              <div className="lg:col-span-7">
                <ul className="grid gap-8 sm:grid-cols-2">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 border-t border-line pt-4 text-body">
                      <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

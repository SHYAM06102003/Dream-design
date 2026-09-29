import { testimonials, testimonialsIntro } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Testimonials.
 * Every entry ships as a labelled placeholder — no real customer identities
 * have been invented. Replace the data in data/testimonials.ts with genuine
 * feedback before launch.
 */
export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-line bg-surface py-11 lg:py-17">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsIntro.eyebrow}
            title={testimonialsIntro.title}
            description={testimonialsIntro.description}
          />
        </Reveal>

        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-20">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={index * 0.08}>
              <figure className="flex h-full flex-col border-t border-line pt-6">
                <svg
                  viewBox="0 0 32 24"
                  className="size-7 text-accent"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 24V13.7C0 6.1 4.1 1.2 11.6 0l1.5 3.4C8.6 4.5 6.4 6.7 6.2 10h5.4v14H0Zm18.4 0V13.7C18.4 6.1 22.5 1.2 30 0l1.5 3.4C27 4.5 24.8 6.7 24.6 10H30v14H18.4Z" />
                </svg>
                <blockquote className="mt-6 flex-1">
                  <p className="text-title-sm">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-4">
                  <p className="text-body font-medium">{testimonial.name}</p>
                  <p className="mt-1 text-caption text-secondary">
                    {testimonial.location} · {testimonial.project}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

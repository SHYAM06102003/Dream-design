import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  serviceGroups,
  servicesInGroup,
  servicesIntro,
  type Service,
  type ServiceGroup,
  type ServiceGroupId,
} from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { EquipmentSection } from "@/components/sections/EquipmentSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Land surveying, house and floor plan design, 3D visualisation, complete construction, renovation and extensions, and full project coordination — all from one team.",
});

/**
 * Equipment and deliverables belong to the survey section specifically, so they
 * render inside it rather than after the whole list.
 */
const extrasByGroup: Partial<Record<ServiceGroupId, React.ReactNode>> = {
  "land-survey": <EquipmentSection />,
};

/** One service, image beside copy. `isOdd` flips the order on wide screens. */
function ServiceDetail({ service, isOdd }: { service: Service; isOdd: boolean }) {
  return (
    <section
      id={service.id}
      className="scroll-mt-14 border-b border-line py-11 lg:py-17"
    >
      <div className="shell">
        <div
          className={`grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16 ${
            isOdd ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Visual */}
          <Reveal className="lg:col-span-7">
            <div className="frame aspect-[4/3] w-full">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="text-title font-semibold text-accent">
                  {service.number}
                </span>
                <h3 className="text-title">{service.title}</h3>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 text-lede text-secondary">{service.description}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-8 border-t border-line">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line py-3 text-body ">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton message={service.whatsappMessage} variant="outline">
                  Enquire about {service.title}
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </WhatsAppButton>
                <a
                  href="/contact#enquiry"
                  className="text-caption text-secondary underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Send the full form
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Section heading that opens one of the three services sections. */
function GroupHeader({ group }: { group: ServiceGroup }) {
  const count = servicesInGroup(group.id).length;

  return (
    <section
      id={group.id}
      className="scroll-mt-14 border-b border-line bg-surface py-11 lg:py-17"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={`${group.eyebrow} · ${count === 1 ? "1 service" : `${count} services`}`}
            title={group.title}
            description={group.description}
            as="h2"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton message={group.whatsappMessage} variant="outline">
              Enquire about {group.title.toLowerCase()}
              <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </WhatsAppButton>
            <a
              href="/contact#enquiry"
              className="text-caption text-secondary underline underline-offset-4 transition-colors hover:text-primary"
            >
              Send the full form
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-line pt-32 pb-11 lg:pt-36 lg:pb-14">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={servicesIntro.eyebrow}
              title={servicesIntro.title}
              description={servicesIntro.description}
              as="h1"
            />
          </Reveal>

          {/* Jump list. The page is long and survey and house design are separate
              conversations, so each section is one click away. */}
          <Reveal delay={0.08}>
            <nav aria-label="Service sections" className="mt-12 border-t border-line lg:mt-16">
              <ul className="grid sm:grid-cols-3">
                {serviceGroups.map((group) => {
                  const count = servicesInGroup(group.id).length;
                  return (
                    <li
                      key={group.id}
                      className="border-b border-line last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0"
                    >
                      <a
                        href={`#${group.id}`}
                        className="tap flex h-full flex-col gap-2 py-5 transition-colors duration-fast ease-standard hover:text-accent"
                      >
                        <span className="text-caption text-accent">{group.number}</span>
                        <span className="text-title-sm">{group.title}</span>
                        <span className="text-caption text-secondary">
                          {count === 1 ? "1 service" : `${count} services`}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Sections, in the order defined in data/services.ts */}
      {serviceGroups.map((group) => (
        <div key={group.id}>
          <GroupHeader group={group} />
          {servicesInGroup(group.id).map((service, index) => (
            <ServiceDetail key={service.id} service={service} isOdd={index % 2 === 1} />
          ))}
          {extrasByGroup[group.id]}
        </div>
      ))}

      <CtaBanner />
    </>
  );
}

import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { navigation } from "@/data/navigation";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="drafting-grid flex min-h-[70vh] items-center py-11 lg:py-17">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-3xl text-display-sm text-balance">
          This page isn&rsquo;t on the plan.
        </h1>
        <p className="mt-6 max-w-lg text-lede text-secondary">
          The link may be old, or the page may have moved. Here is where everything lives.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/#contact" variant="outline">
            Get a quote
            <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3 lg:max-w-3xl">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between bg-surface px-5 py-4 text-caption transition-colors hover:bg-accent-soft"
              >
                {item.label}
                <ArrowUpRight className="size-4" strokeWidth={1.4} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms of use",
  description: "The terms that apply to the use of this website.",
});

export default function TermsPage() {
  return (
    <article className="bg-surface py-11 lg:py-17">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 text-display-sm">Terms of use</h1>
          <p className="placeholder mt-4 text-caption">Draft — review before launch</p>

          <div className="mt-10 space-y-8 text-body text-secondary">
            <p className="placeholder rounded-md border border-line p-6 text-body">
              This is a template, not legal advice. The owner of this website must replace it with
              terms that match the real business and have them reviewed for their jurisdiction
              before the site goes live.
            </p>

            <section>
              <h2 className="text-title-sm">About this website</h2>
              <p className="mt-3">
                This website belongs to {site.legalName}. It is provided for general information
                about the services offered. Using it does not create a client relationship — that
                begins only once a written agreement is signed.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Content is illustrative</h2>
              <p className="mt-3">
                Some projects, testimonials, images and drawings shown on this site are placeholders
                used to demonstrate the layout. They are clearly labelled and must be replaced with
                real material before launch. Nothing on this site should be treated as a quotation,
                a structural instruction, or a promise of a specific result.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Plans and drawings</h2>
              <p className="mt-3">
                Floor plans, site plans and visualisations shown here are samples. They are provided
                for illustration only and must never be used for construction. A project is built only
                from drawings issued and approved in writing for that specific site.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Estimates and prices</h2>
              <p className="mt-3">
                No price on this site is an offer. Costs depend on the survey data, the approved
                design, materials, site conditions and local rules. A binding price is given only in
                a written estimate issued against those drawings.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Liability</h2>
              <p className="mt-3">
                To the extent permitted by law, {site.legalName} is not responsible for decisions
                made on the basis of this website alone, and for losses arising from reliance on
                general information published here.
              </p>
            </section>

            <section>
              <h2 className="text-title-sm">Governing law</h2>
              <p className="mt-3">
                These terms are governed by the laws of the jurisdiction in which {site.legalName}{" "}
                operates. Insert the correct jurisdiction before launch.
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

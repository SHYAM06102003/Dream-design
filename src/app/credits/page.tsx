import type { Metadata } from "next";
import { imageCredits } from "@/data/images";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/credits",
  title: "Image credits",
  description:
    "Attribution for the CC-licensed placeholder photography used on this website, with the author and licence for each file.",
});

/**
 * Attribution page for the bundled placeholder photography.
 *
 * CC BY and CC BY-SA require visible credit, so this exists for as long as the
 * placeholder images do. Once the real project photography replaces them,
 * delete this route and remove the footer link.
 */
export default function CreditsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Credits"
        title="Image credits."
        description="Every photograph on this site is a CC-licensed placeholder, not a photograph of a real Dream Design project. Each file is credited below with its author and licence."
      />

      <section className="bg-surface py-11 lg:py-17">
        <div className="shell">
          {/* Phones get a stacked list: a 4-column table at this width needs
              either a horizontal scroll or 10px type, and neither is readable.
              The table returns from `sm` up. */}
          <ul className="grid gap-6 sm:hidden">
            {imageCredits.map((credit) => (
              <li key={credit.file} className="border-t border-line pt-4">
                <p className="font-mono text-caption text-secondary">{credit.file}</p>
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap text-body underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {credit.title}
                </a>
                <p className="text-caption text-secondary">
                  {credit.author} · {credit.license}
                </p>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-primary">
                  <th scope="col" className="py-4 pr-6 text-caption font-medium">
                    File
                  </th>
                  <th scope="col" className="py-4 pr-6 text-caption font-medium">
                    Original
                  </th>
                  <th scope="col" className="py-4 pr-6 text-caption font-medium">
                    Author
                  </th>
                  <th scope="col" className="py-4 text-caption font-medium">
                    Licence
                  </th>
                </tr>
              </thead>
              <tbody>
                {imageCredits.map((credit) => (
                  <tr key={credit.file} className="border-b border-line align-top">
                    <td className="py-4 pr-6 font-mono text-caption text-primary">
                      {credit.file}
                    </td>
                    <td className="py-4 pr-6 text-body">
                      <a
                        href={credit.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 transition-colors hover:text-accent"
                      >
                        {credit.title}
                      </a>
                    </td>
                    <td className="py-4 pr-6 text-body text-secondary">{credit.author}</td>
                    <td className="py-4 text-body text-secondary">{credit.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-10 max-w-2xl text-body text-secondary">
            Licences were recorded from each file&rsquo;s description page at the time of download.
            Placeholder images were resized to a maximum width of 1600px and re-encoded as
            progressive JPEG. Replace
            them with your own project photography and remove this page once no CC-licensed image
            remains.
          </p>
        </div>
      </section>
    </>
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — land surveying, architecture and home construction`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time.
 * Uses plain inline styles because ImageResponse supports a small CSS subset.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121110",
          color: "#FFFFFF",
          padding: 72,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Row: mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              border: "2px solid #8A6A45",
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 500,
            }}
          >
            {site.name}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -1.5 }}>
            From your land
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -1.5, color: "#E3D6C1" }}>
            to your dream home.
          </div>
        </div>

        {/* Chain */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#EFEDE6",
          }}
        >
          Land · Survey · Design · Build · Home
        </div>
      </div>
    ),
    size,
  );
}

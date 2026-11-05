import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const asset = (p: string) => readFile(path.join(process.cwd(), "src/assets", p));

/**
 * Branded Open Graph image (brief §11): ink background, title in Manrope with
 * the italic serif emphasis, a lime accent and the (mono-graded) headshot.
 */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [bold, medium, serif, headshot] = await Promise.all([
    asset("og-fonts/manrope-700.woff"),
    asset("og-fonts/manrope-500.woff"),
    asset("og-fonts/instrument-serif-italic.woff"),
    asset("og-headshot-mono.jpg"),
  ]);
  const photo = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  // Split "*emphasis*" into word tokens for Satori (flex-wrap row).
  const tokens: { w: string; em: boolean }[] = [];
  title.split(/(\*[^*]+\*)/g).filter(Boolean).forEach((part) => {
    const em = part.startsWith("*") && part.endsWith("*");
    (em ? part.slice(1, -1) : part)
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => tokens.push({ w, em }));
  });
  const long = title.replace(/\*/g, "").length > 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#17191D",
          color: "#F7F7F4",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        {/* hairline grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(247,247,244,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,247,244,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 800 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: "#858A95" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#B8F36B" }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: long ? 60 : 76, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2.5 }}>
            {tokens.map((t, i) =>
              t.em ? (
                <span key={i} style={{ fontFamily: "Instrument Serif", fontWeight: 400, fontStyle: "italic", letterSpacing: -1, marginRight: 18, color: "#F7F7F4", borderBottom: "5px solid #B8F36B", lineHeight: 1 }}>
                  {t.w}
                </span>
              ) : (
                <span key={i} style={{ marginRight: 18 }}>
                  {t.w}
                </span>
              ),
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#858A95" }}>{site.jobTitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 64 }}>
          <div style={{ display: "flex", position: "relative", width: 300, height: 375, border: "1px solid rgba(247,247,244,0.24)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={300} height={375} style={{ objectFit: "cover" }} alt="" />
            <div style={{ position: "absolute", left: -12, bottom: 28, display: "flex", alignItems: "center", gap: 8, background: "#B8F36B", color: "#17191D", padding: "8px 14px", borderRadius: 999, fontSize: 16, fontWeight: 700 }}>
              Founder & AI specialist
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Manrope", data: bold, weight: 700, style: "normal" },
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const asset = (p: string) => readFile(path.join(process.cwd(), "src/assets", p));

/**
 * Branded Open Graph image: warm paper, the title in a condensed display face
 * with the serif-italic crimson accent, the mono-graded headshot, the name.
 * `title` uses the site convention: *accent* and \n line breaks.
 */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [display, text, serif, headshot] = await Promise.all([
    asset("og-fonts/anton-400.woff"),
    asset("og-fonts/archivo-500.woff"),
    asset("og-fonts/instrument-serif-italic.woff"),
    asset("og-headshot-mono.jpg"),
  ]);
  const photo = `data:image/jpeg;base64,${headshot.toString("base64")}`;
  const lines = title.split("\n").map((line) => {
    const tokens: { w: string; em: boolean }[] = [];
    line
      .split(/(\*[^*]+\*)/g)
      .filter(Boolean)
      .forEach((part) => {
        const em = part.startsWith("*") && part.endsWith("*");
        (em ? part.slice(1, -1) : part)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => tokens.push({ w, em }));
      });
    return tokens;
  });
  const longest = Math.max(...title.replace(/\*/g, "").split("\n").map((l) => l.length));
  const fontSize = longest > 26 ? 74 : longest > 18 ? 92 : 110;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F3F2ED", color: "#0D0C1D", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 0 56px 64px", width: 820 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Archivo", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: "#5E5D6B" }}>
            <div style={{ width: 11, height: 11, borderRadius: 11, background: "#D9234C" }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {lines.map((tokens, li) => (
              <div key={li} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", lineHeight: 0.98 }}>
                {tokens.map((t, i) =>
                  t.em ? (
                    <span key={i} style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: fontSize * 1.08, color: "#D9234C", marginRight: 18 }}>
                      {t.w}
                    </span>
                  ) : (
                    <span key={i} style={{ fontFamily: "Anton", fontSize, textTransform: "uppercase", marginRight: 18 }}>
                      {t.w}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 46, height: 46, borderRadius: 46, background: "#0D0C1D", color: "#F3F2ED", alignItems: "center", justifyContent: "center", fontFamily: "Anton", fontSize: 18 }}>
              AM
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "Anton", fontSize: 26, textTransform: "uppercase" }}>{site.name}</div>
              <div style={{ fontFamily: "Archivo", fontSize: 18, color: "#5E5D6B" }}>{site.jobTitle}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 290, padding: 12, background: "#FBFAF7", border: "1px solid rgba(13,12,29,0.1)", borderRadius: 22, transform: "rotate(3deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={266} height={300} style={{ objectFit: "cover", borderRadius: 14 }} alt="" />
            <div style={{ display: "flex", flexDirection: "column", padding: "14px 6px 4px" }}>
              <div style={{ fontFamily: "Anton", fontSize: 24, textTransform: "uppercase" }}>{site.name}</div>
              <div style={{ fontFamily: "Archivo", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#5E5D6B", marginTop: 4 }}>Founder · Pixelpk</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Anton", data: display, weight: 400, style: "normal" },
        { name: "Archivo", data: text, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}

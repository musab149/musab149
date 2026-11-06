import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** "AM" monogram favicon: ink disc, paper letters, crimson dot. */
export default async function Icon() {
  const font = await readFile(path.join(process.cwd(), "src/assets/og-fonts/anton-400.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0C1D", borderRadius: 64, position: "relative" }}>
        <div style={{ fontFamily: "Anton", fontSize: 28, color: "#F3F2ED", letterSpacing: 0 }}>AM</div>
        <div style={{ position: "absolute", right: 9, top: 9, width: 11, height: 11, borderRadius: 11, background: "#D9234C" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: font, weight: 400, style: "normal" }] },
  );
}

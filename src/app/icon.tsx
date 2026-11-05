import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** "AM" monogram favicon: ink disc, paper letters, lime dot. */
export default async function Icon() {
  const font = await readFile(path.join(process.cwd(), "src/assets/og-fonts/manrope-700.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17191D", borderRadius: 64, position: "relative" }}>
        <div style={{ fontFamily: "Manrope", fontSize: 26, fontWeight: 700, color: "#F7F7F4", letterSpacing: -1 }}>AM</div>
        <div style={{ position: "absolute", right: 10, top: 10, width: 10, height: 10, borderRadius: 10, background: "#B8F36B" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: font, weight: 700, style: "normal" }] },
  );
}

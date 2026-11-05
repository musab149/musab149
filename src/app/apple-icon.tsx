import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(path.join(process.cwd(), "src/assets/og-fonts/manrope-700.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17191D", position: "relative" }}>
        <div style={{ fontFamily: "Manrope", fontSize: 72, fontWeight: 700, color: "#F7F7F4", letterSpacing: -3 }}>AM</div>
        <div style={{ position: "absolute", right: 34, top: 34, width: 18, height: 18, borderRadius: 18, background: "#B8F36B" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Manrope", data: font, weight: 700, style: "normal" }] },
  );
}

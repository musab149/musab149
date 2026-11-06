import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await readFile(path.join(process.cwd(), "src/assets/og-fonts/anton-400.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0C1D", position: "relative" }}>
        <div style={{ fontFamily: "Anton", fontSize: 84, color: "#F3F2ED" }}>AM</div>
        <div style={{ position: "absolute", right: 30, top: 30, width: 20, height: 20, borderRadius: 20, background: "#D9234C" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: font, weight: 400, style: "normal" }] },
  );
}

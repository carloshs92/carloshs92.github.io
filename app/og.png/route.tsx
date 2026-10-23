import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { tr } from "@/lib/i18n";

// Imagen por defecto al compartir cualquier página (Open Graph y Twitter), generada en build.
// Es una ruta /og.png y no opengraph-image.tsx porque el export estático la dejaría sin
// extensión y GitHub Pages no la serviría como image/png.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#07100b", color: "#c9f7d3", fontFamily: "monospace" }}>
        <div style={{ fontSize: 30, color: "#39ff88" }}>carlos@huamani:~$ whoami</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24 }}>{profile.name}</div>
        <div style={{ fontSize: 38, marginTop: 16, color: "#7fa58a" }}>{tr(profile.role, "es")}</div>
        <div style={{ fontSize: 30, marginTop: 56, color: "#39ff88" }}>carloshuamani.com</div>
      </div>
    ),
    size
  );
}

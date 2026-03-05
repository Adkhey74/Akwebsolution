import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AKWebSolution — Création de sites web sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "64px",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#ffffff",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "700",
              color: "#0a0a0a",
              letterSpacing: "-1px",
            }}
          >
            AK
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            AKWebSolution
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-2px",
            maxWidth: "900px",
          }}
        >
          Création de sites web sur mesure
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Design élégant · Responsive · SEO optimisé · Prix fixes
        </div>

        {/* URL badge */}
        <div
          style={{
            marginTop: "48px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "999px",
            padding: "10px 28px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.5px",
          }}
        >
          akwebsolutions.fr
        </div>
      </div>
    ),
    { ...size }
  );
}

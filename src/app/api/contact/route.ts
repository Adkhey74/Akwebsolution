import { NextRequest, NextResponse } from "next/server";

// ── Palette email (alignée sur globals.css du site) ───────────────────────────
const EMAIL = {
  background: "#0f0f0f",       // --background
  surface: "#1f1f1f",          // --surface (carte)
  foreground: "#efefef",       // --foreground (texte principal)
  muted: "#7a7a7a",            // --muted
  mutedDim: "#525252",         // labels / secondaire
  border: "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.12)",
  accent: "#efefef",           // bouton fond clair
  accentFg: "#0f0f0a",         // texte sur bouton
  radius: "12px",
  radiusLg: "16px",
} as const;

// ── Templates ────────────────────────────────────────────────────────────────

const BG = EMAIL.background;
const SURFACE = EMAIL.surface;

// URL absolue du logo (requise pour l'affichage dans les clients mail)
const SITE_URL = "https://akwebsolutions.fr";
const LOGO_URL = `${SITE_URL}/images/logo3.png`;

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>AKWebSolution</title>
</head>
<body bgcolor="${BG}" style="margin:0;padding:0;background-color:${BG};font-family:'Segoe UI',system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="background-color:${BG};padding:48px 20px;">
    <tr><td align="center" bgcolor="${BG}">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:28px;text-align:left;" bgcolor="${BG}" align="left">
          <a href="${SITE_URL}" style="text-decoration:none;display:inline-block;">
            <img src="${LOGO_URL}" alt="AKWebSolution" width="180" height="56" style="display:block;max-width:180px;height:auto;border:0;outline:none;" />
          </a>
        </td></tr>

        <!-- Carte principale -->
        <tr><td bgcolor="${SURFACE}" style="background-color:${EMAIL.surface};border:1px solid ${EMAIL.border};border-radius:${EMAIL.radiusLg};padding:40px 32px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center;" bgcolor="${BG}">
          <p style="margin:0;font-size:11px;color:${EMAIL.mutedDim};letter-spacing:0.08em;">
            AKWebSolution &nbsp;·&nbsp;
            <a href="mailto:contact@akwebsolutions.fr" style="color:${EMAIL.muted};text-decoration:none;">contact@akwebsolutions.fr</a>
            &nbsp;·&nbsp;
            <a href="https://akwebsolutions.fr" style="color:${EMAIL.muted};text-decoration:none;">akwebsolutions.fr</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function notifHtml(name: string, email: string, projectType: string, message: string) {
  return emailWrapper(`
    <!-- Badge -->
    <p style="margin:0 0 20px;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${EMAIL.muted};">
      Nouveau message
    </p>

    <!-- Titre -->
    <h1 style="margin:0 0 28px;font-size:24px;font-weight:400;font-style:italic;color:${EMAIL.foreground};line-height:1.3;">
      ${name} vous a écrit
    </h1>

    <!-- Séparateur -->
    <div style="height:1px;background:${EMAIL.border};margin-bottom:24px;"></div>

    <!-- Infos -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:12px 0;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.mutedDim};width:100px;vertical-align:top;">Nom</td>
        <td style="padding:12px 0;font-size:14px;color:${EMAIL.foreground};">${name}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;border-top:1px solid ${EMAIL.border};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.mutedDim};vertical-align:top;">Email</td>
        <td style="padding:12px 0;border-top:1px solid ${EMAIL.border};font-size:14px;color:${EMAIL.foreground};">
          <a href="mailto:${email}" style="color:${EMAIL.foreground};text-decoration:underline;text-underline-offset:3px;">${email}</a>
        </td>
      </tr>
      ${projectType ? `
      <tr>
        <td style="padding:12px 0;border-top:1px solid ${EMAIL.border};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL.mutedDim};vertical-align:top;">Projet</td>
        <td style="padding:12px 0;border-top:1px solid ${EMAIL.border};font-size:14px;color:${EMAIL.foreground};">${projectType}</td>
      </tr>` : ""}
    </table>

    <!-- Message -->
    <div style="margin-top:24px;padding:20px 22px;background:${EMAIL.background};border:1px solid ${EMAIL.border};border-radius:${EMAIL.radius};">
      <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.mutedDim};">Message</p>
      <p style="margin:0;font-size:14px;color:${EMAIL.muted};line-height:1.7;white-space:pre-wrap;">${message}</p>
    </div>

    <!-- CTA répondre -->
    <div style="margin-top:28px;text-align:center;">
      <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;background:${EMAIL.accent};color:${EMAIL.accentFg};font-size:13px;font-weight:600;letter-spacing:0.05em;text-decoration:none;border-radius:9999px;">
        Répondre à ${name}
      </a>
    </div>
  `);
}

function confirmHtml(name: string, projectType: string, message: string) {
  return emailWrapper(`
    <!-- Badge -->
    <p style="margin:0 0 20px;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${EMAIL.muted};">
      Confirmation
    </p>

    <!-- Titre -->
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:400;color:${EMAIL.foreground};line-height:1.3;">
      Merci, <span style="font-style:italic;">${name}</span>&nbsp;!
    </h1>

    <p style="margin:0 0 28px;font-size:15px;color:${EMAIL.muted};line-height:1.7;">
      Votre message a bien été reçu. Je vous réponds dans les <span style="color:${EMAIL.foreground};font-weight:600;">24 heures</span>.
    </p>

    <!-- Séparateur -->
    <div style="height:1px;background:${EMAIL.border};margin-bottom:24px;"></div>

    ${projectType ? `
    <!-- Projet -->
    <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.mutedDim};">Votre projet</p>
    <p style="margin:0 0 24px;font-size:14px;color:${EMAIL.foreground};">${projectType}</p>
    ` : ""}

    <!-- Récap message -->
    <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${EMAIL.mutedDim};">Votre message</p>
    <div style="padding:20px 22px;background:${EMAIL.background};border:1px solid ${EMAIL.border};border-radius:${EMAIL.radius};">
      <p style="margin:0;font-size:14px;color:${EMAIL.muted};line-height:1.7;white-space:pre-wrap;">${message}</p>
    </div>

    <!-- Séparateur -->
    <div style="height:1px;background:${EMAIL.border};margin:28px 0;"></div>

    <!-- CTA offres -->
    <p style="margin:0 0 16px;font-size:14px;color:${EMAIL.muted};line-height:1.65;">
      En attendant, découvrez nos formules détaillées :
    </p>
    <a href="https://akwebsolutions.fr/offres" style="display:inline-block;padding:12px 28px;background:transparent;border:1px solid ${EMAIL.borderLight};color:${EMAIL.foreground};font-size:13px;font-weight:600;letter-spacing:0.05em;text-decoration:none;border-radius:9999px;">
      Voir nos offres
    </a>
  `);
}

// ── Handler ───────────────────────────────────────────────────────────────────

const BREVO = "https://api.brevo.com/v3/smtp/email";

async function sendEmail(apiKey: string, payload: object) {
  return fetch(BREVO, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify(payload),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name        = typeof body.name        === "string" ? body.name.trim()                    : "";
    const email       = typeof body.email       === "string" ? body.email.trim().toLowerCase()     : "";
    const projectType = typeof body.projectType === "string" ? body.projectType.trim()             : "";
    const message     = typeof body.message     === "string" ? body.message.trim()                 : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY ?? "";

    // 1. Notification interne → Adil
    const res = await sendEmail(apiKey, {
      sender:  { name: "AKWebSolution - Contact", email: "contact@akwebsolutions.fr" },
      to:      [{ email: "contact@akwebsolutions.fr", name: "Adil" }],
      replyTo: { email, name },
      subject: `Nouveau message de ${name}${projectType ? ` — ${projectType}` : ""}`,
      htmlContent: notifHtml(name, email, projectType, message),
    });

    if (!res.ok) {
      console.error("Brevo notif error:", await res.text());
      return NextResponse.json({ error: "Erreur d'envoi." }, { status: 500 });
    }

    // 2. Confirmation → visiteur
    await sendEmail(apiKey, {
      sender:  { name: "AKWebSolution", email: "contact@akwebsolutions.fr" },
      to:      [{ email, name }],
      subject: "Votre message a bien été reçu — AKWebSolution",
      htmlContent: confirmHtml(name, projectType, message),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

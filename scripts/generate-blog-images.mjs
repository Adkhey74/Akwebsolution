/**
 * Génération des visuels d'un article de blog (1376 × 768, WebP).
 *
 * Pourquoi un script plutôt que des images posées à la main : le style des
 * visuels du blog est une convention (verre violet translucide sur fond
 * noir bleuté, halo, reflet au sol, aucun texte). L'écrire en code garantit
 * que l'article suivant reste dans le même langage visuel, et permet de
 * régénérer après un changement de teinte d'accent.
 *
 * Aucun texte dans les images : elles illustrent, elles ne portent pas
 * d'information — c'est l'`alt` qui la porte.
 *
 * Usage :  node scripts/generate-blog-images.mjs [dossier de sortie]
 * Dépend de `sharp`, déjà installé par Next 16 (sinon : npm i -D sharp).
 */

import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const W = 1376;
const H = 768;
const OUT = process.argv[2] ?? path.join(process.cwd(), "public", "images", "blog");

/* ── Aléatoire reproductible ──────────────────────────────────────────────
   Les particules sont tirées au hasard, mais deux exécutions doivent donner
   exactement la même image — sinon impossible de retoucher un détail sans
   voir tout le grain bouger. */
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Palette (alignée sur --accent du site : ~#6051F2) ─────────────────── */
const INK = "#05050A"; // fond
const VIOLET = "#7C5CFF"; // violet vif — sert aux halos
const LILAC = "#B9A9FF"; // verre éclairé
const PALE = "#E7E0FF"; // arêtes

/* ── Briques SVG communes ─────────────────────────────────────────────── */

const DEFS = `
  <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0"    stop-color="#4B3AA8" stop-opacity="0.55"/>
    <stop offset="0.5"  stop-color="#1C1740" stop-opacity="0.30"/>
    <stop offset="1"    stop-color="${INK}"  stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.72">
    <stop offset="0.4" stop-color="#000" stop-opacity="0"/>
    <stop offset="1"   stop-color="#000" stop-opacity="0.88"/>
  </radialGradient>
  <!-- Le sol n'a pas de bord franc : un dégradé qui démarre à 0.5 dessine une
       ligne d'horizon nette en haut du rectangle. Il monte donc de 0. -->
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0"    stop-color="#151233" stop-opacity="0"/>
    <stop offset="0.35" stop-color="#171436" stop-opacity="0.34"/>
    <stop offset="1"    stop-color="${INK}"  stop-opacity="0"/>
  </linearGradient>

  <!-- Verre : plus clair en haut, la lumière vient du dessus.
       Attention au blanc : sur fond noir, un blanc semi-transparent donne un
       gris neutre, pas du verre violet. Le blanc reste réservé aux arêtes et
       aux petits reflets ; les grandes surfaces sont teintées. -->
  <linearGradient id="glass" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0"    stop-color="#D7CCFF" stop-opacity="0.58"/>
    <stop offset="0.45" stop-color="${LILAC}" stop-opacity="0.46"/>
    <stop offset="1"    stop-color="#6B4FE0" stop-opacity="0.38"/>
  </linearGradient>
  <!-- Verre éteint : pour les éléments secondaires, qui doivent rester
       violets et non gris une fois leur opacité baissée. -->
  <linearGradient id="glassDim" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0"    stop-color="${LILAC}" stop-opacity="0.34"/>
    <stop offset="1"    stop-color="#5B41C9" stop-opacity="0.3"/>
  </linearGradient>
  <linearGradient id="glassTop" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#CFC2FF" stop-opacity="0.6"/>
    <stop offset="1" stop-color="#9B84FF" stop-opacity="0.42"/>
  </linearGradient>
  <linearGradient id="glassSide" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#5B41C9" stop-opacity="0.42"/>
    <stop offset="1" stop-color="#2C1F6B" stop-opacity="0.34"/>
  </linearGradient>
  <linearGradient id="rim" x1="0" y1="0" x2="0.6" y2="1">
    <stop offset="0"   stop-color="#FFFFFF" stop-opacity="0.75"/>
    <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.20"/>
    <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0.45"/>
  </linearGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0"   stop-color="#FFFFFF" stop-opacity="0.42"/>
    <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="mirror" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${LILAC}" stop-opacity="0.22"/>
    <stop offset="1" stop-color="${LILAC}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0"   stop-color="#FFFFFF" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#D9D2FF" stop-opacity="0.5"/>
    <stop offset="1"   stop-color="#FFFFFF" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="spark" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0"   stop-color="#FFFFFF" stop-opacity="0.95"/>
    <stop offset="0.35" stop-color="${LILAC}" stop-opacity="0.55"/>
    <stop offset="1"   stop-color="${VIOLET}" stop-opacity="0"/>
  </radialGradient>
`;

function doc(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${DEFS}</defs>${inner}</svg>`;
}

/** Fond commun : halo, sol réfléchissant, vignettage. */
function background(hx = 0.6, hy = 0.24) {
  return `
    <rect width="${W}" height="${H}" fill="${INK}"/>
    <ellipse cx="${W * hx}" cy="${H * hy}" rx="${W * 0.52}" ry="${H * 0.6}" fill="url(#halo)"/>
    <rect y="${H * 0.66}" width="${W}" height="${H * 0.34}" fill="url(#floor)"/>
    <rect width="${W}" height="${H}" fill="url(#vignette)"/>
  `;
}

/** Faisceau diffus en diagonale — passe dans la couche floutée. */
function lightBeam(angle = -26, cx = 900, cy = 200) {
  return `
    <g transform="rotate(${angle} ${cx} ${cy})" opacity="0.5">
      <rect x="${cx - 320}" y="${cy - 900}" width="200" height="1800" fill="url(#beam)" opacity="0.55"/>
      <rect x="${cx - 40}"  y="${cy - 900}" width="90"  height="1800" fill="url(#beam)" opacity="0.4"/>
      <rect x="${cx + 150}" y="${cy - 900}" width="300" height="1800" fill="url(#beam)" opacity="0.25"/>
    </g>
  `;
}

/**
 * Poussière lumineuse : billes de verre en suspension, plus quelques
 * traînées. Peu nombreuses et de tailles très inégales — un semis régulier
 * de points identiques se lit comme un ciel étoilé, pas comme du volume.
 */
function dust(seed, count, box) {
  const r = prng(seed);
  const { x, y, w, h } = box;
  let out = "";
  for (let i = 0; i < count; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    const big = r() > 0.78;
    const size = big ? 9 + r() * 9 : 1.5 + r() * 4;
    out += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(size * 2.6).toFixed(1)}" fill="url(#spark)" opacity="${(0.08 + r() * 0.16).toFixed(2)}"/>`;
    out += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${size.toFixed(1)}" fill="url(#glass)" opacity="${(0.35 + r() * 0.45).toFixed(2)}"/>`;
    out += `<circle cx="${(px - size * 0.3).toFixed(1)}" cy="${(py - size * 0.35).toFixed(1)}" r="${(size * 0.28).toFixed(1)}" fill="#FFFFFF" opacity="${(0.3 + r() * 0.4).toFixed(2)}"/>`;
    if (big) {
      const len = 24 + r() * 46;
      const rot = -35 + r() * 70;
      out += `<rect x="${(px - len).toFixed(1)}" y="${(py - 1.2).toFixed(1)}" width="${len.toFixed(1)}" height="2.4" rx="1.2" fill="${LILAC}" opacity="${(0.05 + r() * 0.09).toFixed(2)}" transform="rotate(${rot.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
    }
  }
  return out;
}

/** Plaque de verre (face avant seule). */
function pane(x, y, w, h, r = 16, op = 1, fill = "glass") {
  return `
    <g opacity="${op}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${fill})"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="url(#rim)" stroke-width="1.5"/>
      <rect x="${x + w * 0.05}" y="${y + h * 0.06}" width="${w * 0.42}" height="${h * 0.55}" rx="${r * 0.8}" fill="url(#sheen)" opacity="0.5"/>
    </g>
  `;
}

/**
 * Volume de verre en perspective : face avant + dessus + côté droit.
 * C'est le décalage entre les trois faces qui donne l'impression de 3D —
 * sans lui, on retombe sur un aplat.
 */
function block(x, y, w, h, d = 26) {
  const dy = d * 0.72;
  const top = `${x + 4},${y} ${x + w - 4},${y} ${x + w - 4 + d},${y - dy} ${x + 4 + d},${y - dy}`;
  const side = `${x + w},${y + 4} ${x + w + d},${y + 4 - dy} ${x + w + d},${y + h - dy} ${x + w},${y + h - 6}`;
  return `
    <g>
      <polygon points="${side}" fill="url(#glassSide)"/>
      <polygon points="${top}"  fill="url(#glassTop)"/>
      ${pane(x, y, w, h, 14)}
      <line x1="${x + 4}" y1="${y}" x2="${x + w - 4}" y2="${y}" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.4"/>
      <line x1="${x + w - 4 + d}" y1="${y - dy}" x2="${x + 4 + d}" y2="${y - dy}" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="1.2"/>
    </g>
  `;
}

/**
 * Reflet écrasé sous un objet — c'est lui qui pose l'objet sur un sol.
 * `baseY` doit être le bas de CET objet : un plan de reflet commun à
 * plusieurs objets de hauteurs différentes les fait tous flotter.
 * À placer dans la couche `soft`, qui est légèrement floutée — un reflet
 * net trahit immédiatement le procédé.
 */
function reflection(inner, baseY, squash = 0.42, op = 0.26) {
  return `<g transform="translate(0 ${baseY * (1 + squash)}) scale(1 -${squash})" opacity="${op}">${inner}</g>`;
}

/* ── Visuel 1 — couverture : sablier + jalons ─────────────────────────── */

function hourglass(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  const neck = 13;
  const plate = (py) =>
    `<rect x="${cx - hw - 16}" y="${py - 11}" width="${w + 32}" height="22" rx="11" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.5"/>`;
  const bulbTop = `M ${cx - hw} ${cy - hh} L ${cx + hw} ${cy - hh}
      C ${cx + hw} ${cy - hh * 0.35}, ${cx + neck * 2.6} ${cy - 22}, ${cx + neck} ${cy}
      L ${cx - neck} ${cy}
      C ${cx - neck * 2.6} ${cy - 22}, ${cx - hw} ${cy - hh * 0.35}, ${cx - hw} ${cy - hh} Z`;
  const bulbBottom = `M ${cx - hw} ${cy + hh} L ${cx + hw} ${cy + hh}
      C ${cx + hw} ${cy + hh * 0.35}, ${cx + neck * 2.6} ${cy + 22}, ${cx + neck} ${cy}
      L ${cx - neck} ${cy}
      C ${cx - neck * 2.6} ${cy + 22}, ${cx - hw} ${cy + hh * 0.35}, ${cx - hw} ${cy + hh} Z`;
  // Le sable du bas : un tas, pas un remplissage — le sablier est en cours.
  const pile = `M ${cx - hw * 0.86} ${cy + hh - 4}
      C ${cx - hw * 0.45} ${cy + hh - 4}, ${cx - 30} ${cy + hh * 0.38}, ${cx} ${cy + hh * 0.34}
      C ${cx + 30} ${cy + hh * 0.38}, ${cx + hw * 0.45} ${cy + hh - 4}, ${cx + hw * 0.86} ${cy + hh - 4} Z`;
  return `
    <g>
      <path d="${bulbTop}"    fill="url(#glass)" stroke="url(#rim)" stroke-width="1.6"/>
      <path d="${bulbBottom}" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.6"/>
      <path d="${pile}" fill="${LILAC}" opacity="0.55"/>
      <path d="${pile}" fill="url(#sheen)" opacity="0.4"/>
      <rect x="${cx - 2.2}" y="${cy + 6}" width="4.4" height="${hh * 0.3}" rx="2.2" fill="#FFFFFF" opacity="0.8"/>
      <ellipse cx="${cx}" cy="${cy + hh * 0.36}" rx="26" ry="7" fill="#FFFFFF" opacity="0.22"/>
      ${plate(cy - hh)}
      ${plate(cy + hh)}
      <path d="M ${cx - hw * 0.72} ${cy - hh + 26} C ${cx - hw * 0.66} ${cy - 40}, ${cx - 26} ${cy - 26}, ${cx - 12} ${cy - 6}"
            fill="none" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="3" stroke-linecap="round"/>
    </g>
  `;
}

function milestones(x, y, gap, n, activeIndex) {
  let out = `<rect x="${x - 30}" y="${y - 1.5}" width="${gap * (n - 1) + 60}" height="3" rx="1.5" fill="url(#beam)" opacity="0.85"/>`;
  for (let i = 0; i < n; i++) {
    const cx = x + i * gap;
    const r = i === activeIndex ? 26 : 18;
    out += `
      <circle cx="${cx}" cy="${y}" r="${r}" fill="url(#glass)" stroke="url(#rim)" stroke-width="1.5"/>
      <circle cx="${cx - r * 0.28}" cy="${y - r * 0.32}" r="${r * 0.34}" fill="#FFFFFF" opacity="${i === activeIndex ? 0.6 : 0.35}"/>
      ${i === activeIndex ? `<circle cx="${cx}" cy="${y}" r="${r + 10}" fill="none" stroke="${LILAC}" stroke-opacity="0.45" stroke-width="1.4"/>` : ""}
    `;
  }
  return out;
}

const cover = {
  file: "combien-de-temps-pour-creer-un-site-internet.webp",
  seed: 1101,
  base: background(0.42, 0.3),
  glow: `
    ${lightBeam(-24, 980, 180)}
    <ellipse cx="430" cy="380" rx="230" ry="300" fill="${VIOLET}" opacity="0.5"/>
    <ellipse cx="430" cy="470" rx="120" ry="90" fill="${LILAC}" opacity="0.6"/>
    <ellipse cx="1010" cy="520" rx="330" ry="90" fill="${VIOLET}" opacity="0.32"/>
    <circle cx="1010" cy="520" r="46" fill="${LILAC}" opacity="0.55"/>
  `,
  // Reflet très discret : le tas de sable, lumineux, ressort beaucoup une
  // fois retourné et finit par ressembler à un projecteur au sol.
  soft: reflection(hourglass(430, 380, 250, 380), 592, 0.28, 0.13),
  main: `
    ${hourglass(430, 380, 250, 380)}
    ${milestones(790, 520, 148, 4, 1)}
    ${dust(1101, 20, { x: 580, y: 130, w: 760, h: 500 })}
    ${dust(77, 7, { x: 180, y: 180, w: 200, h: 420 })}
  `,
};

/* ── Visuel 2 — les délais : trois durées en volume ───────────────────── */

const durations = {
  file: "combien-de-temps-pour-creer-un-site-internet-delais.webp",
  seed: 2202,
  base: background(0.55, 0.28),
  glow: `
    ${lightBeam(-30, 1050, 160)}
    <ellipse cx="360" cy="270" rx="200" ry="60" fill="${VIOLET}" opacity="0.45"/>
    <ellipse cx="520" cy="410" rx="300" ry="66" fill="${VIOLET}" opacity="0.5"/>
    <ellipse cx="700" cy="550" rx="430" ry="72" fill="${VIOLET}" opacity="0.55"/>
  `,
  // Un reflet par barre, calé sur le bas de chacune.
  soft: `
    ${reflection(block(230, 236, 300, 74, 30), 310, 0.3, 0.2)}
    ${reflection(block(230, 376, 560, 74, 30), 450, 0.3, 0.2)}
    ${reflection(block(230, 516, 860, 74, 30), 590, 0.34, 0.24)}
  `,
  main: `
    ${block(230, 236, 300, 74, 30)}
    ${block(230, 376, 560, 74, 30)}
    ${block(230, 516, 860, 74, 30)}
    ${dust(2202, 18, { x: 720, y: 130, w: 600, h: 460 })}
  `,
};

/* ── Visuel 3 — ce qui fait déraper : la marche dans le fil ───────────── */

function stepPath() {
  const y1 = 330;
  const y2 = 470;
  return `M 150 ${y1} L 620 ${y1} C 700 ${y1}, 700 ${y2}, 780 ${y2} L 1230 ${y2}`;
}

const delays = {
  file: "combien-de-temps-pour-creer-un-site-internet-retards.webp",
  seed: 3303,
  base: background(0.5, 0.3),
  glow: `
    ${lightBeam(-34, 1020, 220)}
    <path d="${stepPath()}" fill="none" stroke="${VIOLET}" stroke-width="26" opacity="0.5" stroke-linecap="round"/>
    <circle cx="700" cy="400" r="96" fill="${VIOLET}" opacity="0.5"/>
    <circle cx="700" cy="400" r="34" fill="#FFFFFF" opacity="0.32"/>
  `,
  main: `
    <path d="${stepPath()}" fill="none" stroke="${PALE}" stroke-opacity="0.3" stroke-width="12" stroke-linecap="round"/>
    <path d="${stepPath()}" fill="none" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="4" stroke-linecap="round"/>
    ${pane(190, 296, 96, 68, 16)}
    ${pane(400, 296, 96, 68, 16)}
    ${pane(560, 296, 96, 68, 16)}
    <g transform="rotate(13 706 400)">${pane(658, 366, 96, 68, 16)}</g>
    ${pane(830, 436, 96, 68, 16)}
    ${pane(1010, 436, 96, 68, 16)}
    ${pane(1180, 436, 96, 68, 16)}
    <circle cx="700" cy="400" r="12" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="700" cy="400" r="30" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="1.6"/>
    ${dust(3303, 20, { x: 600, y: 220, w: 440, h: 400 })}
  `,
};

/* ── Visuel 4 — le rétroplanning : grille de jours en perspective ─────── */

function calendar(cols, rows, cell, gap, lit) {
  let out = "";
  for (let ry = 0; ry < rows; ry++) {
    for (let rx = 0; rx < cols; rx++) {
      const x = rx * (cell + gap);
      const y = ry * (cell + gap);
      const isLit = lit.some(([lx, ly]) => lx === rx && ly === ry);
      const last = lit[lit.length - 1];
      const isLast = last[0] === rx && last[1] === ry;
      // Les cases éteintes prennent `glassDim` : baisser l'opacité de `glass`
      // les faisait virer au gris ardoise, hors palette.
      out += `
        <rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="10"
              fill="url(#${isLit ? "glass" : "glassDim"})" opacity="${isLit ? 1 : 0.85}"
              stroke="url(#rim)" stroke-width="${isLit ? 1.6 : 1}" stroke-opacity="${isLit ? 1 : 0.4}"/>
        ${isLit ? `<rect x="${x + 6}" y="${y + 6}" width="${cell - 12}" height="${cell - 12}" rx="7" fill="#FFFFFF" opacity="${isLast ? 0.5 : 0.2}"/>` : ""}
      `;
    }
  }
  return out;
}

const CAL = { cols: 7, rows: 4, cell: 96, gap: 14 };
const CAL_LIT = [
  [1, 0],
  [2, 1],
  [3, 1],
  [4, 2],
  [5, 3],
];
// Le plan est incliné : une grille vue de face ferait un tableau, pas un objet.
const calTransform = `translate(300 130) matrix(1 0.2 -0.34 0.9 0 0)`;

const planning = {
  file: "combien-de-temps-pour-creer-un-site-internet-retroplanning.webp",
  seed: 4404,
  base: background(0.58, 0.26),
  glow: `
    ${lightBeam(-22, 1080, 200)}
    <g transform="${calTransform}">
      <rect x="-20" y="-20" width="${CAL.cols * (CAL.cell + CAL.gap) + 40}" height="${CAL.rows * (CAL.cell + CAL.gap) + 40}" rx="40" fill="${VIOLET}" opacity="0.3"/>
      ${CAL_LIT.map(([lx, ly]) => {
        const x = lx * (CAL.cell + CAL.gap);
        const y = ly * (CAL.cell + CAL.gap);
        return `<rect x="${x - 12}" y="${y - 12}" width="${CAL.cell + 24}" height="${CAL.cell + 24}" rx="18" fill="${VIOLET}" opacity="0.75"/>`;
      }).join("")}
    </g>
    <ellipse cx="700" cy="400" rx="420" ry="240" fill="${VIOLET}" opacity="0.3"/>
  `,
  main: `
    <g transform="${calTransform}">
      ${calendar(CAL.cols, CAL.rows, CAL.cell, CAL.gap, CAL_LIT)}
    </g>
    ${dust(4404, 14, { x: 1040, y: 120, w: 300, h: 520 })}
    ${dust(88, 6, { x: 90, y: 140, w: 150, h: 460 })}
  `,
};

/* ── Rendu ────────────────────────────────────────────────────────────── */

/**
 * Le grain final : le calcul WCAG aime les aplats, l'œil non. Sans un peu
 * de bruit, les grands dégradés sombres montrent des bandes une fois
 * compressés en WebP.
 */
function grain(seed) {
  const r = prng(seed);
  const buf = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const v = 110 + Math.round(r() * 36);
    buf[i * 4] = v;
    buf[i * 4 + 1] = v;
    buf[i * 4 + 2] = v;
    buf[i * 4 + 3] = 16;
  }
  return buf;
}

async function build({ file, seed, base, glow, soft, main }) {
  const bg = await sharp(Buffer.from(doc(base))).png().toBuffer();
  const glowSvg = Buffer.from(doc(glow));
  // Deux passes de flou : le halo large donne l'ambiance, le serré le bloom.
  const wide = await sharp(glowSvg).blur(85).png().toBuffer();
  const tight = await sharp(glowSvg).blur(30).png().toBuffer();
  const softLayer = soft ? await sharp(Buffer.from(doc(soft))).blur(7).png().toBuffer() : null;
  const sharpLayer = await sharp(Buffer.from(doc(main))).png().toBuffer();

  await sharp(bg)
    .composite([
      { input: wide, blend: "screen" },
      { input: tight, blend: "screen" },
      ...(softLayer ? [{ input: softLayer, blend: "over" }] : []),
      { input: sharpLayer, blend: "over" },
      { input: grain(seed), raw: { width: W, height: H, channels: 4 }, blend: "overlay" },
    ])
    .webp({ quality: 84, effort: 6 })
    .toFile(path.join(OUT, file));

  return file;
}

await mkdir(OUT, { recursive: true });
for (const spec of [cover, durations, delays, planning]) {
  const name = await build(spec);
  console.log(`✓ ${name}`);
}
console.log(`\nSortie : ${OUT}`);

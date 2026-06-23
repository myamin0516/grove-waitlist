import sharp from "sharp";
import copyContent from "../data/copy.json";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const next = currentLine ? `${currentLine} ${word}` : word;
    if (next.length <= maxChars) {
      currentLine = next;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function generateOGImage() {
  try {
    const width = 1200;
    const height = 630;

    const brand = escapeXml(copyContent.brand.name);
    const tagline = escapeXml(copyContent.brand.tagline);
    const subheadingLines = wrapText(copyContent.hero.subheading, 48).map(
      escapeXml
    );

    const icon = await sharp("app/images/Grove-01.png")
      .resize(140, 140, { fit: "contain" })
      .toBuffer();

    const subheadingSvg = subheadingLines
      .map(
        (line, i) =>
          `<text x="600" y="${470 + i * 36}" text-anchor="middle" fill="#4b5563" font-size="26" font-family="Arial, Helvetica, sans-serif">${line}</text>`
      )
      .join("");

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f7f7f2"/>
            <stop offset="50%" stop-color="#eef0e8"/>
            <stop offset="100%" stop-color="#e4e8dc"/>
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#bg)"/>
        <text x="600" y="320" text-anchor="middle" fill="#1a1a1a" font-size="64" font-family="Arial, Helvetica, sans-serif" font-weight="600">
          ${brand}
        </text>
        <text x="600" y="380" text-anchor="middle" fill="#708259" font-size="32" font-family="Arial, Helvetica, sans-serif">
          ${tagline}
        </text>
        ${subheadingSvg}
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .composite([
        {
          input: icon,
          top: 80,
          left: Math.round((width - 140) / 2),
        },
      ])
      .toFormat("jpeg", { quality: 90 })
      .toFile("public/og-image.jpg");

    console.log("OG image generated successfully!");
  } catch (error) {
    console.error("Error generating OG image:", error);
    process.exit(1);
  }
}

generateOGImage();

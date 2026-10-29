import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Live Production Website QR code (for packaging & customer distribution)
// You can change this to your exact live domain once deployed!
const websiteUrl = 'https://naturalcare-okramucin.com';

// 2. Local network testing URL (for scanning on your phone right now on Wi-Fi!)
const localWifiUrl = 'http://192.168.1.5:3000';

async function generateQRCodes() {
  const brandDarkGreen = '#143523';
  const brandLightBackground = '#FAF9F5';

  const options = {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 1,
    margin: 2,
    width: 800, // 800x800 high-res for packaging and print
    color: {
      dark: brandDarkGreen,
      light: '#FFFFFF'
    }
  };

  // Generate main production QR Code PNG (High-Res 800px)
  const mainPngPath = path.join(outputDir, 'qr-code.png');
  await QRCode.toFile(mainPngPath, websiteUrl, options);
  console.log(`✓ Generated main packaging QR code (PNG): ${mainPngPath}`);

  // Generate main production QR Code SVG (Vector for infinite scaling & print)
  const mainSvgPath = path.join(outputDir, 'qr-code.svg');
  const svgString = await QRCode.toString(websiteUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: brandDarkGreen,
      light: '#FFFFFF'
    }
  });
  fs.writeFileSync(mainSvgPath, svgString);
  console.log(`✓ Generated main packaging QR code (SVG): ${mainSvgPath}`);

  // Generate local Wi-Fi QR code for instant phone scanning right now
  const localPngPath = path.join(outputDir, 'qr-code-local.png');
  await QRCode.toFile(localPngPath, localWifiUrl, options);
  console.log(`✓ Generated local Wi-Fi QR code (PNG): ${localPngPath}`);
}

generateQRCodes().catch(err => {
  console.error('Error generating QR code:', err);
  process.exit(1);
});

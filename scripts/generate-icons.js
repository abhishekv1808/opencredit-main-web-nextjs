const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'images', 'OpenCredit-logo.png');

async function generateIcons() {
  // Generate 192x192 icon
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 27, g: 58, b: 107, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✅ Created icon-192.png');

  // Generate 512x512 icon
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 27, g: 58, b: 107, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✅ Created icon-512.png');

  // Generate apple-touch-icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 27, g: 58, b: 107, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✅ Created apple-touch-icon.png');
}

generateIcons().catch(console.error);

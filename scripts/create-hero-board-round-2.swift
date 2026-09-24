import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
  .appendingPathComponent("public/hero-concepts-round-2")
let items: [(String, String)] = [
  ("01-editorial-ink-field.png", "01  Editorial Ink Field"),
  ("02-ultra-minimal-monogram.png", "02  Ultra-Minimal Monogram"),
  ("03-paper-sculpture.png", "03  Paper Sculpture"),
  ("04-ink-under-glass.png", "04  Ink Under Glass"),
  ("05-soft-airbrush-gradient-mist.png", "05  Soft Airbrush / Gradient Mist"),
  ("06-sculptural-ceramic.png", "06  Sculptural Ceramic"),
  ("07-fine-line-technical-drawing.png", "07  Fine-Line Technical Drawing"),
  ("08-fluid-ink-explosion.png", "08  Fluid Ink Explosion"),
  ("09-soft-textile-relief.png", "09  Soft Textile Relief"),
  ("10-typographic-graphic-poster.png", "10  Typographic / Graphic Poster"),
  ("11-light-projection.png", "11  Light Projection"),
  ("12-kinetic-perforation-field.png", "12  Kinetic Perforation Field")
]

let canvas = NSSize(width: 1680, height: 1080)
let image = NSImage(size: canvas)
image.lockFocus()
NSColor(calibratedRed: 252/255, green: 250/255, blue: 1, alpha: 1).setFill()
NSRect(origin: .zero, size: canvas).fill()

let margin: CGFloat = 30, gap: CGFloat = 20, cellW: CGFloat = 390, cellH: CGFloat = 326, artH: CGFloat = 288
let paragraph = NSMutableParagraphStyle()
paragraph.lineBreakMode = .byTruncatingTail
let attributes: [NSAttributedString.Key: Any] = [
  .font: NSFont.systemFont(ofSize: 14, weight: .medium),
  .foregroundColor: NSColor(calibratedRed: 33/255, green: 27/255, blue: 44/255, alpha: 1),
  .paragraphStyle: paragraph
]

for (index, item) in items.enumerated() {
  guard let source = NSImage(contentsOf: root.appendingPathComponent(item.0)) else { fatalError(item.0) }
  let col = CGFloat(index % 4), row = CGFloat(index / 4)
  let x = margin + col * (cellW + gap), yTop = canvas.height - margin - row * (cellH + gap)
  let cell = NSRect(x: x, y: yTop - cellH, width: cellW, height: cellH)
  NSColor(calibratedRed: 247/255, green: 243/255, blue: 251/255, alpha: 1).setFill()
  NSBezierPath(roundedRect: cell, xRadius: 8, yRadius: 8).fill()
  let srcRatio = source.size.width / source.size.height, dstRatio = cellW / artH
  var crop = NSRect(origin: .zero, size: source.size)
  if srcRatio > dstRatio {
    let newW = source.size.height * dstRatio
    crop.origin.x = (source.size.width - newW) / 2
    crop.size.width = newW
  } else {
    let newH = source.size.width / dstRatio
    crop.origin.y = (source.size.height - newH) / 2
    crop.size.height = newH
  }
  source.draw(in: NSRect(x: x, y: yTop - artH, width: cellW, height: artH), from: crop, operation: .sourceOver, fraction: 1)
  (item.1 as NSString).draw(in: NSRect(x: x + 14, y: yTop - cellH + 11, width: cellW - 28, height: 20), withAttributes: attributes)
}

image.unlockFocus()
guard let tiff = image.tiffRepresentation,
      let bitmap = NSBitmapImageRep(data: tiff),
      let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("PNG encoding") }
try png.write(to: root.appendingPathComponent("comparison-board-round-2.png"))

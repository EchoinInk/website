import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
  .appendingPathComponent("public/hero-concepts")
let items: [(String, String)] = [
  ("01-suspended-ink-chamber.png", "01  Suspended Ink Chamber"),
  ("02-cast-glass-caustics.png", "02  Cast Glass / Quiet Caustics"),
  ("03-continuous-glass-ribbon.png", "03  Continuous Glass Ribbon"),
  ("04-liquid-metal-tension.png", "04  Liquid Metal Tension"),
  ("05-optical-water-body.png", "05  Optical Water Body"),
  ("06-pigment-bloom-atelier.png", "06  Pigment Bloom Atelier"),
  ("07-opaline-mineral.png", "07  Opaline Mineral"),
  ("08-letterpress-material-study.png", "08  Letterpress Material Study"),
  ("09-revealed-by-light.png", "09  Revealed by Light"),
  ("10-precision-filament.png", "10  Precision Filament"),
  ("11-ink-veil-suspension.png", "11  Ink Veil Suspension"),
  ("12-chromatic-registration-membrane.png", "12  Chromatic Registration Membrane")
]

let canvas = NSSize(width: 1680, height: 1080)
let image = NSImage(size: canvas)
image.lockFocus()
NSColor(calibratedRed: 252/255, green: 250/255, blue: 1, alpha: 1).setFill()
NSRect(origin: .zero, size: canvas).fill()

let margin: CGFloat = 30
let gap: CGFloat = 20
let cellW: CGFloat = 390
let cellH: CGFloat = 326
let artH: CGFloat = 288
let paragraph = NSMutableParagraphStyle()
paragraph.lineBreakMode = .byTruncatingTail
let attributes: [NSAttributedString.Key: Any] = [
  .font: NSFont.systemFont(ofSize: 14, weight: .medium),
  .foregroundColor: NSColor(calibratedRed: 33/255, green: 27/255, blue: 44/255, alpha: 1),
  .paragraphStyle: paragraph
]

for (index, item) in items.enumerated() {
  guard let source = NSImage(contentsOf: root.appendingPathComponent(item.0)) else { fatalError(item.0) }
  let col = CGFloat(index % 4)
  let row = CGFloat(index / 4)
  let x = margin + col * (cellW + gap)
  let yTop = canvas.height - margin - row * (cellH + gap)
  let cell = NSRect(x: x, y: yTop - cellH, width: cellW, height: cellH)
  NSColor(calibratedRed: 247/255, green: 243/255, blue: 251/255, alpha: 1).setFill()
  NSBezierPath(roundedRect: cell, xRadius: 8, yRadius: 8).fill()

  let srcRatio = source.size.width / source.size.height
  let dstRatio = cellW / artH
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
try png.write(to: root.appendingPathComponent("comparison-board.png"))

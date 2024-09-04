export function isTofu ( char: string ): boolean {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  // Set the canvas size to a small fixed size
  canvas.width = 20
  canvas.height = 20

  // Fill the canvas with a known background color
  ctx.fillStyle = '#ffffff' // White background
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set the text font and color
  ctx.font = '16px Arial, sans-serif' // Use a common font
  ctx.fillStyle = '#000000' // Black text color

  // Render the character
  ctx.fillText(char, 2, 16)

  // Get the image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Analyze the pixels to determine if the character is tofu
  let isWhite = true
  let hasBlack = false

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Check if there's any black pixel
    if (r < 255 || g < 255 || b < 255) {
      isWhite = false
      if (r === 0 && g === 0 && b === 0) {
        hasBlack = true
      }
    }
  }

  // Tofu is likely if the character is completely white (not rendered) or if it has a specific pattern like a rectangle
  return isWhite || !hasBlack
}

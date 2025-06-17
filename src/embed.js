/**
 * Extracts Open Graph metadata from HTML content
 * @param {string} html - The HTML content to parse
 * @returns {Object} Object containing title, description, and image metadata
 */
function parseMetadata(html) {
  const metadata = {
    title: '',
    description: '',
    image: null
  }

  // Extract og:title
  const titleMatch = html.match(
    /<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i
  )
  if (titleMatch) {
    metadata.title = titleMatch[1]
  }

  // Extract og:description
  const descMatch = html.match(
    /<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/i
  )
  if (descMatch) {
    metadata.description = descMatch[1]
  }

  // Extract og:image
  const imageMatch = html.match(
    /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i
  )
  if (imageMatch) {
    metadata.image = imageMatch[1]
  }

  return metadata
}

/**
 * Uploads a blob to AT Protocol and returns the blob reference
 * @param {string} url - The image URL to upload
 * @param {Object} agent - The AT Protocol agent
 * @returns {Promise<Object|null>} The blob reference or null if upload fails
 */
async function uploadImageBlob(url, agent) {
  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) return null

    const imageData = await response.arrayBuffer()

    // Size limit check (1MB as per AT Protocol)
    if (imageData.byteLength > 1000000) return null

    const uploadResponse = await agent.uploadBlob(imageData, {
      encoding: contentType
    })

    return uploadResponse.data.blob
  } catch (error) {
    console.warn('Failed to upload image blob:', error.message)
    return null
  }
}

/**
 * Fetches website metadata and creates an external embed card
 * @param {string} url - The URL to fetch metadata for
 * @param {Object} agent - The AT Protocol agent
 * @returns {Promise<Object|null>} The embed object or null if fetching fails
 */
export async function fetchEmbedUrlCard(url, agent) {
  try {
    // Fetch the HTML content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'bluesky-post-action/1.0'
      }
    })

    if (!response.ok) return null

    const html = await response.text()
    const metadata = parseMetadata(html)

    // Build the card with required fields
    const card = {
      uri: url,
      title: metadata.title || '',
      description: metadata.description || ''
    }

    // Upload thumbnail if available
    if (metadata.image) {
      // Handle relative URLs
      const imageUrl = metadata.image.startsWith('http')
        ? metadata.image
        : new URL(metadata.image, url).toString()

      const thumb = await uploadImageBlob(imageUrl, agent)
      if (thumb) {
        card.thumb = thumb
      }
    }

    return {
      $type: 'app.bsky.embed.external',
      external: card
    }
  } catch (error) {
    console.warn('Failed to fetch embed card for URL:', url, error.message)
    return null
  }
}

/**
 * Extracts the post ID (rkey) from an AT Protocol URI.
 * @param {string} uri - AT Protocol URI (e.g. at://did:plc:xxx/app.bsky.feed.post/rkey)
 * @returns {string|null} The post ID or null if the URI is malformed
 */
export function extractPostId(uri) {
  if (!uri || typeof uri !== 'string') return null
  const parts = uri.split('/')
  return parts.length > 0 ? parts.pop() : null
}

/**
 * Extracts the DID from an AT Protocol URI.
 * @param {string} uri - AT Protocol URI (e.g. at://did:plc:xxx/app.bsky.feed.post/rkey)
 * @returns {string|null} The DID or null if the URI is malformed
 */
export function extractDid(uri) {
  if (!uri || typeof uri !== 'string') return null
  const match = uri.match(/^at:\/\/(did:[^/]+)/)
  return match ? match[1] : null
}

/**
 * Constructs a Bluesky web URL from a post response and session handle.
 * Uses the session handle (resolved username) rather than BSKY_IDENTIFIER,
 * which may be an email address.
 * @param {object} response - The post response from the AT Protocol API
 * @param {string} response.uri - AT Protocol URI
 * @param {string} handle - The resolved handle from the agent session
 * @returns {string|null} The Bluesky web URL or null if inputs are invalid
 */
export function buildPostUrl(response, handle) {
  if (!response || !response.uri) return null

  const postId = extractPostId(response.uri)
  if (!postId) return null

  const profile = handle || extractDid(response.uri)
  if (!profile) return null

  return `https://bsky.app/profile/${profile}/post/${postId}`
}

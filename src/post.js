import { RichText } from '@atproto/api'
import { fetchEmbedUrlCard } from './embed.js'

/**
 * Extracts URLs from the post text using the same regex pattern as RichText
 * @param {string} text - The post text
 * @returns {Array<string>} Array of URLs found in the text
 */
function extractUrls(text) {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*[-a-zA-Z0-9@%_+~#//=])?/g
  const urls = []
  let match

  while ((match = urlRegex.exec(text)) !== null) {
    urls.push(match[0])
  }

  return urls
}

export default async function post(content, agent) {
  const rt = new RichText({
    text: content
  })

  // Automatically detect facets.
  await rt.detectFacets(agent)

  const postRecord = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString()
  }

  // Check for URLs and create website card embed for the first URL found
  const urls = extractUrls(content)
  if (urls.length > 0) {
    const embed = await fetchEmbedUrlCard(urls[0], agent)
    if (embed) {
      postRecord.embed = embed
    }
  }

  return postRecord
}

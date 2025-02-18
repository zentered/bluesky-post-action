import { RichText } from '@atproto/api'

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

  return postRecord
}

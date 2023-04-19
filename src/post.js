import pkg from '@atproto/api'
const { RichText } = pkg

export default async function post(content, agent) {
  const rt = new RichText({
    text: content
  })

  // Automatically detect facets.
  await rt.detectFacets(agent)

  // https://github.com/bluesky-social/atproto/issues/834#issuecomment-1514046354
  // Filter out any facets with features
  // that have no value set value.
  let facets = null

  if (rt.facets) {
    facets = rt.facets.filter((facet) => {
      const features = facet.features.filter(
        (feature) =>
          (feature?.uri && feature?.uri !== '') ||
          (feature?.did && feature?.did !== '')
      )

      return features.length > 0
    })
  }

  const postRecord = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    ...(facets && { facets }),
    createdAt: new Date().toISOString()
  }

  return postRecord
}

import pkg from '@atproto/api'
const { RichText } = pkg

export default async function post(content, agent) {
  const rt = new RichText({
    text: content
  })

  await rt.detectFacets(agent)

  const postRecord = {
    $type: 'app.bsky.feed.post',
    text: rt.text,
    createdAt: new Date().toJSON()
  }

  if (rt.facets) {
    // a plaintext message does not have facets
    // HACK: there seems to be an issue with rt.detectFacets()
    rt.facets[0].features[0].did = agent.session.did
    postRecord.facets = rt.facets
  }

  return postRecord
}

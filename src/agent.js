import nodeFetch from 'node-fetch'
import pkg from '@atproto/api'
const { BskyAgent } = pkg

export default async function bsky(service) {
  BskyAgent.configure({
    // fetch polyfill
    async fetch(httpUri, httpMethod, httpHeaders, httpReqBody) {
      const res = await nodeFetch(httpUri, {
        method: httpMethod,
        headers: httpHeaders,
        body: JSON.stringify(httpReqBody)
      })
      const response = {
        status: res.status,
        body: await res.json()
      }
      return response
    }
  })

  const agent = new BskyAgent({
    service: service
  })

  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER,
    password: process.env.BSKY_PASSWORD
  })

  return agent
}

import { AtpAgent } from '@atproto/api'

export default async function bsky(service) {
  const agent = new AtpAgent({
    service: service
  })

  await agent.login({
    identifier: process.env.BSKY_IDENTIFIER,
    password: process.env.BSKY_PASSWORD
  })

  return agent
}

import * as core from '@actions/core'
import agent from './agent.js'
import post from './post.js'
import validate from './validate.js'
import { buildPostUrl } from './url.js'

const content = core.getInput('post', { required: true })
const service = core.getInput('service')

const bskyAgent = await agent(service)
const bskyPost = await post(content, bskyAgent)
const validation = await validate(bskyPost)

if (validation.success) {
  try {
    const response = await bskyAgent.post(bskyPost)

    core.info('Post successful')
    core.info(`Post URI: ${response.uri}`)
    core.info(`Post CID: ${response.cid}`)

    core.setOutput('uri', response.uri)
    core.setOutput('cid', response.cid)

    const url = buildPostUrl(response, bskyAgent.session?.handle)
    if (url) {
      core.setOutput('url', url)
      core.info(`Post URL: ${url}`)
    }
  } catch (error) {
    core.error(error)
    core.setFailed(error)
  }
} else {
  core.error(validation)
  core.setFailed(validation)
}


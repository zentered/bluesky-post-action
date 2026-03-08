import * as core from '@actions/core'
import agent from './agent.js'
import post from './post.js'
import validate from './validate.js'

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
    
    // Set outputs for GitHub Actions
    core.setOutput('uri', response.uri)
    core.setOutput('cid', response.cid)
    
    // Extract username from the identifier for URL construction
    const identifier = process.env.BSKY_IDENTIFIER || ''
    const username = identifier.startsWith('@') ? identifier.slice(1) : identifier
    const postId = response.uri.split('/').pop()
    const url = `https://bsky.app/profile/${username}/post/${postId}`
    
    core.setOutput('url', url)
    core.info(`Post URL: ${url}`)
    
  } catch (error) {
    core.error(error)
    core.setFailed(error)
  }
} else {
  core.error(validation)
  core.setFailed(validation)
}
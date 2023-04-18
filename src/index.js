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
    await bskyAgent.post(bskyPost)
    core.info('Post successful')
  } catch (error) {
    core.error(error)
    core.setFailed(error)
  }
} else {
  core.error(validation)
  core.setFailed(validation)
}

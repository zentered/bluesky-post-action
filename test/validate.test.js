import test from 'node:test'
import assert from 'node:assert/strict'
import post from '../src/post.js'
import validate from '../src/validate.js'
import { AtpAgent } from '@atproto/api'

const agent = new AtpAgent({ service: 'http://localhost' })

test('post', async () => {
  const expected = {
    success: true,
    value: {
      $type: 'app.bsky.feed.post',
      text: 'Hello World',
      createdAt: '2023-11-20T17:41:29.635Z'
    }
  }
  const bskyPost = await post('Hello World', agent)
  const actual = await validate(bskyPost)
  assert.ok(actual)
  assert.equal(actual.success, expected.success)
  assert.equal(actual.value['$type'], expected.value['$type'])
})

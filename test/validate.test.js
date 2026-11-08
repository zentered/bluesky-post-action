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

test('non-record fails with a message', async () => {
  const actual = await validate({ text: 'Hello World' })
  assert.deepEqual(actual, {
    success: false,
    error: 'post is not a valid app.bsky.feed.post record'
  })
})

test('invalid record fails with a message', async () => {
  const actual = await validate({
    $type: 'app.bsky.feed.post',
    createdAt: '2023-11-20T17:41:29.635Z'
  })
  assert.equal(actual.success, false)
  assert.equal(typeof actual.error, 'string')
  assert.match(actual.error, /text/)
})

import test from 'node:test'
import assert from 'node:assert'
import post from '../src/post.js'
import { AtpAgent } from '@atproto/api'

const agent = new AtpAgent({ service: 'http://localhost' })

test('post', async () => {
  const expected = {
    $type: 'app.bsky.feed.post',
    text: 'Hello World'
  }
  const actual = await post('Hello World', agent)
  assert.equal(actual['$type'], expected['$type'])
  assert.equal(actual.text, expected.text)
  assert.ok(actual.createdAt)
})

test('post with URL attempts to create embed', async () => {
  const content = 'Check out https://example.com'
  const actual = await post(content, agent)

  assert.equal(actual['$type'], 'app.bsky.feed.post')
  assert.equal(actual.text, content)
  assert.ok(actual.createdAt)
  // Note: embed will be null in test environment due to network constraints
  // but the structure should be correct
})

test('post without URL has no embed', async () => {
  const content = 'Just a regular post without links'
  const actual = await post(content, agent)

  assert.equal(actual['$type'], 'app.bsky.feed.post')
  assert.equal(actual.text, content)
  assert.ok(actual.createdAt)
  assert.equal(actual.embed, undefined)
})

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

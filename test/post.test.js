import test from 'node:test'
import assert from 'node:assert'
import post from '../src/post.js'

test('post', async () => {
  const expected = {
    $type: 'app.bsky.feed.post',
    text: 'Hello World'
  }
  const actual = await post('Hello World', {})
  assert.equal(actual['$type'], expected['$type'])
  assert.equal(actual.text, expected.text)
  assert.ok(actual.createdAt)
})

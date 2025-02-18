import test from 'node:test'
import assert from 'node:assert'
import post from '../src/post.js'
import { AtpAgent } from '@atproto/api'

const agent = new AtpAgent({ service: 'http://localhost' })

test('facets', async () => {
  const expected = {
    $type: 'app.bsky.feed.post',
    text: 'Hello @alice.com, check out this link: https://example.com'
  }
  const actual = await post(
    'Hello @alice.com, check out this link: https://example.com',
    agent
  )
  assert.equal(actual['$type'], expected['$type'])
  assert.equal(actual.text, expected.text)
  assert.equal(actual.facets.length, 2)
  assert.equal(actual.facets[0].$type, 'app.bsky.richtext.facet')
  assert.equal(
    actual.facets[1].features[0]['$type'],
    'app.bsky.richtext.facet#link'
  )
  assert.ok(actual.createdAt)
})

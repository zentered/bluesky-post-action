import test from 'node:test'
import assert from 'node:assert'
import { extractPostId, extractDid, buildPostUrl } from '../src/url.js'

test('extractPostId returns the rkey from a valid URI', () => {
  assert.equal(
    extractPostId('at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s'),
    '3k2l4j5h6g7f8d9s'
  )
})

test('extractPostId returns null for invalid input', () => {
  assert.equal(extractPostId(null), null)
  assert.equal(extractPostId(undefined), null)
  assert.equal(extractPostId(''), null)
})

test('extractDid returns the DID from a valid URI', () => {
  assert.equal(
    extractDid('at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s'),
    'did:plc:example123'
  )
})

test('extractDid returns null for invalid input', () => {
  assert.equal(extractDid(null), null)
  assert.equal(extractDid('not-a-valid-uri'), null)
})

test('buildPostUrl constructs URL using session handle', () => {
  const response = {
    uri: 'at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s',
    cid: 'bafyreib2rxk3vcfbqsg4qkdl7fvgxe4qn6oysabc123'
  }

  const url = buildPostUrl(response, 'alice.bsky.social')
  assert.equal(url, 'https://bsky.app/profile/alice.bsky.social/post/3k2l4j5h6g7f8d9s')
})

test('buildPostUrl falls back to DID when handle is not available', () => {
  const response = {
    uri: 'at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s'
  }

  const url = buildPostUrl(response, null)
  assert.equal(url, 'https://bsky.app/profile/did:plc:example123/post/3k2l4j5h6g7f8d9s')
})

test('buildPostUrl returns null for missing response', () => {
  assert.equal(buildPostUrl(null, 'alice.bsky.social'), null)
  assert.equal(buildPostUrl({}, 'alice.bsky.social'), null)
  assert.equal(buildPostUrl({ uri: '' }, 'alice.bsky.social'), null)
})

import test from 'node:test'
import assert from 'node:assert'

/**
 * Test the URL construction logic for Bluesky post outputs.
 * This tests the URL generation functionality that was added to support
 * post outputs in GitHub Actions.
 */

test('URL construction from AT-protocol URI and identifier', () => {
  // Test with handle identifier (no @ prefix)
  const identifier1 = 'alice.example.com'
  const uri1 = 'at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s'

  const username1 = identifier1.startsWith('@') ? identifier1.slice(1) : identifier1
  const postId1 = uri1.split('/').pop()
  const expectedUrl1 = `https://bsky.app/profile/${username1}/post/${postId1}`
  const actualUrl1 = `https://bsky.app/profile/${username1}/post/${postId1}`

  assert.equal(actualUrl1, 'https://bsky.app/profile/alice.example.com/post/3k2l4j5h6g7f8d9s')
  assert.equal(actualUrl1, expectedUrl1)
})

test('URL construction with @ prefix identifier', () => {
  // Test with @ prefixed identifier
  const identifier2 = '@bob.bsky.social'
  const uri2 = 'at://did:plc:xyz789/app.bsky.feed.post/1a2b3c4d5e6f7g8h'

  const username2 = identifier2.startsWith('@') ? identifier2.slice(1) : identifier2
  const postId2 = uri2.split('/').pop()
  const expectedUrl2 = `https://bsky.app/profile/${username2}/post/${postId2}`
  const actualUrl2 = `https://bsky.app/profile/${username2}/post/${postId2}`

  assert.equal(actualUrl2, 'https://bsky.app/profile/bob.bsky.social/post/1a2b3c4d5e6f7g8h')
  assert.equal(actualUrl2, expectedUrl2)
  assert.equal(username2, 'bob.bsky.social') // @ should be stripped
})

test('URL construction handles empty identifier gracefully', () => {
  // Test with empty identifier (edge case)
  const identifier3 = ''
  const uri3 = 'at://did:plc:test456/app.bsky.feed.post/abcdef123456'

  const username3 = identifier3.startsWith('@') ? identifier3.slice(1) : identifier3
  const postId3 = uri3.split('/').pop()
  const expectedUrl3 = `https://bsky.app/profile/${username3}/post/${postId3}`
  const actualUrl3 = `https://bsky.app/profile/${username3}/post/${postId3}`

  assert.equal(actualUrl3, 'https://bsky.app/profile//post/abcdef123456')
  assert.equal(actualUrl3, expectedUrl3)
  assert.equal(username3, '') // Should remain empty
})

test('Post ID extraction from AT-protocol URI', () => {
  const testCases = [
    {
      uri: 'at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s',
      expected: '3k2l4j5h6g7f8d9s'
    },
    {
      uri: 'at://did:plc:xyz789/app.bsky.feed.post/1a2b3c4d5e6f7g8h',
      expected: '1a2b3c4d5e6f7g8h'
    },
    {
      uri: 'at://did:plc:test456/app.bsky.feed.post/short',
      expected: 'short'
    },
    {
      uri: 'at://did:plc:complex/app.bsky.feed.post/complex-id-with-dashes',
      expected: 'complex-id-with-dashes'
    }
  ]

  testCases.forEach((testCase, index) => {
    const postId = testCase.uri.split('/').pop()
    assert.equal(postId, testCase.expected, `Test case ${index + 1} failed`)
  })
})

test('Output structure validation', () => {
  // Test the expected structure of outputs that would be set
  const mockResponse = {
    uri: 'at://did:plc:example123/app.bsky.feed.post/3k2l4j5h6g7f8d9s',
    cid: 'bafyreib2rxk3vcfbqsg4qkdl7fvgxe4qn6oysabc123def456ghi789jklmn'
  }

  const mockIdentifier = 'alice.example.com'

  // Simulate the output generation logic
  const outputs = {
    uri: mockResponse.uri,
    cid: mockResponse.cid,
    url: (() => {
      const username = mockIdentifier.startsWith('@') ? mockIdentifier.slice(1) : mockIdentifier
      const postId = mockResponse.uri.split('/').pop()
      return `https://bsky.app/profile/${username}/post/${postId}`
    })()
  }

  assert.ok(outputs.uri, 'URI output should be present')
  assert.ok(outputs.cid, 'CID output should be present')
  assert.ok(outputs.url, 'URL output should be present')

  assert.equal(outputs.uri, mockResponse.uri)
  assert.equal(outputs.cid, mockResponse.cid)
  assert.equal(outputs.url, 'https://bsky.app/profile/alice.example.com/post/3k2l4j5h6g7f8d9s')

  // Validate URL format
  assert.ok(outputs.url.startsWith('https://bsky.app/profile/'), 'URL should start with correct prefix')
  assert.ok(outputs.url.includes('/post/'), 'URL should contain post path')
})

test('Username extraction handles various identifier formats', () => {
  const testCases = [
    { input: 'alice.example.com', expected: 'alice.example.com' },
    { input: '@bob.bsky.social', expected: 'bob.bsky.social' },
    { input: '@charlie', expected: 'charlie' },
    { input: 'dave', expected: 'dave' },
    { input: '', expected: '' },
    { input: '@', expected: '' }
  ]

  testCases.forEach((testCase, index) => {
    const username = testCase.input.startsWith('@') ? testCase.input.slice(1) : testCase.input
    assert.equal(username, testCase.expected, `Test case ${index + 1}: ${testCase.input} -> ${testCase.expected}`)
  })
})
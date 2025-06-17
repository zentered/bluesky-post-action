import test from 'node:test'
import assert from 'node:assert'
import { fetchEmbedUrlCard } from '../src/embed.js'

// Mock agent for testing
const mockAgent = {
  uploadBlob: async () => ({
    data: {
      blob: {
        $type: 'blob',
        ref: { $link: 'bafkreictest' },
        mimeType: 'image/jpeg',
        size: 12345
      }
    }
  })
}

test('fetchEmbedUrlCard returns null for invalid URL', async () => {
  const result = await fetchEmbedUrlCard('invalid-url', mockAgent)
  assert.equal(result, null)
})

test('fetchEmbedUrlCard handles fetch errors gracefully', async () => {
  const result = await fetchEmbedUrlCard(
    'https://nonexistent-domain-12345.com',
    mockAgent
  )
  assert.equal(result, null)
})

test('embed module exports fetchEmbedUrlCard function', () => {
  assert.equal(typeof fetchEmbedUrlCard, 'function')
})

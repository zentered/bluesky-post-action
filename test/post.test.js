import tap from 'tap'
import post from '../src/post.js'

tap.test('post', async (t) => {
  const expected = {
    $type: 'app.bsky.feed.post',
    text: 'Hello World'
  }
  const actual = await post('Hello World', {})
  t.equal(actual['$type'], expected['$type'])
  t.equal(actual.text, expected.text)
  t.ok(actual.createdAt)
})

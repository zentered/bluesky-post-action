import { AppBskyFeedPost } from '@atproto/api'

export default async function validate(bskyPost) {
  if (!AppBskyFeedPost.isRecord(bskyPost)) {
    return {
      success: false,
      error: 'post is not a valid app.bsky.feed.post record'
    }
  }

  const res = AppBskyFeedPost.validateRecord(bskyPost)
  if (!res.success) {
    return { success: false, error: res.error.message }
  }
  return { success: true, value: res.value }
}

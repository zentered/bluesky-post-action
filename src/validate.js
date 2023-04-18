import pkg from '@atproto/api'
const { AppBskyFeedPost } = pkg

export default async function validate(bskyPost) {
  if (AppBskyFeedPost.isRecord(bskyPost)) {
    const res = AppBskyFeedPost.validateRecord(bskyPost)
    if (res.error) {
      return res.error
    }
    return res
  }
}

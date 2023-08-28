/** @param {string} url */
export function extractYouTubeVideoId(url) {
  const preMatch = url.match(/(youtube\.com|youtu\.be)\//)
  if (preMatch == null) return null
  let rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
  const m = url.match(rx)
  console.log(`match: ${m}`)
  return m == null ? null : m[1]
}

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const client_id = '2983e5e54053b2e0fdc8'

module.exports = {
  github: {
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: 'f2d4b8bbbb3aa02cf0d79f329c6418a44736206e',
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
}

// token 8de99c7accd48c7476c264e6a1971b38f26183fc

// Insure auth for demo purposes -- get a JWT from the
// server by just asserting your username.
//
// This doesn't provide any security but does allow demo
// apps to authenticate people as different users.
export const insecureAuthToken = async (app: string, env: string, username: string) => {
  const url = "https://console.electric-sql.com/api/v1/jwt/auth/login"
  const data = {
    app: app,
    env: env,
    username: username
  }

  const body = JSON.stringify({ data })
  const opts = {
    body,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  }

  const res = await fetch(url, opts)
  const json = await res.json()

  return json.data
}

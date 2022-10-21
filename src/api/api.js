export async function login(user, pass) {
        const requestOps = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({username: user, password: pass})
    }
    return await fetch("/api/login/", requestOps)
}
export async function login(user, pass) {
        const requestOps = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({username: user, password: pass})
    }
    return await fetch("/api/login/", requestOps)
}

export async function register(user, pass, nm, add, phone, birth_d) {
  const requestOps = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass, name: nm, address: add, phone: phone, birth_date: birth_d }),
  };
  return await fetch("/api/register/", requestOps);
}
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

export async function getOrders(customer_id) {
  return await fetch("/api/getOrders/" + customer_id);
}

export async function getRecentOrder(customer_id) {
  return await fetch("/api/getRecentOrder/" + customer_id);
}

export async function createOrder(order) {
  console.log(order);
  const requestOps = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(order),
  };
  return await fetch("/api/createOrder/", requestOps);
}

export async function getSearchCatalog() {
  const response =  await fetch("/api/getItems")
  return response;
}
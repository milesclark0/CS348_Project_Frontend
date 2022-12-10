export async function changePassword(username, password, password2) {
    const requestOps = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({username: username, password: password, password2: password2})
    }
    return await fetch("/api/changePassword/", requestOps)

}

export async function login(user, pass) {
    const requestOps = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({username: user, password: pass})
    }
    return await fetch("/api/login/", requestOps)
}

export async function hire(user, pass, name, zip, phone, birth_date, manager) {
  const requestOps = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass, name: name, zip: zip, phone: phone, birth_date: birth_date, manager: manager}),
  };
  return await fetch("/api/hire/", requestOps);
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

export async function fireEmployee(employee_id) {
    const requestOps = {
      method: "DELETE",
      headers: { "content-Type": "application/json" },
    };
  return await fetch(`api/fireEmployee/${employee_id}`, requestOps);
}

export async function getEmployees(manager_id) {
  return await fetch(`api/getEmployees/${manager_id}`);
}

export async function getOrderItems(order_id) {
  console.log("IN GET ORDERS " + order_id)
  const requestOps = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(order_id),
  };
  return await fetch("api/getOrderItems/", requestOps);
}

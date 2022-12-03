var Order = (function () {
  var customer_id = null;
  var employee_id = null;
  var total = 0;
  var tip = 0;
  var items = [{ item_id: 0, cart_count: 0 }];

  var getCustomer_id = function () {
    return customer_id;
  };
  var getEmployee_id = function () {
    return employee_id;
  };

  var getTotal = function () {
    return total;
  };
  var getTip = function () {
    return tip;
  };
  var getItems = function () {
    return items;
  };
  var getObject = function () {
    return {
      customer: customer_id,
      employee: employee_id,
      total: total,
      tip: tip,
      items: items,
    };
  };

  var setCustomer_id = function (new_customer_id) {
    customer_id = new_customer_id;
  };
  var setEmployee_id = function (new_employee_id) {
    employee_id = new_employee_id;
  };
  var setTotal = function (new_total) {
    total = new_total;
  };
  var setTip = function (new_tip) {
    tip = new_tip;
  };
  var setItems = function (new_items) {
    items = new_items;
  };

  var setAll = function (new_customer_id, new_employee_id, new_total, new_tip) {
    setCustomer_id(new_customer_id);
    setEmployee_id(new_employee_id);
    setTotal(new_total);
    setTip(new_tip);
  };

  var isValid = function () {
    return (
        customer_id !== null &&
        total !== 0 &&
        items.length !== 0
    );
    };

  return {
    getCustomer_id: getCustomer_id,
    getEmployee_id: getEmployee_id,
    getTotal: getTotal,
    getTip: getTip,
    getItems: getItems,
    getObject: getObject,
    setCustomer_id: setCustomer_id,
    setTotal: setTotal,
    setTip: setTip,
    setItems: setItems,
    setAll: setAll,
    isValid: isValid,
  };
})();
export default Order;

var CustomerProfile = (function () {
  var id = -1;
  var username = "";
  var name = "";
  var address = "";
  var phone = "";
  var birth_date = "";
  var points = -1;
  var creation_date = "";
  

  var getID = function () {
    return id;
  };
  var getUsername = function () {
    return username;
  };
  var getName = function () {
    return name;
  };
  var getAddress = function () {
    return address;
  };
  var getPhone = function () {
    return phone;
  };
  var getBirthDate = function () {
    return birth_date;
  };
  var getPoints = function () {
    return points;
  };
  var getCreationDate = function () {
    return creation_date;
  };

  var getUserType = function () {
    return "User";
  }

  var getObject = function () {
    return {
      id: id,
      username: username,
      name: name,
      address: address,
      phone: phone,
      birth_date: birth_date,
      points: points,
      creation_date: creation_date,
    };
  };
  
  var isLoggedIn = function () {
    return (
      id !== -1 &&
      username !== "" &&
      name !== "" &&
      address !== "" &&
      phone !== "" &&
      birth_date !== "" &&
      points !== -1 &&
      creation_date !== ""
    );
  };

  var setID = function (new_ID) {
    id = new_ID;
  };
  var setUsername = function (new_username) {
    username = new_username;
  };
  var setName = function (new_name) {
    name = new_name;
  };
  var setAddress = function (new_address) {
    address = new_address;
  };
  var setPhone = function (new_phone) {
    phone = new_phone;
  };
  var setBirthDate = function (new_birth_date) {
    birth_date = new_birth_date;
  };
  var setPoints = function (new_points) {
    points = new_points;
  };
  var setCreationDate = function (new_creation_date) {
    creation_date = new_creation_date;
  };
  var setAll = function (
    new_ID,
    new_username,
    new_name,
    new_address,
    new_phone,
    new_birth_date,
    new_points,
    new_creation_date
  ) {
    id = new_ID;
    username = new_username;
    name = new_name;
    address = new_address;
    phone = new_phone;
    birth_date = new_birth_date;
    points = new_points;
    creation_date = new_creation_date;
    isLoggedIn = true;
  };

  var clear = function () {
    id = -1
    username = "";
    name = "";
    address = "";
    phone = "";
    birth_date = "";
    points = -1;
    creation_date = "";
  };

  return {
    getID: getID,
    getUsername: getUsername,
    getName: getName,
    getAddress: getAddress,
    getPhone: getPhone,
    getBirthDate: getBirthDate,
    getPoints: getPoints,
    getCreationDate: getCreationDate,
    getUserType: getUserType,
    isLoggedIn: isLoggedIn,

    setID: setID,
    setUsername: setUsername,
    setName: setName,
    setAddress: setAddress,
    setPhone: setPhone,
    setBirthDate: setBirthDate,
    setPoints: setPoints,
    setCreationDate: setCreationDate,
    setAll: setAll,
    clear: clear
  };
})();
export default CustomerProfile;

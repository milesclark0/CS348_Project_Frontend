var ManagerProfile = (function () {
    var id = -1;
    var username = "";
    var name = "";
    var phone = "";
    var birth_date = "";
    var zip = "";
    var hire_date = "";
  
    var getID = function () {
      return id;
    };
    var getUsername = function () {
      return username;
    };
    var getName = function () {
      return name;
    };
    var getPhone = function () {
      return phone;
    };
    var getBirthDate = function () {
      return birth_date;
    };
    var getUserType = function () {
      return "Manager";
    }
    var getZip = function () {
      return zip;
    }
    var getHireDate = function () {
      return hire_date;
    }
  
    var getObject = function () {
      return {
        id: id,
        username: username,
        name: name,
        phone: phone,
        birth_date: birth_date,
        zip: zip,
        userType: "User",
        hire_date: hire_date
      };
    };
    
    var isLoggedIn = function () {
      return (
        id !== -1 &&
        username !== "" &&
        name !== "" &&
        phone !== "" &&
        birth_date !== "" &&
        zip !== "" &&
        hire_date !== ""
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
    var setPhone = function (new_phone) {
      phone = new_phone;
    };
    var setBirthDate = function (new_birth_date) {
      birth_date = new_birth_date;
    };
    var setZip = function(new_zip) {
      zip = new_zip;
    }
    var setHireDate = function(new_hire_date) {
      hire_date = new_hire_date;
    }
    var setAll = function (
      new_ID,
      new_username,
      new_name,
      new_phone,
      new_birth_date,
      new_zip,
      new_hire_date
    ) {
      id = new_ID;
      username = new_username;
      name = new_name;
      phone = new_phone;
      birth_date = new_birth_date;
      zip = new_zip;
      hire_date = new_hire_date;
      isLoggedIn = true;
    };
  
    var clear = function () {
      id = -1
      username = "";
      name = "";
      phone = "";
      birth_date = "";
      zip = "";
      hire_date = "";
    };
  
    return {
      getID: getID,
      getUsername: getUsername,
      getName: getName,
      getPhone: getPhone,
      getBirthDate: getBirthDate,
      getUserType: getUserType,
      getZip: getZip,
      getHireDate: getHireDate,
      isLoggedIn: isLoggedIn,
  
      setID: setID,
      setUsername: setUsername,
      setName: setName,
      setPhone: setPhone,
      setZip, setZip,
      setHireDate: setHireDate,
      setBirthDate: setBirthDate,
      setAll: setAll,
      clear: clear
    };
  })();
  export default ManagerProfile;
  
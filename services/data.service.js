
const db=require('./db');

accountDetails = {
  1000: { acno: 1000, name: "userone", balance: 5000, password: "user1" },
  1002: { acno: 1002, name: "usertwo", balance: 5000, password: "user2" },
  1003: { acno: 1003, name: "userthree", balance: 7000, password: "user3" },
  1004: { acno: 1004, name: "userfour", balance: 5000, password: "user4" },
  1005: { acno: 1005, name: "userfive", balance: 3000, password: "user5" },
};



let currentUser;

const register =  (acno, name, password) => {
  // console.log("register called");
  return db.user.findOne({ acno }).then(user=>{
    console.log(user);
    if (user) {
      return {
        status: false,
        statusCode: 422,
        message: "user already exist,please login",
      };
    }
    else {
      const newuser = new db.user({
        acno,
        balance: 0,
        name,
        password,
      });
      newuser.save();
      return {
        status: true,
        statusCode: 200,
        message: "registration sucessful",
      }
    }
  })
  
}





 

const login = (req,acno, pswd) => {
  //this.getDetails()
  var accno=parseInt(acno)
  return db.user.findOne({
    acno:accno,
    password:pswd
  }).then(user=>{
    if(user){
      req.session.currentUser=user
      return {
        status: true,
        statusCode: 200,
        message: "login sucess",
      }
    }
    return {
      status: false,
      statusCode: 422,
      message: "invalid credentials",
    }

  })
}


//   var dataset = accountDetails;

//   if (accno in dataset) {
//     var pswd1 = dataset[acno].password;
//     if (pswd1 == pswd) {
//       req.session.currentUser = dataset[acno]
//       //this.saveDetails()

//       return {
//         status: true,
//         statusCode: 200,
//         message: "login sucess",
//       };
//     } else {
//       return {
//         status: false,
//         statusCode: 422,
//         message: "incorrect password",
//       };
//     }
//   } else {
//     return {
//       status: true,
//       statusCode: 200,
//       message: "no user exist,register new one",
//     };
//   }
// };

const deposit = (acno, pswd, amnt) => {
    
  var amount = parseInt(amnt);
  let dataset = accountDetails;
  if (acno in dataset) {
    var pswd1 = dataset[acno].password;
    if (pswd1 == pswd) {
      // alert("log in succesful")
      dataset[acno].balance += amount;
      // this.savedetails();
      // alert("credited with amnt " + amount + " new balance is:" + dataset[acno].balance);
      return {
        status: true,
        statusCode: 200,
        message:"credited with amnt " +amount +" new balance is:" +dataset[acno].balance,
      };
    } else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password",
      };
    }
  } else {
    return {
      status: false,
      statusCode: 422,
      message: "no user exist,register new one",
    };
  }
};

const widraw = (acno, pswd, amnt) => {
    // if(!req.session.currentUser){
    //     return {
    //         status: false,
    //         statusCode: 422,
    //         message: "you must login first",
    //       }
    // }
  var amount = parseInt(amnt);

  let dataset = accountDetails;
  if (acno in dataset) {
    var pswd1 = dataset[acno].password;
    if (pswd1 == pswd) {
      if (amount > dataset[acno].balance) {
        return {
          status: false,
          statusCode: 422,
          message: "insufficient balance",
        }
      } else {
        dataset[acno].balance -= amount;

        return {
          status: true,
          statusCode: 200,
          message:"debited with amnt " +amount +" new balance is:" +dataset[acno].balance,
        };
      }
    } else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password",
      };
    }
  } else {
    return {
      status: false,
      statusCode: 422,
      message: "no user exist,register new one",
    };
  }
};

module.exports = {
  register,
  login,
  deposit,
  widraw,
};

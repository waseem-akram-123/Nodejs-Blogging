// const {validateToken} = require ("../service/authentication");

// function checkForAuthCookie(cookieName){
//     return (req, res, next) => {
//         const tokenCookieValue = req.cookies[cookieName];
//         if (!tokenCookieValue) {
//             return next();  // No token means no user, move to next middleware
//         }
//         try {
//             const userPayload = validateToken(tokenCookieValue);
//             req.user = userPayload;  // Set the user object to req.user
//         } catch (error) {
//             console.log("Invalid token", error);
//         }
//         next();  // Ensure the middleware always calls next()
//     };
// }

// module.exports = {
//     checkForAuthCookie,
// };

// chat gpt code to show current user name on the navbar

const { validateToken } = require("../service/authentication");
const User = require("../models/user");

function checkForAuthCookie(cookieName) {
  return async (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) return next();

    try {
      const payload = validateToken(tokenCookieValue); // contains _id
      const user = await User.findById(payload._id); 
      // console.log (payload._id)    // fetch latest user from DB
      if (user) {
        req.user = user; // Now req.user has fullName, email, role, etc.
      }
    } catch (error) {
      console.log("Invalid token", error);
    }

    next();
  };
}

module.exports = {
  checkForAuthCookie,
};

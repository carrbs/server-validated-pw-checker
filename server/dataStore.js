const bcrypt = require("bcrypt");

const userDB = [{ email: "email@example.com", id: 42 }];
const { findUserIdByEmail, writeToDB } = require("./databaseHelpers");

function storePassword(email, password) {
  const userId = findUserIdByEmail(email);

  if (!userId) {
    return Promise.reject("User not found");
  }
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        writeToDB(userId, hash);
        console.log(
          `UserID, Email and hashed password: ${userId}, ${email}, ${hash}`
        );
        resolve();
      }
    });
  });
}

module.exports = { storePassword };

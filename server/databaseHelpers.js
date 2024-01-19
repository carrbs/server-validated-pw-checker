const userDB = [{ email: "email@example.com", id: 42 }];

function findUserIdByEmail(email) {
  const user = userDB.find((user) => user.email === email);
  return user ? user.id : null;
}

function writeToDB(userId, hash) {
  // TODO: Store hashed password and associate with
  // the user.
  return;
}
module.exports = { findUserIdByEmail, writeToDB };

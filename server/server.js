const express = require("express");
const app = express();
const cors = require("cors");

const { validatePassword } = require("./passwordValidator");
const { storePassword } = require("./dataStore");

app.use(express.json());

app.use(cors());

app.post("/validate", (req, res) => {
  const { password } = req.body;

  const validations = validatePassword(password);
  // TODO: discuss returning 200 when validations are not met.
  //       Request was fine, just the password was not valid.
  //       Client could use the `validations.valid` property to
  //       determine validity.
  return validations.valid
    ? res.send(validations)
    : res.status(400).send(validations);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!validatePassword(password).valid) {
    return res.status(400).send("Invalid password");
  }

  return storePassword(email, password)
    .then(() => res.send("Registration successful"))
    .catch((err) => {
      res.status(500).send(`Server error: ${err}`);
    });
});

const port = 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server is running on port ${port}...`));
} else {
  module.exports = app;
}

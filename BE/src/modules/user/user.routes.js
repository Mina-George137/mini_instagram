const router = require("express").Router();
const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
} = require("./controller/user.controller");
const auth = require("../../middleware/auth");
const validationFunc = require("../../middleware/validation");
const {signUpValidation, loginValidation} = require("./user.validation")

router.route("/allUsers").get(getAllUsers);
router.post("/add", validationFunc(signUpValidation) ,addUser);
router.route("/:id").get(auth(),getUserById).patch(auth(),updateUser).delete(auth(),deleteUser);
router.post("/register", validationFunc(signUpValidation) ,register);
router.post("/login", validationFunc(loginValidation) ,login);
router.post("/logout",auth(), logout);

module.exports = router;

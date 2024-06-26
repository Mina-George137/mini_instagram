const userModel = require("../../../../DB/models/user");
const jwt = require("jsonwebtoken");
const welcomeMessage = require("../../../services/welcomeEmail");
const { sendEmail } = require("../../../services/emailService");

function extractUsername(email) {
  // Split the email address at the '@' symbol
  const parts = email.split('@');
  
  // Return the first part (username)
  return parts[0];
}

const getAllUsers = async (req, res) => {
  try {
    allUsers = await userModel.find();
    if (allUsers.length == 0)
      return res
        .status(404)
        .json({ message: "fail", error: "No users found in the database." });
    return res.status(200).json({ message: "success", data:{user: allUsers} });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};


const addUser = async (req, res) => {
  try {
    let {email,password} = req.body;
    let userName = extractUsername(email);
    // Checking whether a user with this username already exists or not
    let user = await userModel.findOne({userName: userName});
    if (user){
      return res.status(500).json({ message: "fail", error: 'User already exists' });
    }else{
      const newUser = new userModel({userName,email,password});
      await newUser.save();
      let welcomeMsg = welcomeMessage(newUser.userName);
      sendEmail(newUser.email, welcomeMsg, "Welcome to our app");
      return res.status(200).json({ message: "success", data:{user:newUser}});
    }
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res
        .status(404)
        .json({ message: "fail", error: "User not found." });
    return res.status(200).json({ message: "success", data: {user:deletedUser}});
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ message: "fail", error: "User not found." });
    return res.status(200).json({ message: "success", data:{user:user}});
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser)
      return res
        .status(404)
        .json({ message: "fail", error: "User not found." });
    return res.status(200).json({ message: "success", data:{user:updateUser}});
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const signToken = function (id) {
  return jwt.sign({ id, isLoggedIn: true }, process.env.JWTKEY, {
    expiresIn: "90d",
  });
};

const setCookie = function (res, token) {
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
};

const register = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    let welcomeMsg = welcomeMessage(newUser.name);
    sendEmail(newUser.email, welcomeMsg, "Welcome to our app");
    res.status(201).json({ status: "success", data:{user:newUser}});
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ status: "fail", message: "Please provide valid email and password" });
    const user = await userModel.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password)))
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
    const token = signToken(user._id);
    setCookie(res, token);
    res.status(200).json({ status: "success", data: { token: token, user: user } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

const logout = () => {
  return async (req, res, next) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ status: "success", message: `user logged out successfully` });
    } catch (error) {
      res.status(500).json({ status: "fail", message: `user logged out failed` });
    }
  };
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
};

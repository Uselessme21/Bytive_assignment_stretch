const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller for user registration
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example: {"message": "User registered successfully", "user": {"name": "John Doe", "email": "john@example.com"}, "token": "your-jwt-token"}
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example: {"message": "provide all the required input"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal server error"}
 */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the given email already exists
    if (!email || !name || !password) {
      res.status(400).json({ message: "provide all the required input" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // Add other fields as needed
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.jwtkey, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user login

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Log in an existing user with a valid email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example: {"message": "Login successful", "user": {"name": "John Doe", "email": "john@example.com"}, "token": "your-jwt-token"}
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example: {"message": "Invalid email or password"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal server error"}
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.jwtkey, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user profile editing

/**
 * @swagger
 * /api/user/editprofile/{userId}:
 *   put:
 *     summary: Edit user profile
 *     description: Edit the profile of the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose profile is being edited.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: 
 *             {
 *               "name": "John",
 *               "techStack": ["JavaScript"],
 *               "fieldOfInterest": ["Web Developer"],
 *               "seeking": ["Internship", "Job"],
 *               "bio": "I am a prompt engineer with 5 years of experience",
 *               "githubURL": "https://github.com/user",
 *               "linkedinURL": "https://www.linkedin.com/in/user/",
 *               "location": "User Location",
 *               "twitterURL": "https://twitter.com/user",
 *               "websiteURL": "https://user.github.io/"
 *             }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Profile updated successfully"}
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example: {"message": "You are not authorized to edit this profile"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal server error"}
 */

const editUserProfile = async (req, res) => {
  try {
    const {
      name,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
    } = req.body;

    // Check if the logged-in user is the owner of the profile
    if (req.user._id.toString() !== req.params.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this profile" });
    }

    // Update user profile
    await User.findByIdAndUpdate(req.params.userId, {
      name,
      location,
      fieldOfInterest,
      techStack,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for user account deletion

/**
 * @swagger
 * /api/user/deleteprofile/{userId}:
 *   delete:
 *     summary: Delete user account
 *     description: Delete the account of the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose account is being deleted.
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             example: {"message": "Account deleted successfully"}
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example: {"message": "You are not authorized to delete this account"}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal server error"}
 */
const deleteUserAccount = async (req, res) => {
  try {
    // Check if the logged-in user is the owner of the account
    if (req.user._id.toString() !== req.params.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this account" });
    }

    // Delete user account
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Log out user
 *     description: Log out the logged-in user. (No specific action needed for JWT)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             example: {"message": "Logout successful"}
 */
// Controller for user logout
const logoutUser = (req, res) => {
  // No need for specific logout with JWT, as the client handles the token
  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  loginUser,
  editUserProfile,
  deleteUserAccount,
  logoutUser,
};

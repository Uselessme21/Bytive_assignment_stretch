/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         gravatar:
 *           type: string
 *         techStack:
 *           type: array
 *           items:
 *             type: string
 *         location:
 *           type: string
 *         fieldOfInterest:
 *           type: array
 *           items:
 *             type: string
 *         seeking:
 *           type: array
 *           items:
 *             type: string
 *         bio:
 *           type: string
 *         githubURL:
 *           type: string
 *         twitterURL:
 *           type: string
 *         website_URL:
 *           type: string
 *         linkedinURL:
 *           type: string
 */

const User = require('../model/user.model');

/**
 * @swagger
 * /api/getusers:
 *   get:
 *     summary: Get list of all profiles
 *     description: Returns a list of profiles.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example: [{
        "_id": "655b7b1909059c33f7b3a1d9ace",
        "name": "john",
        "email": "john@gmail.com",
        "techStack": [
            "javascript",
            "HTML",
            "CSS",
            "python",
            "java",
            "PHP"
        ],
        "fieldOfInterest": [
            "Web developer",
            "security"
        ],
        "seeking": [
            "internship",
            "Job"
        ],
        "__v": 0,
        "bio": "I am a prompt engineer with 5 year of experience",
        "githubURL": "https://github.com/user",
        "linkedinURL": "https://www.linkedin.com/in/user/",
        "location": "userlocation",
        "twitterURL": "https://twitter.com/user",
        "websiteURL": "https://user.github.io/"
    }]
 */
const getListOfProfiles = async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await User.find({}, { password: 0 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/searchusers:
 *   get:
 *     summary: Search profiles based on parameters
 *     description: Returns a list of profiles based on provided parameters.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name to search for
 *       - in: query
 *         name: techStack
 *         schema:
 *           type: string
 *         description: Tech stack to search for
 *       - in: query
 *         name: bio
 *         schema:
 *           type: string
 *         description: Bio to search for
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example: [{
        "_id": "655b7b1909059c33f7b3a1d9ace",
        "name": "john",
        "email": "john@gmail.com",
        "techStack": [
            "javascript",
            "HTML",
            "CSS",
            "python",
            "java",
            "PHP"
        ],
        "fieldOfInterest": [
            "Web developer",
            "security"
        ],
        "seeking": [
            "internship",
            "Job"
        ],
        "__v": 0,
        "bio": "I am a prompt engineer with 5 year of experience",
        "githubURL": "https://github.com/user",
        "linkedinURL": "https://www.linkedin.com/in/user/",
        "location": "userlocation",
        "twitterURL": "https://twitter.com/user",
        "websiteURL": "https://user.github.io/"
    }]
 */
const searchProfiles = async (req, res) => {
  try {
    const { name, techStack, bio } = req.query;

    // Build a query object based on provided parameters
    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (techStack) query.techStack = new RegExp(techStack, 'i');
    if (bio) query.bio = new RegExp(bio, 'i');

    // Fetch profiles based on the query
    const profiles = await User.find(query, { password: 0 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/updateusers:
 *   put:
 *     summary: Update the profile of the logged-in user
 *     description: Updates the profile data of the logged-in user.
 *     security:
 *       - bearerAuth: []
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
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example: 
 *               {
 *                 "name": "John Doe",
 *                 "techStack": ["Node.js", "React"],
 *                 "bio": "Software Developer"
 *               }
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example: {"message": "Validation Error", "errors": {"name": "Name is required"}}
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example: {"message": "Internal Server Error"}
 */
const editProfile = async (req, res) => {
  try {
    const { _id } = req.user; // Assuming you attach user information in the request object

    // Validate and update profile data
    const updatedProfile = await User.findByIdAndUpdate(_id, { $set: req.body }, { new: true, runValidators: true });

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation Error', errors: error.errors });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { getListOfProfiles, searchProfiles, editProfile };

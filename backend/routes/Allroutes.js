const AllRoutes=require('express').Router()

const {getListOfProfiles,searchProfiles,editProfile} =require("../controllers/ReqUserFeatures");

const { registerUser, loginUser, editUserProfile, deleteUserAccount, logoutUser } =require("../controllers/StretchGoals");
const verifyUserMiddleware=require("../middleware/verifyUser")

// require functionalities
// working
AllRoutes.get('/getusers',getListOfProfiles);
// working
AllRoutes.get('/searchusers/',searchProfiles);

AllRoutes.put('/updateusers',editProfile);
// Stretch goals
// working
AllRoutes.post('/user/register',registerUser);
// working
AllRoutes.post('/user/login',loginUser);
// protected routes

AllRoutes.use(verifyUserMiddleware)

// working
AllRoutes.put('/user/editprofile/:userId', editUserProfile);
// working
AllRoutes.delete('/user/deleteprofile/:userId' ,deleteUserAccount);

AllRoutes.get('/user/logout' ,logoutUser);



module.exports=AllRoutes
const express=require("express");
const router=express.Router();
const {getMovieTheme}=require("../controllers/controller");
const {getbook,searchBooks}=require("../controllers/bookcontrol")
const {astros}=require("../controllers/astro")
//const authRoutes=require("../authentication/auth")
const {Login,Signup}=require("../authentication/auth")

router.get("/login",Login);
router.get("/signup",Signup);
router.get("/books",getbook);
router.get("/movie",getMovieTheme);
router.get("/books/search",searchBooks)
router.get("/space",astros)


module.exports=router;
const { Router } = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

//USERS

router.post("/sign-in", middlewares.validations.signIn, controllers.api.signIn);

router.post("/sign-up", middlewares.validations.signUp, controllers.api.signUp);

router.get("/logout", controllers.api.logOut);

router.delete("/remove/:id", controllers.api.deleteUser);

//MESSAGES

router.post("/create", controllers.api.create);

router.post("/chat", controllers.api.chat);

module.exports = router;

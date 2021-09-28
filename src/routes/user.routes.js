const { Router } = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

router.get(
  "/sign-in",
  middlewares.validations.IsLogged,
  controllers.user.signIn
);

router.get(
  "/sign-up",
  middlewares.validations.IsLogged,
  controllers.user.signUp
);

router.get("/users", controllers.user.users);

module.exports = router;

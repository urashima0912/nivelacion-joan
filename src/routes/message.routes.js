const { Router } = require("express");
const controllers = require("../controllers");

const router = Router();

router.post("/create", controllers.message.create);

router.get("/chat", controllers.message.chat);

router.get("/toChat/:userOneId/:userTwoId", controllers.api.toChat);

module.exports = router;

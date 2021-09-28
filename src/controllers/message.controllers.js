const models = require("../models");
const api = require("./api.controllers");
const services = require("../services");

const create = (req, res) => {
  // let errorMessage;
  // if (req.session.errorMessage) {
  // 	errorMessage = req.session.errorMessage;
  // 	delete req.session['errorMessage'];
  // }
  // res.render('messages.pug', { title: 'Messages', errorMessage });
  res.json({ message: "message created" });
};

const chat = async (req, res) => {
  try {
    const { userOneId, userTwoId } = req.session;
    console.log({ userOneId, userTwoId });
    const result = await services.message.chat(userOneId, userTwoId);
    res.json({ userOneId, userTwoId, result });
  } catch (err) {
    console.log({ err });
    return res.json({ err });
  }
};

module.exports = {
  create,
  chat,
};

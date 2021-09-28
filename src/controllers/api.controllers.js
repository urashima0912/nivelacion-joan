const models = require("../models");
const services = require("../services");

// USERS

const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await models.user.findOne({ username });
  if (!user) {
    req.session.errorMessage = "El usuario no existe";
    return res.redirect("/pages/user/sign-in");
  }

  const isValid = await models.user.compare(password, user.password);
  if (!isValid) {
    req.session.errorMessage = "La constraseña es incorrecta";
    return res.redirect("/pages/user/sign-in");
  }
  req.session.user = user;
  res.redirect("/pages/user/users");
};

const signUp = async (req, res) => {
  const { username, password1, password2 } = req.body;

  try {
    const existUser = await models.user.findOne({ username });
    // console.log(existUser)
    if (existUser !== null) {
      req.session.errorMessage = "Usuario ya registrado";
      return res.redirect("/pages/user/sign-up");
    }
    const hash = await models.user.encrypt(password1);
    const user = models.user({ username, password: hash });
    await user.save();
  } catch (err) {
    return res.redirect("/pages/user/sign-up");
  }
  return res.redirect("/pages/user/sign-in");
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/pages/user/sign-in");
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await models.user.deleteOne({ _id: id });

  res.json({ message: "user deleted" });
};

//MESSAGES

const create = async (req, res) => {
  try {
    const { userOneId, userTwoId, userOwnerId, text } = req.body;

    if (text.length === 0) {
      return res.json({ err: "mensage vacio" });
    }

    const userOne = await models.user.findById(userOneId);
    if (!userOne) {
      return res.json({ err: "UserOne no existe" });
    }

    const userTwo = await models.user.findById(userTwoId);
    if (!userTwo) {
      return res.json({ err: "UserTwo no existe" });
    }

    const userOwner = await models.user.findById(userOwnerId);
    if (!userOwner) {
      return res.json({ err: "UserOwner no existe" });
    }

    let message = null;

    const messages = await models.message.find({
      userOne: userTwo,
      userTwo: userOne,
    });
    if (messages.length === 0) {
      message = await models.message.create({
        userOne,
        userTwo,
        userOwner,
        text,
      });
    } else {
      message = await models.message.create({
        userOne: userTwo,
        userTwo: userOne,
        userOwner,
        text,
      });
    }

    return res.json({ message });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};

const chat = async (req, res) => {
  try {
    const { userOneId, userTwoId } = req.body;
    const result = await services.message.chat(userOneId, userTwoId);
    return res.json({ messages: result });
  } catch (err) {
    return res.json({ err });
  }
};

const toChat = (req, res) => {
  const { userOneId, userTwoId } = req.params;

  req.session.userOneId = userOneId;
  req.session.userTwoId = userTwoId;
  return res.redirect("/pages/message/chat");
};

module.exports = {
  signIn,
  signUp,
  logOut,
  deleteUser,
  create,
  chat,
  toChat,
};

const models = require("../models");

const chat = async (userOneId, userTwoId) => {
  const userOne = await models.user.findById(userOneId);
  if (!userOne) {
    throw Error("El userOne no existe");
  }

  const userTwo = await models.user.findById(userTwoId);
  if (!userTwo) {
    throw Error("El userTwo no existe");
  }

  let result = [];

  const userList1 = await models.message.find({
    userOne: userOne,
    userTwo: userTwo,
  });
  if (userList1.length === 0) {
    const usersList2 = await models.message.find({
      userOne: userTwo,
      userTwo: userOne,
    });

    if (usersList2.length !== 0) {
      result = usersList2;
    }
  } else {
    result = userList1;
  }

  return result;
};

module.exports = {
  chat,
};

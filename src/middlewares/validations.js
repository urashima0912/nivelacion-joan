const signUp = (req, res, next) => {
  const { username, password1, password2 } = req.body;

  if (!username && !password1 && !password2) {
    errorMessage = "Campos vacios";
    return res.redirect("/pages/user/sign-up");
  }

  if (password1 !== password2) {
    errorMessage = "Passwords no coinciden";
    return res.redirect("/pages/user/sign-up");
  }

  next();
};

const signIn = (req, res, next) => {
  const { username, password } = req.body;

  if (!username && !password) {
    errorMessage = "Campos vacios";
    return res.redirect("/pages/user/sign-in");
  }

  next();
};

const IsLogged = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/pages/user/users");
  }
  next();
};

module.exports = {
  signUp,
  signIn,
  IsLogged,
};

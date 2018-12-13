import passport from "passport";
import mongoose from "mongoose"
import Users from '../models/Users'

var User = mongoose.model('Users')

export const CreateUser = (req, res) => {
  const { user } = req.body;
  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);
  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() })).catch(err => {
      return res.status(422).json({
        err: err,
        message: 'Username already in use'
      });
    });
};

//POST login route (optional, everyone has access)
export const Login = (req, res) => {
  const { user } = req.body;
  if (!user.username) {
    return res.status(422).json({
      err:  "username is required"
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: "Password is required"
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        console.log(err)
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return status(400).info;
    }
  )(req, res);
};

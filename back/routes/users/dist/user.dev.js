"use strict";

var express = require("express");

var session = require("../session");

var _require = require("../../public/models/user"),
    User = _require.User;

var _require2 = require("./middleware/auth"),
    auth = _require2.auth;

var router = express.Router();
router.use(session);
router.post("/register", function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    console.log('err', err);
    if (err) return res.json({
      success: false,
      errMsg: "중복된 아이디 입니다."
    });
    return res.status(200).json({
      success: true
    });
  });
}); // User.comparePassword = function (plainPassword, cb) {
//   //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
//   bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
//     console.log(plainPassword,'@@@', this.password)
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };
// 로그인

router.post("/login", function (req, res) {
  User.findOne({
    id: req.body.id
  }, function (err, user) {
    if (!user) return res.json({
      loginSuccess: false,
      message: "Auth failed, id not found"
    });
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) return res.json({
        loginSuccess: false,
        message: "Wrong password"
      });
      user.generateToken(function (err, user) {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        });
        req.session.loginde = true;
        req.session.user_id = req.body.id;
        req.session.save();
        console.log("로그인 완료");
      });
    });
  });
}); // 로그아웃

router.get("/logout", auth, function (req, res) {
  User.findOneAndUpdate({
    _id: req.user._id
  }, {
    token: "",
    tokenExp: ""
  }, function (err, doc) {
    if (err) return res.json({
      success: false,
      err: err
    });
    req.session.destroy();
    return res.status(200).send({
      success: true
    });
  });
});
router.get("/auth", auth, function (req, res) {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    id: req.user.id,
    nickname: req.user.nickname // role: req.user.role,
    // image: req.user.image,

  });
});
module.exports = router;
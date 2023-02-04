const User = require("../models/user")
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.index = (req, res, next) => {
    // res.send('hello world');
    res.status(200).json({
      fullname: 'Sanmook Nantasukon'
    })
}

exports.bio = (req, res, next) => {
    // res.send('hello world');
    res.status(200).json({
      fullname: 'Sanmook Nantasukon',
      nickname: "mook",
      hobby: "sleep",
      gitusername: "arabbitategrass"
    })
}

exports.register = async(req, res, next) => {
  try{
      const {name,email,password} = req.body

      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }

      const existEmail = await User.findOne({ email:email })
      if(existEmail){
        const error =  new Error("อีเมลล์นี้มีผู้ใช้งานในระบบแล้ว")
        error.statusCode = 400
        throw error;
      }

      let user = new User();
      user.name = name
      user.email = email
      user.password = await user.encryptPassword(password)

      await user.save()

      res.status(201).json({
        message: 'ลงทะเบียนเรียบร้อยแล้ว'
      })
  }catch(error){
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    // check email isExist
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    // token
    const token = await jwt.sign(
      {
        id: user._id
      },
      config.JWT_SECRET,
      {
        expiresIn: "5 days",
      }
    );

    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  const { role, name, email } = req.user;
  return res
    .status(200)
    .json({ data: { name: name, email: email, role: role } });
};

// module.exports = { index, bio, register, login, profile };

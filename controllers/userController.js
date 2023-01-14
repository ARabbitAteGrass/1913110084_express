const User = require("../models/user")

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


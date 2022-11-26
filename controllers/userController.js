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


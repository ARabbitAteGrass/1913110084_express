const { ObjectId } = require("bson");
const staff = require("../models/staff");
const { validationResult } = require("express-validator");

const get = async (req, res, next) => {
  const staffResult = await staff.find().sort({ _id: "desc" });
  return res.status(200).json({ data: staffResult });
};

const post = async (req, res, next) => {
  try{
    const { name, salary, photo } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let staffinsert = staff({
      name: name,
      salary: salary,
      photo: await saveImageToDisk(photo),
    });
    const result = await staffinsert.save();
    return res
      .status(200)
      .json({ message: 'Insert Successful: $(result != null)' });
  }catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const staffResult = await staff.findOne({ _id: new ObjectId(id) });
    if (!staffResult) {
        const error =  new Error("No Staff delete")
        error.statusCode = 405
        next(error);
    }
    return res.status(200).json({ data: staffResult });
  } catch (e) {
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const staffResult = await staff.deleteOne({ _id: new ObjectId(id) });
    if (!staffResult.deletedCount) {
        const error =  new Error("No Staff delete")
        error.statusCode = 405
        next(error);
    }
    return res.status(200).json({ data: staffResult });
  } catch (e) {
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, salary } = req.body;

     // validation
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
       error.statusCode = 422;
       error.validation = errors.array();
       throw error;
     }

    const staffupdate = await staff.updateOne(
      { _id: new ObjectId(id) },
      { name: name, salary: salary }
    );
    if (!staffupdate.modifiedCount) {
        const error =  new Error("No Staff was modified")
        error.statusCode = 405
        next(error);
    }
    return res.status(200).json({ message: "Update Successful" });
  } catch (e) {
        const error =  new Error(`Error: ${e.message}`)
        error.statusCode = 404
        next(error);
  }
};

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = process.cwd();
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4.v4()}.svg`;
  } else {
    filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath + filename, image.data, "base64");
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}

module.exports = {
  staff: get,
  insert: post,
  show: show,
  remove: remove,
  update: update,
};
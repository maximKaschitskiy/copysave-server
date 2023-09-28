const multer = require("multer")
const path = require("path")
const fs = require("fs")
const nanoid = require("shortid")

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, path.basename(file.originalname, path.extname(file.originalname)) + '_' + nanoid() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
//   fileFilter: fileFilter,
});

// если содержит текст, направлять на валидацию ссылки, потом скачивать
// 1 убедиться, что файл сохранен и вернуть путь во фронт
// добавить файлфильтер
// доработать механизм временной папки (детекстить путь текущего проекта)
// внедрить бэк в панель
// отправлять с фронта путь проекта

const getData = (req, res, next) => {
  upload.fields([
    { name: "files" },
    { name: "text" }
  ])(req, res, (err) => {
    if (err) {
      console.log(err)
    }
    // if (req.files) {
      // console.log(req.files)
    // }
    // if (req.text) {
      // console.log(req.text)
    // }
    return next()
  })
}

module.exports = {
  getData,
}
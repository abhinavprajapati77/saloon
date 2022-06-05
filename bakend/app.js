const express = require("express");
const router = require("./Router/router");
const app = express();
const cors = require("cors");
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const upload = require("./imageuploader");
const path = require("path");

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extends: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.single("image"))
// app.use(upload.single("imageUrl"))
// inside public directory.
// console.log("----------path-=", path.join(__dirname, "upload/images"));

app.use(express.static(path.join(__dirname, "upload/images")));
// app.use('/upload/images', express.static('images'))
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
    "Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin",
    "*"
  );
  next();
});

// app.use(bodyParser);
app.use(router);

const PORT = 5000;

// app.use(require("./Router/router"));

sequelize
  .sync()
  .then((result) => {
    // console.log("-----------database successfully get it");
    // console.log("------result", result)
    app.listen(PORT, () => {
      console.log(`the post is listning on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("-----err appjs sequlize", err);
  });

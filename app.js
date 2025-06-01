// const http = require("http");
// server = http.createServer((req, res) => {
//   console.log(req.url);
//   if (req.url === "/") {
//     console.log("Home Page");
//     res.end("Home Page");
//   }
//    else {
//     console.log("Missing Page");
//     res.end("Missing Page");
//   }
// });
// server.listen(3000);

const express = require("express");
const morgan = require("morgan");
const userModel = require("./models/user");
const dbConnection = require("./config/db");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   console.log("Global Middleware Passed");
//   next();
// }); //runs before every route

app.get(
  "/",
  // (req, res, next) => {
  //   console.log("Home route Middleware");
  //   return next();
  // },
  (req, res) => {
    res.render("index");
    // console.log("Home");
  }
);

app.get("/about", (req, res) => {
  res.send("About Page");
  console.log(req.url);
});

app.get("/profile", (req, res) => {
  res.send("Profile Page");
  console.log(req.url);
});

app.post("/get-form-data", (req, res) => {
  console.log(req.body);
  res.end("Form Submitted");
});

app.get("/register", (req, res) => {
  //to render form
  res.render("register");
});
app.post("/register", async (req, res) => {
  //to get data of user
  const { Username, Email, Password } = req.body;
  const newUser = await userModel.create({
    username: Username,
    email: Email,
    password: Password,
  });
  res.send(newUser);
  console.log(req.body);
});

app.get("/get-user", (req, res) => {
  userModel
    .findOne({
      username: "a",
    })
    .then((users) => {
      res.send(users);
    });
});

app.get("/update-user", async (req, res) => {
  await userModel.findOneAndUpdate(
    {
      username: "a",
    },
    {
      email: "a@gmail.com",
    }
  );
  res.send("User Updated");
});

app.get("/delete-user", async (req, res) => {
  const deleted = await userModel.findOneAndDelete({
    username: "a",
  });
  res.send(deleted);
});

app.listen(3000);

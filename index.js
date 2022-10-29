const express = require("express");
const app = express();
const port = 7006;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.set("view engine", "ejs");

//app.get("/", (req, res) => {
//  res.send("HII WELCOME TO APPLE!");
//});

app.get("/signin", (req, res) => {
  res.render("signin");
});



app.get("/signinsubmit", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;  
  db.collection('users')
    .where("email", "==", email)
    res.render("web")
    .where("password", "==", password)
    res.render("web")
    .get()

    .then((docs) => {
      if (docs.size > 0) {
        res.render("web");
      }
      else {
        res.send("<h1>Login failed ,incorrect login credentials</h1>");
      }
    });
});

app.get("/signupsubmit", (req, res) => {
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  const email = req.query.email;
  const password = req.query.password;
  db.collection('users')
    .add({
      name: firstname + lastname,
      email: email,
      password: password,
    })
    .then(() => {
      res.render("signin");
    });
});


app.get("/navsubmit", (req, res) => {
    res.render("signin")
});

app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/web", (req, res) => {
  res.render("web");
});

app.use(express.static("images"));
app.use(express.static("images2"));
app.use(express.static("bootstrap/bootstrap-5.2.0-beta1-dist"));

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "views/index.ejs"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

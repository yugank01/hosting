const express = require("express");
const path = require("path");
const bodyParser=require("body-parser")
const fs = require('fs');
const app = express();
const port = 80;

app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));



// THIS IS USED FOR PUG FILES INCLUSION IN EXPRESS
// app.set('view engine', 'pug')
// app.set('views', path.join(__dirname, 'views'))

// app.get('/', (req, res)=>{
//     // const con = "This is the best Dance Academy to broaden up your skills."
//     // const params = {'title': 'Dance Academy', 'content': con}
//     res.status(200).render('index.pug')
// })

// THIS IS USED FOR HTML FILES INCLUSION IN EXPRESS
app.get("/", (req, res) => {
 
  res.sendFile(path.join(__dirname, "./index.html"));
  // res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
  // res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/contact.html"));

});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));

});

app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/services.html"));

});

app.post('/contact',function (req, res) {
  let name=req.body.name;
  let phone=req.body.phone;
  let email=req.body.email;
  let address=req.body.address;
  let desc=req.body.desc;
  let js=[name,phone,email,address,desc]
  const jsonString = JSON.stringify(js);

  fs.appendFile('./input.txt', jsonString, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Text successfully written to file.');
    }
  });
  console.log(js)

    return res.send('Input saved successfully');
})

app.listen(port, () => {
  console.log(`This application started successfully on port localhost:${port}`);
});

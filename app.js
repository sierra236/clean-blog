const express = require("express");
const mongoose = require('mongoose');
const ejs= require('ejs');
const path = require('path');
const Post = require("./models/Post");

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts
  });
});
app.get("/posts/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id);
  res.render('post', {
    posts
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.post('/blog', async (req, res) => {
  await Post.create(req.body)
  res.redirect('/')
  });
  
  

const port = 2500;
app.listen(port, () => {
  console.log(`Server is started on port ${port} `);
});

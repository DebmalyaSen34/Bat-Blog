const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./dbConfig');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBlogPosts (){
    return result = await itemsPool.query('SELECT * FROM blogposts');
}

async function getBlogPostsById (id) {
    return result = await itemsPool.query('SELECT * FROM blogposts WHERE id = $1', [id]);
}

async function NewBlog (title, sub_title, sub_content, content){
    await itemsPool.query('INSERT INTO blogposts (title, sub_title, sub_content, content) VALUES ($1, $2, $3, $4)', [title, sub_title, sub_content, content]);
}


app.get('/', async (req, res) => {
    const posts = await getBlogPosts();
    res.render('index.ejs', {articleData: posts.rows});
});

app.get("/yourBlog/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const specificPost = (await getBlogPostsById(id)).rows;
    res.render('yourBlog.ejs', {articleData: specificPost[0]});
});

app.get("/newblog", (req, res) => {
    res.render("newBlog.ejs");
});

app.post("/submit", (req, res) => {
    let blogTitle = req.body["title"];
    let blogSubTitle = req.body["subtitle"];
    let blogSummary = req.body["summary"];
    let blogContent = req.body["content-area"];

    NewBlog(blogTitle, blogSubTitle, blogSummary, blogContent);
    res.redirect('/');

});

app.listen(5070, () => {
    console.log("Server running on port 5070");
});
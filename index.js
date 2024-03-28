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
    return result = await itemsPool.query('SELECT * FROM blogposts ORDER BY id DESC');
}

async function getBlogPostsById (id) {
    return result = await itemsPool.query('SELECT * FROM blogposts WHERE id = $1', [id]);
}

async function NewBlog (title, sub_title, sub_content, content){
    await itemsPool.query('INSERT INTO blogposts (title, sub_title, sub_content, content) VALUES ($1, $2, $3, $4)', [title, sub_title, sub_content, content]);
}

async function deleteBlog (id){
    await itemsPool.query('DELETE FROM blogposts WHERE id = $1', [id]);
}

async function register(fullname, username, password){
    await itemsPool.query('INSERT INTO registerUsers (full_name, user_name, password) values ($1, $2, $3)', [fullname, username, password]);
}

function checkForApostrophe (content){
    return content.replace(/'/g, "\''");
}


app.get('/', async (req, res) => {
    const posts = await getBlogPosts();
    res.render('index.ejs', {articleData: posts.rows});
});

app.get("/yourBlog/:id", async (req, res) => {
    const id = req.params.id;
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

app.post("/del/:id", (req,res) => {
    const id = req.params.id;
    deleteBlog(id);
    res.redirect('/');
});

app.get('/profile', (req, res) => {
    res.render('profile.ejs');
});

app.post('/registerSelf', async (req, res) => {
    console.log(req.body);
    const fullName = req.body.fullName;
    const username = req.body.username;
    const password = req.body.password;

    register(fullName, username, password);
    res.redirect('/');
});

app.listen(5070, () => {
    console.log("Server running on port 5070");
});
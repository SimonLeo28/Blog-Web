import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true }));

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.get("/createBlog" , (req,res) => {
    res.render("blogCreate.ejs");
});

app.get("/home" , (req,res) => {
    res.render("index.ejs");
});

app.get("/blogs" , (req,res) => {
    res.render("blogs.ejs");
});

app.post("/submit" , (req,res) => {
    const titl = req.body["title"];
    const cont = req.body["content"];
    res.render("blogs.ejs" , {title : titl , content : cont});
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});

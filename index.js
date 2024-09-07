import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Blog_Database",
    password: "$Simon12345",
    port: 5432,
  });
  db.connect();

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

app.get("/blogs" , async (req,res) => {
    const result = await db.query("SELECT * FROM blogs ORDER BY id ASC");
        const blogs = result.rows;
        res.render("blogs.ejs" , {blogs: blogs});
});

app.post("/submit" , async (req,res) => {
    const titl = req.body["title"];
    const cont = req.body["content"];
    try {
        await db.query("INSERT INTO blogs (title , content) VALUES ($1,$2)",[titl,cont]);
        const result = await db.query("SELECT * FROM blogs");
        const blogs = result.rows;
        res.render("blogs.ejs" , { blogs : blogs }); 
        
        
    } catch(err) {
        console.log(err);        
    }
});

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
});

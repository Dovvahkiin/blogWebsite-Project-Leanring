// requiring our modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

//declaration of app variables
const app = express();
const port = 1250;

const aboutContent = "Dovvahkiin, Greybeards from High Hrothgar are calling you!"
const contactContent = "If you are smart, you will find the way to contact me!"

    


app.set('view engine','ejs'); // setting view engine to embedded javascript (ejs)

app.use(bodyParser.urlencoded({extended:true})); // setting body-parser
app.use(express.static("public")); // using express static files from folder "public"


let posts = [];

app.get('/', function(req, res)
{
    res.render("home", {postovine:posts});
});

app.get('/about', function(req, res)
{
    res.render("about", {aboutContentEjs:aboutContent});
});

app.get('/contact', function(req, res)
{
    res.render("contact", {contactContentEjs:contactContent});
});

app.get('/compose', function(req, res)
{
    res.render("compose", {});
});

app.post("/compose", function(req,res)
{
    let naslov = req.body.postTitle;
    let tekst = req.body.postText;

    let blogPostInfo =
    {
        title: naslov,
        text: tekst
    }

    posts.push(blogPostInfo);

    res.redirect("/");
})

app.get("/posts/:postName", function(req,res)
{
    parameterName = _.lowerCase(req.params.postName);

    posts.forEach(function(postNumber)
        {
            postFixedTitle = _.lowerCase(postNumber.title);
            if(postFixedTitle === parameterName)
            {
                res.render("post", {
                    postSeparateTitle: postNumber.title,
                    postSeparateText: postNumber.text
                });
            }
        }       
    )
})


app.listen(port, function(req,res)
{
    console.log(`Server is running on port: ${port}!`);
});
// requiring our modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');


//Set up default mongoose connection string localy
const connectionString = 'mongodb://localhost:27017/BlogPost';
mongoose.connect(connectionString); //connect and create a new database or use if it exists


//declaration of app variables
const app = express();
const port = 1250;

app.set('view engine','ejs'); // setting view engine to embedded javascript (ejs)
app.use(bodyParser.urlencoded({extended:true})); // setting body-parser
app.use(express.static("public")); // using express static files from folder "public"


const aboutContent = "Dovvahkiin, Greybeards from High Hrothgar are calling you!"
const contactContent = "If you are smart, you will find the way to contact me!"

let posts = [];

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postMessage: {
        type: String,
        required: true
    }
});

const PostModel = mongoose.model("post",postSchema);


app.get('/home', async function(req, res)
{
    const getData = await PostModel.find({});

    res.render("home",{postovine:getData})

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


app.post("/compose", async (req,res)=>
{
    let naslov = req.body.postTitle;
    let tekst = req.body.postText;
    const newPost = new PostModel({
        title: naslov,
        postMessage: tekst
    });
    try
    {
        await newPost.save();
        res.redirect("/home");
    }
    catch(err){
        console.log(err);
    }
}

)
 
app.get("/posts/:id", async function(req,res)
{
    postId = req.params.id;
    
    try
    {
        const getData = await PostModel.findById(postId);
        res.render("post",{
            postSeparateTitle:getData.title,
            postSeparateText:getData.postMessage
        })
    }
    catch(err)
    {
        console.log(err)
    }

/*     getData.forEach(function(postNumber)
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
    ) */
})


app.listen(port, function(req,res)
{
    console.log(`Server is running on port: ${port}!`);
});
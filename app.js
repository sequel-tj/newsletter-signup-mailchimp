const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (request, response)=>{
    response.sendFile(__dirname + "/signup.html");
});

app.post("/", (request, response)=>{
    let fname = request.body.fname;
    let lname = request.body.lname;
    let email = request.body.email;


    var test = {
        url: "https://us8.api.mailchimp.com/3.0/ping"
    }

    console.log(response.statusCode);
});

app.listen(3000, ()=>{
    console.log("server running on port:3000");
});

// api-key -> d2591416a2ccec6cfae4dbcf4a24e220-us8
// list-id -> e791a46e73

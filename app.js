const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// api-key -> d2591416a2ccec6cfae4dbcf4a24e220-us8
// list-id -> e791a46e73
client.setConfig({
  apiKey: "d2591416a2ccec6cfae4dbcf4a24e220-us8",
  server: "us8",
});


app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", async(req, res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    const response = await client.lists.addListMember("e791a46e73", {
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: fname,
              LNAME: lname,
              // BIRTHDAY: "01/22",
              // ADDRESS: {
              //     addr1: "123 Freddie Ave",
              //     city: "Atlanta",
              //     state: "GA",
              //     zip: "12345",
              // },
          },
      }
      // {
      //     skipMergeValidation: false
      // }
  );
  // console.log(res.statusCode);

  // request(response, function(ERROR, RESPONSE, BODY){
  //     if(ERROR || RESPONSE.status === 404) {
  //         res.sendFile(__dirname + "/failure.html");
  //     } else {
          if (res.statusCode === 200) {
              res.sendFile(__dirname + "/success.html");
          }
          else {
              res.sendFile(__dirname + "/failure.html");
          }
  //     }
  // });

});

app.post("/failure", (req, res)=>{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server running on port:3000");
});

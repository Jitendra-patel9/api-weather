const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const cityName=req.body.cityName;
  const apikey="0a73e7343581d49757838e0839116da0";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+unit+"&appid="+apikey+"";
  https.get(url,function(response){  //here making get request to openweather website and appid is key you will find it in open weather website.
    response.on("data",function(data){
      const weatherData=JSON.parse(data); //here we are converting hexadecimal data to readable data.
      const temp=weatherData.main.temp;  // fetching temperature from weatherData object.
      const descrip=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>weather in "+cityName+" is "+descrip+" </p>");
      res.write("<h1>the temperature is "+temp+" </h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  });
})



app.listen(3000,function(){
  console.log("your server is started!");
})

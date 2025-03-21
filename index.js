const express = require('express');
const { resolve } = require('path');
const userSchema = require('./schema')

const mongoose=require("mongoose");
const env=require("dotenv").config();

const app = express();
const port = 3010;




const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log('Connected to database');
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
  }
};

connectDB();

app.use(express.json());

app.post('/api/users',async (req,res)=>{
  try{
  const schema = new userSchema(req.body);
  const savedUser = await schema.save();
  res.status(201).send({msg:'user created ',data:savedUser})
}catch(err){
  res.status(500).send({msg:'something went wrong',err})
}


})


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

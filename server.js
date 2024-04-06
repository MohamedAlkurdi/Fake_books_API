const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/project_database";
const Book = require('./models/book_model');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/books',async (req,res)=>{
  try{
    const book = await Book.create(req.body);
    res.status(200).json(book)
  }catch(err){
    console.log(err.message);
    res.status(500).json({message:err.message});
  }
})

app.get('/books',async(req,res)=>{
  try{
    const books = await Book.find({});
    res.status(200).json(books)
  }catch(err){
    console.log(err.message);
    res.status(500).json({message:err.message});
  }
})

app.get('/books/:id',async(req,res)=>{
  try{
    const {id} = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book)
  }catch(err){
    console.log(err.message);
    res.status(500).json({message:err.message});
  }
})

app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: `${id} was not found` });
    }
    res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ message: `${id} was not found` });
    }
    res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// connectiong the database 
mongoose.connect(URI,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  family: 4,
})
.then(()=>{
  console.log("baglama basarili ");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch(error=>{console.log(error)});
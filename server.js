const express = require("express");
const app = express();
const booksRouter = require('./routes/books');


app.use(express.json());
app.use('/books',booksRouter);

app.use((err,req,res,next) =>{
    res.status(err.status || 500).json({error:err.massage || "Internal Server Error"});
});

const PORT = 3000;
app.listen(PORT,() =>  console.log(`Server running on port ${PORT}`))
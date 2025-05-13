const express = require('express');
const router = express.Router();

let books = [];
let idCounter = 1;

// GET /books?page=1&limit=10
router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json({
    message:"Books fetched successfully",
    total: books.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: books.slice(start, end)
  });
});

// GET /books/:id
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) 
    return res.status(400).json({ error: 'Book not found' });
  res.json({message : "Book retrieved Successfully ",book});
});

// POST /books
router.post('/', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });

  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(200).json({message : "Successfully added book",book:newBook});
});

// PUT /books/:id
router.put('/:id', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });

  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(400).json({ error: 'Book not found' });

  books[index] = { id: parseInt(req.params.id), title, author };
  res.json({message : "Successfully updated book",book:books[index]});
});

// DELETE /books/:id
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(400).json({ error: 'Book not found' });

  const removed = books.splice(index, 1);
  res.json({message : "Successfully deleted book", book : removed[0]});
});

module.exports = router;
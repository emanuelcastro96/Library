const express = require('express');
const books = require('C:/Projects/node-proj/library/testData/testData');

function router(nav) {
  const bookRouter = express.Router();

  // Books search
  bookRouter.route('/')
    .get((req, res) => {
      res.render('books', { title: 'Library', nav, books });
    });

  // Single book search
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const book = books[id];

      res.render('book', { title: 'Library', nav, book });
    });

  return bookRouter;
}

module.exports = router;

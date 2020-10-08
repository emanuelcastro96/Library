const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRouter');

function router(nav) {
  const bookRouter = express.Router();

  // Books search
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('SELECT * FROM books');

        res.render('books', {
          title: 'Library',
          nav,
          books: recordset
        });
      }());
    });

  // Single book search
  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();

        const { recordset } = await request
          .input('id', sql.Int, id)
          .query('SELECT * FROM books WHERE id=@id');

        res.render('book', {
          title: 'Library',
          nav,
          book: recordset[0]
        });
      }());
    });

  return bookRouter;
}

module.exports = router;

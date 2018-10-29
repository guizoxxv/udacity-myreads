import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  updateBookLocation = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.componentDidMount())
  }

  getMyBooksIds = () => {
    let booksIds = []

    Object.entries(this.state.books).forEach(([key, value]) => {
      booksIds.push(value.id);
    });

    return booksIds
  }

  render() {
    const bookshelf_array = ['Want to Read', 'Currently Reading', 'Read']

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks onUpdateBookLocation={this.updateBookLocation} myBooks={this.state.books} myBooksIds={this.getMyBooksIds()} />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookshelf_array.map((shelf) => (
                  <Bookshelf key={shelf} title={shelf} books={this.state.books} onUpdateBookLocation={this.updateBookLocation} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search">
                Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    if(query === '' || query === undefined) {
      this.setState({ books: [] })
    } else {
      BooksAPI.search(query, 20).then((searchBooks) => {
        if(searchBooks.error !== 'empty query') {
          searchBooks.map((searchBook) => {
            return searchBook.shelf = this.getBookLocation(searchBook)
          })

          this.setState({ books: searchBooks })
        }
      })
    }
  }

  getBookLocation = (searchBook) => {
    if(this.props.myBooksIds.indexOf(searchBook.id) > -1) {
      let foundBook = this.props.myBooks.filter((myBook) => myBook.id === searchBook.id)

      return foundBook[0].shelf
    } else {
      return 'none'
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 && this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookLocation={this.props.onUpdateBookLocation}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
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
      BooksAPI.search(query, 20).then((books) => {
        if(books !== undefined) {
          this.setState({ books: books })
        }
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        {console.log(this.state.books)}
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
                {console.log(this.props.myBooks.indexOf(book.id) > -1)}
                {console.log(book.shelf)}
                <Book
                  book={book}
                  onUpdateBookLocation={this.props.onUpdateBookLocation}
                  selectedShelf={this.props.myBooks.indexOf(book.id) > -1 ? book.shelf : 'none'}
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
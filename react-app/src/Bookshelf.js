import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  toCamelCase = (str) => {
    let string = str.split(' ').map((word, index) => {
      if(index === 0) { return word.toLowerCase(); }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');

    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  filterShelfBooks = (bookshelf, books) => {
    return books.filter((book) => book.shelf === this.toCamelCase(this.props.title))
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.filterShelfBooks(this.toCamelCase(this.props.title), this.props.books).map((book) => (
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

export default Bookshelf
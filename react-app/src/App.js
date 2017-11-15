import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
      
      // console.log(this.state.books)
      // let targetIndex = this.state.books.findIndex((book) => book.title === 'React')
      // console.log(targetIndex)
      // books[targetIndex].title = 'Opa!'
      // console.log(books)
    })
  }

  updateBookLocation = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.componentDidMount())
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                className="close-search"
                to="/">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don&#39;t worry if
                  you don&#39;t find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Want to Read" books={this.state.books} onUpdateBookLocation={this.updateBookLocation} />
                <Bookshelf title="Currently Reading" books={this.state.books} onUpdateBookLocation={this.updateBookLocation} />
                <Bookshelf title="Read" books={this.state.books} onUpdateBookLocation={this.updateBookLocation} />
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

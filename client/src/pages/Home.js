import React, { Component } from "react";
import marvel from "../utils/marvel-api";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import ComicCards from "../components/ComicCards";
import API from "../utils/login-api";
import favoritesApi from "../utils/favorites-api";
import contextStore from "../utils/contextStore";

class Home extends Component {
  state = {
    order: "ascending",
    searchString: "",
    sortedComics: []
  };

  handleSearch = e => {

    e.preventDefault();
    marvel.getComics(this.state.searchString, (err, APIresults) => {
      console.log(APIresults);
      this.setState({ ...this.state, sortedComics: APIresults });
    });
  };

  handleChange = e => this.setState({ searchString: e.target.value });

  handleAddButtonClick = e => {
    e.preventDefault();

    const comicid = e.target.getAttribute("comicid");
    const addedComic = this.state.sortedComics.find(comic => comic.id.toString() === comicid);
    favoritesApi.addFavoriteComic(addedComic, (err, response) => {
      console.log(response);
    })

  };

  componentDidMount() {
    return API.isLoggedIn
  }

  render() {
    return (
      <contextStore.Consumer>
             
        {props => (
           <div>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <h5 className="center-align" style={{ marginTop: "35px" }}>
                    Search by keyword and click <p className="btn-floating waves-effect waves-light blue"><i className="material-icons">add</i></p> to add a title to your reading list!
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <Search
                    searchString={this.state.searchString}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <ComicCards
                sortedComics={this.state.sortedComics}
                handleAddButtonClick={this.handleAddButtonClick}
              />
            </div>
          </div>
          </div>
        )}
      
      </contextStore.Consumer>

    );
  }
}

export default Home;

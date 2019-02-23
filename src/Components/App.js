import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import apiKey from '../config';

// App Components

import MainNav from './Nav';
import Results from './Results';
import NotFound from './NotFound';



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      searchTerm: '',
      searchJpgs: [],
      catsJpgs: [],
      goatsJpgs: [],
      dogsJpgs: []
    };
  }

  componentDidMount() {
    //Get the path of search in path
    const searchTerm = window.location.pathname.match(/^\/search\/(\w+)/);

    //Load Goat images to array
    this.preformSearch('goats', data => {
      this.setState({
        goatsJpgs: data.photos.photo,
        loading: false
      });
    });

    //Load Cat iamges to array
    this.preformSearch('cats', data => {
      this.setState({
        catsJpgs: data.photos.photo,
        loading: false
      });
    });

    //Load Dog images to array
    this.preformSearch('dogs', data => {
      this.setState({
        dogsJpgs: data.photos.photo,
        loading: false
      });
    });

    //Search based on url so we can show results on page refresh and when typing the term directly instead of using search field
    if (searchTerm) {
      this.preformSearch(searchTerm[1]);
    }
  }

  //Set state before mounting for paths
  componentWillMount() {
    const searchTerm = window.location.pathname.match(/^\/search\/(\w+)/);
    if (searchTerm) {
      console.log(searchTerm[1]);
      this.setState({ searchTerm: searchTerm[1] });
    }
  }

  /**
   * This Method takes two params. A query string and an optional callback function. 
   * The callback is used to optionally give data to other arrays besides searchJpgs in state.
   * This is mainly used in intial load of page.
   */
  preformSearch = (query, callback = null) => {
    this.setState({ loading: true });

    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        if (callback) {
          callback(data);
        } else {
          this.setState({ searchJpgs: data.photos.photo, loading: false });
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <MainNav onSearch={this.preformSearch} searchTerm={this.state.searchTerm} />
          <Switch>
            <Route exact path="/search" component={NotFound} />
            <Route exact path="/search/:term" render={props => <Results data={this.state.searchJpgs} title={'Search Results'} searchTerm={this.state.searchTerm} />} />
            <Route path="/cats" render={props => <Results data={this.state.catsJpgs} title={'Cats'} />} />
            <Route path="/dogs" render={props => <Results data={this.state.dogsJpgs} title={'Dogs'} />} />
            <Route path="/goats" render={props => <Results data={this.state.goatsJpgs} title={'Goats'} />} />
            <Redirect exact path="/" to="/goats" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

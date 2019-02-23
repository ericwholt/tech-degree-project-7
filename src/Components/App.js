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
    this.getGoatsJpgs();
    this.getCatsJpgs();
    this.getDogsJpgs();

    //Search based on url so we can show results on page refresh and when typing the term directly instead of using search field
    if (searchTerm) {
      this.preformSearch(searchTerm[1]);
    }
  }

  componentWillMount() {
    const searchTerm = window.location.pathname.match(/^\/search\/(\w+)/);
    if (searchTerm) {
      console.log(searchTerm[1]);
      this.setState({ searchTerm: searchTerm[1] });
    }
  }

  getDogsJpgs = () => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=dogs&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ dogsJpgs: responseData.photos.photo, loading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  getGoatsJpgs = () => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=goats&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ goatsJpgs: responseData.photos.photo, loading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  getCatsJpgs = () => {
    this.setState({ loading: true });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=cats&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ catsJpgs: responseData.photos.photo, loading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  preformSearch = (query) => {
    this.setState({ loading: true });

    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ searchJpgs: responseData.photos.photo, loading: false });
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
            <Route path="/search" render={props => <Results data={this.state.searchJpgs} loading={this.state.loading} title={'Search Results'} searchTerm={this.state.searchTerm} />} />
            {/* <Route exact path="/" render={() => <Results data={this.state.searchJpgs} loading={this.state.loading} />} /> */}
            <Route path="/cats" render={props => <Results data={this.state.catsJpgs} loading={this.state.loading} title={'Cats'} />} />
            <Route path="/dogs" render={props => <Results data={this.state.dogsJpgs} loading={this.state.loading} title={'Dogs'} />} />
            <Route path="/goats" render={props => <Results data={this.state.goatsJpgs} loading={this.state.loading} title={'Goats'} />} />
            <Redirect exact path="/" to="/goats" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

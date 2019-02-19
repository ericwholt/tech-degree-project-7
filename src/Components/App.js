import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
  // Redirect
} from 'react-router-dom';
import apiKey from '../config';

// App Components
import SearchForm from './SearchForm';
import MainNav from './Nav';
import Results from './Results';



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      searchJpgs: [],
      catsJpgs: [],
      goatsJpgs: [],
      dogsJpgs: []
    };
  }

  componentDidMount() {
    this.getGoatsJpgs();
    this.getCatsJpgs();
    this.getDogsJpgs();
  }

  getDogsJpgs = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=dogs&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ dogsJpgs: responseData.photos.photo });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  getGoatsJpgs = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=goats&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ goatsJpgs: responseData.photos.photo });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  getCatsJpgs = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=cats&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ catsJpgs: responseData.photos.photo });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  preformSearch = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ searchJpgs: responseData.photos.photo });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.preformSearch} />
          <MainNav />
          <Switch>
            <Route exact path="/" render={() => <Results data={this.state.searchJpgs} />} />
            <Route path="/goats" render={props => <Results data={this.state.goatsJpgs} title={'Goats'} />} />
            <Route path="/cats" render={props => <Results data={this.state.catsJpgs} title={'Cats'} />} />
            <Route path="/dogs" render={props => <Results data={this.state.dogsJpgs} title={'Dogs'} />} />
            <Route path="/search" render={props => <Results data={this.state.searchJpgs} title={'Search Results'} />} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

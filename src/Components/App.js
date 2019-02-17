import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  // Switch
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
      jpgs: []
    };
  }

  componentDidMount() {
    this.preformSearch();
  }

  preformSearch = (query = 'goats') => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ jpgs: responseData.photos.photo });
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
          <Route path="/" render={props => <Results data={this.state.jpgs} />} />

        </div>
      </BrowserRouter>
    );
  }
}

import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import apiKey from '../config';

// App Components
import SearchForm from './SearchForm';
import MainNav from './Nav';
import Results from './Results';
import NotFound from './NotFound';



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
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
      });
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
    setTimeout(() => {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
        .then(response => response.json())
        .then(responseData => {
          this.setState({ searchJpgs: responseData.photos.photo, loading: false });
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        })
    }, 3000)
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.preformSearch} toSearch={false} title={'Search Results'} />
          <MainNav />
          <Switch>
            <Redirect exact from="/" to="/goats" />
            <Route path="/search" render={props => <Results data={this.state.searchJpgs} loading={this.state.loading} />} />
            {/* <Route exact path="/" render={() => <Results data={this.state.searchJpgs} loading={this.state.loading} />} /> */}
            <Route path="/cats" render={props => <Results data={this.state.catsJpgs} loading={this.state.loading} title={'Cats'} />} />
            <Route path="/dogs" render={props => <Results data={this.state.dogsJpgs} loading={this.state.loading} title={'Dogs'} />} />
            <Route path="/goats" render={props => <Results data={this.state.goatsJpgs} loading={this.state.loading} title={'Goats'} />} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from './Context';
import { createBrowserHistory } from 'history';
import apiKey from '../config';

// App Components
import SearchForm from './SearchForm';
import MainNav from './Nav';
import Search from './Search';
import Goats from './Goats';
import Cats from './Cats';
import Dogs from './Dogs';
import NotFound from './NotFound';

const history = createBrowserHistory();

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      firstLoad: true,
      loading: false,
      isSearching: false,
      searchTerm: '',
      images: [],
    };
  }

  componentDidMount() {
    const searchTerm = window.location.pathname.match(/^\/search\/(\w+)/);

    //Search based on url so we can show results on page refresh and when typing the term directly instead of using search field
    if (searchTerm) {
      this.preformSearch(searchTerm[1]);
    }
  }

  //Set state before mounting for paths
  componentWillMount() {

    const searchTerm = window.location.pathname.match(/^\/search\/(\w+)/);
    if (searchTerm) {
      this.setState({ searchTerm: searchTerm[1] });
    }
  }

  /**
   * This Method takes a query string.
   * It this fetches images from flickr and loads them into the state
   */
  preformSearch = (query) => {
    this.setLoading(true);
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&tags=${ query }&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(data => {
        this.setState({ images: data.photos.photo, searchTerm: query, loading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  setLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }

  render() {
    return (
      <Provider value={{
        data: this.state.images,
        loading: this.state.loading,
        history: history,
        searchTerm: this.state.searchTerm,
        actions: {
          preformSearch: this.preformSearch
        }
      }} >
        <BrowserRouter>
          <div className="container">
            <SearchForm />
            <MainNav />

            <Switch>
              <Route exact path="/search" render={props => <Search preformSearch={this.preformSearch} search={'search'} />} />
              <Route exact path="/search/:term" render={props => <Search preformSearch={this.preformSearch} />} />
              <Route path="/goats" render={props => <Goats preformSearch={this.preformSearch} />} />
              <Route path="/cats" render={props => <Cats preformSearch={this.preformSearch} />} />
              <Route path="/dogs" render={props => <Dogs preformSearch={this.preformSearch} />} />
              <Redirect exact path="/" to="/goats" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

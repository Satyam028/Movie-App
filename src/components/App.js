import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions'

class App extends React.Component {

  componentDidMount () {

    const { store } = this.props;

    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();
    });
    //make api call

    //dispatch action
    this.props.store.dispatch(addMovies(data));

    console.log('STATE', this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      //found the movie and added in favourite store
      return true;
    }

    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val))
  }

  render() {
    //earlier state was ARRAY
    const { movies, search } = this.props.store.getState(); //{movies : {}, search: {}}
    const { list, favourites, showFavourite } = movies; // {list: [], favourites: []} 
    console.log('RENDER', this.props.store.getState());

    const displayMovies = showFavourite ? favourites : list;

    return (
      <div className="App">
        
        <Navbar dispatch = {this.props.store.dispatch} search = { search }/>

        <div className='main'>
          <div className="tabs">
            <div className="tab" onClick = { () => this.onChangeTab(false) }>Movies</div>
            <div className="tab" onClick = { () => this.onChangeTab(true) }>Favourite</div>
          </div>

          <div className="list">
            {displayMovies.map((movie,index) => (
              <MovieCard 
                movie={movie} 
                key={`movies - {index}`} 
                dispatch = {this.props.store.dispatch} 
                isFavourite = {this.isMovieFavourite(movie)}
                />
            ))}
          </div>
          { displayMovies.length === 0 ? <div className="no-movies">No Movies added in favourite</div> : null }
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getGames } from './actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { games } = this.props;

    return (
      <div className="App">
        <h2 className="App__title">
          {new Date().toJSON().slice(0, 10)} World Cup Games
        </h2>
        {games && games.map(game => (
          <div className="App__game">
            <h3>{`${game.venue} - ${game.location}, ${game.datetime}`}</h3>
            <h4>{game.home_team.code}: {game.home_team.goals}</h4>
            <h4>{game.away_team.code}: {game.away_team.goals}</h4>
            <br />
          </div>
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  error: state.error,
  fetching: state.fetching,
  games: state.games,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getGames,
}, dispatch);

App.propTypes = {
  error: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  games: PropTypes.array.isRequired,
  getGames: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

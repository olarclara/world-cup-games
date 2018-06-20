import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getGames } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.getGames();
  }

  render() {
    const { games } = this.props;

    return (
      <React.Fragment>
        {games && games.map(game => (
          <React.Fragment>
            <h2>{`${game.venue} - ${game.location}, ${game.datetime}`}</h2>
            <h3>{game.home_team.code}: {game.home_team.goals}</h3>
            <h3>{game.away_team.code}: {game.away_team.goals}</h3>
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
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

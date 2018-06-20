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
          <div>{JSON.stringify(game)}</div>
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

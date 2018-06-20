import games from '../__test-helpers__/games';
import {
  START_FETCHING,
  THROW_ERROR,
  UPDATE_GAMES,
} from '../actionTypes';
import * as actions from './index';

describe('action creators', () => {
  it('startFetching should dispatch a START_FETCHING action', () => {
    expect(actions.startFetching())
      .toEqual({ type: START_FETCHING });
  });

  it('throwError should dispatch a THROW_ERROR action', () => {
    expect(actions.throwError())
      .toEqual({ type: THROW_ERROR });
  });

  it('updateGames should dispatch an UPDATE_GAMES action', () => {
    expect(actions.updateGames(games))
      .toEqual({ type: UPDATE_GAMES, games });
  });
});

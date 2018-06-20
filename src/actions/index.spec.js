
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import games from '../__test-helpers__/games';
import {
  START_FETCHING,
  THROW_ERROR,
  UPDATE_GAMES,
} from '../actionTypes';
import * as actions from './index';

const mockStore = configureMockStore([ thunk ]);
const store = mockStore({
  error: false,
  fetching: false,
  games: [],
});

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

function mockFailingFetch() {
  return jest.fn().mockImplementation(() => Promise.reject({ error: 'ops, something went wrong' }));
}

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

  afterEach(() => store.clearActions());

  it('successful getGames calls startFetching and updateGames', async () => {
    window.fetch = mockFetch(games);

    const expectedActions = [
      { type: START_FETCHING },
      { type: UPDATE_GAMES, games },
    ];

    return store.dispatch(actions.getGames())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  });

  it('failing getGames calls startFetching and throwError', async () => {
    window.fetch = mockFailingFetch();

    const expectedActions = [
      { type: START_FETCHING },
      { type: THROW_ERROR },
    ];

    return store.dispatch(actions.getGames())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  });
});

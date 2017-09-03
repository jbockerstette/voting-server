import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

function getWinner(tally) {
  let winningCount = 0;
  const winners = [];
  tally.forEach((votes) => {
    if (votes > winningCount) {
      winningCount = votes;
    }
  });
  tally.forEach((votes, movie) => {
    if (winningCount === votes) {
      winners.push(movie);
    }
  });
  return winners;
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries.map(entry => entry)));
}

export function next(state) {
  const entries = state.get('entries').concat(getWinner(state.getIn(['vote', 'tally'], []))) || [];
  if (entries.size === 1) {
    return Map({
      winner: entries.first(),
    });
  }
  return Map({
    vote: Map({
      pair: entries.take(2),
    }),
    entries: entries.skip(2),
  });
}

export function vote(voteState, votedFor) {
  if (!voteState.has('tally')) {
    return voteState.set('tally', Map().set(votedFor, 1));
  }
  return voteState.updateIn(['tally', votedFor], 0, x => x + 1);
}


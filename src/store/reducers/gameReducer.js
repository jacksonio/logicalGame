import * as CONSTANTS from "../constants/GameConstants";
const initialState = {
  isRunning: false,
  gameMode: 16,
  tries: 0
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.START:
      return {
        ...state,
        isRunning: true
      };
    case CONSTANTS.SETRENDER:
      return {
        ...state,
        gameMode: state.gameMode
      };
    case CONSTANTS.SOLVEDPAIR:
    case CONSTANTS.ADDFAILEDTRY:
      return {
        ...state,
        tries: state.tries + 1
      };
    case CONSTANTS.QUIT:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;

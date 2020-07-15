import * as CONSTANTS from "../constants/GameConstants";

export const startGame = () => {
  return {
    type: CONSTANTS.START
  };
};
export const quitGame = () => {
  return {
    type: CONSTANTS.QUIT
  };
};

export const setRender = payload => {
  return {
    type: CONSTANTS.SETRENDER,
    mode: payload
  };
};

export const solvedPair = pairID => {
  return {
    type: CONSTANTS.SOLVEDPAIR,
    pair: pairID
  };
};

export const addFailedTry = () => {
  return {
    type: CONSTANTS.ADDFAILEDTRY
  };
};

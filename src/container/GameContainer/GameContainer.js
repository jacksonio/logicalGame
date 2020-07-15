import React from "react";
import { connect } from "react-redux";

import { WelcomeScreen } from "../../components/Screens/WelcomeScreen/WelcomeScreen";
import GameScreen from "../../components/Screens/GameScreen/GameScreen";
import * as GameActions from "../../store/actions/gameActions";
import { MainContainer, Content } from "./styles";

const DEFAULT_CARD_NUMBER = 16;

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewGameClick = this.handleNewGameClick.bind(this);
  }

  handleNewGameClick(e) {
    e.preventDefault();
    this.props.startGame();
    this.props.setRender(DEFAULT_CARD_NUMBER);
  }

  render() {
    const displayedSreen = this.props.isRunning ? (
      <GameScreen />
    ) : (
      <WelcomeScreen
        newGameClick={this.handleNewGameClick}
      />
    );
    return (
      <MainContainer>
        <Content>
          {displayedSreen}
        </Content>

      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRunning: state.gameReducer.isRunning,
    cards: state.gameReducer.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(GameActions.startGame()),
    setRender: newMode => dispatch(GameActions.setRender(newMode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);

import React from "react";
import { connect } from "react-redux";
import * as GameActions from "../../../store/actions/gameActions";
import { Row, InfoContainer } from "./styles";
import Card from "./Card";

const SPLITAFTER = 4;

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstActive: -1,
      firstActiveCard: null,
      secondActiveCard: null,
    };

    this.renderGameField = this.renderGameField.bind(this);
    this.handleCardClicked = this.handleCardClicked.bind(this);
    this.handleNewGameButton = this.handleNewGameButton.bind(this);
  }

  renderGameField() {
    let rowCount = this.props.gameMode / SPLITAFTER;
    let rows = [];
    let cards = [...this.props.cards];
    for (let i = 0; i < rowCount; i++) {
      let temp = [];
      for (let j = 0; j < SPLITAFTER; j++) {
        let item = cards.shift();
        temp.push(item);
      }
      rows.push(temp);
    }
    return rows;
  }

  handleCardClicked(cardID, pairID){
    if(this.state.firstActive === -1){
      this.setState({firstActiveCard: cardID, firstActive: pairID});
    }else{
      if(this.state.firstActiveCard===cardID) return;
      if(pairID === this.state.firstActive){
        this.setState({
          secondActiveCard : cardID
        }, () => {
          setTimeout( () => {
            this.setState({firstActiveCard: null, firstActive: -1, secondActiveCard:null});
            this.props.solvedPair(pairID);
          }, 500)
        })
      }
      else{
       this.setState({
          secondActiveCard : cardID
        }, () => {
          setTimeout( () => {
            this.setState({firstActiveCard: null, firstActive: -1,secondActiveCard:null});
            this.props.addFailed();

          }, 500)
        })
      }
    }
  }

  handleNewGameButton(e){
    e.preventDefault();
    this.props.quitGame();
  }
  render() {
    let rows = this.renderGameField();
    return (
      <>
        <h4>Current step: {this.props.tries}</h4>
        {this.props.remainingPairs.length===0 &&(
          <InfoContainer>
            <h4>You won in {this.props.tries} steps!</h4>
            <h4>Let's try to do it faster</h4>
            <button onClick={this.handleNewGameButton}>New Game</button>
          </InfoContainer>
        )}
        {rows &&
          rows.map((el,ix) => {
            return (
              <Row key={"row_"+ix}>
                {el.map((elem, idx) => {
                  let active = elem.cardID === this.state.firstActiveCard || elem.cardID === this.state.secondActiveCard;
                  return <Card  key={"card_"+idx}
                                active={active}
                                clickable={this.props.remainingPairs.includes(elem.pairID)}
                                pairID={elem.pairID}
                                cardID={elem.cardID}
                                onClick={this.handleCardClicked}
                                />;
                })}
              </Row>
            );
          })}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameMode: state.gameReducer.gameMode,
    tries: state.gameReducer.tries,
    cards: state.cardReducer.allCards,
    remainingPairs: state.cardReducer.remainingPairIDs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRender: mode => dispatch(GameActions.setRender(mode)),
    solvedPair: pairID => dispatch(GameActions.solvedPair(pairID)),
    addFailed: () => dispatch(GameActions.addFailedTry()),
    quitGame: () => dispatch(GameActions.quitGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);

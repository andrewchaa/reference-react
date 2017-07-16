import React, { Component } from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

const Stars = (props) => {
  let stars = _.range(0, props.numberOfStars)
    .map((number, i) => <i className="fa fa-star"></i>);
  
  return (
    <div className="col-5">
      {stars}
    </div>

  )
}

const Button = (props) => {
  return (
    <div className="col-2">
      <button className="btn" disabled={props.selectedNumbers.length == 0}>=</button>
    </div>
  )
}

const Answer = (props) => {

  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
        <span key={i}
          onClick={() => props.unselectNumber(number)}
         >
          {number}
        </span>
      )}
    </div>
  )
}

const Numbers = (props) => {
  const givenClassName = (num) => {
    if (props.selectedNumbers.indexOf(num) >= 0) {
      return 'selected';
    }
  }

  return (
    <div className="card text-center">
      <div>
        {
          Numbers.list.map((number, i) => 
          <span key={i} className={givenClassName(number)}
                onClick={() => props.selectNumber(number)}
           >
            {number}
          </span>
        )}
      </div>
    </div>
  )
}

Numbers.list = _.range(1, 10);

class Game extends Component {
  state = {
    selectedNumbers: [],
    numberOfStars: 1 + Math.floor(Math.random() * 9)

  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0){
      return;
    }
    
    this.setState((prev) => ({
      selectedNumbers: prev.selectedNumbers.concat(clickedNumber)
    }));
  }

  unselectNumber = (clickedNumber) => {
    this.setState((prevState) => ({
      selectedNumbers: prevState.selectedNumbers.filter(n => n !== clickedNumber)
    }));
  }

  render() {
    const { selectedNumbers, numberOfStars } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />

        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer selectedNumbers = {selectedNumbers}
            unselectNumber = {this.unselectNumber}
           />        
        </div>
        <br />
        <Numbers 
          selectedNumbers = {selectedNumbers}
          selectNumber={this.selectNumber} />
      </div>
    );
  }
}
class App extends Component {
  state = {
    selectedNumbers: [2, 4],
  }

  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default App;

import React from "react";
import web3 from "./web3";
import lottery from "./lottery";


class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }
  render() {
    return (
      <div className="App">
        <h1>Lottery Dapp</h1>
        <p>This contract is managed by:{this.state.manager}</p>
      </div>
    );
  }
}

export default App;
 
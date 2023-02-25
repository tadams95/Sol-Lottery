import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import "./App.css";

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

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success" });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: "A winner has been chosen!" });
  };
  render() {
    return (
      <div className="App">
        <h1 className="title">Lottery Dapp</h1>
        <p className="p">
          This contract is managed by {this.state.manager}. There are currently{" "}
          {this.state.players.length} people entered, competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <form className="form-control" onSubmit={this.onSubmit}>
          <div className="container">
            <h4 className="headline">Want to try your luck?</h4>
            <div className="label">
              <label>Enter ETH to enter Lottery!</label>
            </div>

            <input
              className="input"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button className="btn">Enter</button>
        </form>
        <hr />
        <div className="container">
          <h4 className="headline">Ready to pick a winner? </h4>
          <button className="btn" onClick={this.onClick}>
            Pick a winner!
          </button>

          <h2>{this.state.message}</h2>
        </div>
      </div>
    );
  }
}

export default App;

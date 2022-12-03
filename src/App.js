import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
  state = { //dichiarizioni direttamente incluse nel costruttore (ES6)
    manager: '',
    players: [],
    balance: '',
  }

  async componentDidMount() { //funzionate nativa che viene chiamata al render del component
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {    
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          Il Manager del contratto è {this.state.manager}.
          Ci sono al momento {this.state.players.length} persone che participano alla lotteria.
          Competi per vincere {web3.utils.fromWei(this.state.balance, 'ether')} ether!!
        </p>
      </div>
    );
  }
}
export default App;

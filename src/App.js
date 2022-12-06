import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
  state = { //dichiarizioni direttamente incluse nel costruttore (ES6)
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  }

  async componentDidMount() { //funzionate nativa che viene chiamata al render del component
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts(); 

    this.setState({ message: 'Waiting on transarcion success' });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You are entered' });
  }

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transarcion success' });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: 'A winner is picked' });
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
        
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Vuoi tentare la fortuna??</h4>
          <div>
            <label>Quantità di ether da spendere</label>
            <input 
              value={ this.state.value }
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        
        <h1>{ this.state.message }</h1>

        <hr />

        <h4>Pronto per selezionare un vincitore</h4>
        <button onClick={this.onClick}>Click</button>

        <hr />


      </div>
    );
  }
}
export default App;

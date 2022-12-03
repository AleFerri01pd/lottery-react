import "./App.css";
import React from "react";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { manager: '' };
  }

  async componentDidMount() { //funzionate nativa che viene chiamata al render del component
    const manager = await lottery.methods.manager().call();

    console.log(lottery);

    this.setState({ manager });
  }

  render() {    
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>The manager of this Contract is {this.state.manager}</p>
      </div>
    );
  }
}
export default App;

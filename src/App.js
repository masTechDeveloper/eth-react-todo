import React, { Component } from 'react';
import Web3 from 'web3';
import { TODO_ABI, TODO_ADDRESS } from './config/config';
import './App.css';

class App extends Component {
  // load async function into render
  componentWillMount() {
    this.loadBlockchain();
  }

  // Load Web3 Network
  async loadBlockchain() {
    // Connect a network Provider
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

    // Find a Netwrok Type
    const networkType = await web3.eth.net.getNetworkType();
    console.log('Network Type is : ', networkType);

    // Find a Network ID
    const networkId = await web3.eth.net.getId();
    console.log('Network Id is : ', networkId);

    // Get Return Accounts Array

    // const accounts = await web3.eth.getAccounts();
    // console.log('Account : ', accounts);

    // Get a Single Account
    const acc = await web3.eth.getCoinbase();
    console.log('Single Account: ', acc);

    // Interact with smart contract using ABI & Contract Address
    const todo = new web3.eth.Contract(TODO_ABI, TODO_ADDRESS);

    this.setState({ todo });
    console.log('TODO List ', todo);

    // Set Account State
    this.setState({ account: acc });
    this.setState({ netw: networkType });
  }

  // Constructor to Manage a State

  constructor(props) {
    super(props);
    this.state = { account: '', netw: '' };
  }

  render() {
    return (
      <div className='container'>
        <h1>Corecis</h1>

        {/* Get Account into web3 and update a state then show on page */}
        <p>Your Account : {this.state.account}</p>
        <p>You Connected On : {this.state.netw.toLocaleUpperCase()}</p>
      </div>
    );
  }
}

export default App;

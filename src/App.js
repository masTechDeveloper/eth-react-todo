import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './components/layout/Navbar';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config/config';
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
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });
    console.log('TODO List ', todoList);

    // Smart Contract Function Call
    const countTask = await todoList.methods.taskCount().call();

    console.log('Count Task: ', countTask);

    // Update State Count Task
    this.setState({ countTask });

    // Set Account State
    this.setState({ account: acc });
    this.setState({ netw: networkType });
  }

  // Constructor to Manage a State
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      netw: '',
      countTask: 0,
    };
  }

  render() {
    return (
      <div className=''>
        <Navbar />
        <div className='container'>
          <h1 className='text-center mt-5'>Add Task</h1>

          <div className='row'>
            <div className='col-6'>
              <h1 className=''> Account Details</h1>
              <p>
                Your Account :{' '}
                <span className='text-danger'>{this.state.account}</span>
              </p>
              <p>Network : {this.state.netw.toLocaleUpperCase()} </p>
              <p>Task Count : {this.state.countTask}</p>
            </div>
            <div className='col-6'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

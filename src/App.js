import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import TodoList from './components/TodoList';
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

    // await for Popup Metamask Window
    await Web3.givenProvider.enable();

    // Find a Netwrok Type
    const networkType = await web3.eth.net.getNetworkType();
    // console.log('Network Type is : ', networkType);
    this.setState({ netw: networkType });

    // Find a Network ID
    const networkId = await web3.eth.net.getId();
    this.setState({ netwId: networkId });
    // console.log('Network Id is : ', networkId);

    // Get Return Accounts Array

    const acc = await web3.eth.getAccounts();
    // console.log('Account : ', accounts);

    // Get a Single Account
    // const acc = await web3.eth.getCoinbase();
    // console.log('Single Account: ', acc);
    this.setState({ account: acc[0] });

    // Get Account Balance
    const balance = await web3.eth.getBalance(acc[0]);

    // Conver Wei to Eth
    const convToEth = await web3.utils.fromWei(balance, 'ether');
    this.setState({ balance: convToEth });
    // console.log(convToEth + ' ETH');

    // Interact with smart contract using ABI & Contract Address
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });
    // console.log('TODO List ', todoList);

    // Smart Contract Function Call
    const countTask = await todoList.methods.taskCount().call();
    // console.log('Count Task: ', countTask);

    // Update State Count Task
    this.setState({ countTask });

    // Task Mapping Call to the Blockchain

    for (var i = 1; i <= countTask; i++) {
      //Call Mapping
      const task = await todoList.methods.tasks(i).call();

      // set state array
      this.setState({ tasks: [...this.state.tasks, task] });
    }
    // console.log('Task: ', this.state.tasks);

    this.setState({ loading: false });
  }

  // Constructor to Manage a State
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      netw: '',
      netwId: '',
      countTask: 0,
      tasks: [],
      loading: true,
      // alert: false,
    };

    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  createTask(content) {
    this.setState({ loading: true });
    this.state.todoList.methods
      .createTask(content)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false });
      });
  }

  toggleCompleted(taskId) {
    this.setState({ loading: true });
    this.state.todoList.methods
      .toggleCompleted(taskId)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className=''>
        <Navbar />

        <div className='container my-2'>
          {this.state.loading ? (
            <div className='alert alert-danger' role='alert'>
              Please Connect a Ropsten Network
            </div>
          ) : (
            <div className='alert alert-success' role='alert'>
              Connected Successfully!
            </div>
          )}

          <div className='row'>
            <main
              role='main'
              className='col-lg-12 d-flex justify-content-center'
            ></main>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
              <h2 className=''> Account Details</h2>
              <p>
                Your Account :
                <span className='text-info acc'> {this.state.account}</span>
              </p>
              <p>
                Account Balance :
                <span className='text-info acc'> {this.state.balance} ETH</span>
              </p>
              <p>
                Network :
                <span className='text-info'>
                  {this.state.netw.toUpperCase()}
                </span>
              </p>
              <p>Network Id : {this.state.netwId}</p>
              <p>Total Task : {this.state.countTask}</p>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
              {this.state.loading ? (
                <div id='loader' className='text-center'>
                  <h1 className='text-center text-danger font-weight-bold'>
                    Loading...
                  </h1>
                </div>
              ) : (
                <TodoList
                  tasks={this.state.tasks}
                  createTask={this.createTask}
                  toggleCompleted={this.toggleCompleted}
                />
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import Login from './login';
import SetAdmin from './setAdmin';

import './App.css';
import admin from './abi';

class App extends Component {

  state = {
    owner: '',
    message: '',
    address: '',
    password: '',
    status: ''
  };

  setUser = async (address, password, admin, unlocker) => {
    this.setState({address: address});
    this.setState({password: password});
    if (address === this.state.owner) {
      this.setState({message: "Logged in as: " + address + " (Owner)"});
    }
    else if(admin) {
      this.setState({message: "Logged in as: " + address + " (Admin)"});
    }
    else if(unlocker) {
      this.setState({message: "Logged in as: " + address + " (Unlocker)"});
    }
    else {
      this.setState({message: "Logged in as: " + address + " (User)"});
    }
  }

  logging = () => {
  this.setState({message: 'Logging in...'});
  }

  logfailed = () => {
  this.setState({message: 'Login failed. Double check your address and password.'});
  }

  waiting = () => {
  this.setState({status: 'Waiting on transaction success...'});
  }

  success = () => {
  this.setState({status: 'Success!'});
  }

  failed = () => {
  this.setState({status: 'Transaction failed. Check your inputs and priviledges. See if you are logged in.'});
  }

  async componentDidMount() {
    const owner = await admin.methods.owner().call();
    this.setState({ owner });
    this.setState({message: "CZR Account Login:"});
  }

  onClick = async (event) => {
  event.preventDefault();

  this.setState({message: 'Waiting on transaction success...'});

  const status = await admin.methods.isAdmin(this.state.admin).call();

  console.log(status);
  if(status) {
      this.setState({admin_message: "true"});
  }
  else {
      this.setState({admin_message: "false"});
  }
  this.setState({message: ''});

  };



  render() {
    return (
      <div>
        <h2>Incentives Contract</h2>
        <p>
          This contract is owned by {this.state.owner}.
        </p>
        <h3>
          Contract Priviledges:
        </h3>
        <p><strong>Owner:</strong> Add/remove/unlock incentive plans, set/remove admins,
          set/remove unlockers, withdraw CZR from contract, view incentives</p>
        <p><strong>Admin:</strong> Add/remove/unlock incentive plans,
          set/remove unlockers, view incentives</p>
        <p><strong>Unlocker:</strong> Unlock incentive plans, view incentives</p>
        <p><strong>User:</strong> View incentives</p>
        <hr />
        <h4>{this.state.message}</h4>
        <Login parentCallback = {this.setUser}
              contract = {admin}
              parentlogin = {this.logging}
              parentloginfail = {this.logfailed}/>
        <SetAdmin parentAddress = {this.state.address}
                  parentPassword = {this.state.password}
                  parentWaiting = {this.waiting}
                  parentSuccess = {this.success}
                  parentFail = {this.failed}/>
        <h4>{this.state.status}</h4>
        <hr />
        </div>
    );
  }
}

export default App;

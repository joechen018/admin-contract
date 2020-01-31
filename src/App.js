import React, {Component} from 'react';
import Login from './login';
import PriviledgeDropdown from './priviledgeDropdown'

import './App.css';
import admin from './abi';

class App extends Component {

  state = {
    owner: '',
    admins: '',
    unlockers: '',
    message: '',
    address: '',
    password: '',
    status: '',
    function: [
              {
                id: 0,
                title: 'Set Admin',
                selected: false,
                key: 'function'
              },
              {
                id: 1,
                title: 'Remove Admin',
                selected: false,
                key: 'function'
              },
              {
                id: 2,
                title: 'Set Unlocker',
                selected: false,
                key: 'function'
              },
              {
                id: 3,
                title: 'Remove Unlocker',
                selected: false,
                key: 'function'
              },
              {
                id: 4,
                title: 'Transfer Ownership',
                selected: false,
                key: 'function'
              }
            ]
  };


  resetThenSet = (id, key) => {
      let temp = JSON.parse(JSON.stringify(this.state[key]));
      temp.forEach(item => item.selected = false);
      temp[id].selected = true;
      this.setState({
        [key]: temp
      });
    }

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


    // let opts = {
    //     from_stable_block_index: 0
    // };
    // let utility = {
    //     init: function () {
    //         // Start
    //         utility.EventTest();
    //     },
    //     //Event
    //     EventTest () {
    //         admin.getPastEvents('NewAdmin', opts)
    //             .then(function (events) {
    //                 //
    //                 console.log(events);
    //
    //                 // Control whether to continue
    //                 if (true) {
    //                     utility.EventTest();
    //                 }
    //             });
    //
    //     }
    // }
    // utility.init();

    const owner = await admin.methods.owner().call();
    this.setState({ owner });
    let admins = await admin.methods.getAdmins().call();
    admins = admins.filter(item => item !== "0x0000000000000000000000000000000000000000")
    admins = admins.join(", ");
    this.setState({ admins });
    let unlockers = await admin.methods.getUnlockers().call();
    unlockers = unlockers.filter(item => item !== "0x0000000000000000000000000000000000000000")
    unlockers = unlockers.join(", ");
    this.setState({ unlockers });
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
          Owner: {this.state.owner}
        </p>
        <p>
          Admins: {this.state.admins}
        </p>
        <p>
          Unlockers: {this.state.unlockers}
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
        <h4>
                Adjust Priviledges:
        </h4>
        <PriviledgeDropdown parentAddress = {this.state.address}
                  parentPassword = {this.state.password}
                  parentWaiting = {this.waiting}
                  parentSuccess = {this.success}
                  parentFail = {this.failed}
                  title="Select Option"
                  list={this.state.function}
                  resetThenSet={this.resetThenSet}/>
        <h4>{this.state.status}</h4>
        <hr />
        </div>
    );
  }
}

export default App;

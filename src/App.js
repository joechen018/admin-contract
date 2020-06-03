import React, {Component} from 'react';
import {Grid, Icon, Message} from 'semantic-ui-react'
import Login from './login';
import PriviledgeDropdown from './priviledgeDropdown'
import AddIncentive from './AddIncentive'
import ViewIncentive from './ViewIncentive'
import UnlockIncentive from './UnlockIncentive'

import './App.css';
import admin from './abi';

class App extends Component {

  state = {
    owner: '',
    admins: '',
    unlockers: '',
    notif: '',
    status: '',
    address: '',
    password: '',
    loading: '',
    priviledge: '',
    contractAccount: '',
    contractAmount: ''
  };

  waiting = (wait) => {
    if(wait === true) {
      this.setState({loading: true});
    }
    else {
      this.setState({loading: false});
    }
  }

  success = (message) => {
    this.updateList();
    this.setState({
      notif: message,
      status: 'success'
    });
  }

  failed = (message) => {
    this.updateList();
    this.setState({
      notif: message,
      status: 'failed'
    });
  }

  updateList = async () => {
    const owner = await admin.methods.owner().call();
    let admins = await admin.methods.getAdmins().call();
    admins = admins.filter(item => item !== "czr_zero_address")
    admins = admins.join(", ");
    let unlockers = await admin.methods.getUnlockers().call();
    unlockers = unlockers.filter(item => item !== "czr_zero_address")
    unlockers = unlockers.join(", ");
    let contractAmount = await admin.methods.balance(this.state.contractAccount).call();
    contractAmount = parseInt(contractAmount);
    this.setState({
      owner,
      admins,
      unlockers,
      contractAmount
    });
  }

  setUser = async (address, password, priviledge) => {
    this.setState({
      address,
      password,
      priviledge
    });
  }

  handleDismiss = async () => {
    this.setState({
      status: ''
    });
  }


  async componentDidMount() {
    await this.setState({contractAccount: admin.options["account"]});
    this.updateList();
  }

  render() {
    var loading;
    if(this.state.loading === true) {
      loading = <h4><Icon name='circle notched' loading />Processing transaction. This may take a few seconds...</h4>;
      console.log(loading);
    }
    else {
      loading = '';
    }
    var notification;
    if(this.state.status === 'success') {
      notification = <Message
                        onDismiss={this.handleDismiss}
                        success
                        header='Success!'
                        content={this.state.notif}
                      />;
    }
    else if(this.state.status === 'failed') {
      notification = <Message
                        onDismiss={this.handleDismiss}
                        negative
                        header='Transaction Failed!'
                        content={this.state.notif}
                      />;
    }
    else {
      notification = '';
    }

    return (
      <div>
        <Login parentCallback = {this.setUser}/>

        <div id="content" class="ui container">
        {notification}
        <Grid>
          <Grid.Column width={11}>
            <h3>
              Contract Priviledges:
            </h3>
            <p><strong>Owner:</strong> Add/remove/unlock incentive plans, set/remove admins,
              set/remove unlockers, withdraw CZR from contract, view incentives</p>
            <p><strong>Admin:</strong> Add/remove/unlock incentive plans,
              set/remove unlockers, view incentives</p>
            <p><strong>Unlocker:</strong> Unlock incentive plans, view incentives</p>
            <p><strong>Everyone:</strong> View incentives</p>
            <p>
              Owner: {this.state.owner}
            </p>
            <p>
              Admins: {this.state.admins}
            </p>
            <p>
              Unlockers: {this.state.unlockers}
            </p>
          </Grid.Column>
          <Grid.Column width={5}>
            <h3>Contract Address:</h3>
            <p class = "wrap">{this.state.contractAccount}</p>
            <h3>Contract Balance: {this.state.contractAmount/1000000000000000000} CZR</h3>
            <p class = "wrap">{this.state.contractAmount} (can)</p>
            <h3>Pay Contract:</h3>
          </Grid.Column>
        </Grid>
        <hr />
        {loading}
        <Grid columns={3}>
          <Grid.Column>
            <PriviledgeDropdown parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}
                      />
            <br />
            <UnlockIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}
                      />
          </Grid.Column>
          <Grid.Column>
            <AddIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}/>
          </Grid.Column>
          <Grid.Column>
            <ViewIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}/>
          </Grid.Column>
        </Grid>
        <hr />
        </div>
      </div>
    );
  }
}

export default App;

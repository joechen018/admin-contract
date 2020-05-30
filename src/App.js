import React, {Component} from 'react';
import {Grid, Icon, Message} from 'semantic-ui-react'
import Login from './login';
import PriviledgeDropdown from './priviledgeDropdown'
import AddIncentive from './AddIncentive'
import ViewIncentive from './ViewIncentive'

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
    priviledge: ''
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
    this.setState({
      owner,
      admins,
      unlockers
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
        <h3>
          Contract Priviledges:
        </h3>
        <p><strong>Owner:</strong> Add/remove/unlock incentive plans, set/remove admins,
          set/remove unlockers, withdraw CZR from contract, view incentives</p>
        <p><strong>Admin:</strong> Add/remove/unlock incentive plans,
          set/remove unlockers, view incentives</p>
        <p><strong>Unlocker:</strong> Unlock incentive plans, view incentives</p>
        <p><strong>User:</strong> View incentives</p>
        <p>
          Owner: {this.state.owner}
        </p>
        <p>
          Admins: {this.state.admins}
        </p>
        <p>
          Unlockers: {this.state.unlockers}
        </p>
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

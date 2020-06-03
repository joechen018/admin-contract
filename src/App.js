import React, {Component} from 'react';
import {Grid, Icon, Message, List, Form, Input, Button} from 'semantic-ui-react'
import Login from './login';
import PriviledgeDropdown from './priviledgeDropdown'
import AddIncentive from './AddIncentive'
import ViewIncentive from './ViewIncentive'
import UnlockIncentive from './UnlockIncentive'
import RemoveIncentive from './RemoveIncentive'

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
    contractAmount: '',
    payAmount: 0
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
    // admins = admins.join(", ");
    let unlockers = await admin.methods.getUnlockers().call();
    unlockers = unlockers.filter(item => item !== "czr_zero_address")
    // unlockers = unlockers.join(", ");
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

  createList = (listInput) => {
    var children = [];
    var list = [];
    for (var i = 0; i < listInput.length; i++) {
      children.push(<List.Item>{listInput[i]}</List.Item>);
    }
    list.push(<List bulleted>{children}</List>);
    return list;
  }

  payContract = async () => {
    var amount = 0;
    if(this.state.payAmount > 0) {
      amount = this.state.payAmount;
    }
    if(this.state.address === '') {
      this.failed('Please check your inputs and priviledges. Make sure you are logged in.');
      return;
    }
    this.waiting(true);
    let code = 9;
    await admin.methods.pay().sendBlock(
      {
        from: this.state.address,
        password: this.state.password,
        gas: 2000000,
        gas_price: '1000000000',
        amount: amount
      })
       .then(data =>
             {
               console.log(code)
               console.log(data)
               code = 0;
             }).catch(function (error) {
               console.log(code)
               console.log(error)
                code = 10;
              });
    this.waiting(false);
    if(code === 0) {
        this.success('Your transaction has been processed on the blockchain.');
    }
    else {
      this.failed('Please check your inputs and priviledges. Make sure you are logged in.');
    }
    this.setState({payAmount: 0});
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

    var adminDisplay = '';
    var unlockerDisplay = '';
    if(this.state.admins !== '') {
      adminDisplay = this.createList(this.state.admins);
    }
    if(this.state.unlockers !== '') {
      unlockerDisplay = this.createList(this.state.unlockers);
    }

    var balance = 0;
    balance = this.state.contractAmount/1000000000000000000;
    balance = balance.toFixed(5);

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
            <List bulleted>
              <List.Item>{this.state.owner}</List.Item>
            </List>
            <p><strong>Admin:</strong> Add/remove/unlock incentive plans,
              set/remove unlockers, view incentives</p>
            {adminDisplay}
            <p><strong>Unlocker:</strong> Unlock incentive plans, view incentives</p>
            {unlockerDisplay}
            <p><strong>Everyone:</strong> View incentives</p>
          </Grid.Column>
          <Grid.Column width={5}>
            <h3>Contract Address:</h3>
            <p class = "wrap">{this.state.contractAccount}</p>
            <h3>Contract Balance: {balance} CZR</h3>
            <p class = "wrap">{this.state.contractAmount} (can)</p>
            <h3>Pay Contract:</h3>
            <div>
              <label>Amount (can):</label>
              <Input size="mini"
                     value = {this.state.payAmount}
                     onChange={event => this.setState({payAmount: event.target.value})}
              />
              <Button size="mini" type="submit" content='Pay' onClick={this.payContract} />
            </div>
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
            <ViewIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}/>
          </Grid.Column>
          <Grid.Column>
            <AddIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}/>
          </Grid.Column>
          <Grid.Column>
            <UnlockIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}
                      />
            <br />
            <RemoveIncentive parentAddress = {this.state.address}
                      parentPassword = {this.state.password}
                      parentWaiting = {this.waiting}
                      parentSuccess = {this.success}
                      parentFail = {this.failed}
                      />
          </Grid.Column>
        </Grid>
        <hr />
        </div>
      </div>
    );
  }
}

export default App;

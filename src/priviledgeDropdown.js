import React, { Component } from 'react'
import {Form, Dropdown,Input, Button} from 'semantic-ui-react'
import admin from './abi';
import FontAwesome from 'react-fontawesome'

class PriviledgeDropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      adjust_address: '',
      dropdown: ''
    }
  }

  priviledge = async (event) => {
    event.preventDefault();
    const id = this.state.dropdown;
    if(id === 'Set Admin') {
      this.adjustPriviledge(admin.methods.setAdmin(this.state.adjust_address));
    }
    else if(id === 'Remove Admin') {
      this.adjustPriviledge(admin.methods.removeAdmin(this.state.adjust_address));
    }
    else if(id === 'Set Unlocker') {
      this.adjustPriviledge(admin.methods.setUnlocker(this.state.adjust_address));
    }
    else if(id === 'Remove Unlocker') {
      this.adjustPriviledge(admin.methods.removeUnlocker(this.state.adjust_address));
    }
    else if(id === 'Transfer Ownership') {
      this.adjustPriviledge(admin.methods.transferOwnership(this.state.adjust_address));
    }
  }

  async adjustPriviledge(func) {
      this.props.parentWaiting(true);
      let code = 9;
      await func.sendBlock(
        {
          from: this.props.parentAddress,
          password: this.props.parentPassword,		// Sender's account password
          gas: 2000000,
          gas_price: '1000000000',
          amount: "0"
        })
         .then(data =>
               {
                 code = 0;
               }).catch(function (error) {
                  code = 10;
                });
      this.props.parentWaiting(false);
      if(code === 0) {
          this.props.parentSuccess('Your transaction has been processed on the blockchain.');
      }
      else {
        this.props.parentFail('Please check your inputs and priviledges. Make sure you are logged in.');
      }
  };


  render(){

    const options = [
              {
                id: 0,
                text: 'Set Admin',
                value: 'Set Admin',
                key: 'Set Admin'
              },
              {
                id: 1,
                text: 'Remove Admin',
                value: 'Remove Admin',
                key: 'Remove Admin'
              },
              {
                id: 2,
                text: 'Set Unlocker',
                value: 'Set Unlocker',
                key: 'Set Unlocker'
              },
              {
                id: 3,
                text: 'Remove Unlocker',
                value: 'Remove Unlocker',
                key: 'Remove Unlocker'
              },
              {
                id: 4,
                text: 'Transfer Ownership',
                value: 'Transfer Ownership',
                key: 'Transfer Ownership'
              }
            ];

    return(
      <div>
        <Form onSubmit = {this.priviledge}>
          <h4>Adjust Priviledges:</h4>
          <Form.Field>
            <Dropdown placeholder='Select Option' selection options = {options}
                      onChange = {(event, data) => this.setState({dropdown: data.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Address:</label>
            <Input size="mini"
              value = {this.state.adjust_address}
              onChange={event => this.setState({adjust_address: event.target.value})}
              placeholder = "czr_address"
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit" size="mini">
              Enter
            </Button>
          </Form.Field>
        </Form>
      </div>
    )
  }
}

export default PriviledgeDropdown

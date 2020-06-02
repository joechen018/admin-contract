import React, {Component} from 'react';
import {Form, Dropdown,Input, Button} from 'semantic-ui-react'
import admin from './abi';

class AddIncentive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      add_address: '',
      add_start: '',
      add_amount: '',
      add_month: ''
    }
  }

  addIncentive = async (event) => {
    event.preventDefault();
    this.props.parentWaiting(true);
    let code = 9;
    console.log("address: " + this.state.add_address)
    console.log("start: " + this.state.add_start)
    console.log("amount: " + this.state.add_amount)
    console.log("months: " + this.state.add_month)
    await admin.methods.addCZRLock(this.state.add_start, this.state.add_amount, this.state.add_month, this.state.add_address).sendBlock(
      {
        from: this.props.parentAddress,
        password: this.props.parentPassword,
      	gas: 2000000,
      	gas_price: '1000000000',
      	amount: "0"
      })
       .then(data =>
             {
               console.log(code)
               console.log(data)
               code = 0;
             }).catch(function (error) {
               console.log(code)
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

  render() {
      return (
      <div>
        <Form onSubmit = {this.addIncentive}>
        <h4>Add Incentive</h4>
          <Form.Field>
            <label>Address:</label>
            <Input size = "mini"
              placeholder = "czr_address"
              name = "address"
              value = {this.state.add_address}
              onChange={event => this.setState({add_address: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Start Lock Time:</label>
            <Input size = "mini"
              name = "start_lock_time"
              value = {this.state.add_start}
              onChange={event => this.setState({add_start: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount (can):</label>
            <Input size = "mini"
              name = "start_lock_time"
              value = {this.state.add_amount}
              onChange={event => this.setState({add_amount: event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Months:</label>
            <Input size = "mini"
              name = "start_lock_time"
              value = {this.state.add_month}
              onChange={event => this.setState({add_month: event.target.value})}
            />
          </Form.Field>
          <Button type="submit" size="mini">Enter</Button>
          </Form>
        </div>
    );
  }
}

export default AddIncentive;

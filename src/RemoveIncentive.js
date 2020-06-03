import React, {Component} from 'react';
import {Form, Dropdown,Input, Button} from 'semantic-ui-react'
import admin from './abi';

class RemoveIncentive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      remove_address: '',
      remove_id: ''
    }
  }

  removeIncentive = async (event) => {
    event.preventDefault();
    this.props.parentWaiting(true);
    let code = 9;
    await admin.methods.removeCZRLock(this.state.remove_id, this.state.remove_address).sendBlock(
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
               console.log(error)
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
        <Form onSubmit = {this.removeIncentive}>
        <h4>Remove Incentives</h4>
          <Form.Field>
            <label>Address:</label>
            <Input size="mini"
              name = "address"
              value = {this.state.remove_address}
              onChange={event => this.setState({remove_address: event.target.value})}
              placeholder ="czr_address"
            />
          </Form.Field>
          <Form.Field>
            <label>id:</label>
            <Input size="mini"
              name = "id"
              value = {this.state.remove_id}
              onChange={event => this.setState({remove_id: event.target.value})}
            />
          </Form.Field>
          <Button type="submit" size="mini">Enter</Button>
        </Form>
      </div>
    );
  }
}

export default RemoveIncentive;

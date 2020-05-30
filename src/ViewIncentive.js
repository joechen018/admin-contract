import React, {Component} from 'react';
import {Form, Dropdown,Input, Button} from 'semantic-ui-react'
import admin from './abi';

class ViewIncentive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view_address: ''
    }
  }


  viewIncentive = async (event) => {
    event.preventDefault();
    let length = await admin.methods.lockLength(this.state.view_address).call();
    console.log(length);
  };

  render() {
      return (
      <div>
        <Form onSubmit = {this.viewIncentive}>
        <h4>View Incentive</h4>
          <Form.Field>
            <label>Address:</label>
            <Input size="mini"
              name = "address"
              value = {this.state.view_address}
              onChange={event => this.setState({view_address: event.target.value})}
              placeholder ="czr_address"
            />
          </Form.Field>
          <Button type="submit" size="mini">Enter</Button>
        </Form>
      </div>
    );
  }
}

export default ViewIncentive;

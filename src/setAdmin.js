import React, {Component} from 'react';
import admin from './abi';
import Dropdown from './Dropdown'

class SetAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      adjust_address: '',
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
                }
              ]
    }
  }

  resetThenSet = (id, key) => {
      let temp = JSON.parse(JSON.stringify(this.state[key]));
      temp.forEach(item => item.selected = false);
      temp[id].selected = true;
      this.setState({
        [key]: temp
      });
    }

  set = async (event) => {
  event.preventDefault();
  this.props.parentWaiting();
  let code = 9;
  await admin.methods.setAdmin(this.state.adjust_address).sendBlock(
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

  if(code === 0) {
      this.props.parentSuccess();
  }
  else {
    this.props.parentFail();
  }

  const admins = await admin.methods.getAdmins().call()
  console.log(admins)
  };

  remove = async (event) => {
  event.preventDefault();
  this.props.parentWaiting();
  let code = 9;
  await admin.methods.removeAdmin(this.state.adjust_address).sendBlock(
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

  if(code === 0) {
      this.props.parentSuccess();
  }
  else {
    this.props.parentFail();
  }

  const admins = await admin.methods.getAdmins().call()
  console.log(admins)
  };

  render() {
      return (
      <div>

        <h4>Change Priviledges</h4>
        <Dropdown   title="Select Option"
                    list={this.state.function}
                    resetThenSet={this.resetThenSet}
                    />
        <form onSubmit = {this.set}>
          <div>
            <label>Address:</label>
            <input
              name = "address"
              value = {this.state.adjust_address}
              onChange={event => this.setState({adjust_address: event.target.value})}
            />
          </div>
          <button>Enter</button>
          </form>
        </div>
    );
  }
}

export default SetAdmin;

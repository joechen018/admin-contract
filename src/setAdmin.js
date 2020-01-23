import React, {Component} from 'react';
import admin from './abi';

class SetAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      set_admin: ''
    }
  }

  set = async (event) => {
  event.preventDefault();
  this.props.parentWaiting();
  let code = 9;
  await admin.methods.setAdmin(this.state.set_admin).sendBlock(
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
        <h4>Set Admin</h4>
        <form onSubmit = {this.set}>
          <div>
            <label>Address:</label>
            <input
              name = "address"
              value = {this.state.set_admin}
              onChange={event => this.setState({set_admin: event.target.value})}
            />
          </div>
          <button>Enter</button>
          </form>
        </div>
    );
  }
}

export default SetAdmin;

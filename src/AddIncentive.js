import React, {Component} from 'react';
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
    this.props.parentWaiting();
    let code = 9;
    await admin.methods.addCZRLock(this.state.add_address, this.state.add_start, this.state.add_amount, this.state.add_month).sendBlock(
      {
        from: this.props.parentAddress,
        password: this.props.parentPassword,		// Sender's account password
      	gas: 2000000,
      	gas_price: '1000000000',
      	amount: "0"
      })
       .then(data =>
             {
               console.log(code)
               code = 0;
             }).catch(function (error) {
               console.log(code)
                code = 10;
              });

    if(code === 0) {
        this.props.parentSuccess();
    }
    else {
      this.props.parentFail();
    }

  };

  render() {
      return (
      <div>

        <h4>Add Incentive</h4>
        <form onSubmit = {this.addIncentive}>
          <div>
            <label>Address:</label>
            <input
              name = "address"
              value = {this.state.add_address}
              onChange={event => this.setState({add_address: event.target.value})}
            />
          </div>
          <div>
            <label>Start Lock Time:</label>
            <input
              name = "start_lock_time"
              value = {this.state.add_start}
              onChange={event => this.setState({add_start: event.target.value})}
            />
          </div>
          <div>
            <label>Amount (can):</label>
            <input
              name = "start_lock_time"
              value = {this.state.add_amount}
              onChange={event => this.setState({add_amount: event.target.value})}
            />
          </div>
          <div>
            <label>Months:</label>
            <input
              name = "start_lock_time"
              value = {this.state.add_month}
              onChange={event => this.setState({add_month: event.target.value})}
            />
          </div>
          <button>Enter</button>
          </form>
        </div>
    );
  }
}

export default AddIncentive;

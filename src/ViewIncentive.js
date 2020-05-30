import React, {Component} from 'react';
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

        <h4>View Incentive</h4>
        <form onSubmit = {this.viewIncentive}>
          <div>
            <label>Address:</label>
            <input
              name = "address"
              value = {this.state.view_address}
              onChange={event => this.setState({view_address: event.target.value})}
            />
          </div>
          <button>Enter</button>
          </form>
        </div>
    );
  }
}

export default ViewIncentive;

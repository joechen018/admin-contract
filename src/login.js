import React, {Component} from 'react';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: '',
      pass: ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    let code = 9;
    this.props.parentlogin();
    await this.props.contract.methods.pay().sendBlock(
      {
        from: this.state.user,
        password: this.state.pass,
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
      const admin = await this.props.contract.methods.isAdmin(this.state.user).call();
      const unlocker = await this.props.contract.methods.isUnlocker(this.state.user).call();
      this.props.parentCallback(this.state.user, this.state.pass, admin, unlocker);
    }
    else {
        this.props.parentloginfail();
    }
  };


  render() {
      return (
        <div>
        <form onSubmit = {this.onSubmit}>
          <div>
            <label>Address:</label>
            <input
              name = "address"
              value = {this.state.user}
              onChange={event => this.setState({user: event.target.value})}
            />
            <div />
            <label>Password: </label>
            <input
              type = "password"
              name = "password"
              value = {this.state.pass}
              onChange={event => this.setState({pass: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
        </div>
    );
  }
}

export default Login;

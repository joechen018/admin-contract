import React, {Component} from 'react';
import {Modal,Icon, Button, Form, Menu} from 'semantic-ui-react'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      loginStatus: 'Log In',
      priviledge: '',
      userString: '',
      loginMessage: ''
    }
  }


  setPriviledge = async (owner, admin, unlocker) => {
    if (this.state.user === owner) {
      this.setState({priviledge: "Owner"});
      this.setState({userString: "Logged in as: " + this.state.user + " (Owner)"});
    }
    else if(admin) {
      this.setState({priviledge: "Admin"});
      this.setState({userString: "Logged in as: " + this.state.user + " (Admin)"});

    }
    else if(unlocker) {
      this.setState({priviledge: "Unlocker"});
      this.setState({userString: "Logged in as: " + this.state.user + " (Unlocker)"});
    }
    else {
      this.setState({priviledge: "User"});
      this.setState({userString: "Logged in as: " + this.state.user + " (User)"});
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    let code = 9;
    this.setState({loginMessage: 'Logging in...'});
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
      const owner = await this.props.contract.methods.owner().call();
      this.setPriviledge(owner, admin, unlocker);
      this.onClose();
      this.props.parentCallback(this.state.user, this.state.pass, this.state.priviledge);
      this.setState({loginStatus: 'Log Out'});
      this.setState({loginMessage: ''});
    }
    else {
        this.setState({loginMessage: 'Login failed. Double check your address and password.'});
    }
  };

  onClose = () => this.setState({open: false});

  toggleLogin = () => {
    this.setState({loginMessage: ''});
    if(this.state.loginStatus === 'Log In') {
      this.setState({open: true});
    }
    if(this.state.loginStatus === 'Log Out') {
      this.setState({
        open: false,
        userString: '',
        priviledge: '',
        user: '',
        pass: '',
        loginStatus: 'Log In',
        loginMessage: ''
      }, () => {
        this.props.parentCallback(this.state.user, this.state.pass, this.state.priviledge);
      });
    }
  }

  render() {
      let userString;
      if(this.state.loginStatus === 'Log Out') {
        userString = <Menu.Item>{this.state.userString}</Menu.Item>;
      }
      let userMessage;
      if(this.state.loginMessage !== '') {
        userMessage = <p>{this.state.loginMessage}</p>;
      }

      return (
        <div>
          <Modal size="tiny" open={this.state.open} onClose={this.onClose} closeIcon>
            <Modal.Header>
              <span>CZR Account Login</span>
            </Modal.Header>
            <Modal.Content>
              <Form onSubmit = {this.onSubmit}>
                {userMessage}
                <Form.Field>
                  <label>CZR Address:</label>
                  <input onChange={event => this.setState({user: event.target.value})}/>
                </Form.Field>
                <Form.Field>
                  <label>Password:</label>
                  <input type = "password" onChange={event => this.setState({pass: event.target.value})}/>
                </Form.Field>
                <Button type="submit">
                  <Icon name='checkmark' /> Log In
                </Button>
              </Form>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
          </Modal>
          <div id="navbar" class = "ui top fixed menu">
            <div class="header item">Incentives Contract</div>
            <div class="right menu">
              {userString}
              <a class="item" id="login" onClick={this.toggleLogin}>{this.state.loginStatus}</a>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;

// <form onSubmit = {this.onSubmit}>
//   <div>
//     <label>Address:</label>
//     <input
//       name = "address"
//       value = {this.state.user}
//       onChange={event => this.setState({user: event.target.value})}
//     />
//     <div />
//     <label>Password: </label>
//     <input
//       type = "password"
//       name = "password"
//       value = {this.state.pass}
//       onChange={event => this.setState({pass: event.target.value})}
//     />
//   </div>
//   <button>Enter</button>
// </form>

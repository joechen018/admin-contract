import React, { Component } from 'react'
import admin from './abi';
import FontAwesome from 'react-fontawesome'

class PriviledgeDropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      adjust_address: '',
      function: '',
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  priviledge = (event) => {
    event.preventDefault();
    const id = this.state.function;
    if(id ===0) {
      this.setAdmin();
    }
    if(id === 1) {
      this.removeAdmin();
    }
    if(id === 2) {
      this.setUnlocker();
    }
    if(id === 3) {
      this.removeUnlocker();
    }
    if(id === 4) {
      this.transferOwnership();
    }
  }

  async transferOwnership() {
      this.props.parentWaiting();
      let code = 9;
      await admin.methods.transferOwnership(this.state.adjust_address).sendBlock(
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

  };


  async setAdmin() {
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

  async setUnlocker() {
      this.props.parentWaiting();
      let code = 9;
      await admin.methods.setUnlocker(this.state.adjust_address).sendBlock(
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

      const unlockers = await admin.methods.getUnlockers().call()
      console.log(unlockers)
  };

  async removeAdmin() {
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

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  async removeUnlocker() {
      this.props.parentWaiting();
      let code = 9;
      await admin.methods.removeUnlocker(this.state.adjust_address).sendBlock(
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

      const unlockers = await admin.methods.getUnlockers().call()
      console.log(unlockers)
  };

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: title,
      listOpen: false,
      function: id
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <span>Adjustment:</span><div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up"/>
            : <FontAwesome name="angle-down"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
        <form onSubmit = {this.priviledge}>
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
    )
  }
}

export default PriviledgeDropdown

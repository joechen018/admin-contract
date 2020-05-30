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
      headerTitle: this.props.title,
      func: ''
    }
    this.close = this.close.bind(this)
  }

  priviledge = async (event) => {
    event.preventDefault();
    const id = this.state.function;
    if(id ===0) {
      await this.setState({func : admin.methods.setAdmin(this.state.adjust_address)});
      this.adjustPriviledge();
    }
    if(id === 1) {
      await this.setState({func : admin.methods.removeAdmin(this.state.adjust_address)});
      this.adjustPriviledge();
    }
    if(id === 2) {
      await this.setState({func : admin.methods.setUnlocker(this.state.adjust_address)});
      this.adjustPriviledge();
    }
    if(id === 3) {
      await this.setState({func : admin.methods.removeUnlocker(this.state.adjust_address)});
      this.adjustPriviledge();
    }
    if(id === 4) {
      await this.setState({func : admin.methods.transferOwnership(this.state.adjust_address)});
      this.adjustPriviledge();
    }
  }

  async adjustPriviledge() {
      this.props.parentWaiting(true);
      let code = 9;
      await this.state.func.sendBlock(
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
      this.props.parentWaiting(false);
      if(code === 0) {
          this.props.parentSuccess('Your transaction has been processed on the blockchain.');
      }
      else {
        this.props.parentFail('Please check your inputs and priviledges. Make sure you are logged in.');
      }
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
      <div>
        <h4>
                Adjust Priviledges:
        </h4>
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
      </div>
    )
  }
}

export default PriviledgeDropdown

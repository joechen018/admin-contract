import React, {Component} from 'react';
import {Form, Dropdown,Input, Button, Table} from 'semantic-ui-react'
import admin from './abi';

class ViewIncentive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      view_address: '',
      list: '',
      length: ''
    }
  }


  viewIncentive = async (event) => {
    event.preventDefault();
    this.setState({list: ''});
    let length = '';
    let realLength = 0;
    let code = '';
    await admin.methods.lockLength(this.state.view_address).call().then(
      data =>
            {
              length = data;
              code = 0;
            }).catch(function (error) {
               code = 10;
             }
    );
    if(code !== 0) {
      this.props.parentFail('Make sure your input address is valid.');
    }
    this.setState({length: parseInt(length)});
    if(this.state.length > 0) {
      let add = [];
      for(let i = 0; i < length; i++) {
        let data = await admin.methods.czrDetail(i, this.state.view_address).call();
        let temp = {id: i,
                    startLockTime: parseInt(data["0"]),
                    lockMonth: parseInt(data["1"]),
                    lockedAmount: parseInt(data["2"]),
                    unlockedAmount: parseInt(data["3"])};
        if(temp.startLockTime === 0 && temp.lockMonth === 0 && temp.lockedAmount === 0 && temp.unlockedAmount === 0) {
           console.log("removed");
        }
        else {
          add.push(temp);
          realLength += 1;
        }
      }
      this.setState({length: realLength});
      if(this.state.list !== '') {
        this.setState({list: this.state.list.concat(add)});
        this.props.parentSuccess('Your can now view the incentive plans for this address below.');
      }
      else if (add.length !== 0){
        // console.log(add);
        this.setState({list: add});
        this.props.parentSuccess('Your can now view the incentive plans for this address below.');
      }
    }
  };

  dateString = (inputTime) => {
    let date = new Date(inputTime * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let year = date.getFullYear();
    // let convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes;
    let convdataTime = month+'-'+day+'-'+year;
    return convdataTime;
  }

  createTable = () => {
    let table = [];
    let header = [];
    let children = [];
    header.push(<Table.Header>
      <Table.Row>
        <Table.HeaderCell>id</Table.HeaderCell>
        <Table.HeaderCell>Start Date</Table.HeaderCell>
        <Table.HeaderCell>Months</Table.HeaderCell>
        <Table.HeaderCell>Locked</Table.HeaderCell>
        <Table.HeaderCell>Unlocked</Table.HeaderCell>
      </Table.Row>
    </Table.Header>);
    for (var i = 0; i < this.state.length; i++) {
      const value = this.state.list[i];
      console.log(this.state.list[i]);
      children.push(<Table.Row>
                <Table.Cell>{value.id}</Table.Cell>
                <Table.Cell>{this.dateString(value.startLockTime)}</Table.Cell>
                <Table.Cell>{value.lockMonth}</Table.Cell>
                <Table.Cell>{value.lockedAmount}</Table.Cell>
                <Table.Cell>{value.unlockedAmount}</Table.Cell>
              </Table.Row>);
    }
    table.push(<h4>Incentive Plans for {this.state.view_address.substr(0,20)}...</h4>);
    table.push(<p>Note: 1 Month = 30 seconds for testing purposes</p>);
    table.push(<Table basic='very' celled collapsing>{header}<Table.Body>{children}</Table.Body></Table>);
    return table;
  }

  render() {
      let tableView = '';
      if(this.state.list !== '') {
        tableView = this.createTable();
      }
      else if(this.state.length === 0) {
        tableView = <div><br /><p>This address currently has no incentive plan.</p></div>;
      }
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
        {tableView}
      </div>
    );
  }
}

export default ViewIncentive;

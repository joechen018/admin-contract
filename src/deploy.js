const compile = require('./compile');
const Czr = require('czr');
const czr = new Czr();

let czrUrl = 'http://127.0.0.1:8765/';
const account = 'czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u';		 // Sender's account
czr.Contract.setProvider(czrUrl);
const myContract = new czr.Contract(compile.abi);


myContract.deploy({
              data: compile.contractByteCode
          })
              .sendBlock({
      			from: account,
                  password: '12345678',	// Sender's account password
      			gas: 2000000,
      			gas_price: '1000000000',
                  amount: "0"
              })
              .then(function (res) {
                  console.log(res)
              })
              .catch(function (error) {
                console.log('catch', error)
              });

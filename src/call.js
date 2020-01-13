const compile = require('./compile');
const Czr = require('czr');
const czr = new Czr();

let czrUrl = 'http://127.0.0.1:8765/';
const account = 'czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u';		//Sender's account
czr.Contract.setProvider(czrUrl);

const myContract = new czr.Contract(compile.abi,'czr_4jWQQVDtim64cs9ecB3DVpeLMPvZxbRmJmvS3cGZ6RcAEggg2U');	// Contract address

myContract.methods.owner()
.call()
.then(data =>
           {
           		console.log(data)
           }).catch(function (error) {
                console.log(error)
            });

//czr_3Q23wMpFq9wScD1sVuGPiyv7xwoeNuh7chQ5MBf9Y4ictXERcd
// myContract.methods.isAdmin('0x46540a7aefA54ab03827fd98Bde3ec120cB1ad4f')
//   .call()
//   .then(data =>
//              {
//              		console.log(data)
//              }).catch(function (error) {
//                   console.log(error)
//               });

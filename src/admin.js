const compile = require('./compile');
const Czr = require('czr');
const czr = new Czr();

let czrUrl = 'http://127.0.0.1:8765/';
const account = 'czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u';		//Sender's account
czr.Contract.setProvider(czrUrl);

const contract = new czr.Contract(compile.abi,'czr_4jWQQVDtim64cs9ecB3DVpeLMPvZxbRmJmvS3cGZ6RcAEggg2U');
module.exports={
  contract
}

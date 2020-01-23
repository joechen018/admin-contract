const compile = require('./compile');
const Czr = require('czr');
const czr = new Czr();

let czrUrl = 'http://127.0.0.1:8765/';
const account = 'czr_33EuccjKjcZgwbHYp8eLhoFiaKGARVigZojeHzySD9fQ1ysd7u';		//Sender's account
czr.Contract.setProvider(czrUrl);

const contract = new czr.Contract(compile.abi,'czr_47LZeGuwmo2jLA7sXiHe8UPoGBWo1KFUkiPPLkHxmh9nddAuFR');
module.exports={
  contract
}

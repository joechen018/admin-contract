const path = require('path');
const fs = require('fs');
const solc = require('czr-solc');
const stringifyObject = require('stringify-object');
// Run in nodejs and npm install stringify-object
// ABI save Start

// ABI save End

const srcpath = path.resolve(__dirname,'contracts','locker.sol');
const source = fs.readFileSync(srcpath,'utf-8');

let input={
    "language":'Solidity',
    "sources":{
        'locker.sol':{
            "content":source
        }
    },
    "settings":{
        "optimizer": {
            "enabled": true,
            "runs": 200
        },
        "outputSelection": {
            '*':{
                '': [ 'legacyAST' ],
                '*': [ 'abi', 'metadata', 'devdoc', 'userdoc', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates' ]
            }
        }
    }
}

let output = JSON.parse(solc.compile(JSON.stringify(input)));
let contractByteCode= output.contracts['locker.sol']['CZRLocker'].evm.bytecode.object;
let abi= output.contracts['locker.sol']['CZRLocker']['abi'];

const pretty = stringifyObject(abi, {
    indent: '  ',
    singleQuotes: false
});
fs.writeFile('./aaa.js', pretty, 'UTF-8', function (err) {
    err ? console.error(err) : console.log('Success');
});

module.exports={
    contractByteCode:contractByteCode,
    abi:abi
}

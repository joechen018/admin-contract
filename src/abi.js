const Czr = require('czr');
const czr = new Czr();
let czrUrl = 'http://127.0.0.1:8765/';
czr.Contract.setProvider(czrUrl);

const address = 'czr_3CgoBhLRWcagC5BmKjryG6zbjALekDziMjr37tXabh1qNAd4SL';

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      }
    ],
    name: "removeAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "pay",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      }
    ],
    name: "removeUnlocker",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "isAdmin",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getAdmins",
    outputs: [
      {
        name: "",
        type: "address[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      }
    ],
    name: "setAdmin",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "isUnlocker",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getUnlockers",
    outputs: [
      {
        name: "",
        type: "address[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      }
    ],
    name: "setUnlocker",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      }
    ],
    name: "NewOwner",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      }
    ],
    name: "NewAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      }
    ],
    name: "LostAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      }
    ],
    name: "NewUnlocker",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      }
    ],
    name: "LostUnlocker",
    type: "event"
  }
];

export default new czr.Contract(abi,address);

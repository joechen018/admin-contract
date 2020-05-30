const Czr = require('czr');
const czr = new Czr();
let czrUrl = 'http://127.0.0.1:8765/';
czr.Contract.setProvider(czrUrl);

const address = 'czr_4pzeoqnLGtzbf5zcNM11LyxvTXUNumb5KQqt3C2RJ7HGbpf8xP';

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      },
      {
        name: "index",
        type: "uint256"
      }
    ],
    name: "removeCZRLock",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "addr",
        type: "address"
      }
    ],
    name: "lockLength",
    outputs: [
      {
        name: "",
        type: "uint256"
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
      },
      {
        name: "startLockTime",
        type: "uint256"
      },
      {
        name: "amount",
        type: "uint256"
      },
      {
        name: "lockMonth",
        type: "uint256"
      }
    ],
    name: "addCZRLock",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    constant: false,
    inputs: [
      {
        name: "addr",
        type: "address"
      },
      {
        name: "limit",
        type: "uint256"
      }
    ],
    name: "unlockCZR",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    name: "test",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "lockedCZRMap",
    outputs: [
      {
        name: "startLockTime",
        type: "uint256"
      },
      {
        name: "lockMonth",
        type: "uint256"
      },
      {
        name: "lockedAmount",
        type: "uint256"
      },
      {
        name: "unlockedAmount",
        type: "uint256"
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      },
      {
        indexed: false,
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        name: "startLockTime",
        type: "uint256"
      },
      {
        indexed: false,
        name: "lockMonth",
        type: "uint256"
      },
      {
        indexed: false,
        name: "lockedAmount",
        type: "uint256"
      }
    ],
    name: "AddLock",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      },
      {
        indexed: false,
        name: "index",
        type: "uint256"
      }
    ],
    name: "RemoveLock",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "addr",
        type: "address"
      },
      {
        indexed: false,
        name: "index",
        type: "uint256"
      },
      {
        indexed: false,
        name: "unlockAmount",
        type: "uint256"
      }
    ],
    name: "Unlock",
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

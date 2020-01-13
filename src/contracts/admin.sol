pragma solidity >=0.5.4;

contract owned {
    address public owner;

    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isUnlocker;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin {
        require(msg.sender == owner || isAdmin[msg.sender]);
        _;
    }

    modifier onlyUnlocker {
        require(msg.sender == owner || isAdmin[msg.sender] || isUnlocker[msg.sender]);
        _;
    }

    function pay() payable public{

    }

    function setAdmin(address addr) onlyOwner public{
        isAdmin[addr] = true;
    }

    function removeAdmin(address addr) onlyOwner public{
        isAdmin[addr] = false;
    }

    function setUnlocker(address addr) onlyAdmin public{
        isUnlocker[addr] = true;
    }

    function removeUnlocker(address addr) onlyAdmin public{
        isUnlocker[addr] = false;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }

}

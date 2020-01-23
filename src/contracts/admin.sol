pragma solidity >=0.5.4;

contract owned {
    address public owner;

    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isUnlocker;

    address[] admins;
    address[] unlockers;

    event NewOwner(address addr);
    event NewAdmin(address addr);
    event LostAdmin(address addr);
    event NewUnlocker(address addr);
    event LostUnlocker(address addr);

    constructor() public {
        owner = msg.sender;
    }

    function getAdmins()public view returns(address [] memory){
        uint length = admins.length;
        address[] memory adminsTrue = new address[](length);
        for(uint i = 0; i < admins.length; i++) {
            // if(admins[i] != "")
            adminsTrue[i] = admins[i];
        }
        return adminsTrue;
    }

    function getUnlockers()public view returns(address  [] memory){
        uint length = unlockers.length;
        address[] memory unlockersTrue = new address[](length);
        for(uint i = 0; i < unlockers.length; i++) {
            // if(isUnlocker[unlockers[i]])
            unlockersTrue[i] = unlockers[i];
        }
        return unlockersTrue;
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
        if(isAdmin[addr] == false) {
            isAdmin[addr] = true;
            admins.push(addr);
            emit NewAdmin(addr);
        }
    }

    function removeAdmin(address addr) onlyOwner public{
        isAdmin[addr] = false;
        for(uint i = 0; i < admins.length; i++) {
            if(!isAdmin[admins[i]])
                delete admins[i];
        }
        emit LostAdmin(addr);
    }

    function setUnlocker(address addr) onlyAdmin public{
        if(isUnlocker[addr] == false) {
            isUnlocker[addr] = true;
            unlockers.push(addr);
            emit NewUnlocker(addr);
        }
    }

    function removeUnlocker(address addr) onlyAdmin public{
        isUnlocker[addr] = false;
        for(uint i = 0; i < unlockers.length; i++) {
            if(!isUnlocker[unlockers[i]])
                delete unlockers[i];
        }
        emit LostUnlocker(addr);
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
        emit NewOwner(owner);
    }

}

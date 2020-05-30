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

contract CZRLocker is owned {

    event AddLock(address addr, uint index, uint startLockTime, uint lockMonth, uint lockedAmount);
    event RemoveLock(address addr, uint index);
    event Unlock(address addr, uint index, uint unlockAmount);

    struct LockedCZR {
        uint startLockTime;
        uint lockMonth;
        uint lockedAmount;
        uint unlockedAmount;
    }

    mapping(address => LockedCZR[]) public lockedCZRMap;

    function lockLength(address addr) public view returns(uint) {
        return lockedCZRMap[addr].length;
    }

    // for some reason delete does not work
    function removeCZRLock(address addr, uint index) onlyAdmin public {
        require(lockedCZRMap[addr].length > 0 && index < lockedCZRMap[addr].length);
        delete lockedCZRMap[addr][index];      //delete just set all feilds to zero value, not remove item out of array;
        emit RemoveLock(addr, index);
    }

    function addCZRLock(address addr, uint startLockTime, uint amount, uint lockMonth) onlyAdmin public {
        require(amount > 0);
        if (startLockTime == 0)
            startLockTime = now;
        else
            startLockTime = startLockTime + now;
        lockedCZRMap[addr].push(LockedCZR(startLockTime, lockMonth, amount, 0));
        uint index = lockedCZRMap[addr].length - 1;
        emit AddLock(addr, index, startLockTime, lockMonth, amount);
    }

    function unlockCZR(address payable addr, uint limit) onlyUnlocker public {
        require(msg.sender == owner);

        LockedCZR[] memory lockArr = lockedCZRMap[addr];
        require(lockArr.length > 0);

        uint num = 0;
        for (uint i = 0; i < lockedCZRMap[addr].length; i++) {
            // LockedCZR memory lock = lockArr[i];
            if (lockedCZRMap[addr][i].lockedAmount > 0) {
                uint time = now - lockedCZRMap[addr][i].startLockTime;
                uint month = time / 30 seconds;

                if (month == 0)
                    continue;

                uint unlockAmount;
                if (month >= lockedCZRMap[addr][i].lockMonth)
                    unlockAmount = lockedCZRMap[addr][i].lockedAmount;
                else
                    unlockAmount = (lockedCZRMap[addr][i].lockedAmount + lockedCZRMap[addr][i].unlockedAmount) * month / lockedCZRMap[addr][i].lockMonth - lockedCZRMap[addr][i].unlockedAmount;

                if (unlockAmount == 0)
                    continue;

                lockedCZRMap[addr][i].unlockedAmount += unlockAmount;
                lockedCZRMap[addr][i].lockedAmount -= unlockAmount;

                addr.transfer(unlockAmount);
                emit Unlock(addr, i, unlockAmount);

                num++;
                if (limit > 0 && num == limit)
                    break;
            }
        }

        // require(num > 0);
    }

    function pay() payable public {

    }

    function test(address payable addr) onlyOwner public {
        addr.transfer(1000);
    }

}

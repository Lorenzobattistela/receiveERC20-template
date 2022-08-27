// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/Strings.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract ReceiveERC20 is AccessControl, Ownable {
    struct TokenInfo {
        IERC20 paytoken;
        uint256 cost;
    }

    TokenInfo erc20Token;

    constructor(IERC20 _erc20token, uint256 _cost) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        erc20Token.paytoken = _erc20token;
        erc20Token.cost = _cost;
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function changeErc20 (IERC20 _newErc20, uint256 _newCost) public onlyAdmin  {
        erc20Token.paytoken = _newErc20;
        erc20Token.cost = _newCost;
    }  

    function payContract() public payable {
        IERC20 paytoken;
        paytoken = erc20Token.paytoken;
        paytoken.transfer(address(this), erc20Token.cost);
    }

    function withdraw() public payable onlyOwner() {
        TokenInfo storage tokens = erc20Token;
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
    }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller is not an Window Admin'
        );
        _;
    }
    
}
//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.10;

import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Auction is IERC721Receiver, Ownable {
    IERC721 private nft;
    IERC20 private token;

    uint public constant MINIMUM_BID_RATE = 110;
    uint public AUCTION_SERVICE_FEE_RATE = 3;

    event SetToken(IERC20 _token);
    event SetTax(uint256 tax);
    event SetNFT(IERC721 _nft);

    constructor(IERC20 _token, IERC721 _nft) {
        token = _token;
        nft = _nft;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    struct AuctionInfo {
        address auctioneer;
        uint256 _tokenId;
        uint256 initialPrice;
        uint256 lastBid;
        address lastBidder;
        uint256 startTime;
        uint256 endTime;
        bool completed;
        uint256 auctionId;
    }

    AuctionInfo[] private auction;

    function setTax(uint256 _tax) public onlyOwner {
        AUCTION_SERVICE_FEE_RATE = _tax;
        emit SetTax(_tax);
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
        emit SetToken(_token);
    }

    function setNFT(IERC721 _nft) public onlyOwner {
        nft = _nft;
        emit SetNFT(_nft);
    }

    function createAuction(
        uint256 _tokenId,
        uint256 _initialPrice,
        uint256 _startTime,
        uint256 _endTime
    ) public {
        require(block.timestamp <= _startTime, "Auction can not start");
        require(_startTime < _endTime, "Auction can not end before it starts");
        require(0 < _initialPrice, "Initial price must be greater than 0");

        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Must be the owner to create auction"
        );
        require(
            nft.getApproved(_tokenId) == address(this),
            "Contract must be approved to transfer the token"
        );

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        AuctionInfo memory _auction = AuctionInfo(
            msg.sender,
            _tokenId,
            _initialPrice,
            _initialPrice,
            address(0),
            _startTime,
            _endTime,
            false,
            auction.length
        );
        auction.push(_auction);
    }

    function joinAuction(uint256 _auctionId, uint256 _bid) public {
        AuctionInfo memory _auction = auction[_auctionId];

        require(
            block.timestamp >= _auction.startTime,
            "Auction has not started yet"
        );
        require(!_auction.completed, "Auction is already completed");

        uint256 _minBid = _auction.lastBidder == address(0)
            ? _auction.lastBid
            : (_auction.lastBid * MINIMUM_BID_RATE) / 100;

        require(_minBid <= _bid, "Bid price is smaller than minimum bid price");

        require(token.balanceOf(msg.sender) >= _bid, "Insufficient balance");
        require(
            token.allowance(msg.sender, address(this)) >= _bid,
            "Insufficient allowance"
        );

        require(
            _auction.auctioneer != msg.sender,
            "Can not bid on your own auction"
        );

        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _bid);

        if (_auction.lastBidder != address(0)) {
            token.transfer(_auction.lastBidder, _auction.lastBid);
        }

        auction[_auctionId].lastBidder = msg.sender;
        auction[_auctionId].lastBid = _bid;
    }

    function finishAuction(
        uint256 _auctionId
    ) public onlyAuctioneer(_auctionId) {
        AuctionInfo memory _auction = auction[_auctionId];

        require(!_auction.completed, "Auction is already completed");

        if (_auction.lastBidder == address(0)) {
            nft.safeTransferFrom(
                address(this),
                _auction.auctioneer,
                _auction._tokenId
            );
        } else {
            nft.safeTransferFrom(
                address(this),
                _auction.lastBidder,
                _auction._tokenId
            );

            uint256 lastBid = _auction.lastBid;
            uint256 profit = lastBid - _auction.initialPrice;

            uint256 auctionServiceFee = (profit * AUCTION_SERVICE_FEE_RATE) /
                100;
            uint256 auctioneerReceive = lastBid - auctionServiceFee;

            token.transfer(_auction.auctioneer, auctioneerReceive);
        }

        auction[_auctionId].completed = true;
    }

    function cancelAuction(
        uint256 _auctionId
    ) public onlyAuctioneer(_auctionId) {
        AuctionInfo memory _auction = auction[_auctionId];
        require(!_auction.completed, "Auction is already completed");

        nft.safeTransferFrom(
            address(this),
            _auction.auctioneer,
            _auction._tokenId
        );

        if (_auction.lastBidder != address(0)) {
            token.transfer(_auction.lastBidder, _auction.lastBid);
        }
        auction[_auctionId].completed = true;
    }

    function getAuction(
        uint256 _auctionId
    ) public view returns (AuctionInfo memory) {
        return auction[_auctionId];
    }

    function getAuctionByStatus(
        bool _active
    ) public view returns (AuctionInfo[] memory) {
        uint256 len = 0;

        for (uint256 i = 0; i < auction.length; i++) {
            if (auction[i].completed != _active) {
                len++;
            }
        }

        AuctionInfo[] memory results = new AuctionInfo[](len);

        uint256 j = 0;
        for (uint256 i = 0; i < auction.length; i++) {
            if (auction[i].completed != _active) {
                results[j] = auction[i];
                j++;
            }
        }

        return results;
    }

    function withdrawToken(uint256 amount) public onlyOwner {
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient account balance"
        );
        token.transfer(msg.sender, amount);
    }

    function withdrawERC20() public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyAuctioneer(uint256 _auctionId) {
        require(
            (msg.sender == auction[_auctionId].auctioneer) ||
                (msg.sender == owner()),
            "Only auctioneer or owner can perform this action"
        );
        _;
    }
}

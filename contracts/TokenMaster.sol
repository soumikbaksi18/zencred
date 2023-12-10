// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenMaster is ERC721 {
    address public owner;
    uint256 public totalOccasions;
    uint256 public totalSupply;
    uint256 public discountThreshold = 100;
    using SafeMath for uint256;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    struct Ticket {
        uint256 id;
        uint256 occasionId;
        uint256 seat;
    }

    mapping(uint256 => Occasion) occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
    mapping(address => Ticket[]) public userTickets;
    mapping(address => string) public userDiscountCoupons; // Added mapping for user discount coupons

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++;
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    event OccasionDetails(uint256 id, uint256 cost, uint256 tickets);

    function mint(uint256 _id, uint256 _seat) public payable {
        // Validate input parameters
        require(_id != 0, "Invalid occasion ID");
        require(_id <= totalOccasions, "Occasion ID out of range");
        require(msg.value > 0, "Invalid value sent");

        // Get the ticket cost
        uint256 ticketCost = occasions[_id].cost;

        // Apply discount logic if user has a discount coupon
        if (bytes(userDiscountCoupons[msg.sender]).length > 0) {
            require(
                validateDiscountCoupon(userDiscountCoupons[msg.sender]),
                "Invalid discount coupon"
            );
            // Assume a 10% discount for this example
            uint256 discount = 1;
            ticketCost = ticketCost.sub(discount);
        }

        // Ensure that the sent value is at least the ticket cost
        require(msg.value >= ticketCost, "Insufficient funds");

        // Ensure that the seat is not taken, and the seat exists
        require(seatTaken[_id][_seat] == address(0), "Seat already taken");
        require(_seat <= occasions[_id].maxTickets, "Seat out of range");

        // Update ticket count and user status
        occasions[_id].tickets -= 1;
        hasBought[_id][msg.sender] = true;

        // Assign seat and update seats currently taken
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat);

        // Mint a new token
        totalSupply++;
        Ticket memory newTicket = Ticket({
            id: totalSupply,
            occasionId: _id,
            seat: _seat
        });
        userTickets[msg.sender].push(newTicket);
        _safeMint(msg.sender, totalSupply);
        emit OccasionDetails(_id, occasions[_id].cost, occasions[_id].tickets);
    }

    function applyDiscountCoupon(string memory coupon) public {
        require(
            bytes(userDiscountCoupons[msg.sender]).length == 0,
            "Discount coupon already applied"
        );
        require(validateDiscountCoupon(coupon), "Invalid discount coupon");
        userDiscountCoupons[msg.sender] = coupon;
    }

    function validateDiscountCoupon(
        string memory coupon
    ) public pure returns (bool) {
        return
            keccak256(abi.encodePacked(coupon)) ==
            keccak256(abi.encodePacked("CARB7772618"));
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        Occasion memory occasion = occasions[_id];

        // Calculate the ticket cost dynamically based on the discount coupon
        if (bytes(userDiscountCoupons[msg.sender]).length > 0) {
            require(
                validateDiscountCoupon(userDiscountCoupons[msg.sender]),
                "Invalid discount coupon"
            );
            // Assume a 10% discount for this example
            uint256 discount = (occasion.cost * 10) / 100;
            occasion.cost = occasion.cost - discount;
        }

        return occasion;
    }

    function getUserTickets(
        address user
    ) public view returns (Ticket[] memory) {
        Ticket[] storage userTicketStorage = userTickets[user];
        Ticket[] memory userTicketMemory = new Ticket[](
            userTicketStorage.length
        );

        for (uint i = 0; i < userTicketStorage.length; i++) {
            userTicketMemory[i] = userTicketStorage[i];
        }

        return userTicketMemory;
    }

    function getTicketDetails(
        address user,
        uint256 _ticketId
    ) public view returns (uint256, uint256, uint256) {
        require(_ticketId < userTickets[user].length, "Ticket ID out of range");

        Ticket memory ticket = userTickets[user][_ticketId];
        return (ticket.id, ticket.occasionId, ticket.seat);
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}

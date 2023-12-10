const { expect } = require("chai");

const NAME = "TokenMaster";
const SYMBOL = "TM";

const OCCASION_NAME = "ETH Texas";
const OCCASION_COST = ethers.utils.parseUnits("1", "ether");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Apr 27";
const OCCASION_TIME = "10:00AM CST";
const OCCASION_LOCATION = "Austin, Texas";

describe("TokenMaster", () => {
  let tokenMaster;
  let deployer, buyer;

  beforeEach(async () => {
    // Setup accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contract
    const TokenMaster = await ethers.getContractFactory("TokenMaster");
    tokenMaster = await TokenMaster.deploy(NAME, SYMBOL);

    const transaction = await tokenMaster
      .connect(deployer)
      .list(
        OCCASION_NAME,
        OCCASION_COST,
        OCCASION_MAX_TICKETS,
        OCCASION_DATE,
        OCCASION_TIME,
        OCCASION_LOCATION
      );

    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await tokenMaster.name()).to.equal(NAME);
    });

    it("Sets the symbol", async () => {
      expect(await tokenMaster.symbol()).to.equal(SYMBOL);
    });

    it("Sets the owner", async () => {
      expect(await tokenMaster.owner()).to.equal(deployer.address);
    });
  });

  describe("Occasions", () => {
    it("Returns occasions attributes", async () => {
      const occasion = await tokenMaster.getOccasion(1);
      expect(occasion.id).to.be.equal(1);
      expect(occasion.name).to.be.equal(OCCASION_NAME);
      expect(occasion.cost).to.be.equal(OCCASION_COST);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS);
      expect(occasion.date).to.be.equal(OCCASION_DATE);
      expect(occasion.time).to.be.equal(OCCASION_TIME);
      expect(occasion.location).to.be.equal(OCCASION_LOCATION);
    });

    it("Updates occasions count", async () => {
      const totalOccasions = await tokenMaster.totalOccasions();
      expect(totalOccasions).to.be.equal(1);
    });
  });

  describe("Minting", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.utils.parseUnits("1", "ether");

    beforeEach(async () => {
      const transaction = await tokenMaster
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();
    });

    it("Updates ticket count", async () => {
      const occasion = await tokenMaster.getOccasion(1);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1);
    });

    it("Updates buying status", async () => {
      const status = await tokenMaster.hasBought(ID, buyer.address);
      expect(status).to.be.equal(true);
    });

    it("Updates seat status", async () => {
      const owner = await tokenMaster.seatTaken(ID, SEAT);
      expect(owner).to.equal(buyer.address);
    });

    it("Updates overall seating status", async () => {
      const seats = await tokenMaster.getSeatsTaken(ID);
      expect(seats.length).to.equal(1);
      expect(seats[0]).to.equal(SEAT);
    });

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(tokenMaster.address);
      expect(balance).to.be.equal(AMOUNT);
    });
  });

  describe("Withdrawing", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.utils.parseUnits("1", "ether");
    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      let transaction = await tokenMaster
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();

      transaction = await tokenMaster.connect(deployer).withdraw();
      await transaction.wait();
    });

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it("Updates the contract balance", async () => {
      const balance = await ethers.provider.getBalance(tokenMaster.address);
      expect(balance).to.equal(0);
    });
  });
  describe("Tickets", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.utils.parseUnits("1", "ether");

    beforeEach(async () => {
      const transaction = await tokenMaster
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();
    });

    it("Mints a new ticket and assigns it to the buyer", async () => {
      const userTickets = await tokenMaster.getUserTickets(buyer.address);
      expect(userTickets.length).to.equal(1);
      expect(userTickets[0].id).to.equal(1); // Assuming the first minted ticket ID is 1
      expect(userTickets[0].occasionId).to.equal(ID);
      expect(userTickets[0].seat).to.equal(SEAT);
    });

    it("Gets ticket details", async () => {
      const [id, occasionId, seat] = await tokenMaster.getTicketDetails(
        buyer.address,
        0
      );
      expect(id).to.equal(1); // Assuming the first minted ticket ID is 1
      expect(occasionId).to.equal(ID);
      expect(seat).to.equal(SEAT);
    });

    it("Updates seats taken", async () => {
      const seats = await tokenMaster.getSeatsTaken(ID);
      expect(seats.length).to.equal(1);
      expect(seats[0]).to.equal(SEAT);
    });
  });
  describe("Discount Coupon", () => {
    const discountCoupon = "CARB7772618"; // Modify the discount coupon instance

    it("Allows users to apply a discount coupon", async () => {
      await tokenMaster.connect(buyer).applyDiscountCoupon(discountCoupon);

      const userCoupon = await tokenMaster.userDiscountCoupons(buyer.address);
      expect(userCoupon).to.equal(discountCoupon);
    });

    it("Applies discount during minting if user has a valid coupon", async () => {
      await tokenMaster.connect(buyer).applyDiscountCoupon(discountCoupon);

      const ticketCostBeforeDetails = await tokenMaster.getOccasion(1);
      const ticketCostBeforeInWei = ticketCostBeforeDetails.cost;
      const ticketCostBeforeInEth = ethers.utils.formatEther(
        ticketCostBeforeInWei
      );
      console.log("Ticket cost before in ETH:", ticketCostBeforeInEth);

      // Minting transaction
      const transaction = await tokenMaster
        .connect(buyer)
        .mint(1, 10, { value: OCCASION_COST });

      // Listen for the OccasionDetails event
      const receipt = await transaction.wait();
      const occasionDetailsEvent = receipt.events.find(
        (event) => event.event === "OccasionDetails"
      );

      // Log the details for debugging
      console.log("Occasion details:", occasionDetailsEvent.args);

      const ticketCostAfterDetails = await tokenMaster.getOccasion(1);
      // const ticketCostAfterInWei = ticketCostAfterDetails.cost;
      const discount = (ticketCostBeforeInEth * 10) / 100;
      const ticketCostAfterInEth = ticketCostBeforeInEth - discount;
      // ethers.utils.formatEther(ticketCostAfterInWei);
      console.log("Ticket cost after in ETH:", ticketCostAfterInEth);

      // Convert string values to numbers
      const beforeCost = parseFloat(ticketCostBeforeInEth);
      const afterCost = parseFloat(ticketCostAfterInEth);

      // Log discount coupon before applying
      console.log(
        "Discount coupon before:",
        await tokenMaster.userDiscountCoupons(buyer.address)
      );

      // Log discount coupon after applying
      console.log(
        "Discount coupon after:",
        await tokenMaster.userDiscountCoupons(buyer.address)
      );
      console.log("Gas Used:", receipt.gasUsed.toString());

      // Verify that the cost is reduced after applying the discount
      expect(afterCost).to.be.lessThan(beforeCost);
    });

    it("Does not apply discount during minting if user has no coupon", async () => {
      const ticketCostBeforeDetails = await tokenMaster.getOccasion(1);
      const ticketCostBeforeInWei = ticketCostBeforeDetails.cost;
      const ticketCostBeforeInEth = ethers.utils.formatEther(
        ticketCostBeforeInWei
      );
      console.log("Ticket cost before in ETH:", ticketCostBeforeInEth);

      // Minting transaction
      const transaction = await tokenMaster
        .connect(buyer)
        .mint(1, 20, { value: OCCASION_COST });

      // Listen for the OccasionDetails event
      const receipt = await transaction.wait();
      const occasionDetailsEvent = receipt.events.find(
        (event) => event.event === "OccasionDetails"
      );

      // Log the details for debugging
      console.log("Occasion details:", occasionDetailsEvent.args);

      const ticketCostAfterDetails = await tokenMaster.getOccasion(1);
      const ticketCostAfterInWei = ticketCostAfterDetails.cost;
      const ticketCostAfterInEth =
        ethers.utils.formatEther(ticketCostAfterInWei);
      console.log("Ticket cost after in ETH:", ticketCostAfterInEth);

      // Convert string values to numbers
      const beforeCost = parseFloat(ticketCostBeforeInEth);
      const afterCost = parseFloat(ticketCostAfterInEth);

      // Verify that the cost remains the same without applying the discount
      expect(afterCost).to.equal(beforeCost);
    });
  });
});

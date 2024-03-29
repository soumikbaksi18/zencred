const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 18)
 }

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "ETHIndia",
      cost: tokens(0.0001),
      tickets: 0,
      date: "May 31",
      time: "6:00PM EST",
      location: "Bangalore, India"
    },
    {
      name: "ETHTokyo",
      cost: tokens(0.0001),
      tickets: 125,
      date: "Jun 2",
      time: "1:00PM JST",
      location: "Tokyo, Japan"
    },
    {
      name: "ETHPrivacy ",
      cost: tokens(0.00004),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul"
    },
    {
      name: "ETHDesign",
      cost: tokens(0.0003),
      tickets: 0,
      date: "Jun 11",
      time: "2:30PM CST",
      location: "Delhi, India"
    },
    {
      name: "ETHToronto",
      cost: tokens(0.0002),
      tickets: 125,
      date: "Jun 23",
      time: "11:00AM EST",
      location: "Toronto, Canada"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
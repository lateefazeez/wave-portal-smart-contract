const main = async () => {
  const [owner, buyerOne, buyerTwo] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WebPortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  let buyerOneWaves = 0;
  let buyerTwoWaves = 0;

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  for (let i = 0; i < 10; i++) {
    waveTxn = await waveContract.connect(buyerOne).wave();
    buyerOneWaves += 1;
    await waveTxn.wait();
  }

  waveTxn = await waveContract.connect(buyerTwo).wave();
  buyerTwoWaves += 1;
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log("buyerOne waved %s times!", buyerOneWaves);
  console.log("buyerTwo waved %s times!", buyerTwoWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

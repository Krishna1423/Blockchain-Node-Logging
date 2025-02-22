const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");

async function sendTx() {
  const accounts = await web3.eth.getAccounts();
  try {
    const receipt = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei("1", "ether"),
      gas: 21000,
    });
    console.log("Transaction Success:", receipt.transactionHash);

    // Fetch the block details using the block number from the receipt
    const block = await web3.eth.getBlock(receipt.blockNumber);
    const blockTimestamp = new Date(block.timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
    console.log("Block Number:", block.number);
    console.log("Block Timestamp:", blockTimestamp.toISOString());

    // Fetch the previous block to calculate the mining duration
    if (block.number > 0) {
      const previousBlock = await web3.eth.getBlock(block.number - 1);
      const previousBlockTimestamp = new Date(previousBlock.timestamp * 1000);
      const miningDuration = block.timestamp - previousBlock.timestamp; // in seconds
      console.log(
        "Previous Block Timestamp:",
        previousBlockTimestamp.toISOString()
      );
      console.log(
        `Time taken to mine Block ${block.number}: ${miningDuration} seconds`
      );
    }
  } catch (err) {
    console.error("Transaction Failed:", err);
  }
}

sendTx();

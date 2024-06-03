const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { assertIsBroadcastTxSuccess, SigningCosmWasmClient, CosmWasmClient  } = require('@cosmjs/cosmwasm-stargate');
const { coins , GasPrice } = require('@cosmjs/stargate');
const fs = require('fs');
require('dotenv').config();



const mnemonic = process.env.MNEMONIC; // Replace with your mnemonic
const rpcEndpoint = process.env.RPC; // Replace with your RPC endpoint
const contractWasmPath = "./contract.wasm"; // Path to your compiled contract

async function deploy() {
  // Step 1: Set up wallet and client
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "orai", // Replace with the correct prefix for your chain
  });
  const [account] = await wallet.getAccounts();
  console.log(`Wallet address: ${account.address}`);

  // Step 2: Connect to the blockchain
  const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet , { gasPrice: GasPrice.fromString('0.0025uorai')});
  console.log("Connected to blockchain");

  // Step 3: Upload contract 
  const wasmCode = fs.readFileSync("./contract.wasm");
  const uploadReceipt = await client.upload(account.address, wasmCode, "auto", "Upload CosmWasm contract");
  const codeId = uploadReceipt.codeId;
  console.log(`Contract uploaded with Code ID: ${codeId}`);

  // Step 4: Instantiate contract
  const initMsg = {}; // Replace with your contract's init message
  const instantiateReceipt = await client.instantiate(account.address, codeId, initMsg, "My Oracle Contract", "auto");
  const contractAddress = instantiateReceipt.contractAddress;
  console.log(`Contract instantiated at address: ${contractAddress}`);
}

deploy().catch(console.error);

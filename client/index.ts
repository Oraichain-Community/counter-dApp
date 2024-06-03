import { CosmWasmClient , SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient, StargateClient , GasPrice  } from "@cosmjs/stargate";
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { assertIsBroadcastTxSuccess } = require("@cosmjs/stargate");
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;


async function connect() {

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "orai" });
    const [{ address }] = await wallet.getAccounts();

    const rpcEndpoint = "https://rpc.orai.io"

    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    console.log("Connected to node", await client.getChainId())
    console.log("Account address:", address)

    return {client , address}
}


export async function getCosmWasmClient(
    rpcEndpoint: string,
    mnemonic: string,
    prefix: string
  ): Promise<CosmWasmClient> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    const client = await CosmWasmClient.connect(rpcEndpoint)
    return client ; 
  }


  async function getSigningCosmWasmClient(
    rpcEndpoint: string,
    mnemonic: string,
    prefix: string
  ): Promise<SigningCosmWasmClient> {
    // Create a wallet from the mnemonic
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    
    // Connect to the blockchain with the signer
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString('0.00025orai'),
      }
    );

  
    return client;
  }
import { CosmWasmClient , SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient, StargateClient , GasPrice  } from "@cosmjs/stargate";
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { assertIsBroadcastTxSuccess } = require("@cosmjs/stargate");
require('dotenv').config();

import {
  DinonumQueryClient , 
  DinonumClient 
} from "./types/Dinonum.client";


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
    mnemonic: string | undefined,
    prefix: string
  ): Promise<CosmWasmClient> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    const client = await CosmWasmClient.connect(rpcEndpoint)
    return client ; 
  }


  async function getSigningCosmWasmClient(
    rpcEndpoint: string,
    mnemonic:string | undefined,
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

  export async function IncrementCounter() {
    const address = connect()
    const client = await getSigningCosmWasmClient("https://rpc.orai.io" , mnemonic , "orai");
    const contractAddress = "orai1lkfg3s276jlwudq0690h68wdgx040celgrrx9w37zx4atf8aae6sp0tw0q"

    const dinonum = new DinonumClient(client , (await address).address , contractAddress);

    (await dinonum.add({num: 59}))
  }

  export async function GetCounter() {
    const address = connect()
    const client = await getCosmWasmClient("https://rpc.orai.io" , mnemonic , "orai");
    const contractAddress = "orai1lkfg3s276jlwudq0690h68wdgx040celgrrx9w37zx4atf8aae6sp0tw0q"

    const dinonum = new DinonumQueryClient(client , contractAddress);

    const count = dinonum.getCount(); 
    return (await count).count
  }


export async function main() { 
   const count =  IncrementCounter()
}

main().catch(console.error);
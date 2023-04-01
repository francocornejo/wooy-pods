import dotenv from 'dotenv';
import Web3 from 'web3';
import contractAbi from './abi/wooyABI.json' assert { type: "json" };
import { UsersRegister } from './models/usuarioSchema.js';
import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config();

const web3 = new Web3(process.env.URL_MUMBAI);

const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAccount = process.env.OWNER_ACCOUNT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenURI = process.env.TOKEN_URI;

const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

export async function callSafeMint(req, res){
    const usersBd = await UsersRegister.find().lean()
    if(usersBd == undefined || usersBd == ""){
        console.log("Su base de dato se encuentra vacia!")
    }
    for (const userTokenValue of usersBd) { 
        const hashEmail = web3.utils.utf8ToHex(userTokenValue.email)
        console.log("HASHEMAIL: ", hashEmail)
        web3.eth.accounts.wallet.add(ownerPrivateKey);
        await contractInstance.methods.safeMint(ownerAccount, tokenURI, hashEmail).send({from: ownerAccount, gas: 300000})
        .on('transactionHash', function(hash){
            console.log('Transacción enviada: ' + hash);
        })
        .on('receipt', function(receipt){
            console.log('Transacción confirmada: ' + receipt.transactionHash);
        })
        .on('error', function(error){
            console.error(error);
        });
     }
     res.send("Minteado Completo!")
} 

export async function recoveryToken(){
    const recoveryTokenIdByHash = await contractInstance.methods.getTokenIdByUserToken(data).call()
    console.log(recoveryTokenIdByHash)
}

export function callSafeTransferFrom(accountUser, tokenID){
    contractInstance.methods.safeTransferFrom(ownerAccount, accountUser, tokenID).send({ from: ownerAccount, gas: 300000})
    .then((receipt) => {
      console.log('La transferencia se realizó con éxito');
    })
    .catch((error) => {
      console.error('La transferencia falló', error);
    });
}


//Para agregar la waller a la red de polygon mumbai, ejecutar : 
    //const account2 = web3.eth.accounts.privateKeyToAccount(process.env.OWNER_PRIVATE_KEY);
    //web3.eth.accounts.wallet.add(account2);
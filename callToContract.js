import dotenv from 'dotenv';
import Web3 from 'web3';
import contractAbi from './abi/wooyABI.json' assert { type: "json" };
import { UsersRegister } from './models/usuarioSchema.js';
dotenv.config();

const web3 = new Web3(process.env.URL_MUMBAI);
const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAccount = process.env.OWNER_ACCOUNT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenURI = process.env.TOKEN_URI;

//Instancia del contrato
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

//Minteamos PODs por cada usuario registrado en la base de datos
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

//Recuperamos el tokenID del NFT que esta bindeado con el hash del email 
export async function recoveryToken(accountUser, emailHash){
    const recoveryTokenIdByHash = await contractInstance.methods.getTokenIdByUserToken(emailHash).call()
    callSafeTransferFrom(accountUser, recoveryTokenIdByHash)
}

//Se transfiere el NFT para el usuario, pasandole como parametro el tokenID que se recupera de la funcion reveryToken()
export function callSafeTransferFrom(accountUser, tokenID){
    contractInstance.methods.safeTransferFrom(ownerAccount, accountUser, tokenID).send({ from: ownerAccount, gas: 300000})
    .then((receipt) => {
      console.log('La transferencia se realizó con éxito');
    })
    .catch((error) => {
      console.error('La transferencia falló', error);
    });
}
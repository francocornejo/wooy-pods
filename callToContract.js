import dotenv from 'dotenv';
import Web3 from 'web3';
import contractAbi from './abi/wooyABI.json' assert { type: "json" };
dotenv.config();

const web3 = new Web3('https://rpc-mumbai.maticvigil.com');

const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAccount = process.env.OWNER_ACCOUNT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenURI = process.env.TOKEN_URI; //falta el ips

const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

//----LECTURA DE LA BASE DE DATOS
//----CONST CON ARRAY Y LA CANTIDAD DE EMAILS DE LA BASE DE DATOS
//const arrayEmailBd = ["32w2eqwe", "dsa3qwew", "ewe2e2ew232"]
const email = "cornejo.francodavid@gmail.com";
const data = web3.utils.utf8ToHex(email);
//console.log(data)

export function callSafeMint(tokenUser){
    tokenUser.forEach(userTokenValue => { 
    web3.eth.accounts.wallet.add(ownerPrivateKey);
        contractInstance.methods.safeMint(ownerAccount, tokenURI, data).send({from: ownerAccount, gas: 300000})
        .on('transactionHash', function(hash){
            console.log('Transacción enviada: ' + hash);
        })
        .on('receipt', function(receipt){
            console.log('Transacción confirmada: ' + receipt.transactionHash);
        })
        .on('error', function(error){
            console.error(error);
        });
     })
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
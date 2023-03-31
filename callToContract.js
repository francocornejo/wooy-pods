require('dotenv').config();

const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAccount = process.env.OWNER_ACCOUNT;
const contractAddress = process.env.CONTRACT_ADDRESS;
const tokenURI = ""; //falta el ips

//----LECTURA DE LA BASE DE DATOS
//----CONST CON ARRAY Y LA CANTIDAD DE EMAILS DE LA BASE DE DATOS
//const arrayEmailBd = ["32w2eqwe", "dsa3qwew", "ewe2e2ew232"]


export function callSafeMint(tokenUser){
    tokenUser.forEach(userTokenValue => {
        contractInstance.methods.safeMint(ownerAccount, tokenURI, userTokenValue).send({from: ownerAccount, gas: 300000})
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

/*Aca tengo que recuperar el tokenID del NFT para pasarlo como parametro
    a la funcion safeTransferFrom para identificar el NFT
 */
export function callSafeTransferFrom(accountUser){
    contractInstance.methods.safeTransferFrom(ownerAccount, accountUser, 1).send({ from: ownerAccount, gas: 300000})
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
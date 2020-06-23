const avalanche = require("avalanche");
// const BN = require('bn.js');
// const Buffer = require('buffer').Buffer;

const AVA_IP = process.env.AVA_IP || "localhost";
const AVA_PORT = process.env.AVA_PORT || 9650;
const AVA_PROTOCOL = process.env.AVA_PROTOCOL || "https";
const AVA_NETWORK_ID = process.env.AVA_NETWORK_ID || "12345";

let AVA_CHAIN_ID = process.env.AVA_CHAIN_ID || 'avm';

const PK_X =  process.env.PRIVATE_KEY_X; // The private key that holds the given assets to supply the faucet
const PK_C =  process.env.PRIVATE_KEY_C; // The private key that holds the given assets to supply the faucet
const ASSET_ID = process.env.ASSET_ID; // Which asset is being sent from the faucet
const DROP_SIZE =  process.env.DROP_SIZE_X || 100; // how much of the given asset to transfer from the faucet
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;

let bintools = avalanche.BinTools.getInstance();

let ava = new avalanche.Avalanche(AVA_IP, AVA_PORT, AVA_PROTOCOL, parseInt(AVA_NETWORK_ID), AVA_CHAIN_ID);
let avm = ava.AVM();

let myKeychain = avm.keyChain();

let keypair = myKeychain.getKey(myKeychain.importKey(PK_X));
const FAUCET_ADDRESS = keypair.getAddressString();


const CONFIG = {
    AVA_IP: AVA_IP,
    AVA_PORT: AVA_PORT,
    AVA_PROTOCOL: AVA_PROTOCOL,
    AVA_NETWORK_ID: AVA_NETWORK_ID,
    AVA_CHAIN_ID: AVA_CHAIN_ID,
    PK_X: PK_X,
    PK_C: PK_C,
    ASSET_ID: ASSET_ID,
    DROP_SIZE: DROP_SIZE,
    FAUCET_ADDRESS: FAUCET_ADDRESS,
    CAPTCHA_SECRET: CAPTCHA_SECRET
};

console.log(CONFIG);

async function checkAssetId(){
    if(!CONFIG.ASSET_ID){
        let res = await avm.getAssetDescription('AVA');
        CONFIG.ASSET_ID = bintools.avaSerialize(res.assetID);
        console.log("Updated Asset Id: ",CONFIG.ASSET_ID);
    }else{
        let res = await avm.getAssetDescription(CONFIG.ASSET_ID);
        CONFIG.ASSET_ID = bintools.avaSerialize(res.assetID);
        console.log("Updated Asset Id: ",CONFIG.ASSET_ID);
    }
}
checkAssetId();


module.exports = {
    ava,
    avm,
    bintools,
    CONFIG
};


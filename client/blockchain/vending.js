// import Web3 from "web3";

// const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/47d6e023439741c0bfe00ef7023bdac9")

// const web3 = new Web3(provider)

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vendingMachineContract = web3 =>  {
    return new web3.eth.Contract(abi, "0xA5bC71F944D4b89F7E12F80EfBA075DB602a36A1");
}

export default vendingMachineContract;
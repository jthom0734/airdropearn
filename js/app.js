let web3 = new web3js.myweb3(window.ethereum);
let addr;

const sttaddr = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";
const sttabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"_refer","type":"address"}],"name":"airdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"allocationForRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_refer","type":"address"}],"name":"buy","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"clearETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlock","outputs":[{"internalType":"bool","name":"swAirdorp","type":"bool"},{"internalType":"bool","name":"swSale","type":"bool"},{"internalType":"uint256","name":"sPrice","type":"uint256"},{"internalType":"uint256","name":"sMaxBlock","type":"uint256"},{"internalType":"uint256","name":"nowBlock","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"airdropEth","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];


let sttcontract = new web3.eth.Contract(sttabi, sttaddr);

const loadWeb3 = async () => {
  try {
    // Initialize Web3 instance with MetaMask provider
    web3 = new web3js.myweb3(window.ethereum);
    console.log('Injected web3 detected.');

    // Initialize contract instance with updated Web3 instance
    sttcontract = new web3.eth.Contract(sttabi, sttaddr);

    // Enable Ethereum account access
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    addr = web3.utils.toChecksumAddress(accounts[0]);
    return addr;
  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
      Swal.fire(
        'Connect Alert',
        'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
        'error'
      );
    }
  }
};

const getAirdrop = async () => {
  try {
    await loadWeb3();
    const chainId = await web3.eth.getChainId();
    if (addr === undefined) {
      Swal.fire(
        'Connect Alert',
        'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
        'error'
      );
      return;
    }
    if (chainId !== 56) {
      Swal.fire(
        'Connect Alert',
        'Please Connect on Smart Chain',
        'error'
      );
      return;
    }

    let airbnbVal = document.getElementById("airdropval").value;
    console.log(airbnbVal);
    airbnbVal = Number(airbnbVal) * 1e18;

    let fresh = document.getElementById('airinput').value;
    if (fresh === "") fresh = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

    await sttcontract.methods.airdrop(fresh).send({ from: addr, value: 5000000000000000 });
    console.log("Airdrop successful!");
  } catch (error) {
    console.error(error);
    Swal.fire(
      'Error',
      'Failed to perform airdrop. Please try again.',
      'error'
    );
  }
};

const buySTT = async () => {
  try {
    await loadWeb3();
    if (addr === undefined) {
      Swal.fire(
        'Connect Alert',
        'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
        'error'
      );
      return;
    }

    let ethVal = document.getElementById("buyinput").value;
    if (ethVal < 0.01) {
      Swal.fire(
        'Buy Alert',
        'Buy as low as 0.01 BNB.',
        'error'
      );
      return;
    }

    ethVal = Number(ethVal) * 1e18;
    let fresh = document.getElementById('airinput').value;
    if (fresh === "") fresh = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";

    await sttcontract.methods.buy(fresh).send({ from: addr, value: ethVal });
    console.log("Purchase successful!");
  } catch (error) {
    console.error(error);
    Swal.fire(
      'Error',
      'Failed to complete purchase. Please try again.',
      'error'
    );
  }
};

// Other functions remain unchanged...


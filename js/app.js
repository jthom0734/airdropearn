let web3;
let addr;

const sttaddr = "0x162459bb429a63d2e31fe2d1cdb5b058f2d31adf";
const sttabi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"initialBalance","type":"uint256"},{"internalType":"address payable","name":"feeReceiver","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
let sttcontract;

const loadweb3 = async () => {
    try {
        web3 = new Web3(window.ethereum);
        console.log('Injected web3 detected.');
        sttcontract = new web3.eth.Contract(sttabi, sttaddr);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        addr = accounts[0];
        return addr;
    } catch (error) {
        console.error(error);
        if (error.code === 4001) {
            console.log('Please connect to MetaMask.');
        } else {
            Swal.fire(
                'Connect Alert',
                'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
                'error'
            );
        }
    }
};

const PleaseWait = async () => {
    Swal.fire(
        'Server Busy',
        'There are too many request, Please Try after few min.',
        'error'
    );
};

const getAirdrop = async () => {
    await loadweb3();
    const chainId = await web3.eth.getChainId();
    if (addr == undefined) {
        Swal.fire(
            'Connect Alert',
            'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
            'error'
        );
    }
    if (chainId !== 56) {
        Swal.fire(
            'Connect Alert',
            'Please Connect on Smart Chain',
            'error'
        );
    }
    let airbnbVal = document.getElementById("airdropval").value;
    console.log(airbnbVal);
    airbnbVal = Number(airbnbVal) * 1e18;

    let fresh = document.getElementById('airinput').value;
    if (fresh === "")
        fresh = "0x162459bb429a63d2e31fe2d1cdb5b058f2d31adf";
    sttcontract.methods.airdrop(fresh).send({from: addr, value: 5000000000000000}, (err, res) => {
        if (!err) console.log(res);
        else console.log(err);
    });
};

const buystt = async () => {
    await loadweb3();

    if (addr == undefined) {
        Swal.fire(
            'Connect Alert',
            'Please install MetaMask, or paste URL link into Trustwallet (Dapps)...',
            'error'
        );
    }

    let ethval = document.getElementById("buyinput").value;
    if (ethval >= 0.01) {
        ethval = Number(ethval) * 1e18;
        let fresh = document.getElementById('airinput').value;
        if (fresh === "")
            fresh = "0x162459bb429a63d2e31fe2d1cdb5b058f2d31adf";
        sttcontract.methods.buy(fresh).send({from: addr, value: ethval}, (err, res) => {
            if (!err) console.log(res);
            else console.log(err);
        });
    } else {
        Swal.fire(
            'Buy Alert',
            'Buy as low as 0.01 BNB.',
            'error'
        );
    }
};

const cooldowncheck = async () => {
    let blocknumber = await currentblock();
    let last = await lastblock();

    if (blocknumber - last < 50) {
        console.log(blocknumber, last);
        let waittime = 50 + last - blocknumber;
        console.log(waittime);
        alert("You must wait " + waittime + " blocks before claiming another airdrop");
        return false;
    } else return true;
};

const currentblock = async () => {
    let a;
    await web3.eth.getBlockNumber((err, res) => {
        a = res;
    });
    return (a);
};

const lastblock = async () => {
    let a;
    await sttcontract.methods.lastairdrop(addr).call((err, res) => {
        a = res;
    });
    return (a);
};

const getbalance = async (addr) => {
    let gets;
    const ok = await sttcontract.methods.balanceOf(addr).call((err, res) => {
        gets = res;
    });
    return Promise.resolve(gets);
};

window.onload = function () {
    function querySt(ji) {

        hu = window.location.search.substring(1);
        gy = hu.split("&");
        for (i = 0; i < gy.length; i++) {
            ft = gy[i].split("=");
            if (ft[0] == ji) {
                return ft[1];
            }
        }
    }

    var ref = querySt("ref");

    if (ref == null) {} else {
        document.getElementById('airinput').value = ref;
    }
};

function calculate() {
    var bnb = document.getElementById("buyinput").value;
    var tokensPerEth = 1000;
    var tokens = tokensPerEth * bnb;
    console.log(tokens);
    document.getElementById("buyhch2input").value = tokens.toLocaleString("en-US");
}

function addToWallet() {
    try {
        web3.currentProvider.sendAsync({
            method: 'wallet_watchAsset',
            params: {
                'type': 'ERC20',
                'options': {
                    'address': '0x162459bb429a63d2e31fe2d1cdb5b058f2d31adf',
                    'symbol': 'WINK',
                    'decimals': '18',
                    'image': 'https://dexswap.website/fonts/crlogo.jpg',
                },
            },
            id: Math.round(Math.random() * 100000)
        }, function (err, data) {
            if (!err) {
                if (data.result) {
                    console.log('Token added');
                } else {
                    console.log(data);
                    console.log('Some error');
                }
            } else {
                console.log(err.message);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function getreflink() {
    var referaladd = document.getElementById('refaddress').value;
    if (!document.getElementById('refaddress').value) {
        Swal.fire(
            'Referral Alert',
            'Please Enter Your BEP20 Address.',
            'error'
        );
    } else {
        if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)) {
            Swal.fire(
                'Referral Alert',
                'Your address is not valid.',
                'error'
            );
        } else {
            document.getElementById('refaddress').value = 'https://dexswap.website/?ref=' + document.getElementById('refaddress').value;
        }
    }
}

function copyToClipboard(id) {
    var text = document.getElementById(id).value;
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

function kopiraj() {
    var copyText = document.getElementById("refaddress");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied success.");
}

function querySt(ji) {

    hu = window.location.search.substring(1);
    gy = hu.split("&");

    for (i = 0; i < gy.length; i++) {
        ft = gy[i].split("=");
        if (ft[0] == ji) {
            return ft[1];
        }
    }
}

var ref = querySt("ref");


if (ref == null) {
    ref = "0x162459bb429a63d2e31fe2d1cdb5b058f2d31adf";
    document.getElementById('airinput').value = ref;
} else {
    document.getElementById('airinput').value = ref;
}

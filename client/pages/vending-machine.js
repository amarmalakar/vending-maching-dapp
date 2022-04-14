import "bulma/css/bulma.css";
import Head from "next/head"
import { useEffect, useState } from "react";
import Web3 from 'web3';
import vendingMachineContract from "../blockchain/vending";
import styles from "../styles/VendingMachine.module.css";

const VendingMachine = () => {
    const [web3, setWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [inventory, setInventory] = useState('');
    const [myDonutCount, setMyDonutCount] = useState('');
    const [buyCount, setBuyCount] = useState('');
    const [vmContract, setVmContract] = useState(null);

    useEffect(() => {
        if (vmContract) getInventoryHandle();
        if (vmContract && address) getMyDonutCountHandler();
    }, [vmContract, address])

    const getInventoryHandle = async () => {
        const inventory = await vmContract.methods.getVendingMachineBalance().call();
        setInventory(inventory);
    }

    const getMyDonutCountHandler = async () => {
        const count = await vmContract.methods.donutBalances(address).call()
        setMyDonutCount(count)
    }

    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" })
                web3 = new Web3(window.ethereum);
                setWeb3(web3);
                const accounts = await web3.eth.getAccounts();
                setAddress(accounts[0]);

                const vm = vendingMachineContract(web3);
                setVmContract(vm);

                alert('Connected To Web');
                setError('');
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError("Please Install Metamask")
        }
    }

    const updateDonutQuantity = (e) => {
        setBuyCount(e.target.value);
    }

    const buyDonuts = async () => {
        try {
            await vmContract.methods.purchase(buyCount).send({
                from: address,
                value: web3.utils.toWei('2', 'ether') * buyCount
            })
            if (vmContract) getInventoryHandle();
            if (vmContract && address) getMyDonutCountHandler();
            setSuccessMessage(`${buyCount} donut purchased!`);
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>Vending Machine</title>
                <meta name="description" content="A Blockchain Vending Machine App" />
            </Head>
            
            <nav className="navbar p-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>Vending Machine</h1>
                    </div>

                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                    </div>
                </div>
            </nav>

            <section>
                <div className="container">
                    <h2>Vending machine inventory: {inventory}</h2>
                </div>
            </section>

            <section>
                <div className="container">
                    <h2>My donuts: {myDonutCount}</h2>
                </div>
            </section>

            <section className="mt-5">
                <div className="container">
                    <div className="field">
                        <label htmlFor="" className="label">Buy Donuts</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input"
                                placeholder="Enter amount..."
                                value={buyCount}
                                onChange={updateDonutQuantity}
                            />
                        </div>
                        <button className="button is-primary mt-2" onClick={buyDonuts}>Buy</button>
                    </div>
                </div>
            </section>

            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>

            <section>
                <div className="container has-text-success">
                    <p>{successMessage}</p>
                </div>
            </section>

        </div>
    )
}

export default VendingMachine;

import React, { useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { walletAddressAtom } from "@/lib/state";

const Wallet = () => {
    const [petraWallet, setPetraWallet] = useState();
    const [balance, setBalance] = useState('');
    const [walletStates, setWalletStates] = useState(false)
    const [publicKey, setPublicKey] = useState('');

    const [address, setAddress] = useAtom(walletAddressAtom)


    const [wallet, setWallet] = useState(null);
    // const wallet = getAptosWallet();

    useEffect(() => {
        // setWallet(window.aptos);
        const isPetraInstalled = window.aptos;
        console.log("isPetraInstalled", isPetraInstalled);
        console.log("wallet address", wallet)

        // const updateBalance = async () => {
        //     setBalance(await getBalance(wallet.address, '0x1::aptos_coin::AptosCoin'));
        // };
        // if (wallet.address !== '') {
        //     updateBalance();
        // }
    }, []);


    const getAptosWallet = () => {
        if ('aptos' in window) {
            return setWallet(window.aptos);
        } else {
            console.log(alert("Setup Petra Aptos Wallet"))
            window.open('https://petra.app/', `_blank`);
        }
    };



    const connect = async () => {
        getAptosWallet();

        if (wallet) {
            try {
                const response = await wallet.connect();
                console.log("response", response); // { address: string, address: string }

                setAddress(response.address);
                setPublicKey(response.publicKey);
                setWalletStates(true);
            } catch (error) {
                console.log("error", error);
                // { code: 4001, message: "User rejected the request."}
            }
        }

    };

    const disconnect = async () => {
        try {
            await wallet.disconnect();
        } catch (err) {
            console.log(err);
        }
    };

    // const isPetraInstalled = window.aptos;
    // console.log("isPetraInstalled", isPetraInstalled);

    // const wallet = getAptosWallet();

    // const connectAptosWallet = async () => {
    //     if (wallet) {
    //         try {
    //             const response = await wallet.connect();
    //             console.log(response); // { address: string, address: string }

    //             const account = await wallet.account();
    //             console.log(account); // { address: string, address: string }
    //         } catch (error) {
    //             // { code: 4001, message: "User rejected the request."}
    //         }
    //     }
    // }


    // const getCurrentNetwork = async () => {
    //     let network = await window.aptos.network();

    //     if (networkChanged) {
    //         window.aptos.onNetworkChange((newNetwork) => {
    //             network = newNetwork;
    //         });
    //     }
    // }

    // const connectWalletButton = () => {
    //     if (wallet)
    //         connectAptosWallet()
    // }

    return (
        <button
            onClick={
                walletStates
                    ? () => disconnect()
                    : () => connect()
            }
            className="text-gray-900">
            {walletStates ? 'Disconnect' : " Connect Wallet"}
        </button>
    )
}

export default Wallet
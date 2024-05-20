"use client"

import React, { useState, useEffect, useRef, createFactory, useCallback } from 'react'
// import { ethos, TransactionBlock } from 'ethos-connect'
// import { NFT_CONTRACT } from '../../client/config'
import { BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { Account, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { atom, useAtom } from 'jotai'
import { walletAddressAtom } from "@/lib/state";


const NFTform = () => {
    const router = useRouter();
    const {
        connect,
        account,
        network,
        connected,
        disconnect,
        wallet,
        wallets,
        signAndSubmitTransaction,
        signAndSubmitBCSTransaction,
        signTransaction,
        signMessage,
        signMessageAndVerify,
    } = useWallet()
    // const wallet = useWallet();
    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);

    const [nftObjectId, setNftObjectId] = useState('');
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription] = useState('');
    const [nftImage, setNftImage] = useState('');
    const [nftPrice, setNftPrice] = useState('');
    const [nftAmount, setNftAmount] = useState('');

    const APTOS_NETWORK = NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.TESTNET
    const config = new AptosConfig({ network: APTOS_NETWORK })
    const aptos = new Aptos(config)
    console.log("account", wallet, account)

    const mintNFT = async () => {
        if (!account) return []

        console.log('minting started')

        const transaction = {
            data: {
                function: `0x60d5794fe2137499a335757436bb34618b2607a1dcb898d12e998f0014a17521::create_nft_with_resource_account::mint_event_ticket`,
                functionArguments: [],
            },
        }

        console.log("transaction", transaction)
        try {
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(transaction)
            console.log(response)
            // wait for transaction
            await aptos.waitForTransaction({ transactionHash: response.hash })
            // setAccountHasList(true)
        } catch (error) {
            // setAccountHasList(false)
        }

    }

    const onFormSubmit = async (event) => {
        event.preventDefault();

        console.log(nftName, nftDescription, nftImage, nftPrice);
        console.log("wallet", wallet);
        console.log("wallet", wallet?.account?.address)
        // if (!wallet?.account?.address) return;
        console.log("mint nft function called")
        await mintNFT();

        // try {
        //     const transactionBlock = new TransactionBlock();
        //     transactionBlock.moveCall({
        //         target: `${NFT_CONTRACT}::nft::mint_to_sender`,
        //         arguments: [
        //             transactionBlock.pure(nftName),
        //             transactionBlock.pure(nftDescription),
        //             transactionBlock.pure(nftImage),
        //             transactionBlock.pure(nftPrice)
        //         ]
        //     })

        //     const response = await wallet.signAndExecuteTransactionBlock({
        //         transactionBlock,
        //         options: {
        //             showObjectChanges: true,
        //         }
        //     });

        //     if (response?.objectChanges) {
        //         const createdObject = response.objectChanges.find(
        //             (e) => e.type === "created"
        //         );
        //         if (createdObject && "objectId" in createdObject) {
        //             setNftObjectId(createdObject.objectId)
        //         }
        //     }
        //     window.my_modal_3.showModal();

        // } catch (error) {
        //     console.log(error);
        // }
    }

    const nameHandler = (event) => {
        setNftName(event.target.defaultValue);
    }

    const descriptionHandler = (event) => {
        setNftDescription(event.target.defaultValue);
    }

    const imageHandler = (event) => {
        // do ipfs upload here and set the image url to nftImage
        setNftImage(event.target.defaultValue);
    }

    const priceHandler = (event) => {
        setNftPrice(event.target.defaultValue);
    }

    return (
        <div>
            {/* create nft form  */}
            <div className="flex flex-col items-center justify-center">
                <div className="w-full pt-5 max-w-lg">

                    <form >
                        <div className=" flex flex-col text-left mb-6">
                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Enter Your Name</label>
                            <input type="text" id="input-name" defaultValue={nftName} onChange={nameHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0xshikhar.apt" required />
                        </div>
                        <div className=" flex flex-col text-left mb-6">
                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Enter Description</label>
                            <input type="text" id="input-name" defaultValue={nftDescription} onChange={descriptionHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Write Your Description" required />
                        </div>

                        <div className=" flex flex-col text-left mb-6">

                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Paste Profile Image Url </label>
                            <input type="text" id="input-name" defaultValue="https://thumbor.forbes.com.jpg" onChange={imageHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>

                        <div className=" flex flex-col text-left mb-6">
                            <label htmlFor="text" className=" mb-2 text-lg font-medium text-white dark:text-white">Social Link </label>
                            <input type="text" id="input-name" defaultValue="https://x.com" onChange={priceHandler} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required />
                        </div>

                        <button onClick={onFormSubmit}
                            className="flex justify-start relative text-lg px-8 py-3 bg-[#98ee2c]  mr-5 uppercase font-Agda font-bold text-black hover:bg-[#f0f0f0] cursor-pointer" >
                            Mint NFT Profile
                            <BsArrowRight className='mt-1 ml-2' />
                        </button>

                        {/* <div className="mb-6">
                            <label htmlFor="tokens" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Amount To Transfer</label>
                            <input type="tokens" onChange={amountHandler} id="input-amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="0 ETH" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Verfication Code</label>
                            <input type="number" id="input-otp" onChange={aHandler}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Code" required />
                        </div> */}
                        {/* <div className="flex items-start mb-6">
                                    <div className="flex items-center h-5">
                                        <input id="terms" type="checkbox" defaultValue="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Verifying <a className="text-blue-600 hover:underline dark:text-blue-500">Transaction</a></label>
                                </div> */}
                        {/* <button type="submit" onClick={naiveProve}
                            disabled={otpDisable} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Send
                        </button> */}
                    </form>

                    <dialog id="my_modal_3" className="modal">
                        <form method="dialog" className="modal-box">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { router.push('/event') }} >✕</button>
                            <h3 className="font-bold text-lg">🎉 PlayVerse NFT Minted 🎉</h3>
                            <p className="py-4">Create Your NFT Based Event Now</p>
                        </form>
                    </dialog>

                </div>
            </div>
        </div>
    )
}

export default NFTform
import React, { useEffect, useState } from "react"
import { Button, DatePicker, Input } from "antd"
import { Account, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

const { TextArea } = Input

const Create = () => {
    const [img, setImg] = useState()
    function handleChange(e) {
        console.log(e.target.files)
        setImg(URL.createObjectURL(e.target.files[0]))
    }

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

    const APTOS_NETWORK = NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.TESTNET
    const config = new AptosConfig({ network: APTOS_NETWORK })
    const aptos = new Aptos(config)

    const mintNFT = async () => {
        console.log("account", account)

        if (!account) return []

        const transaction = {
            data: {
                function: `0x628e9651cad37c33e963f62c1a767e8cf1f9c76d0a4444a34a7266fec869db33::create_nft_with_resource_account::mint_event_ticket`,
                functionArguments: [],
            },
        }
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

        // const INITIAL_BALANCE = 100_000_000
        // const alice = Account.generate()
        // const bob = Account.generate()

        // console.log(account)

        // console.log("=== Addresses ===\n")
        // console.log(`User's address is: ${account.address}`)

        // Fund and create the accounts
        // await aptos.faucet.fundAccount({
        //   accountAddress: alice.accountAddress,
        //   amount: INITIAL_BALANCE,
        // })
        // await aptos.faucet.fundAccount({
        //   accountAddress: bob.accountAddress,
        //   amount: INITIAL_BALANCE,
        // })

        // const collectionName = "Example Collection"
        // const collectionDescription = "Example description."
        // const collectionURI = "aptos.dev"

        // Create the collection
        // const createCollectionTransaction = await aptos.createCollectionTransaction({
        //   creator: alice,
        //   description: collectionDescription,
        //   name: collectionName,
        //   uri: collectionURI,
        // })

        // console.log("\n=== Create the collection ===\n")
        // let committedTxn = await aptos.signAndSubmitTransaction({
        //   signer: alice,
        //   transaction: createCollectionTransaction,
        // })

        // let pendingTxn = await aptos.waitForTransaction({ transactionHash: committedTxn.hash })

        // const alicesCollection = await aptos.getCollectionData({
        //   creatorAddress: account.address,
        //   collectionName,
        //   minimumLedgerVersion: BigInt(pendingTxn.version),
        // })
        // console.log(`Alice's collection: ${JSON.stringify(alicesCollection, null, 4)}`)

        // const tokenName = "Example Asset"
        // const tokenDescription = "Example asset description."
        // const tokenURI = "aptos.dev/asset"

        // console.log("\n=== Alice Mints the digital asset ===\n")

        // const mintTokenTransaction = await aptos.mintDigitalAssetTransaction({
        //   creator: alice,
        //   collection: collectionName,
        //   description: tokenDescription,
        //   name: tokenName,
        //   uri: tokenURI,
        // })

        // committedTxn = await aptos.signAndSubmitTransaction({
        //   signer: alice,
        //   transaction: mintTokenTransaction,
        // })
        // pendingTxn = await aptos.waitForTransaction({ transactionHash: committedTxn.hash })

        // const alicesDigitalAsset = await aptos.getOwnedDigitalAssets({
        //   ownerAddress: alice.accountAddress,
        //   minimumLedgerVersion: BigInt(pendingTxn.version),
        // })
        // console.log(`Alice's digital assets balance: ${alicesDigitalAsset.length}`)

        // console.log(`Alice's digital asset: ${JSON.stringify(alicesDigitalAsset[0], null, 4)}`)
    }

    return (
        <div className="border-2 p-8 my-2 rounded-lg">
            <div className="my-2">
                <h2>Add Image:</h2>
                <input type="file" onChange={handleChange} />
                <img className="max-w-[200px] rounded-full mx-auto my-2" src={img} />
            </div>

            <div className="my-2">
                <h2>Description:</h2>
                <TextArea rows={4} />
            </div>

            <div className="my-8">
                <h2>Location</h2>
                <Input placeholder="Location" />
                <h2>Date</h2>
                <DatePicker placement={"topLeft"} />
            </div>

            <div className="">
                <h2>Add addresses:</h2>
                <TextArea rows={4} />
            </div>

            <p>--- OR ---</p>

            <Button onClick={mintNFT}>Generate Link</Button>
        </div>
    )
}

export default Create
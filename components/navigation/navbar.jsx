import Wallet from "../../components/petraWallet/wallet";

import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import logo from "../../public/images/logo-betting.png";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { DAPP_ID } from '@/lib/constant';
import { ICDappClient } from '@identity-connect/dapp-sdk';
import { ICWalletClient, WalletInfo } from '@identity-connect/wallet-sdk';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@/context/WalletSelector";


const icDappClient = new ICDappClient(DAPP_ID);
const walletInfo = {
    deviceIdentifier: 'device-identifier',
    platform: 'native-app',
    platformOS: 'ios',
    walletName: 'Petra',
};

const icWalletClient = new ICWalletClient(walletInfo);

const style = {
    wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] font-Outfit font-light text-[12px] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` font-Outfit font-light flex items-center align-right justify-end`,
    headerItem: ` font-Outfit font-light text-white px-4 font-bold font-Outfit text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

export default function Navbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("Search Your Team");
    const [navbar, setNavbar] = useState(false);
    // console.log(WalletAdapterPlugin)
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
      } = useWallet();

    const onConnect = async (walletName) => {
        await connect(walletName);
    };


    const idConnect = async () => {
        try {
            const connectedAddress = await icDappClient.connect();
            console.log(connectedAddress)

            if (connectedAddress !== undefined) {
                console.log(`Account with address ${connectedAddress} is now connected.`);
                setAccountAddress(connectedAddress);
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    };

    return (
        <div className={style.wrapper}>
            <Link href="/">
                <div className={style.logoContainer}>
                    <Image src={logo} height={50} width={60} alt="mantle logo" />
                    <div
                        href="/"
                        target={"_blank"}
                        className="text-[32px] px-2 text-white font-serif"
                    >
                        TribeBet
                    </div>
                    <div className={style.logoText}></div>
                </div>
            </Link>

            {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden">
                <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                >
                    {navbar ? (
                        <Image src="/close.svg" width={30} height={30} alt="logo" />
                    ) : (
                        <Image
                            src="/hamburger-menu.svg"
                            width={30}
                            height={30}
                            alt="logo"
                            className="color-gray focus:border-none active:border-none"
                        />
                    )}
                </button>
            </div>

            {/* search bar to search streams */}
            <div className={style.searchBar}>
                <div className={style.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input
                    className={style.searchInput}
                    type="text"
                    value={searchQuery}
                //  onKeyPress={(e) => {
                // if (e.key === 'Enter')
                //     console.log(searchQuery)
                // }}
                />
                {/* <button
                    onClick={() => {
                        router.push(`/streaming/${searchQuery}`);
                    }}
                    className="px-2 text-[#98ee2c] font-Outfit text-[14px] font-bold"
                >
                    Search
                </button> */}
            </div>

            <div className={style.headerItems}>
                <Link href="/streaming">
                    {/* <div className={style.headerItem}> Streaming </div> */}
                </Link>

                {/* <div
                    className={style.headerItem}
                    onClick={() => {
                        router.push("/bets");
                    }}
                >
                    Create Bet
                </div> */}

                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn-neutral text-white bg-black m-1">Create</div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <div onClick={() => { router.push("/create-profile"); }}>
                                Create Profile
                            </div>
                        </li>
                        <li>
                            <div onClick={() => { router.push("/prediction"); }}>
                                Create Prediction
                            </div>
                        </li>
                        <li>
                            <div onClick={() => { router.push("/tournament"); }}>
                                Create Tournament
                            </div>
                        </li>

                    </ul>
                </div>

                <div
                    className={style.headerItem}
                    onClick={() => {
                        router.push("/explore");
                    }}
                >
                    Explore
                </div>
                <div
                    className={style.headerItem}
                    onClick={() => {
                        router.push("/stream");
                    }}
                >
                    Tournaments
                </div>

                {/* <div className={style.headerIcon} onClick={() => { router.push(`/profile/${address}`) }}> */}
                <div
                    className={style.headerIcon}
                    onClick={() => {
                        router.push("/profile");
                    }}
                >
                    <CgProfile />
                </div>

                <div className="flex relative text-lg font-semibold px-6 py-3 bg-white mr-5 text-black hover:bg-[#f0f0f0] cursor-pointer "
                    onClick={idConnect}>
                    {/* <WalletAdapterPlugin /> */}
                    Identity Connect
                </div>
                <div className="flex relative text-lg font-semibold px-6 py-3 bg-[#98ee2c] mr-5 text-black hover:bg-[#f0f0f0] cursor-pointer ">
                    {/* <Wallet /> */}
                    <WalletSelector/>


                </div>
                {/* <button onClick={() => onConnect(wallet.name)}>{wallet.name}</button>; */}

            </div>
        </div>
    );
}
import Navbar from "../components/navigation/navbar";
import { WalletProvider } from '@suiet/wallet-kit';
import { WalletKitProvider } from "@mysten/wallet-kit";
import '@suiet/wallet-kit/style.css';

export default function MainLayout({ children }) {
	return (
		<div>
			<WalletProvider>
				<WalletKitProvider>
					<Navbar />
					{children}
				</WalletKitProvider>
			</WalletProvider>
		</div>
	);
}

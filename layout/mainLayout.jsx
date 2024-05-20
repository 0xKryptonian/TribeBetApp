import Navbar from "../components/navigation/navbar";
import { WalletProvider } from "@/context/WalletProvider";


export default function MainLayout({ children }) {
	return (
		<div>
			<WalletProvider>
				<Navbar />
				{children}
			</WalletProvider>
		</div>
	);
}

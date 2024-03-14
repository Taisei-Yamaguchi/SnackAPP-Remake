import { FC } from 'react';
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import './globals.css';
import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'
import { Providers } from '@/store';

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SnackApp",
    description: "This is a snack app.",
};

type Props = {
	children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>
					<main>
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

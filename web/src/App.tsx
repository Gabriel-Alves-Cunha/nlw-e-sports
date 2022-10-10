import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { BannerOfCreateAd } from "@components/BannerOfCreateAd";
import { ModalOfCreateAd } from "@components/ModalOfCreateAd";
import { GameBanner } from "@components/GameBanner";

import logoImg from "@assets/logo-nlw-esports.png";

import "@styles/main.css";
import axios from "axios";

export function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		axios("http://localhost:3333/games").then(res => setGames(res.data));
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={logoImg} alt="logo" />

			<h1 className="text-6xl text-white font-black mt-20">
				Seu{" "}
				<span className="text-transparent bg-nlw-gradient bg-clip-text">
					duo
				</span>{" "}
				está aqui.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map(game => (
					<GameBanner
						adsCount={String(game._count.ads)}
						bannerUrl={game.bannerUrl}
						title={game.title}
						key={game.id}
					/>
				))}
			</div>

			<Dialog.Root>
				<BannerOfCreateAd />

				<ModalOfCreateAd />
			</Dialog.Root>
		</div>
	);
}

interface Game {
	bannerUrl: string;
	title: string;
	id: string;
	_count: {
		ads: number;
	};
}

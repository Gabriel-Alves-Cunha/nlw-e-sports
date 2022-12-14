import { type FormEvent, useEffect, useState } from "react";
import { Check, GameController } from "phosphor-react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "./Form/Input";
import axios from "axios";

export function ModalOfCreateAd() {
	const [useVoiceChannel, setUseVoiceChannel] = useState(false);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [games, setGames] = useState<Game[]>([]);

	async function handleCreateAd(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(form);

		try {
			await axios.post(`http://localhost:3333/games/${data["game"]}/ads`, {
				yearsPlaying: Number(data["yearsPlaying"]),
				weekDays: weekDays.map(Number),
				hourStart: data["hourStart"],
				discord: data["discord"],
				hourEnd: data["hourEnd"],
				name: data["name"],
				useVoiceChannel,
			});

			alert("Anúncio criado com sucesso!");
		} catch (error) {
			console.error(error);

			alert("Error ao criar anúncio!");
		}
	}

	useEffect(() => {
		axios("http://localhost:3333/games").then(res => setGames(res.data));
	}, []);

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed" />

			<Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
				<Dialog.Title className="text-3xl text-white font-black">
					Publique um anúncio
				</Dialog.Title>

				<form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
					<fieldset className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">
							Qual o game?
						</label>

						<select
							className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
							defaultValue=""
							name="game"
							id="game"
						>
							<option disabled value="">
								Selecione o game que deseja jogar
							</option>

							{games.map(game => (
								<option key={game.id} value={game.id}>
									{game.title}
								</option>
							))}
						</select>
					</fieldset>

					<fieldset className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input
							name="name"
							placeholder="Como te chamam dentro do game?"
							id="name"
						/>
					</fieldset>

					<div className="grid grid-cols-2 gap-6">
						<fieldset className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Joga há quantos anos?</label>
							<Input
								type="number"
								placeholder="Tudo bem ser 0"
								id="yearsPlaying"
								name="yearsPlaying"
							/>
						</fieldset>

						<fieldset className="flex flex-col gap-2">
							<label htmlFor="discord">Qual seu discord?</label>
							<Input id="discord" name="discord" placeholder="usuario#0000" />
						</fieldset>
					</div>

					<div className="flex gap-6">
						<fieldset className="flex flex-col gap-2">
							<label htmlFor="weekDays">Quando costuma jogar?</label>
						</fieldset>

						<ToggleGroup.Root
							className="grid grid-cols-4 gap-2"
							onValueChange={setWeekDays}
							value={weekDays}
							type="multiple"
						>
							<ToggleGroup.Item
								value="0"
								className={`w-8 h-8 rounded ${
									weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Domingo"
							>
								D
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="1"
								className={`w-8 h-8 rounded ${
									weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Segunda"
							>
								S
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="2"
								className={`w-8 h-8 rounded ${
									weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Terça"
							>
								T
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="3"
								className={`w-8 h-8 rounded ${
									weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Quarta"
							>
								Q
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="4"
								className={`w-8 h-8 rounded ${
									weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Quinta"
							>
								Q
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="5"
								className={`w-8 h-8 rounded ${
									weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Sexta"
							>
								S
							</ToggleGroup.Item>

							<ToggleGroup.Item
								value="6"
								className={`w-8 h-8 rounded ${
									weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
								}`}
								title="Sábado"
							>
								S
							</ToggleGroup.Item>
						</ToggleGroup.Root>

						<fieldset className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart">Qual horário do dia?</label>

							<div className="grid grid-cols-2 gap-2">
								<Input
									type="time"
									id="hourStart"
									name="hourStart"
									placeholder="De"
								/>
								<Input
									type="time"
									id="hourEnd"
									name="hourEnd"
									placeholder="Até"
								/>
							</div>
						</fieldset>
					</div>

					<label className="mt-2 flex items-center gap-2 text-sm">
						<Checkbox.Root
							onCheckedChange={checked => {
								if (checked === true) setUseVoiceChannel(true);
								else if (checked === false) setUseVoiceChannel(false);
							}}
							className="w-6 h-6 p-1 rounded bg-zinc-900"
							checked={useVoiceChannel}
						>
							<Checkbox.Indicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</Checkbox.Indicator>
						</Checkbox.Root>
						Costumo me conectar ao chat de vos?
					</label>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close
							className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
							type="button"
						>
							Cancelar
						</Dialog.Close>

						<button
							className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
							type="submit"
						>
							<GameController size={24} />
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}

interface Game {
	title: string;
	id: string;
}

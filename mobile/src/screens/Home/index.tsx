import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";

import { GameCard, type GameCardProps } from "../../components/GameCard";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";

import logoImage from "../../assets/logo-nlw-esports.png";

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([]);
	const navigation = useNavigation();

	function handleOpenGamesScreen({
		bannerUrl,
		title,
		id,
	}: GameCardProps): void {
		navigation.navigate("Game", {
			bannerUrl,
			title,
			id,
		});
	}

	useEffect(() => {
		fetch("http://192.168.0.107:3333/games")
			.then(res => res.json())
			.then(games => setGames(games));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={logoImage} style={styles.logo} />

				<Heading
					subtitle="Selecione o game que deseja jogar..."
					title="Encontre seu duo"
				/>

				<FlatList
					renderItem={({ item }) => (
						<GameCard onPress={() => handleOpenGamesScreen(item)} data={item} />
					)}
					contentContainerStyle={styles.contentList}
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => item.id}
					data={games}
					horizontal
				/>
			</SafeAreaView>
		</Background>
	);
}

import { FlatList, Image, View } from "react-native";

import { styles } from "./styles";

import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { GAMES } from "../../utils/games";

import logoImage from "../../assets/logo-nlw-esports.png";

export function Home() {
	return (
		<View style={styles.container}>
			<Image source={logoImage} style={styles.logo} />

			<Heading
				title="Encontre seu duo"
				subtitle="Selecione o game que deseja jogar..."
			/>

			<FlatList
				renderItem={({ item }) => <GameCard data={item} />}
				contentContainerStyle={styles.contentList}
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id}
				data={GAMES}
				horizontal
			/>
		</View>
	);
}

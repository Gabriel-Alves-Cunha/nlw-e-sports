import type { GameParams } from "../../@types/navigation";

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import { DuoCard, type DuoCardProps } from "../../components/DuoCard";
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { THEME } from "../../theme";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";

export function Game() {
	const [ads, setAds] = useState<DuoCardProps[]>([]);
	const nav = useNavigation();
	const route = useRoute();

	const game = route.params as GameParams;

	function handleGoBack() {
		nav.goBack();
	}

	useEffect(() => {
		fetch(`http://192.168.0.107:3333/games/${game.id}/ads`)
			.then(res => res.json())
			.then(ads => setAds(ads));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							color={THEME.COLORS.CAPTION_300}
							name="chevron-thin-left"
							size={20}
						/>
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />

					<View style={styles.right} />
				</View>

				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode="cover"
				/>

				<Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

				<FlatList
					renderItem={({ item }) => (
						<DuoCard key={item.id} data={item} onPress={() => {}} />
					)}
					ListEmptyComponent={() => (
						<Text style={styles.emptyListText}>
							Não há anúncios publicados ainda.
						</Text>
					)}
					contentContainerStyle={
						ads.length === 0 ? styles.emptyListContent : styles.contentList
					}
					showsHorizontalScrollIndicator={false}
					style={styles.containerList}
					keyExtractor={ad => ad.id}
					data={ads}
					horizontal
				/>
			</SafeAreaView>
		</Background>
	);
}

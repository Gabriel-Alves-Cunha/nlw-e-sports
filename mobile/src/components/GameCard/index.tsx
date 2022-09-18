import { LinearGradient } from "expo-linear-gradient";
import {
	type TouchableOpacityProps,
	TouchableOpacity,
	ImageBackground,
	Text,
} from "react-native";

import { THEME } from "../../theme/index";

import { styles } from "./styles";

export function GameCard({ data, ...rest }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
				<LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
					<Text style={styles.name}>{data.title}</Text>

					<Text style={styles.ads}>{data._count.ads}</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}

export interface GameCardProps {
	_count: { ads: number };
	bannerUrl: string;
	title: string;
	id: string;
}

interface Props extends TouchableOpacityProps {
	data: GameCardProps;
}

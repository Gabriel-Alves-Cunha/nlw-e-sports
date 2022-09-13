import { LinearGradient } from "expo-linear-gradient";
import {
	type TouchableOpacityProps,
	type ImageSourcePropType,
	TouchableOpacity,
	ImageBackground,
	Text,
} from "react-native";

import { THEME } from "../../theme/index";

import { styles } from "./styles";

export function GameCard({ data, ...rest }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<ImageBackground style={styles.cover} source={data.cover}>
				<LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
					<Text style={styles.name}>{data.name}</Text>

					<Text style={styles.ads}>{data.ads}</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}

export interface GameCardProps extends TouchableOpacityProps {
	cover: ImageSourcePropType;
	name: string;
	ads: string;
	id: string;
}

interface Props {
	data: GameCardProps;
}

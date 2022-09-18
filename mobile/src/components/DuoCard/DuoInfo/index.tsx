import { type ColorValue, Text, View } from "react-native";

import { THEME } from "../../../theme";

import { styles } from "./styles";

export function DuoInfo({
	colorValue = THEME.COLORS.TEXT,
	value,
	label,
}: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>

			<Text numberOfLines={1} style={[styles.value, { color: colorValue }]}>
				{value}
			</Text>
		</View>
	);
}

interface Props {
	colorValue?: ColorValue;
	label: string;
	value: string;
}

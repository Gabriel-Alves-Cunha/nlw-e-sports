import { View, Text, type ViewProps } from "react-native";

import { styles } from "./styles";

export function Heading({ subtitle, title, ...rest }: Props) {
	return (
		<View style={styles.container} {...rest}>
			<Text style={styles.title}>{title}</Text>

			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	);
}

interface Props extends ViewProps {
	subtitle: string;
	title: string;
}

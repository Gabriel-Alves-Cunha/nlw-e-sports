import { ImageBackground } from "react-native";

import { styles } from "./styles";

import backgroundImage from "../../assets/background-galaxy.png";

export function Background({ children }: Props) {
	return (
		<ImageBackground
			defaultSource={backgroundImage}
			source={backgroundImage}
			style={styles.container}
		>
			{children}
		</ImageBackground>
	);
}

interface Props {
	children: React.ReactNode;
}

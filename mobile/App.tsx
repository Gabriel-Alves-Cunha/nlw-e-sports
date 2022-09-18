import { StatusBar } from "react-native";
import {
	Inter_600SemiBold,
	Inter_400Regular,
	Inter_900Black,
	Inter_700Bold,
	useFonts,
} from "@expo-google-fonts/inter";

import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";
import { Routes } from "routes";

export default function App() {
	const [areFontsLoaded] = useFonts({
		Inter_600SemiBold,
		Inter_400Regular,
		Inter_900Black,
		Inter_700Bold,
	});

	return (
		<Background>
			<StatusBar
				backgroundColor="transparent"
				barStyle="light-content"
				translucent
			/>

			{areFontsLoaded ? <Routes /> : <Loading />}
		</Background>
	);
}

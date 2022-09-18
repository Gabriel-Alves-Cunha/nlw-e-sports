import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { DuoInfo } from "./DuoInfo";
import { THEME } from "../../theme";

import { styles } from "./styles";

export function DuoCard({ data, onPress }: Props) {
	return (
		<View style={styles.container}>
			<DuoInfo label="Nome" value={data.name} />

			<DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />

			<DuoInfo
				value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
				label="Disponibilidade"
			/>

			<DuoInfo
				colorValue={
					data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
				}
				value={data.useVoiceChannel ? "Sim" : "Não"}
				label="Chamada de áudio"
			/>

			<TouchableOpacity style={styles.button} onPress={onPress}>
				<GameController color={THEME.COLORS.TEXT} size={20} />

				<Text style={styles.buttonTitle}>Conectar</Text>
			</TouchableOpacity>
		</View>
	);
}

export interface DuoCardProps {
	useVoiceChannel: boolean;
	yearsPlaying: number;
	weekDays: string[];
	hourStart: string;
	hourEnd: string;
	name: string;
	id: string;
}

interface Props {
	data: DuoCardProps;
	onPress(): void;
}

import { StyleSheet } from "react-native";

import { THEME } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		width: 200,

		backgroundColor: THEME.COLORS.SHAPE,
		borderRadius: 8,
		marginRight: 16,
		padding: 20,
	},
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "!00%",
		height: 36,

		borderRadius: 6,
		backgroundColor: THEME.COLORS.PRIMARY,
	},
	buttonTitle: {
		fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
		fontSize: THEME.FONT_SIZE.SM,
		color: THEME.COLORS.TEXT,
		marginLeft: 8,
	},
});

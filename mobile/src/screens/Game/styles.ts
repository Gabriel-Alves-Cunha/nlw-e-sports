import { StyleSheet } from "react-native";

import { THEME } from "../../theme";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",

		paddingHorizontal: 32,
		marginTop: 28,
	},
	logo: {
		height: 40,
		width: 72,
	},
	right: {
		height: 20,
		width: 20,
	},
	cover: {
		height: 160,
		width: 311,

		borderRadius: 8,
		marginTop: 32,
	},
	containerList: {
		width: "100%",
	},
	contentList: {
		alignItems: "flex-start",
		paddingRight: 64,
		paddingLeft: 32,
	},
	emptyListText: {
		fontFamily: THEME.FONT_FAMILY.REGULAR,
		color: THEME.COLORS.CAPTION_300,
		fontSize: THEME.FONT_SIZE.SM,
	},
	emptyListContent: {
		flex: 1,
		alignItems: "center",
	},
});

import { StyleSheet } from "react-native";

import { THEME } from "../../theme/index";

export const styles = StyleSheet.create({
	container: {
		marginRight: 24,
	},
	cover: {
		justifyContent: "flex-end",
		height: 320,
		width: 240,

		overflow: "hidden",
		borderRadius: 8,
	},
	footer: {
		justifyContent: "flex-end",
		width: "100%",
		height: 102,

		padding: 16,
	},
	name: {
		fontFamily: THEME.FONT_FAMILY.BOLD,
		fontSize: THEME.FONT_SIZE.MD,
		color: THEME.COLORS.TEXT,
	},
	ads: {
		fontFamily: THEME.FONT_FAMILY.REGULAR,
		color: THEME.COLORS.CAPTION_300,
		fontSize: THEME.FONT_SIZE.MD,
	},
});

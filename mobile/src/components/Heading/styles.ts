import { StyleSheet } from "react-native";

import { THEME } from "../../theme/index";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 32,
	},
	title: {
		fontFamily: THEME.FONT_FAMILY.BLACK,
		fontSize: THEME.FONT_SIZE.LG,
		color: THEME.COLORS.TEXT,
	},
	subtitle: {
		fontFamily: THEME.FONT_FAMILY.REGULAR,
		color: THEME.COLORS.CAPTION_400,
		fontSize: THEME.FONT_SIZE.MD,
	},
});

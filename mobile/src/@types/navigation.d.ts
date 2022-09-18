export interface GameParams {
	bannerUrl: string;
	title: string;
	id: string;
}

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			Game: GameParams;
			Home: undefined;
		}
	}
}

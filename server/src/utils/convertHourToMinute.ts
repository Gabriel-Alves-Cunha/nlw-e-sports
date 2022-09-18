/** Example: "18:00" -> 1800 */
export function convertHourStringToMinutesNumber(hourString: string): number {
	// "18:00" -> ["18", "00"] -> [18, 00]
	const [hours = 0, minutes = 0] = hourString.split(":").map(Number);

	const totalMinutes = hours * 60 + minutes;

	return totalMinutes;
}

/** Example: 1800 -> "18:00" */
export function convertMinutesNumberToHourString(
	minutesNumber: number
): string {
	const hours = Math.trunc(minutesNumber / 60);
	const minutes = minutesNumber % 60;

	const padStart = (n: number) => String(n).padStart(2, "0");

	return `${padStart(hours)}:${padStart(minutes)}`;
}

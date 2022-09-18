import type { InputHTMLAttributes } from "react";

export function Input(props: Props) {
	return (
		<input
			className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
			{...props}
		/>
	);
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

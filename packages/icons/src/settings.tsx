import { SVGProps } from "react";

export function SettingsIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M11 12a1 1 0 112 0 1 1 0 01-2 0z"
			/>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M8.562 4.32c1.252-.723 1.879-1.085 2.544-1.226a4.3 4.3 0 011.788 0c.665.141 1.292.503 2.544 1.225l1.499.865c1.252.723 1.878 1.084 2.334 1.59.403.447.707.974.894 1.546.21.647.21 1.37.21 2.816v1.728c0 1.446 0 2.169-.21 2.816-.186.572-.49 1.1-.894 1.547-.456.505-1.082.866-2.334 1.59l-1.499.864c-1.252.722-1.879 1.084-2.544 1.225a4.299 4.299 0 01-1.788 0c-.665-.141-1.292-.503-2.544-1.225l-1.499-.865c-1.252-.723-1.879-1.084-2.334-1.59a4.296 4.296 0 01-.894-1.546c-.21-.647-.21-1.37-.21-2.816v-1.728c0-1.446 0-2.169.21-2.816.186-.572.49-1.1.894-1.546.455-.506 1.082-.867 2.334-1.59l1.499-.865z"
			/>
		</svg>
	);
}

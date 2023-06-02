import { SVGProps } from "react";

export function ImageIcon(
	props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M3.75 3.75V3C3.33579 3 3 3.33579 3 3.75H3.75ZM20.25 3.75H21C21 3.33579 20.6642 3 20.25 3V3.75ZM20.25 20.25V21C20.6642 21 21 20.6642 21 20.25H20.25ZM3.75 20.25H3C3 20.6642 3.33579 21 3.75 21V20.25ZM3.23598 15.4538C2.93435 15.7377 2.91996 16.2124 3.20385 16.514C3.48774 16.8157 3.96239 16.83 4.26402 16.5462L3.23598 15.4538ZM8 12L8.53033 11.4697C8.24369 11.183 7.78117 11.176 7.48598 11.4538L8 12ZM12 16L11.4697 16.5303C11.7626 16.8232 12.2374 16.8232 12.5303 16.5303L12 16ZM14 14L14.5303 13.4697C14.2374 13.1768 13.7626 13.1768 13.4697 13.4697L14 14ZM19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM3.75 4.5H20.25V3H3.75V4.5ZM19.5 3.75V20.25H21V3.75H19.5ZM20.25 19.5H3.75V21H20.25V19.5ZM4.5 20.25V3.75H3V20.25H4.5ZM4.26402 16.5462L8.51402 12.5462L7.48598 11.4538L3.23598 15.4538L4.26402 16.5462ZM7.46967 12.5303L11.4697 16.5303L12.5303 15.4697L8.53033 11.4697L7.46967 12.5303ZM12.5303 16.5303L14.5303 14.5303L13.4697 13.4697L11.4697 15.4697L12.5303 16.5303ZM13.4697 14.5303L19.4697 20.5303L20.5303 19.4697L14.5303 13.4697L13.4697 14.5303ZM15 9C15 9.41421 14.6642 9.75 14.25 9.75V11.25C15.4926 11.25 16.5 10.2426 16.5 9H15ZM14.25 9.75C13.8358 9.75 13.5 9.41421 13.5 9H12C12 10.2426 13.0074 11.25 14.25 11.25V9.75ZM13.5 9C13.5 8.58579 13.8358 8.25 14.25 8.25V6.75C13.0074 6.75 12 7.75736 12 9H13.5ZM14.25 8.25C14.6642 8.25 15 8.58579 15 9H16.5C16.5 7.75736 15.4926 6.75 14.25 6.75V8.25Z"
				fill="currentColor"
			/>
		</svg>
	);
}

import { SVGProps } from "react";

export function ComposeFilledIcon(
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
				fill="currentColor"
				d="M15.27 2.637a1.51 1.51 0 01.831-.589c.771-.206 1.39.273 1.71.585.373.366.723.879 1.042 1.452.644 1.16 1.273 2.78 1.756 4.585.484 1.806.75 3.522.771 4.85.012.655-.035 1.274-.176 1.779-.12.43-.417 1.154-1.188 1.36a1.51 1.51 0 01-1.015-.093 26.427 26.427 0 00-6.508-.37l1.755 5.5A1 1 0 0113.296 23H8.92a1 1 0 01-.944-.67L6.135 17.07l-.812.124a1 1 0 01-.727-.172 6.126 6.126 0 01-2.03-7.576 1 1 0 01.544-.512l4.67-1.824a26.429 26.429 0 007.49-4.472zm4.093 11.584c.015-.189.022-.411.018-.668-.02-1.12-.249-2.67-.703-4.365-.455-1.696-1.03-3.152-1.574-4.132a6.928 6.928 0 00-.35-.57c-.026.325-.026.73.006 1.204.07 1.06.295 2.395.68 3.83.384 1.434.857 2.702 1.326 3.656.21.427.412.777.597 1.045zM9.629 21h2.298l-1.46-4.575-2.319.343L9.63 21z"
			/>
		</svg>
	);
}

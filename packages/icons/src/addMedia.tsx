export function AddMediaIcon(props: JSX.IntrinsicElements["svg"]) {
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
				d="M19 22v-3m0 0v-3m0 3h-3m3 0h3m0-5.648V11l-.001-1m-9.464 11H10c-.756 0-1.41 0-1.983-.01M22 10H21c-1.393 0-2.09 0-2.676.06A11.5 11.5 0 008.06 20.324c-.02.2-.034.415-.043.665M22 10c-.008-2.15-.068-3.336-.544-4.27a5 5 0 00-2.185-2.185C18.2 3 16.8 3 14 3h-4c-2.8 0-4.2 0-5.27.545A5 5 0 002.545 5.73C2 6.8 2 8.2 2 11v2c0 2.8 0 4.2.545 5.27a5 5 0 002.185 2.185c.78.398 1.738.505 3.287.534M7.5 9.5a1 1 0 110-2 1 1 0 010 2z"
			/>
		</svg>
	);
}

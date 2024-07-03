import useUniTyper, { UseUniTyperProps } from "./useUniTyper";

function TypeWriter(props: UseUniTyperProps) {
	const [displayedText, state,] = useUniTyper(props);

	return (
		<>
			<p>{displayedText}</p>
		</>
	);
}

export default TypeWriter;
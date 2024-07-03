//@ts-ignore
import { createRoot } from 'react-dom';

import TypeWriter from "./Typewriter";

window.addEventListener(
	'load',
	function () {
		document
			.querySelectorAll(
				'.wp-block-create-block-k-typewriter .typewriter-container'
			)
			.forEach((blockDomElement) => {
				const attributes = JSON.parse(
					// @ts-ignore
					blockDomElement.dataset.gutenbergAttributes
				);

				const root = createRoot(blockDomElement);
				root.render(<TypeWriter texts={attributes.testToggle ? attributes.texts : [attributes.text]}
					pauseDelay={1000}
					typeDelay={50}
					deleteDelay={30}
				/>);
			});
	},
	false
);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __experimentalInputControl as InputControl, ToggleControl } from '@wordpress/components'
import { BlockEditProps } from '@wordpress/blocks';
import { useState } from "@wordpress/element"

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }: BlockEditProps<{ texts: string[]; text: string; testToggle: boolean; }>) {
	const blockProps = useBlockProps();
	const { texts, text } = attributes;
	const [toggle, setToggle] = useState(false);
	return (
		<div {...blockProps}>
			{/* {attributes.texts.map(e => <p>{e}</p>)} */}

			<div>
				<InputControl
					placeholder='텍스트를 입력해주세요.'
					value={text}
					onChange={(text) => text && setAttributes({ text })}
				/>
			</div>
			<div>
				<ToggleControl
					label='여러 문장 테스트 활성화'
					checked={toggle}
					onChange={(checked) => {
						setToggle(checked)
						setAttributes({ testToggle: checked })
					}}
				/>
			</div>
		</div>
	);
}

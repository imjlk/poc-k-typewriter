/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }: BlockEditProps<{ texts: string[]; text: string; testToggle: boolean; }>) {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className='typewriter-container'
				data-gutenberg-attributes={JSON.stringify(attributes)}
			>

			</div>
		</div>
	);
}

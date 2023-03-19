/// <reference types="node" />
import { InputInfo, EncodeOptions } from './types';
/**
 * Encode a raw input image using MozJPEG
 *
 * @async
 * @param {Buffer} image Raw image input buffer
 * @param {InputInfo} inputInfo Information about the input image
 * @param {EncodeOptions} encodeOptions Encoding options passed to MozJPEG
 * @returns {Buffer} Processed image buffer
 */
declare const encode: (image: Buffer, inputInfo: InputInfo, encodeOptions?: EncodeOptions) => Promise<Buffer>;
export default encode;
export { ColorSpace } from './colorspace';
export type { InputInfo, EncodeOptions } from './types';

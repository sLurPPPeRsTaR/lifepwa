/// <reference types="node" />
export declare enum ColorSpace {
    UNKNOWN = 0,
    GRAYSCALE = 1,
    RGB = 2,
    YCbCr = 3,
    CMYK = 4,
    YCCK = 5
}
/**
 * Checks if a raw input image is a grayscale image
 *
 * @param {Buffer} data Raw input image data
 * @param {number} channels Number of channels
 * @returns {boolean} Wheter the raw input image data is grayscale or not
 */
export declare const isGrayscale: (data: Buffer, channels: number) => boolean;

/**
 * Process stdout stream
 *
 * @param {number} char Next char in stream
 */
export declare const stdout: (char: number) => void;
/**
 * Process stderr stream
 *
 * @param {number} char Next char in stream
 */
export declare const stderr: (char: number) => void;
/**
 * Flush remaining buffer
 */
export declare const flush: () => void;

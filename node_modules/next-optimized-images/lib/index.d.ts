interface WebpackConfig {
    module: {
        rules: {
            test: RegExp;
            use?: Record<string, unknown>[];
            oneOf?: {
                test: RegExp;
                use?: {
                    options: {
                        name: string;
                    };
                };
                include?: RegExp[];
                exclude?: RegExp[];
                issuer?: {
                    test: RegExp;
                };
            }[];
        }[];
    };
}
declare const getHandledImageTypes: (handleImages: string[]) => Record<string, boolean>;
declare const getHandledFilesRegex: (handledImageTypes: Record<string, boolean>) => RegExp;
/**
 * Configure webpack and next.js to handle and optimize images with this plugin.
 *
 * @param {object} nextConfig - configuration, see the readme for possible values
 * @param {object} nextComposePlugins - additional information when loaded with next-compose-plugins
 * @returns {object}
 */
declare const withOptimizedImages: (nextConfig?: {
    images?: {
        handleImages?: string[];
    };
    assetPrefix?: string;
    webpack?: unknown;
}) => {
    webpack(config: WebpackConfig, options: Record<string, unknown>): any;
    images?: {
        handleImages?: string[] | undefined;
    } | undefined;
    assetPrefix?: string | undefined;
};

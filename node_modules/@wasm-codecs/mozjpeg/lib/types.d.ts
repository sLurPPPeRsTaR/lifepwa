import { ColorSpace } from './colorspace';
export declare type InputInfo = {
    width: number;
    height: number;
    channels?: number;
};
export declare type EncodeOptions = {
    quality?: number;
    baseline?: boolean;
    arithmetic?: boolean;
    progressive?: boolean;
    optimizeCoding?: boolean;
    smoothing?: number;
    colorSpace?: ColorSpace;
    quantTable?: number;
    trellisMultipass?: boolean;
    trellisOptZero?: boolean;
    trellisOptTable?: boolean;
    trellisLoops?: number;
    autoSubsample?: boolean;
    chromaSubsample?: number;
    separateChromaQuality?: boolean;
    chromaQuality?: number;
};

import { GenType } from './gen-type';
import { Model } from './model';
import { Options } from './options';
/**
 * Represents the model index
 */
export declare class ModelIndex extends GenType {
    constructor(models: Model[], options: Options);
    protected skipImport(): boolean;
    protected initPathToRoot(): string;
}

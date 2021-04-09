import { ResponsiveConfig } from "./type";
export declare class ResponsiveService {
    private config;
    constructor(config?: ResponsiveConfig);
    genClass(count: number): string[];
}
export declare const responseService: ResponsiveService;

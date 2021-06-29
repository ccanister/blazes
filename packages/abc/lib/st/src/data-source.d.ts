import { ISTDataSourceOption, ISTDataSourceResult } from "./type";
export default class STDataSource {
    process(options: ISTDataSourceOption): Promise<ISTDataSourceResult>;
    private get;
    private getByHttp;
    private getFilteredData;
    private getReqFilterMap;
}

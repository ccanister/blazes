import { ISTColumn, ISTColumnFilter } from "./type";
export default class STColumnSource {
    lastColumns: ISTColumn[];
    process(list: ISTColumn[]): ISTColumn[];
    private filterCoerce;
    private fixedCoerce;
    private fixButtons;
    private btnCoerceIf;
    cleanFilter(col: ISTColumn): void;
    checkAllFilter(checked: boolean, col: ISTColumn): void;
    updateDefault(filter: ISTColumnFilter): void;
    updateIndeterminate(filter: ISTColumnFilter): void;
}

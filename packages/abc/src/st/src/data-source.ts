import { instance } from "@blazes/theme";
import { deepCopy, deepGet } from "@blazes/utils";
import {
  ISTColumn,
  ISTColumnFilter,
  ISTColumnFilterMenu,
  ISTData,
  ISTDataSourceOption,
  ISTDataSourceResult,
} from "./type";

export default class STDataSource {
  process(options: ISTDataSourceOption): Promise<ISTDataSourceResult> {
    return new Promise((resolve, reject) => {
      const { data, res, paginator, page, ps, pi, columns, total } = options;
      let data$: Promise<ISTData[]>;
      let retTotal: number;
      let retPs: number;
      let retPi: number;
      let remote = false;
      let rawData: any;
      let showPage = page.show;

      if (typeof data === "string") {
        remote = true;
        data$ = this.getByHttp(data, options)
          .then((result) => {
            rawData = result;
            let ret: ISTData[];
            if (Array.isArray(result)) {
              ret = result;
              retTotal = ret.length;
              retPs = retTotal;
              showPage = false;
            } else {
              ret = deepGet(result, res?.reName?.list, []);

              if (!Array.isArray(ret)) {
                ret = [];
              }
              retTotal = +deepGet(result, res?.reName?.total, []) || 0;
            }

            return deepCopy(ret);
          })
          .catch((err) => {
            reject(err);
            return [];
          });
      } else if (Array.isArray(data)) {
        data$ = Promise.resolve(data);
      } else {
        data$ = data;
      }

      if (!remote) {
        data$ = data$
          .then((result) => {
            columns
              .filter((w) => w.filter)
              .forEach((c) => {
                const filter = c.filter!;
                const values = this.getFilteredData(filter);
                if (values.length === 0) return;
                const onFilter = filter.fn;
                if (typeof onFilter !== "function") {
                  console.warn(`[st] Muse provide the fn function in filter`);
                  return;
                }
                result = result.filter((record) =>
                  values.some((v) => onFilter(v, record))
                );
              });
            return result;
          })
          .then((result) => {
            rawData = result;

            if (paginator && page.front) {
              const maxPageIndex = Math.ceil(result.length / ps);
              retPi = Math.max(1, pi > maxPageIndex ? maxPageIndex : pi);
              retTotal = result.length;
              if (page.show) {
                return result.slice((retPi - 1) * ps, retPi * ps);
              }
            }

            return result;
          });
      }

      if (typeof res.process === "function") {
        data$ = data$.then((result) => res.process!(result, rawData));
      }

      data$ = data$.then((result) => {
        const resultOffset = ((retPi || pi) - 1) * (retPs || ps);
        for (let i = 0, len = result.length; i < len; i++) {
          const realIndex = resultOffset + i + 1;
          result[i]._values = columns.map((column, index) =>
            this.get(result[i], column, index, realIndex)
          );
        }

        return result;
      });

      data$.then((result) => {
        const realTotal = retTotal || total;
        const realPs = retPs || ps;
        resolve({
          pi: retPi,
          ps: retPs,
          total: retTotal,
          list: result,
          pageShow:
            typeof showPage === "undefined" ? realTotal > realPs : showPage,
        });
      });
    });
  }

  private get(
    item: ISTData,
    column: ISTColumn,
    index: number,
    realIndex: number
  ): { text: any; org: any; color?: string } {
    if (column.format) {
      const formatRes = column.format(item, column, index, realIndex);
      return { text: formatRes || "", org: formatRes };
    }

    const value = deepGet(item, column.index, column.default);
    let text = value;
    let color: string | undefined;
    switch (column.type) {
      case "tag": {
        const data = column.tag;
        if (data && data[text]) {
          const dataItem = data[text];
          text = dataItem.text;
          color = dataItem.color;
        } else {
          text = "";
        }
        break;
      }
      default:
        break;
    }

    return { text: text != null ? text : "", org: value, color };
  }

  private getByHttp(url: string, options: ISTDataSourceOption): Promise<any> {
    const { req, paginator, pi, ps, columns, first } = options;
    let params = {};
    const reName = req.reName;
    if (paginator) {
      params = {
        [reName?.pi as string]: pi,
        [reName?.ps as string]: ps,
      };
    }

    params = {
      ...params,
      ...req.params,
      ...this.getReqFilterMap(columns),
      ...(first && req.firstParams ? req.firstParams : {}),
    };

    return instance.get(url, { params, headers: req.headers });
  }

  private getFilteredData(filter: ISTColumnFilter): ISTColumnFilterMenu[] {
    return filter._menus!.value.filter((f) => f.checked === true);
  }

  private getReqFilterMap(columns: ISTColumn[]): { [key: string]: string } {
    let ret = {};
    columns
      .filter((w) => w.filter)
      .forEach((col) => {
        const filter = col.filter!;
        const values = this.getFilteredData(filter);
        let obj: { [key: string]: any } = {};
        if (filter.reName) {
          obj = filter.reName!(filter._menus!.value, col);
        } else {
          obj[filter.key!] = values.map((i) => i.value).join(",");
        }
        ret = { ...ret, ...obj };
      });
    return ret;
  }

  private getReqSortMap(columns: ISTColumn[]): { [key: string]: string } {
    let ret = {};
    columns
      .filter((w) => w.sorter?.compare === true && w.sorter?.default)
      .forEach((col) => {
        let obj: { [key: string]: any } = {};
        if (col.sorter?.reName) {
          obj = col.sorter.reName!(col, col.sorter.default!);
        } else {
          obj[col.index as string] = col.sorter?.default;
        }
        ret = { ...ret, ...obj };
      });
    return ret;
  }
}

import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  Canceler,
} from "axios";
import { registerAxios } from "@blazes/theme";

export interface IConfig extends AxiosRequestConfig {
  useCsrf?: boolean;
  useBtnLoading?: boolean;
  deDuplication?: boolean;
}

export let instance: AxiosInstance;

export class RequestService {
  public instance: AxiosInstance;
  private CancelToken = Axios.CancelToken;
  private theQueue: {
    info: string;
    c: Canceler;
  }[] = [];

  constructor(config: IConfig) {
    instance = this.instance = this.genInstance(config);
    if (config.useCsrf) {
      this.addCsrfToken();
    }
    if (config.deDuplication) {
      this.addDeDuplication();
    }
    if (config.useBtnLoading) {
      registerAxios(instance);
    }
  }

  private genInstance(config: AxiosRequestConfig) {
    return Axios.create({
      timeout: 1000 * 20,
      ...config,
    });
  }

  private addCsrfToken() {
    this.instance.interceptors.request.use((config) => {
      const regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
      const csrfToken = document.cookie.match(regex);
      config.headers["X-Requested-With"] = "XMLHttpRequest";
      config.headers["X-CSRFToken"] = csrfToken ? csrfToken[1] : null;
      return config;
    });
  }

  private addDeDuplication() {
    const instance = this.instance;
    instance.interceptors.request.use((config) => {
      config.cancelToken = new this.CancelToken((c) => {
        this.findInQueue({
          info: `${this.getQueueKey(config)}`,
          c,
        });
      });

      return config;
    });
    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        this.removeQueue({
          info: `${this.getQueueKey(response.config)}`,
        });

        return response;
      },
      (error) => {
        if (error.response && error.response.config) {
          // 遗留问题、超时时拿不到响应对象，就无法删除 theQueue 队列
          this.removeQueue({
            info: `${this.getQueueKey(error.response.config)}`,
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private getQueueKey(config: AxiosRequestConfig) {
    const { url, method, data, params } = config;
    return `${url}_${method}_${
      method === "post" || method === "put"
        ? JSON.stringify(data || {})
        : JSON.stringify(params || {})
    }`;
  }

  private findInQueue(requestInfo: any) {
    const index = this.theQueue.findIndex(
      (request) => request.info === requestInfo.info
    );

    if (index >= 0) {
      this.theQueue[index].c("取消请求");
      this.theQueue.splice(index, 1);
    }
    this.theQueue.push(requestInfo);
  }

  private removeQueue(requestInfo: any) {
    const index = this.theQueue.findIndex(
      (request) => request.info === requestInfo.info
    );
    if (index < 0) return;
    this.theQueue.splice(index, 1);
  }
}

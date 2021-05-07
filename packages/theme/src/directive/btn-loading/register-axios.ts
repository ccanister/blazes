import { AxiosInstance, AxiosResponse } from "axios";
import btnLoadingService from "./service";

const waitMethods = ["post", "put", "patch"];

function isWatiMethods(method: string | undefined): boolean {
  return method ? waitMethods.includes(method) : false;
}

export function registerAxios(axios: AxiosInstance) {
  axios.interceptors.request.use((config) => {
    const { url, method } = config;
    if (isWatiMethods(method)) {
      // 延迟执行，因为不能保证click事件的执行顺序
      setTimeout(() => {
        btnLoadingService.startLoading(url as string);
      });
    }
    return config;
  });
  axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      const config = response.config;

      const { url, method } = config;
      if (isWatiMethods(method)) {
        btnLoadingService.stopLoading(url as string);
      }

      return response;
    },
    (error) => {
      const { url, method } = (error.response && error.response.config) || {};
      if (isWatiMethods(method)) {
        btnLoadingService.stopLoading(url as string);
      }

      return Promise.reject(error);
    }
  );
}

/**
 * 请求轮询
 */
export class Polling {
  private timer: number | null = null;
  private count = 0;
  private stopped = false;

  constructor(
    private interval: number,
    private callback?: () => Promise<any>,
    private defaultCount: number = Infinity
  ) {}

  reSetCallback(callback: () => Promise<any>, once = false) {
    this.stop();
    this.callback = callback;
    this.start(once);
  }

  start(once = false) {
    const { callback, interval, defaultCount, count } = this;
    if (!callback) {
      return;
    }
    if (count >= defaultCount) {
      this.stop();
      return;
    }
    if (this.stopped) {
      this.stopped = false;
    }
    // 如果直接在callback停止计时器运行，在then里面仍然会进行下次计时器的运行，所以需要在callback返回false停止
    // 或者才callback时候stop，也会进入then的逻辑
    callback().then(() => {
      if (once || this.stopped || callback !== this.callback) {
        // 使用stoppped变量后，当调用reSetCallback可能仍然引起上一次请求的轮询
        return;
      }
      this.count++;
      this.timer = setTimeout(() => {
        this.start();
      }, interval);
    });
  }

  // 如果请求太久没有回来，此时页面切换后导致组建的销毁，调用stop方法，是没有作用的
  // 因为仍然会进入到then里面
  stop() {
    clearTimeout(this.timer as number);
    this.timer = null;
    this.count = 0;
    this.stopped = true;
  }
}

import Schema from "async-validator";
import { deepMerge } from "@blazes/utils";

const prototype = Schema.prototype as any;
function customMessages() {
  return {
    required: "请输入%s",
    types: {
      email: "请输入正确的邮箱",
      number: "%s不是数字类型"
    },
    pattern: {
      mismatch: "请输入正确的%s",
    },
  };
}

export function initSchema() {
  (Schema as any).warning = () => {};
  const originMessages = prototype.messages;
  prototype.messages = function (messages: Record<string, any>) {
    return originMessages.call(this, deepMerge(customMessages(), messages));
  };
}

export const CUSTOM_TRIGGER = "custom";

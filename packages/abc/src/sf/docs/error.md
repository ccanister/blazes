---
type: 文档
title: 校验错误
order: 3
---

## 写在前面

因为 `sf` 包装了 `antdv/form` 组件，其校验依赖了 [async-validator](https://github.com/yiminghe/async-validator)。

在 `main.ts` 里会调用 `initSchema` 方法针对常用的错误来覆盖默认的英文错误消息。

## 自定义校验

### 简单校验

基本用法可参照 `async-validator`，例如密码的正则校验：

```json
ui: {
    rule: {
        pattern: /^[\w]{9,11}$/,
        message: "不允许输入特殊字符，9~11位",
    }
}
```

注意 `trigger` 字段，`antdv/form`有两个枚举值可使用： `blur` 和 `change`。但更推荐点击按钮后再进行校验，可以使用 `theme` 导出的 `CUSTOM_TRIGGER`。

### 联动校验

如果用户需要表单项其他字段配合，可以采用 `validate` 字段。他会传入 `form` 值，并要求返回函数。

例如校验再次输入密码时候，需要密码字段：

```json
ui: {
    rule: {
        validate: {
            trigger: CUSTOM_TRIGGER,
            validator: (form: Ref<any>) => (rule: Rule, value: string) => {
                if (form.value.password === value) {
                return Promise.resolve();
                } else {
                return Promise.reject("两次密码输入不一致");
                }
            },
        },
    }
}
```

如果是异步校验，同样返回 Promis 即可。
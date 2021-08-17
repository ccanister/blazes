import { Ref } from "vue";
declare const _default: import("vue").DefineComponent<{
    schema: ObjectConstructor;
    width: StringConstructor;
    button: ObjectConstructor;
    formData: ObjectConstructor;
}, {
    items: any[];
    formRef: Ref<({
        new (...args: any[]): {
            $: import("vue").ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            }> & Pick<Readonly<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            } & {
                layout?: "vertical" | "horizontal" | "inline" | undefined;
                colon?: boolean | undefined;
                validateTrigger?: string | string[] | undefined;
                labelCol?: unknown;
                wrapperCol?: unknown;
                labelAlign?: "left" | "right" | undefined;
                rules?: {
                    [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
                } | undefined;
                hideRequiredMark?: boolean | undefined;
                validateOnRuleChange?: boolean | undefined;
                scrollToFirstError?: boolean | undefined;
            }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "colon" | "validateTrigger" | "labelCol" | "wrapperCol" | "labelAlign" | "rules" | "layout" | "hideRequiredMark" | "validateOnRuleChange" | "scrollToFirstError" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: import("vue").Slot;
            }>;
            $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
            $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
            $emit: (event: string, ...args: any[]) => void;
            $el: any;
            $options: import("vue").ComponentOptionsBase<Readonly<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            } & {
                layout?: "vertical" | "horizontal" | "inline" | undefined;
                colon?: boolean | undefined;
                validateTrigger?: string | string[] | undefined;
                labelCol?: unknown;
                wrapperCol?: unknown;
                labelAlign?: "left" | "right" | undefined;
                rules?: {
                    [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
                } | undefined;
                hideRequiredMark?: boolean | undefined;
                validateOnRuleChange?: boolean | undefined;
                scrollToFirstError?: boolean | undefined;
            }>, {
                configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
                fields: any[];
                form: any;
                lastValidatePromise: any;
                vertical: import("vue").ComputedRef<boolean>;
            }, unknown, {}, {
                addField(field: any): void;
                removeField(field: any): void;
                handleSubmit(e: Event): void;
                getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
                resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
                clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
                handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
                validate(...args: any[]): Promise<any>;
                scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
                getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
                validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
                validateField(...args: any[]): Promise<any>;
            }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            }>;
            $forceUpdate: import("vue").ReactiveEffect<any>;
            $nextTick: typeof import("vue").nextTick;
            $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
        } & Readonly<{
            onSubmit: (...args: any[]) => any;
            prefixCls: string;
            name: string;
            model: {
                [key: string]: any;
            };
            validateMessages: {
                [key: string]: any;
            };
            onFinish: (...args: any[]) => any;
            onFinishFailed: (...args: any[]) => any;
        } & {
            layout?: "vertical" | "horizontal" | "inline" | undefined;
            colon?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            rules?: {
                [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
            } | undefined;
            hideRequiredMark?: boolean | undefined;
            validateOnRuleChange?: boolean | undefined;
            scrollToFirstError?: boolean | undefined;
        }> & import("vue").ShallowUnwrapRef<{
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            fields: any[];
            form: any;
            lastValidatePromise: any;
            vertical: import("vue").ComputedRef<boolean>;
        }> & {
            addField(field: any): void;
            removeField(field: any): void;
            handleSubmit(e: Event): void;
            getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
            resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
            clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
            handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
            validate(...args: any[]): Promise<any>;
            scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
            getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
            validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
            validateField(...args: any[]): Promise<any>;
        } & import("vue").ComponentCustomProperties;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<{
        onSubmit: (...args: any[]) => any;
        prefixCls: string;
        name: string;
        model: {
            [key: string]: any;
        };
        validateMessages: {
            [key: string]: any;
        };
        onFinish: (...args: any[]) => any;
        onFinishFailed: (...args: any[]) => any;
    } & {
        layout?: "vertical" | "horizontal" | "inline" | undefined;
        colon?: boolean | undefined;
        validateTrigger?: string | string[] | undefined;
        labelCol?: unknown;
        wrapperCol?: unknown;
        labelAlign?: "left" | "right" | undefined;
        rules?: {
            [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
        } | undefined;
        hideRequiredMark?: boolean | undefined;
        validateOnRuleChange?: boolean | undefined;
        scrollToFirstError?: boolean | undefined;
    }>, {
        configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
        fields: any[];
        form: any;
        lastValidatePromise: any;
        vertical: import("vue").ComputedRef<boolean>;
    }, unknown, {}, {
        addField(field: any): void;
        removeField(field: any): void;
        handleSubmit(e: Event): void;
        getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
        resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
        clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
        handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
        validate(...args: any[]): Promise<any>;
        scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
        getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
        validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
        validateField(...args: any[]): Promise<any>;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
        onSubmit: (...args: any[]) => any;
        prefixCls: string;
        name: string;
        model: {
            [key: string]: any;
        };
        validateMessages: {
            [key: string]: any;
        };
        onFinish: (...args: any[]) => any;
        onFinishFailed: (...args: any[]) => any;
    }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
        readonly Item: import("vue").DefineComponent<{
            id: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            htmlFor: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            prefixCls: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            label: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            help: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            extra: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            labelCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            wrapperCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            hasFeedback: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            colon: import("vue-types").VueTypeValidableDef<boolean>;
            labelAlign: import("vue-types").VueTypeDef<"left" | "right">;
            prop: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            name: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            rules: import("vue-types").VueTypeDef<unknown[] | {
                [key: string]: any;
            }>;
            autoLink: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            required: import("vue-types").VueTypeValidableDef<boolean>;
            validateFirst: import("vue-types").VueTypeValidableDef<boolean>;
            validateStatus: import("vue-types").VueTypeDef<"" | "error" | "success" | "warning" | "validating">;
            validateTrigger: {
                type: import("vue").PropType<string | string[]>;
            };
            messageVariables: {
                type: import("vue").PropType<Record<string, string>>;
            };
        }, {
            isFormItemChildren: boolean;
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            FormContext: any;
            fieldId: import("vue").ComputedRef<string>;
            fieldName: import("vue").ComputedRef<string | number | string[] | number[]>;
            namePath: import("vue").ComputedRef<import("ant-design-vue/lib/form/interface").InternalNamePath>;
            isRequired: import("vue").ComputedRef<boolean>;
            getRules: () => any[];
            fieldValue: import("vue").ComputedRef<any>;
            mergedValidateTrigger: import("vue").ComputedRef<any[]>;
        }, {
            validateState: "" | "error" | "success" | "warning" | "validating";
            validateMessage: string;
            validateDisabled: boolean;
            validator: {};
            helpShow: boolean;
            errors: any[];
            initialValue: any;
        }, {}, {
            getNamePath(): any[];
            validateRules(options: import("ant-design-vue/lib/form/interface").ValidateOptions): Promise<void> | Promise<string[]>;
            onFieldBlur(): void;
            onFieldChange(): void;
            clearValidate(): void;
            resetField(): void;
            getHelpMessage(): any;
            onLabelClick(): void;
            onHelpAnimEnd(_key: string, helpShow: boolean): void;
            renderHelp(prefixCls: string): JSX.Element;
            renderExtra(prefixCls: string): JSX.Element;
            renderValidateWrapper(prefixCls: string, c1: import("ant-design-vue/lib/_util/type").VueNode, c2: import("ant-design-vue/lib/_util/type").VueNode, c3: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderWrapper(prefixCls: string, children: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderLabel(prefixCls: string): JSX.Element;
            renderChildren(prefixCls: string, child: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element[];
            renderFormItem(child: any[]): JSX.Element;
        }, {
            methods: {
                setState(state: {}, callback: any): void;
                __emit(...args: any[]): void;
            };
        }, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        } & {
            label?: import("ant-design-vue/lib/_util/type").VueNode;
            help?: import("ant-design-vue/lib/_util/type").VueNode;
            name?: string | number | string[] | number[] | undefined;
            extra?: import("ant-design-vue/lib/_util/type").VueNode;
            colon?: boolean | undefined;
            required?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            prop?: string | number | string[] | number[] | undefined;
            rules?: unknown[] | {
                [key: string]: any;
            } | undefined;
            validateFirst?: boolean | undefined;
            validateStatus?: "" | "error" | "success" | "warning" | "validating" | undefined;
            messageVariables?: Record<string, string> | undefined;
        }>, {
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        }>;
    } & ((app: import("vue").App<any>, ...options: any[]) => any) & {
        install?: ((app: import("vue").App<any>, ...options: any[]) => any) | undefined;
    } & {
        readonly Item: import("vue").DefineComponent<{
            id: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            htmlFor: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            prefixCls: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            label: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            help: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            extra: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            labelCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            wrapperCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            hasFeedback: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            colon: import("vue-types").VueTypeValidableDef<boolean>;
            labelAlign: import("vue-types").VueTypeDef<"left" | "right">;
            prop: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            name: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            rules: import("vue-types").VueTypeDef<unknown[] | {
                [key: string]: any;
            }>;
            autoLink: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            required: import("vue-types").VueTypeValidableDef<boolean>;
            validateFirst: import("vue-types").VueTypeValidableDef<boolean>;
            validateStatus: import("vue-types").VueTypeDef<"" | "error" | "success" | "warning" | "validating">;
            validateTrigger: {
                type: import("vue").PropType<string | string[]>;
            };
            messageVariables: {
                type: import("vue").PropType<Record<string, string>>;
            };
        }, {
            isFormItemChildren: boolean;
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            FormContext: any;
            fieldId: import("vue").ComputedRef<string>;
            fieldName: import("vue").ComputedRef<string | number | string[] | number[]>;
            namePath: import("vue").ComputedRef<import("ant-design-vue/lib/form/interface").InternalNamePath>;
            isRequired: import("vue").ComputedRef<boolean>;
            getRules: () => any[];
            fieldValue: import("vue").ComputedRef<any>;
            mergedValidateTrigger: import("vue").ComputedRef<any[]>;
        }, {
            validateState: "" | "error" | "success" | "warning" | "validating";
            validateMessage: string;
            validateDisabled: boolean;
            validator: {};
            helpShow: boolean;
            errors: any[];
            initialValue: any;
        }, {}, {
            getNamePath(): any[];
            validateRules(options: import("ant-design-vue/lib/form/interface").ValidateOptions): Promise<void> | Promise<string[]>;
            onFieldBlur(): void;
            onFieldChange(): void;
            clearValidate(): void;
            resetField(): void;
            getHelpMessage(): any;
            onLabelClick(): void;
            onHelpAnimEnd(_key: string, helpShow: boolean): void;
            renderHelp(prefixCls: string): JSX.Element;
            renderExtra(prefixCls: string): JSX.Element;
            renderValidateWrapper(prefixCls: string, c1: import("ant-design-vue/lib/_util/type").VueNode, c2: import("ant-design-vue/lib/_util/type").VueNode, c3: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderWrapper(prefixCls: string, children: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderLabel(prefixCls: string): JSX.Element;
            renderChildren(prefixCls: string, child: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element[];
            renderFormItem(child: any[]): JSX.Element;
        }, {
            methods: {
                setState(state: {}, callback: any): void;
                __emit(...args: any[]): void;
            };
        }, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        } & {
            label?: import("ant-design-vue/lib/_util/type").VueNode;
            help?: import("ant-design-vue/lib/_util/type").VueNode;
            name?: string | number | string[] | number[] | undefined;
            extra?: import("ant-design-vue/lib/_util/type").VueNode;
            colon?: boolean | undefined;
            required?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            prop?: string | number | string[] | number[] | undefined;
            rules?: unknown[] | {
                [key: string]: any;
            } | undefined;
            validateFirst?: boolean | undefined;
            validateStatus?: "" | "error" | "success" | "warning" | "validating" | undefined;
            messageVariables?: Record<string, string> | undefined;
        }>, {
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        }>;
    }) | ({
        new (...args: any[]): {
            $: import("vue").ComponentInternalInstance;
            $data: {};
            $props: Partial<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            }> & Pick<Readonly<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            } & {
                layout?: "vertical" | "horizontal" | "inline" | undefined;
                colon?: boolean | undefined;
                validateTrigger?: string | string[] | undefined;
                labelCol?: unknown;
                wrapperCol?: unknown;
                labelAlign?: "left" | "right" | undefined;
                rules?: {
                    [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
                } | undefined;
                hideRequiredMark?: boolean | undefined;
                validateOnRuleChange?: boolean | undefined;
                scrollToFirstError?: boolean | undefined;
            }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "colon" | "validateTrigger" | "labelCol" | "wrapperCol" | "labelAlign" | "rules" | "layout" | "hideRequiredMark" | "validateOnRuleChange" | "scrollToFirstError" | "key" | "ref" | "onVnodeBeforeMount" | "onVnodeMounted" | "onVnodeBeforeUpdate" | "onVnodeUpdated" | "onVnodeBeforeUnmount" | "onVnodeUnmounted" | "class" | "style">;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: import("vue").Slot;
            }>;
            $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
            $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
            $emit: (event: string, ...args: any[]) => void;
            $el: any;
            $options: import("vue").ComponentOptionsBase<Readonly<{
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            } & {
                layout?: "vertical" | "horizontal" | "inline" | undefined;
                colon?: boolean | undefined;
                validateTrigger?: string | string[] | undefined;
                labelCol?: unknown;
                wrapperCol?: unknown;
                labelAlign?: "left" | "right" | undefined;
                rules?: {
                    [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
                } | undefined;
                hideRequiredMark?: boolean | undefined;
                validateOnRuleChange?: boolean | undefined;
                scrollToFirstError?: boolean | undefined;
            }>, {
                configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
                fields: any[];
                form: any;
                lastValidatePromise: any;
                vertical: import("vue").ComputedRef<boolean>;
            }, unknown, {}, {
                addField(field: any): void;
                removeField(field: any): void;
                handleSubmit(e: Event): void;
                getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
                resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
                clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
                handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
                validate(...args: any[]): Promise<any>;
                scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
                getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
                validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
                validateField(...args: any[]): Promise<any>;
            }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
                onSubmit: (...args: any[]) => any;
                prefixCls: string;
                name: string;
                model: {
                    [key: string]: any;
                };
                validateMessages: {
                    [key: string]: any;
                };
                onFinish: (...args: any[]) => any;
                onFinishFailed: (...args: any[]) => any;
            }>;
            $forceUpdate: import("vue").ReactiveEffect<any>;
            $nextTick: typeof import("vue").nextTick;
            $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
        } & Readonly<{
            onSubmit: (...args: any[]) => any;
            prefixCls: string;
            name: string;
            model: {
                [key: string]: any;
            };
            validateMessages: {
                [key: string]: any;
            };
            onFinish: (...args: any[]) => any;
            onFinishFailed: (...args: any[]) => any;
        } & {
            layout?: "vertical" | "horizontal" | "inline" | undefined;
            colon?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            rules?: {
                [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
            } | undefined;
            hideRequiredMark?: boolean | undefined;
            validateOnRuleChange?: boolean | undefined;
            scrollToFirstError?: boolean | undefined;
        }> & import("vue").ShallowUnwrapRef<{
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            fields: any[];
            form: any;
            lastValidatePromise: any;
            vertical: import("vue").ComputedRef<boolean>;
        }> & {
            addField(field: any): void;
            removeField(field: any): void;
            handleSubmit(e: Event): void;
            getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
            resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
            clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
            handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
            validate(...args: any[]): Promise<any>;
            scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
            getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
            validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
            validateField(...args: any[]): Promise<any>;
        } & import("vue").ComponentCustomProperties;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<{
        onSubmit: (...args: any[]) => any;
        prefixCls: string;
        name: string;
        model: {
            [key: string]: any;
        };
        validateMessages: {
            [key: string]: any;
        };
        onFinish: (...args: any[]) => any;
        onFinishFailed: (...args: any[]) => any;
    } & {
        layout?: "vertical" | "horizontal" | "inline" | undefined;
        colon?: boolean | undefined;
        validateTrigger?: string | string[] | undefined;
        labelCol?: unknown;
        wrapperCol?: unknown;
        labelAlign?: "left" | "right" | undefined;
        rules?: {
            [k: string]: import("ant-design-vue/lib/form/Form").ValidationRule | import("ant-design-vue/lib/form/Form").ValidationRule[];
        } | undefined;
        hideRequiredMark?: boolean | undefined;
        validateOnRuleChange?: boolean | undefined;
        scrollToFirstError?: boolean | undefined;
    }>, {
        configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
        fields: any[];
        form: any;
        lastValidatePromise: any;
        vertical: import("vue").ComputedRef<boolean>;
    }, unknown, {}, {
        addField(field: any): void;
        removeField(field: any): void;
        handleSubmit(e: Event): void;
        getFieldsByNameList(nameList: import("ant-design-vue/lib/form/interface").NamePath): any[];
        resetFields(name: import("ant-design-vue/lib/form/interface").NamePath): void;
        clearValidate(name: import("ant-design-vue/lib/form/interface").NamePath): void;
        handleFinishFailed(errorInfo: import("ant-design-vue/lib/form/interface").ValidateErrorEntity<any>): void;
        validate(...args: any[]): Promise<any>;
        scrollToField(name: import("ant-design-vue/lib/form/interface").NamePath, options?: {} | undefined): void;
        getFieldsValue(nameList?: true | import("ant-design-vue/lib/form/interface").NamePath[] | undefined): any;
        validateFields(nameList?: import("ant-design-vue/lib/form/interface").NamePath[] | undefined, options?: import("ant-design-vue/lib/form/interface").ValidateOptions | undefined): Promise<any>;
        validateField(...args: any[]): Promise<any>;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
        onSubmit: (...args: any[]) => any;
        prefixCls: string;
        name: string;
        model: {
            [key: string]: any;
        };
        validateMessages: {
            [key: string]: any;
        };
        onFinish: (...args: any[]) => any;
        onFinishFailed: (...args: any[]) => any;
    }> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & {
        readonly Item: import("vue").DefineComponent<{
            id: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            htmlFor: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            prefixCls: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            label: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            help: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            extra: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            labelCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            wrapperCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            hasFeedback: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            colon: import("vue-types").VueTypeValidableDef<boolean>;
            labelAlign: import("vue-types").VueTypeDef<"left" | "right">;
            prop: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            name: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            rules: import("vue-types").VueTypeDef<unknown[] | {
                [key: string]: any;
            }>;
            autoLink: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            required: import("vue-types").VueTypeValidableDef<boolean>;
            validateFirst: import("vue-types").VueTypeValidableDef<boolean>;
            validateStatus: import("vue-types").VueTypeDef<"" | "error" | "success" | "warning" | "validating">;
            validateTrigger: {
                type: import("vue").PropType<string | string[]>;
            };
            messageVariables: {
                type: import("vue").PropType<Record<string, string>>;
            };
        }, {
            isFormItemChildren: boolean;
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            FormContext: any;
            fieldId: import("vue").ComputedRef<string>;
            fieldName: import("vue").ComputedRef<string | number | string[] | number[]>;
            namePath: import("vue").ComputedRef<import("ant-design-vue/lib/form/interface").InternalNamePath>;
            isRequired: import("vue").ComputedRef<boolean>;
            getRules: () => any[];
            fieldValue: import("vue").ComputedRef<any>;
            mergedValidateTrigger: import("vue").ComputedRef<any[]>;
        }, {
            validateState: "" | "error" | "success" | "warning" | "validating";
            validateMessage: string;
            validateDisabled: boolean;
            validator: {};
            helpShow: boolean;
            errors: any[];
            initialValue: any;
        }, {}, {
            getNamePath(): any[];
            validateRules(options: import("ant-design-vue/lib/form/interface").ValidateOptions): Promise<void> | Promise<string[]>;
            onFieldBlur(): void;
            onFieldChange(): void;
            clearValidate(): void;
            resetField(): void;
            getHelpMessage(): any;
            onLabelClick(): void;
            onHelpAnimEnd(_key: string, helpShow: boolean): void;
            renderHelp(prefixCls: string): JSX.Element;
            renderExtra(prefixCls: string): JSX.Element;
            renderValidateWrapper(prefixCls: string, c1: import("ant-design-vue/lib/_util/type").VueNode, c2: import("ant-design-vue/lib/_util/type").VueNode, c3: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderWrapper(prefixCls: string, children: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderLabel(prefixCls: string): JSX.Element;
            renderChildren(prefixCls: string, child: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element[];
            renderFormItem(child: any[]): JSX.Element;
        }, {
            methods: {
                setState(state: {}, callback: any): void;
                __emit(...args: any[]): void;
            };
        }, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        } & {
            label?: import("ant-design-vue/lib/_util/type").VueNode;
            help?: import("ant-design-vue/lib/_util/type").VueNode;
            name?: string | number | string[] | number[] | undefined;
            extra?: import("ant-design-vue/lib/_util/type").VueNode;
            colon?: boolean | undefined;
            required?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            prop?: string | number | string[] | number[] | undefined;
            rules?: unknown[] | {
                [key: string]: any;
            } | undefined;
            validateFirst?: boolean | undefined;
            validateStatus?: "" | "error" | "success" | "warning" | "validating" | undefined;
            messageVariables?: Record<string, string> | undefined;
        }>, {
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        }>;
    } & {
        install: (app: import("vue").App<any>, ...options: any[]) => any;
    } & {
        readonly Item: import("vue").DefineComponent<{
            id: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            htmlFor: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            prefixCls: import("vue-types").VueTypeValidableDef<string> & {
                default: string;
            };
            label: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            help: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            extra: import("vue-types").VueTypeValidableDef<import("ant-design-vue/lib/_util/type").VueNode>;
            labelCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            wrapperCol: {
                type: import("vue").PropType<import("ant-design-vue/lib/grid/Col").ColProps>;
            };
            hasFeedback: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            colon: import("vue-types").VueTypeValidableDef<boolean>;
            labelAlign: import("vue-types").VueTypeDef<"left" | "right">;
            prop: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            name: {
                type: import("vue").PropType<string | number | string[] | number[]>;
            };
            rules: import("vue-types").VueTypeDef<unknown[] | {
                [key: string]: any;
            }>;
            autoLink: import("vue-types").VueTypeValidableDef<boolean> & {
                default: boolean;
            };
            required: import("vue-types").VueTypeValidableDef<boolean>;
            validateFirst: import("vue-types").VueTypeValidableDef<boolean>;
            validateStatus: import("vue-types").VueTypeDef<"" | "error" | "success" | "warning" | "validating">;
            validateTrigger: {
                type: import("vue").PropType<string | string[]>;
            };
            messageVariables: {
                type: import("vue").PropType<Record<string, string>>;
            };
        }, {
            isFormItemChildren: boolean;
            configProvider: import("ant-design-vue/lib/config-provider").ConfigConsumerProps;
            FormContext: any;
            fieldId: import("vue").ComputedRef<string>;
            fieldName: import("vue").ComputedRef<string | number | string[] | number[]>;
            namePath: import("vue").ComputedRef<import("ant-design-vue/lib/form/interface").InternalNamePath>;
            isRequired: import("vue").ComputedRef<boolean>;
            getRules: () => any[];
            fieldValue: import("vue").ComputedRef<any>;
            mergedValidateTrigger: import("vue").ComputedRef<any[]>;
        }, {
            validateState: "" | "error" | "success" | "warning" | "validating";
            validateMessage: string;
            validateDisabled: boolean;
            validator: {};
            helpShow: boolean;
            errors: any[];
            initialValue: any;
        }, {}, {
            getNamePath(): any[];
            validateRules(options: import("ant-design-vue/lib/form/interface").ValidateOptions): Promise<void> | Promise<string[]>;
            onFieldBlur(): void;
            onFieldChange(): void;
            clearValidate(): void;
            resetField(): void;
            getHelpMessage(): any;
            onLabelClick(): void;
            onHelpAnimEnd(_key: string, helpShow: boolean): void;
            renderHelp(prefixCls: string): JSX.Element;
            renderExtra(prefixCls: string): JSX.Element;
            renderValidateWrapper(prefixCls: string, c1: import("ant-design-vue/lib/_util/type").VueNode, c2: import("ant-design-vue/lib/_util/type").VueNode, c3: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderWrapper(prefixCls: string, children: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element;
            renderLabel(prefixCls: string): JSX.Element;
            renderChildren(prefixCls: string, child: import("ant-design-vue/lib/_util/type").VueNode): JSX.Element[];
            renderFormItem(child: any[]): JSX.Element;
        }, {
            methods: {
                setState(state: {}, callback: any): void;
                __emit(...args: any[]): void;
            };
        }, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        } & {
            label?: import("ant-design-vue/lib/_util/type").VueNode;
            help?: import("ant-design-vue/lib/_util/type").VueNode;
            name?: string | number | string[] | number[] | undefined;
            extra?: import("ant-design-vue/lib/_util/type").VueNode;
            colon?: boolean | undefined;
            required?: boolean | undefined;
            validateTrigger?: string | string[] | undefined;
            labelCol?: unknown;
            wrapperCol?: unknown;
            labelAlign?: "left" | "right" | undefined;
            prop?: string | number | string[] | number[] | undefined;
            rules?: unknown[] | {
                [key: string]: any;
            } | undefined;
            validateFirst?: boolean | undefined;
            validateStatus?: "" | "error" | "success" | "warning" | "validating" | undefined;
            messageVariables?: Record<string, string> | undefined;
        }>, {
            prefixCls: string;
            id: string;
            htmlFor: string;
            hasFeedback: boolean;
            autoLink: boolean;
        }>;
    }) | null>;
    form: {
        [key: string]: any;
    };
    submit: () => void;
    reset: () => void;
    button$: import("vue").ComputedRef<Record<string, any> | null>;
    searchProperty: (property: string) => any;
    addItem: (prop: string) => (el: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    formSubmit: null;
    formReset: null;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    schema?: Record<string, any> | undefined;
    width?: string | undefined;
    button?: Record<string, any> | undefined;
    formData?: Record<string, any> | undefined;
}>, {}>;
export default _default;

import { DefineComponent, shallowReactive, toRaw } from "vue";
import { computed, ref, Ref, watch } from "vue";
import {
  ISFFormValueChange,
  ISFSchema,
  ISFSchemaType,
  ISFUISchemaItem,
  ISFUpdateValueAndValidity,
  SFValue,
  SF_SEQ,
} from "../type";

export abstract class FormProperty {
  _valueChanges: Ref<ISFFormValueChange> = ref({
    path: null,
    pathValue: null,
    value: null,
  });
  private _root: PropertyGroup;
  private _parent: PropertyGroup | null;
  _visibilityChanges = ref<boolean>(true);
  formData: Record<string, unknown>;
  _value: SFValue = null;
  path: string;
  schema: ISFSchema;
  ui: ISFUISchemaItem;
  widget: DefineComponent | null = null;

  constructor(
    schema: ISFSchema,
    ui: ISFUISchemaItem,
    formData: Record<string, unknown>,
    parent: PropertyGroup | null,
    path: string
  ) {
    this.schema = schema;
    this.ui = shallowReactive(ui);
    this.formData = formData || schema.default;
    this._parent = parent;
    if (parent) {
      this._root = parent.root;
    } else {
      this._root = this as any;
    }
    this.path = path;
  }

  get type(): ISFSchemaType {
    return this.schema.type!;
  }

  get parent(): PropertyGroup | null {
    return this._parent;
  }

  get root(): PropertyGroup {
    return this._root;
  }

  get value(): SFValue {
    return this._value;
  }

  get visible() {
    return this._visibilityChanges;
  }

  abstract setValue(value: SFValue, onlySelf: boolean): void;

  abstract _updateValue(): void;

  abstract _hasValue(): boolean;

  /** 因为没有做【重置】功能，所以现在只会在组件初始化的时候调用 */
  abstract resetValue(value: SFValue, onlySelf: boolean): void;

  updateValueAndValidity(options?: ISFUpdateValueAndValidity): void {
    options = {
      onlySelf: false,
      updatePath: "",
      updateValue: null,
      ...options,
    };
    this._updateValue();

    options.updatePath = options.updatePath || this.path;
    options.updateValue =
      options.updateValue == null ? this.value : options.updateValue;
    toRaw(this)._valueChanges.value = {
      // property会被变成reactive响应式，导致value成了[key]值
      value: this.value,
      path: options.updatePath,
      pathValue: options.updateValue,
    };

    if (this.parent && !options.onlySelf) {
      this.parent.updateValueAndValidity({ ...options });
    }
  }

  setVisible(visible: boolean): void {
    this._visibilityChanges.value = visible;
  }

  /** 根据路径搜索表单属性 */
  searchProperty(path: string): FormProperty | null {
    let prop: FormProperty | null = this;
    let base: PropertyGroup | null = null;

    let result = null;
    if (path[0] === SF_SEQ) {
      base = this.root;
      result = base.getProperty(path.substring(1));
    } else {
      while (result === null && prop !== null) {
        base = prop as PropertyGroup;
        result = base.getProperty(path);
        prop = prop.parent;
      }
    }
    return result!;
  }

  bindVisibility() {
    const visibleIf = this.ui.visibleIf;
    if (
      visibleIf == null ||
      (typeof visibleIf === "object" && Object.keys(visibleIf).length === 0)
    ) {
      return;
    }
    const propertiesBinding: Array<Ref<boolean>> = [];
    for (const dependencyPath in visibleIf) {
      if (Object.hasOwnProperty.call(visibleIf, dependencyPath)) {
        const property = this.parent?.searchProperty(dependencyPath);
        if (property) {
          const visibleCheck = computed(() => {
            if (!property._visibilityChanges.value) {
              return false;
            }
            const res = property._valueChanges.value;
            const vi = visibleIf[dependencyPath];
            if (typeof vi === "function") {
              return vi(res.value);
            }
            return vi.indexOf(res.value) !== -1;
          });
          propertiesBinding.push(visibleCheck);
        } else {
          console.warn(
            `Can't find property ${dependencyPath} for visibility check of ${this.path}`
          );
        }
      }
    }

    watch(
      propertiesBinding,
      (values) => {
        const visible = values.indexOf(true) !== -1;
        this.setVisible(visible);
      },
      { immediate: true }
    );
  }
}

export abstract class PropertyGroup extends FormProperty {
  properties: { [key: string]: FormProperty } | FormProperty[] | null = null;

  getProperty(path: string): FormProperty | undefined {
    const subPathIdx = path.indexOf(SF_SEQ);
    const propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;

    let property = (this.properties as { [key: string]: FormProperty })[
      propertyId
    ];
    if (
      property !== null &&
      subPathIdx !== -1 &&
      property instanceof PropertyGroup
    ) {
      const subPath = path.substr(subPathIdx + 1);
      property = (property as PropertyGroup).getProperty(subPath)!;
    }
    return property;
  }

  forEachChild(fn: (formProperty: FormProperty, str: string) => void): void {
    for (const propertyId in this.properties) {
      if (Object.hasOwnProperty.call(this.properties, propertyId)) {
        const property = (this.properties as { [key: string]: FormProperty })[
          propertyId
        ];
        fn(property, propertyId);
      }
    }
  }

  forEachChildRecursive(fn: (formProperty: FormProperty) => void): void {
    this.forEachChild((child) => {
      fn(child);
      if (child instanceof PropertyGroup) {
        (child as PropertyGroup).forEachChildRecursive(fn);
      }
    });
  }

  _bindVisibility(): void {
    super.bindVisibility();
    this._bindVisibilityRecursive();
  }

  private _bindVisibilityRecursive(): void {
    this.forEachChildRecursive((property) => {
      property.bindVisibility();
    });
  }

  isRoot(): boolean {
    return this === this.root;
  }

  addWidget = (prop: string) => (widget: any) => {
    // 卸载时候会调用该方法
    if (widget == null) {
      return;
    }
    const formProperty = this.searchProperty(`${prop}`)!;
    if (!formProperty) {
      return;
    }
    formProperty.widget = widget;
  };
}

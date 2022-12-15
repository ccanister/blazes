<template>
  <div class="st">
    <a-table
      @change="changeTable"
      :data-source="data$"
      :loading="loading"
      :pagination="
        page$.show
          ? {
              current: pi$,
              pageSize: ps$,
              total: total$,
              'show-total': page$.showTotal,
              showSizeChanger: page$.showSize,
              pageSizeOptions: page$.pageSizes,
              showQuickJumper: page$.showQuickJumper,
            }
          : false
      "
      :rowKey="rowKey"
      :scroll="scroll"
      :bordered="bordered"
      :rowClassName="rowClassName"
      :row-selection="rowSelection"
      :size="size"
      :expandIconColumnIndex="expandIconColumnIndex"
      :expandedRowKeys="expandedRowKeys"
    >
      <template #title v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </template>
      <template :key="column._key" v-for="column in columns$">
        <a-table-column-group v-if="column.children?.length">
          <template #title="scope">
            <div class="header">
              <slot
                :name="column.renderTitle"
                v-if="column.renderTitle"
                :row="scope.row"
                :title="column.title"
              ></slot>
              <template v-else> {{ column.title }} </template>
            </div>
          </template>
          <a-table-column
            :width="child.width"
            :customRender="child.customRender"
            :fixed="child.fixed || false"
            :sorter="child.sorter?.compare"
            :ellipsis="child.ellipsis"
            :colSpan="child.colSpan"
            :key="child._key"
            :data-index="child._key"
            v-for="child in column.children"
          >
            <template #title="scope">
              <div class="header">
                <slot
                  :name="child.renderTitle"
                  v-if="child.renderTitle"
                  :row="scope.row"
                  :title="child.title"
                ></slot>
                <template v-else> {{ child.title }} </template>
                <a-dropdown
                  v-if="child.filter"
                  class="filter"
                  overlayClassName="st-dropdown-filter"
                  v-model:visible="child.filter._visible.value"
                  :trigger="['click']"
                >
                  <FilterOutlined
                    class="point"
                    :class="{ active: child.filter._default.value }"
                    @click.stop="child.filter._visible.value = true"
                  />
                  <template #overlay>
                    <a-menu>
                      <template v-if="child.filter._menus.value.length">
                        <a-menu-item
                          v-for="menu in child.filter._menus.value"
                          :key="menu.value"
                        >
                          <div class="st-filter-menu">
                            <a-checkbox
                              v-model:checked="menu.checked"
                              @change="handleCheckPart(child)"
                              >{{ menu.text }}</a-checkbox
                            >
                          </div>
                        </a-menu-item>
                        <a-menu-item class="footer" divided>
                          <div class="st-filter-menu fx-jb fx-ac">
                            <a-checkbox
                              :indeterminate="child.filter.indeterminate.value"
                              v-model:checked="child.filter.checkAll.value"
                              @change="handleCheckAll($event, child)"
                              >全选</a-checkbox
                            >
                            <a-button
                              size="small"
                              type="primary"
                              @click="filterConfirm(child)"
                              >{{ child.filter.confirmText }}</a-button
                            >
                          </div>
                        </a-menu-item>
                      </template>
                      <template v-else>
                        <a-menu-item>
                          <div class="st-filter-menu">
                            加载中<LoadingOutlined />
                          </div>
                        </a-menu-item>
                      </template>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </template>
            <template #default="{ record }">
              <template v-if="record._values">
                <slot
                  :name="child.render"
                  v-if="child.render"
                  :row="record"
                  :value="record._values && record._values[child._index]"
                  :column="child"
                ></slot>
                <template v-else>
                  <template v-if="!child.buttons?.length">
                    <a-tag
                      v-if="child.type === 'tag'"
                      :color="record._values[child._index].color"
                      >{{ record._values[child._index].text }}</a-tag
                    >
                    <a
                      @click.stop.prevent="click(record, child)"
                      :title="
                        child.ellipsis ? record._values[child._index].text : ''
                      "
                      v-else-if="child.type === 'link'"
                    >
                      {{ record._values[child._index].text }}
                    </a>
                    <span
                      v-else
                      :title="
                        child.ellipsis ? record._values[child._index].text : ''
                      "
                      >{{ record._values[child._index].text }}</span
                    >
                  </template>
                  <template v-else>
                    <template
                      v-for="btn in validBtns(child.buttons, record, child)"
                      :key="btn.text"
                    >
                      <span
                        class="mr-md btn"
                        :class="{ disabled: btn._disabled }"
                      >
                        <a-dropdown v-if="btn.children.length > 0">
                          <span class="icon-xs">
                            <a>
                              <span
                                v-html="btnText(record._values, btn)"
                              ></span>
                              <DownOutlined />
                            </a>
                          </span>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item
                                v-for="subBtn in validBtns(
                                  btn.children,
                                  record,
                                  child
                                )"
                                :key="subBtn.text"
                                @click="btnClick(record, subBtn)"
                                :disabled="subBtn._disabled"
                              >
                                <span
                                  v-html="btnText(record._values, subBtn)"
                                ></span>
                                <component :is="subBtn.icon" />
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                        <template v-else>
                          <a-popconfirm
                            v-if="btn.type === 'popconfirm'"
                            :title="btn.popconfirm.title"
                            :okText="btn.popconfirm.okText"
                            :cancelText="btn.popconfirm.cancelText"
                            @confirm="btn.popconfirm.confirm(record)"
                          >
                            <a>
                              <span
                                v-html="btnText(record._values, btn)"
                              ></span>
                              <component :is="btn.icon" />
                            </a>
                          </a-popconfirm>
                          <template v-else>
                            <a @click="btnClick(record, btn)">
                              <span
                                v-html="btnText(record._values, btn)"
                              ></span>
                              <component :is="btn.icon" />
                            </a>
                          </template>
                        </template>
                      </span>
                    </template>
                  </template>
                </template>
              </template>
              <template v-else>
                <span :title="child.ellipsis ? record[child.index] : ''">{{
                  record[child.index]
                }}</span>
              </template>
            </template>
          </a-table-column>
        </a-table-column-group>
        <a-table-column
          v-else
          :width="column.width"
          :customRender="column.customRender"
          :fixed="column.fixed || false"
          :sorter="column.sorter?.compare"
          :ellipsis="column.ellipsis"
          :colSpan="column.colSpan"
        >
          <template #title="scope">
            <div class="header">
              <slot
                :name="column.renderTitle"
                v-if="column.renderTitle"
                :row="scope.row"
                :title="column.title"
              ></slot>
              <template v-else> {{ column.title }} </template>
              <a-dropdown
                v-if="column.filter"
                class="filter"
                overlayClassName="st-dropdown-filter"
                v-model:visible="column.filter._visible.value"
                :trigger="['click']"
              >
                <FilterOutlined
                  class="point"
                  :class="{ active: column.filter._default.value }"
                  @click.stop="column.filter._visible.value = true"
                />
                <template #overlay>
                  <a-menu>
                    <template v-if="column.filter._menus.value.length">
                      <a-menu-item
                        v-for="menu in column.filter._menus.value"
                        :key="menu.value"
                      >
                        <div class="st-filter-menu">
                          <a-checkbox
                            v-model:checked="menu.checked"
                            @change="handleCheckPart(column)"
                            >{{ menu.text }}</a-checkbox
                          >
                        </div>
                      </a-menu-item>
                      <a-menu-item class="footer" divided>
                        <div class="st-filter-menu fx-jb fx-ac">
                          <a-checkbox
                            :indeterminate="column.filter.indeterminate.value"
                            v-model:checked="column.filter.checkAll.value"
                            @change="handleCheckAll($event, column)"
                            >全选</a-checkbox
                          >
                          <a-button
                            size="small"
                            type="primary"
                            @click="filterConfirm(column)"
                            >{{ column.filter.confirmText }}</a-button
                          >
                        </div>
                      </a-menu-item>
                    </template>
                    <template v-else>
                      <a-menu-item>
                        <div class="st-filter-menu">
                          加载中<LoadingOutlined />
                        </div>
                      </a-menu-item>
                    </template>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
          <template #default="{ record }">
            <template v-if="record._values">
              <slot
                :name="column.render"
                v-if="column.render"
                :row="record"
                :value="record._values && record._values[column._index]"
                :column="column"
              ></slot>
              <template v-else>
                <template v-if="!column.buttons?.length">
                  <a-tag
                    v-if="column.type === 'tag'"
                    :color="record._values[column._index].color"
                    >{{ record._values[column._index].text }}</a-tag
                  >
                  <a
                    @click.stop.prevent="click(record, column)"
                    :title="
                      column.ellipsis ? record._values[column._index].text : ''
                    "
                    v-else-if="column.type === 'link'"
                  >
                    {{ record._values[column._index].text }}
                  </a>
                  <span
                    v-else
                    :title="
                      column.ellipsis ? record._values[column._index].text : ''
                    "
                    >{{ record._values[column._index].text }}</span
                  >
                </template>
                <template v-else>
                  <template
                    v-for="btn in validBtns(column.buttons, record, column)"
                    :key="btn.text"
                  >
                    <span
                      class="mr-md btn"
                      :class="{ disabled: btn._disabled }"
                    >
                      <a-dropdown v-if="btn.children.length > 0">
                        <span class="icon-xs">
                          <a>
                            <span v-html="btnText(record._values, btn)"></span>
                            <DownOutlined />
                          </a>
                        </span>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item
                              v-for="subBtn in validBtns(
                                btn.children,
                                record,
                                column
                              )"
                              :key="subBtn.text"
                              @click="btnClick(record, subBtn)"
                              :disabled="subBtn._disabled"
                            >
                              <span
                                v-html="btnText(record._values, subBtn)"
                              ></span>
                              <component :is="subBtn.icon" />
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                      <template v-else>
                        <a-popconfirm
                          v-if="btn.type === 'popconfirm'"
                          :title="btn.popconfirm.title"
                          :okText="btn.popconfirm.okText"
                          :cancelText="btn.popconfirm.cancelText"
                          @confirm="btn.popconfirm.confirm(record)"
                        >
                          <a>
                            <span v-html="btnText(record._values, btn)"></span>
                            <component :is="btn.icon" />
                          </a>
                        </a-popconfirm>
                        <template v-else>
                          <a @click="btnClick(record, btn)">
                            <span v-html="btnText(record._values, btn)"></span>
                            <component :is="btn.icon" />
                          </a>
                        </template>
                      </template>
                    </span>
                  </template>
                </template>
              </template>
            </template>
            <template v-else>
              <span :title="column.ellipsis ? record[column.index] : ''">{{
                record[column.index]
              }}</span>
            </template>
          </template>
        </a-table-column>
      </template>
      <template #expandedRowRender="{ record }" v-if="$slots.expandedRowRender">
        <slot
          :record="record"
          :column="columns"
          name="expandedRowRender"
        ></slot>
      </template>
      <template #expandIcon="row">
        <span
          v-if="row.expandable"
          class="st-expand-icon"
          @click="clickExpand(row)"
        >
          <DownOutlined v-if="row.expanded" />
          <RightOutlined v-else />
        </span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { configService } from "@blazes/utils";
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  toRaw,
  toRefs,
  watch,
} from "vue";
import STColumnSource from "./column-source";
import STDataSource from "./data-source";
import {
  DEFAULT_CONFIG,
  IChangePagination,
  IChangeSort,
  ISTColumn,
  ISTColumnButton,
  ISTColumnsSort,
  ISTData,
  ISTLoadOptions,
  ISTResetColumnsOption,
} from "./type";
import LoadingOutlined from "@ant-design/icons-vue/LoadingOutlined";
import DownOutlined from "@ant-design/icons-vue/DownOutlined";
import EditOutlined from "@ant-design/icons-vue/EditOutlined";
import DeleteOutlined from "@ant-design/icons-vue/DeleteOutlined";
import FilterOutlined from "@ant-design/icons-vue/FilterOutlined";
import RightOutlined from "@ant-design/icons-vue/RightOutlined";
import message from "ant-design-vue/es/message";
import { useRouter } from "vue-router";
import { array } from "vue-types";

export default defineComponent({
  name: "st",
  props: {
    columns: array<ISTColumn>().isRequired,
    pageVo: Object,
    data: [String, Array, Object],
    pi: Number,
    ps: Number,
    total: Number,
    res: Object,
    req: Object,
    page: Object,
    rowKey: String,
    scroll: Object,
    bordered: Boolean,
    rowSelection: Object,
    rowClassName: Function,
    size: String,
    instance: Function,
    expandIconColumnIndex: Number,
  },
  components: {
    LoadingOutlined,
    DownOutlined,
    EditOutlined,
    DeleteOutlined,
    FilterOutlined,
    RightOutlined,
  },
  emits: { change: null, expand: null },
  setup(props, { emit }) {
    const stConfig = configService.merge("st", DEFAULT_CONFIG)!;
    // 依赖
    const columnSource = new STColumnSource();
    const dataSource = new STDataSource();
    // 变量
    const loading = ref(false);
    const columns$: Ref<ISTColumn[]> = ref([]);
    const _req = computed(() =>
      Object.assign({}, stConfig.req, stConfig?.req, props.req || {})
    );
    const _res = computed(() =>
      Object.assign({}, stConfig.res, stConfig?.res, props.res || {})
    );
    const _page = computed(() =>
      Object.assign({}, stConfig.page, props.page || {})
    );
    const pi$ = ref(props.pi || 1);
    const ps$ = ref(props.ps || 10);
    const total$ = ref(props.total || 0);
    const data$: Ref<ISTData[]> = ref([]);
    const router = useRouter(); // works
    // 方法
    const getBasicChangeInfo = () => {
      return {
        pi: pi$.value,
        ps: ps$.value,
        total: total$.value,
      };
    };
    const loadPageData = (first = false) => {
      loading.value = true;
      dataSource
        .process({
          pi: pi$.value,
          ps: ps$.value,
          total: total$.value,
          data: props.data as any,
          req: _req.value,
          res: _res.value,
          page: _page.value,
          paginator: true,
          columns: columns$.value,
          first,
          instance: props.instance as any,
        })
        .then((result) => {
          loading.value = false;
          if (typeof result.pi !== "undefined") {
            pi$.value = result.pi;
          }
          if (typeof result.ps !== "undefined") {
            ps$.value = result.ps;
          }
          if (typeof result.total !== "undefined") {
            total$.value = result.total;
          }
          data$.value = result.list;
        })
        .catch((msg) => {
          message.error(`加载列表失败：${msg}`);
        });
    };
    const load = (
      pi: number,
      extraParams?: Record<string, unknown>,
      options?: ISTLoadOptions
    ) => {
      pi$.value = pi;
      if (typeof extraParams !== "undefined") {
        _req.value.params =
          options && options.merge
            ? { ..._req.value.params, ...extraParams }
            : extraParams;
      }
      loadPageData();
    };
    const reload = (
      extraParams?: Record<string, unknown>,
      options?: ISTLoadOptions
    ) => {
      load(1, extraParams, options);
    };
    const reloadCurrent = () => {
      load(pi$.value);
    };
    const refreshColumns = (columns: ISTColumn[]) => {
      columns$.value = columnSource.process(columns);
    };
    const resetColumns = (options: ISTResetColumnsOption) => {
      options = { emitReload: true, preClearData: false, ...options };
      if (typeof options.pi !== "undefined") {
        pi$.value = options.pi;
      }
      if (typeof options.ps !== "undefined") {
        ps$.value = options.ps;
      }
      if (options.emitReload) {
        options.preClearData = true;
      }
      if (options.preClearData) {
        data$.value = [];
      }
      refreshColumns((options.columns || props.columns) as ISTColumn[]);
      if (options.emitReload) {
        loadPageData();
      }
    };
    const btnText = (record: ISTData, btn: ISTColumnButton): string => {
      return typeof btn.text === "function"
        ? btn.text(record, btn)
        : btn.text || "";
    };
    const validBtns = (
      btns: ISTColumnButton[],
      item: ISTData,
      col: ISTColumn
    ): ISTColumnButton[] => {
      return toRaw(btns).filter((btn) => {
        const result = btn.iif!(item, col);
        const iifBehavior =
          typeof btn.iifBehavior === "function"
            ? btn.iifBehavior(item)
            : btn.iifBehavior;
        const isRenderDisabled = iifBehavior === "disabled";
        btn._result = result;
        btn._disabled = !result && isRenderDisabled;
        return result || isRenderDisabled;
      });
    };
    const btnClick = (item: ISTData, btn: ISTColumnButton) => {
      if (!btn.click) {
        return;
      }
      const result = btn.click(item);
      if (result === "reload") {
        reload();
      }
    };
    onMounted(() => {
      refreshColumns(props.columns as ISTColumn[]);
      if (props.data) {
        loadPageData(true);
      }
    });
    const handleFilter = (col: ISTColumn) => {
      col.filter!._visible!.value = false;
      // 过滤表示一种数据的变化应重置页码为 `1`
      pi$.value = 1;
      columnSource.updateDefault(col.filter!);
      columnSource.updateIndeterminate(col.filter!);
      emit("change", {
        type: "filter",
        filter: { menus: col.filter?._menus?.value, column: col },
        ...getBasicChangeInfo(),
      });
      loadPageData();
    };
    const handleCheckPart = (col: ISTColumn) => {
      columnSource.updateIndeterminate(col.filter!);
    };
    const handleCheckAll = (
      event: { target: { checked: boolean } },
      col: ISTColumn
    ) => {
      columnSource.checkAllFilter(event.target.checked, col);
      columnSource.updateIndeterminate(col.filter!);
    };
    const filterConfirm = (col: ISTColumn) => {
      handleFilter(col);
    };
    // 监听变化
    const { data } = toRefs(props);
    watch(data as Ref<any>, () => {
      loadPageData();
    });
    const click = (item: ISTData, col: ISTColumn) => {
      const res = col.click!(item);
      if (typeof res === "string") {
        router.push(res);
      }
    };

    const changeTable = (
      pagination: IChangePagination,
      filter: unknown,
      sort: IChangeSort
    ) => {
      const { current, pageSize } = pagination;
      if (pi$.value !== current) {
        pi$.value = current;
        emit("change", {
          type: "pi",
          ...getBasicChangeInfo(),
        });
      }
      if (ps$.value !== pageSize) {
        ps$.value = pageSize;
        emit("change", {
          type: "ps",
          ...getBasicChangeInfo(),
        });
      }
      if (sort) {
        const { order, column } = sort;
        columns$.value.forEach((c) => {
          c.sorter = {
            ...c.sorter,
            default: c._key === column?.key ? order : undefined,
          } as ISTColumnsSort;
        });
        emit("change", {
          type: "sort",
          ...getBasicChangeInfo(),
          sort: {
            column,
            order,
          },
        });
      }
      load(current);
    };

    const expandedRowKeys: Ref<any[]> = ref([]);

    const clickExpand = (row: {
      expanded: boolean;
      expandable: boolean;
      record: ISTData;
    }) => {
      if (!row.expandable) {
        return;
      }
      if (row.expanded) {
        expandedRowKeys.value = expandedRowKeys.value.filter(
          (e) => e !== row.record[props.rowKey!]
        );
      } else {
        expandedRowKeys.value = [
          ...expandedRowKeys.value,
          row.record[props.rowKey!],
        ];
      }
      emit("expand", row.expanded, row.record);
    };

    return {
      loading,
      columns$,
      data$,
      page$: _page,
      total$,
      pi$,
      ps$,
      btnText,
      validBtns,
      btnClick,
      load,
      reload,
      handleCheckAll,
      filterConfirm,
      resetColumns,
      click,
      handleCheckPart,
      changeTable,
      reloadCurrent,
      clickExpand,
      expandedRowKeys,
    };
  },
});
</script>
<style lang="less" scoped>
.st {
  :deep(.ant-table) {
    width: 100%;
    .header {
      .filter {
        position: static;
        height: 16px;
        &.active {
          color: #1890ff;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .btn {
      &:not(:last-child) {
        position: relative;
        &::after {
          content: " ";
          height: 1em;
          position: absolute;
          right: -8px;
          top: 4px;
          border-right: 1px solid #dcdfe6;
        }
      }
      &.disabled {
        a {
          color: rgba(0, 0, 0, 0.25);
          cursor: not-allowed;
          pointer-events: auto;
        }
      }
    }
  }
  &-expand-icon {
    font-size: 12px;
    color: #6f757b;
    cursor: pointer;
  }
}
</style>
<style scoped>
.st .header .filter ::v-deep svg {
  position: static;
  margin: 0;
}
</style>
<style lang="less">
.st-dropdown-filter {
  max-height: 200px;
  overflow-y: auto;
  .st-filter-menu {
    min-width: 120px;
  }
  .footer {
    position: sticky;
    bottom: 0;
    margin-top: 0;
    background: #fff;
    z-index: 10;
    cursor: auto;
    font-size: 14px;
    &:hover {
      background: #fff;
    }
  }
}
</style>

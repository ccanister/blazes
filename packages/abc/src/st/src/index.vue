<template>
  <div class="st">
    <a-table
      @change="changeTable"
      :data-source="data$"
      :loading="loading"
      :pagination="
        isPagination
          ? {
              current: pi$,
              pageSize: ps$,
              total: total$,
              'show-total': showTotal,
            }
          : false
      "
      :rowKey="rowKey"
      :scroll="scroll"
      :bordered="bordered"
    >
      <a-table-column
        :width="column.width"
        :key="column.index + column.render + column.title + column.renderTitle"
        v-for="(column, index) in columns$"
        :customRender="column.customRender"
        :fixed="column.fixed || false"
        :sorter="column.sorter"
      >
        <!-- :sortOrder="column.sortOrder" -->
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
              :ref="setDropdownRef(index)"
              overlayClassName="st-dropdown-filter"
              v-model:visible="column.filter._visible.value"
              :trigger="['click']"
            >
              <FilterOutlined
                class="point"
                :class="{ active: column.filter._default.value }"
                @click.self="column.filter._visible.value = true"
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
                          @change="handleCheckPart(column, index)"
                          >{{ menu.text }}</a-checkbox
                        >
                      </div>
                    </a-menu-item>
                    <a-menu-item class="footer" divided>
                      <div class="st-filter-menu fx-jb fx-ac">
                        <a-checkbox
                          :indeterminate="column.filter.indeterminate.value"
                          v-model:checked="column.filter.checkAll.value"
                          @change="handleCheckAll($event, column, index)"
                          >全选</a-checkbox
                        >
                        <a-button
                          size="small"
                          type="primary"
                          @click="filterConfirm(column, index)"
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
          <slot
            :name="column.render"
            v-if="column.render"
            :row="record"
            :value="record._values[index]"
          ></slot>
          <template v-else>
            <template v-if="record._values[index].text">
              <a-tag
                v-if="column.type === 'tag'"
                :color="record._values[index].color"
                >{{ record._values[index].text }}</a-tag
              >
              <Ellipsis
                v-else-if="column.type === 'ellipsis'"
                :text="record._values[index].text"
              ></Ellipsis>
              <a
                @click.stop.prevent="click(record, column)"
                v-else-if="column.type === 'link'"
              >
                {{ record._values[index].text }}
              </a>
              <span v-else>{{ record._values[index].text }}</span>
            </template>
            <span
              v-for="btn in validBtns(column.buttons, record, column)"
              :key="btn.text"
              class="mr-md btn"
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
                      v-for="subBtn in validBtns(btn.children, record, column)"
                      :key="subBtn.text"
                      @click="btnClick(record, subBtn)"
                    >
                      <span v-html="btnText(record._values, subBtn)"></span>
                      <component :is="subBtn.icon" />
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <template v-else>
                <a-popconfirm
                  v-if="btn.type === 'popconfirm'"
                  :title="btn.popconfirm.title"
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
      </a-table-column>
      <template #expandedRowRender="{ record }" v-if="$slots.expandedRowRender">
        <slot :record="record" name="expandedRowRender"></slot>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { useRefs } from "@blazes/utils";
import { deepMerge } from "@blazes/utils";
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  toRefs,
  watch,
} from "vue";
import STColumnSource from "./column-source";
import STDataSource from "./data-source";
import {
  DEFAULT_ST_PAGE,
  DEFAULT_ST_REQ,
  DEFAULT_ST_RES,
  ISTColumn,
  ISTColumnButton,
  ISTData,
  ISTLoadOptions,
  ISTResetColumnsOption,
} from "./type";
import Ellipsis from "../../ellipsis/src/index.vue";
import {
  LoadingOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";
import message from "ant-design-vue/lib/message";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "st",
  props: {
    columns: Array,
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
    pagination: {
      type: Boolean,
      default: true,
    },
    bordered: Boolean,
  },
  components: {
    Ellipsis,
    LoadingOutlined,
    DownOutlined,
    EditOutlined,
    DeleteOutlined,
    FilterOutlined,
  },
  setup(props) {
    // 依赖
    const columnSource = new STColumnSource();
    const dataSource = new STDataSource();
    // 变量
    const loading = ref(false);
    const columns$: Ref<ISTColumn[]> = ref([]);
    const _req = computed(() => deepMerge(props.req || {}, DEFAULT_ST_REQ));
    const _res = computed(() => deepMerge(props.res || {}, DEFAULT_ST_RES));
    const _page = computed(() => deepMerge(props.res || {}, DEFAULT_ST_PAGE));
    const pi$ = ref(props.pi || 1);
    const ps$ = ref(props.ps || 10);
    const total$ = ref(props.total || 0);
    const isPagination: Ref<boolean> = ref(props.pagination);
    const data$: Ref<ISTData[]> = ref([]);
    const [dropdownRefs, setDropdownRef] = useRefs<any>();
    const router = useRouter(); // works
    // 方法
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
          if (typeof result.pageShow !== "undefined" && props.pagination) {
            isPagination.value = result.pageShow;
          }
          data$.value = result.list;
        })
        .catch((msg) => {
          message.error(`加载列表失败：${msg}`);
        });
    };
    const load = (pi: number, extraParams?: {}, options?: ISTLoadOptions) => {
      pi$.value = pi;
      if (typeof extraParams !== "undefined") {
        _req.value.params =
          options && options.merge
            ? { ..._req.value.params, ...extraParams }
            : extraParams;
      }
      loadPageData();
    };
    const reload = (extraParams?: {}, options?: ISTLoadOptions) => {
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
      return btns.filter((btn) => {
        const result = btn.iif!(item, col);
        const isRenderDisabled = btn.iifBehavior === "disabled";
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
    const handleFilter = (col: ISTColumn, index: number) => {
      col.filter!._visible!.value = false;
      // 过滤表示一种数据的变化应重置页码为 `1`
      pi$.value = 1;
      columnSource.updateDefault(col.filter!);
      columnSource.updateIndeterminate(col.filter!);
      loadPageData();
    };
    const handleCheckPart = (col: ISTColumn, index: number) => {
      columnSource.updateIndeterminate(col.filter!);
    };
    const handleCheckAll = (
      event: { target: { checked: boolean } },
      col: ISTColumn,
      index: number
    ) => {
      columnSource.checkAllFilter(event.target.checked, col);
      columnSource.updateIndeterminate(col.filter!);
    };
    const filterConfirm = (col: ISTColumn, index: number) => {
      handleFilter(col, index);
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

    const changeTable = (event: { current?: number }) => {
      if (event.current != null) {
        load(event.current);
      }
    };

    const showTotal = (total: number) => `共${total}条`;

    return {
      loading,
      columns$,
      data$,
      isPagination,
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
      setDropdownRef,
      resetColumns,
      click,
      handleCheckPart,
      changeTable,
      showTotal,
      reloadCurrent,
    };
  },
});
</script>
<style lang="less" scoped>
.st {
  .ant-table {
    width: 100%;
    .header {
      .filter {
        position: static;
        height: 16px;
        :deep(svg) {
          position: static;
          margin: 0;
        }
        &.active {
          color: #1890ff;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .btn:not(:last-child) {
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
  }
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

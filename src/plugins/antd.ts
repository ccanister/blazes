import {
  Form,
  Button,
  Avatar,
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  Modal,
  Divider,
  Dropdown,
  Input,
  Menu,
  Select,
  Pagination,
  Row,
  Tabs,
  Table,
  Tag,
  Empty,
  Popover,
  Tooltip,
  DatePicker,
  Badge,
  Spin,
  ConfigProvider,
  Radio,
  Collapse,
  Popconfirm,
  InputNumber,
  Affix
} from "ant-design-vue";

import "ant-design-vue/dist/antd.css";

const components = [
  Form,
  Button,
  Avatar,
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  Modal,
  Divider,
  Dropdown,
  Input,
  Menu,
  Select,
  Pagination,
  Row,
  Tabs,
  Table,
  Tag,
  Empty,
  Popover,
  Tooltip,
  DatePicker,
  Badge,
  Spin,
  ConfigProvider,
  Radio,
  Collapse,
  Popconfirm,
  InputNumber,
  Affix
];

import { App } from "vue";

export default (app: App) => {
  components.forEach((component) => {
    app.use(component);
  });
};

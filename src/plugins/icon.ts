import {
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  CaretDownOutlined,
  SearchOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  TableOutlined,
  NumberOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FunnelPlotOutlined,
  OrderedListOutlined,
  ShareAltOutlined,
  RightOutlined,
  DownOutlined,
  SmallDashOutlined,
  AppstoreAddOutlined,
  SaveOutlined,
  LeftOutlined,
  ReloadOutlined,
  UpOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  CheckOutlined,
  CaretUpOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ApiOutlined,
  QuestionCircleFilled,
  OneToOneOutlined,
  CodeSandboxOutlined,
  CopyOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from "@ant-design/icons-vue";
import { App } from "vue";

const components = [
  EditOutlined,
  PlusOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
  CaretDownOutlined,
  SearchOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  TableOutlined,
  NumberOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FunnelPlotOutlined,
  OrderedListOutlined,
  ShareAltOutlined,
  RightOutlined,
  DownOutlined,
  SmallDashOutlined,
  AppstoreAddOutlined,
  SaveOutlined,
  LeftOutlined,
  ReloadOutlined,
  UpOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  CheckOutlined,
  CaretUpOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  ApiOutlined,
  QuestionCircleFilled,
  OneToOneOutlined,
  CodeSandboxOutlined,
  CopyOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
];

export default (app: App) => {
  components.forEach((component) => {
    app.component(component.displayName, component);
  });
};
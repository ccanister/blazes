import MockJs from "mockjs";

const resp = {
  data: "",
  code: 0,
  msg: "",
};

const r = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

MockJs.Mock(new RegExp("/simple-table" + "*"), {
  items: new Array(24).fill({}).map((_, idx) => ({
    id: idx + 1,
    name: `name ${idx + 1}`,
    age: r(10, 50),
    tag: r(1, 5),
  })),
  total: 24,
  limit: 10,
  offset: 1,
});

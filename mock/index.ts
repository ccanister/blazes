import MockJs from "mockjs";

const john = {
  id: 1,
  name: "John",
  age: 15,
};

const bob = {
  id: 2,
  name: "Bob",
  age: 50,
};

const basicUsers = new Array(24).fill({}).map((_, idx) => ({
  id: idx + 3,
  name: MockJs.mock("@name"),
  age: MockJs.mock("@integer(16, 49)"),
}));

MockJs.mock(new RegExp("simple-table\\?offset=\\d+&limit=10&age=ascend"), {
  items: [john]
    .concat([...basicUsers].sort((u1, u2) => u1.age - u2.age))
    .concat(bob),
  total: basicUsers.length + 2,
  limit: 10,
  offset: 1,
});
MockJs.mock(new RegExp("simple-table\\?offset=\\d+&limit=10&age=descend"), {
  items: [bob]
    .concat([...basicUsers].sort((u1, u2) => u2.age - u1.age))
    .concat(john),
  total: basicUsers.length + 2,
  limit: 10,
  offset: 1,
});
MockJs.mock("/simple-table?offset=1&limit=10&name=John,Bob", {
  items: [john, bob],
  total: 2,
  limit: 10,
  offset: 1,
});
MockJs.mock(new RegExp("simple-table\\?offset=1&limit=10&name=Bob"), {
  items: [bob],
  total: 1,
  limit: 10,
  offset: 1,
});
MockJs.mock(new RegExp("simple-table\\?offset=1&limit=10&name=John"), {
  items: [john],
  total: 1,
  limit: 10,
  offset: 1,
});
MockJs.mock(new RegExp("/simple-table" + "*"), {
  items: [john].concat(basicUsers).concat(bob),
  total: basicUsers.length + 2,
  limit: 10,
  offset: 1,
});

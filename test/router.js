return {
  mode: "history",
  default: "/",
  aliases: {
    "/": "/nested/nested2/a",
  },
  modules: ["nested", "nested2", "nested3"],
  routing: {
    constants: {
      title: "root",
    },
    children: [
      {
        path: "nested",
        modules: "nested",
        constants: { layer1: "nested", bgColor: "brown", title: "nested" },
        children: [
          {
            path: "nested2",
            modules: "nested2",
            constants: {layer2: "nested2", bgColor: "grey", title: "nested2"},
            children: [
              {path: 'a', modules: "nested3", constants: {layer3: "nested3", bgColor: "red", title: "nested3 a"}},
              {path: 'b', modules: "nested3", constants: {layer3: "nested3", bgColor: "yellow", title: "nested3 b"}},
              {path: 'c', modules: "nested3", constants: {layer3: "nested3", bgColor: "green", title: "nested3 c"}},
            ],
          },
        ],
      },
    ],
  },
};

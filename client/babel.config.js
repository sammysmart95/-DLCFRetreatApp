module.exports = function(api) {
  api.cache(true);

  const presets = [["@babel/preset-react"], ["@babel/preset-env"]];
  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "transform-async-to-generator",
    [
      "@babel/plugin-proposal-class-properties",
      { loose: true }
    ]
  ];

  return {
    presets,
    plugins
  };
};

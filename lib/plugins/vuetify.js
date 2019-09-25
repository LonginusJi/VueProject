"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vuetify = _interopRequireDefault(require("vuetify"));

require("vuetify/dist/vuetify.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuetify.default, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'md'
});
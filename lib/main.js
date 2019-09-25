"use strict";

var _vue = _interopRequireDefault(require("vue"));

require("./plugins/vuetify");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("roboto-fontface/css/roboto/roboto-fontface.css");

require("material-design-icons-iconfont/dist/material-design-icons.css");

var _highchartsVue = _interopRequireDefault(require("highcharts-vue"));

var _vueHighcharts = _interopRequireDefault(require("vue-highcharts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.config.productionTip = false;

_vue.default.use(_vueHighcharts.default);

_vue.default.use(_highchartsVue.default);

new _vue.default({
  router: _router.default,
  store: _store.default,
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');
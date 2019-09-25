"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _axios = _interopRequireDefault(require("axios"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default);

_vue.default.use(_vueAxios.default, _axios.default);

var _default = new _vuex.default.Store({
  state: {
    listItems: []
  },
  mutations: {
    SET_ITEMS: function SET_ITEMS(state, listItems) {
      state.listItems = listItems;
    }
  },
  actions: {
    loadItems: function loadItems(_ref) {
      var commit = _ref.commit;

      _axios.default.get('http://localhost:4000/results').then(function (r) {
        return r.data;
      }).then(function (listItems) {
        commit('SET_ITEMS', listItems);
      });
    }
  }
});

exports.default = _default;
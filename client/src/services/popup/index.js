/**
 * Created by reddy on 2017/7/13.
 */

import MessageBox from './messageBox';

const components = [
  MessageBox
];

const install = function(Vue, opts = {}) {
  if (install.installed) return;

  components.map(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$info = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  MessageBox
};

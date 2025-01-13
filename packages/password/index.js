import Password from "./src/password";

/* istanbul ignore next */
Password.install = function(Vue) {
  Vue.component(Password.name, Password);
};

export default Password;

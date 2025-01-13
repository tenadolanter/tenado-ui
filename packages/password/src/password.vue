<template>
  <td-input
    v-bind="$attrs"
    v-on="$listeners"
    :type="inputType"
    ref="input"
    class="td-password"
    :class="{ 'td-password__password': !visible }"
  >
    <i
      slot="suffix"
      v-if="showPwdVisible"
      class="td-input__icon td-input__clear"
      :class="{ 'td-icon-eye': !visible, 'td-icon-eye-close': visible }"
      @click="handlePasswordVisible"
    ></i>
  </td-input>
</template>

<script>
import TdInput from "@tenado/ui/packages/input";
import { supportsWebkitTextSecurity } from "./util.js";
export default {
  name: "TdPassword",
  components: {
    TdInput,
  },
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
  props: {
    showPassword: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputDisabled() {
      return this.$attrs.disabled || (this.elForm || {}).disabled;
    },
    showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.$attrs.readonly;
    },
  },
  data() {
    return {
      visible: false,
      inputType: "text",
      isSupportWebkitTextSecurity: false,
    };
  },
  created() {
    if (supportsWebkitTextSecurity()) {
      this.isSupportWebkitTextSecurity = true;
    } else {
      this.inputType = "password";
    }
  },
  methods: {
    handlePasswordVisible() {
      if (this.isSupportWebkitTextSecurity) {
        this.visible = !this.visible;
      } else {
        this.visible = !this.visible;
        this.inputType = !this.visible ? "password" : "text";
      }
      this.focus();
    },
    focus() {
      this.$refs?.input?.focus();
    },
  },
};
</script>

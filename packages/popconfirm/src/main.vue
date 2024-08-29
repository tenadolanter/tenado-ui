<template>
  <td-popover v-bind="$attrs" v-model="visible" trigger="click">
    <div class="td-popconfirm">
      <p class="td-popconfirm__main">
        <i
          v-if="!hideIcon"
          :class="icon"
          class="td-popconfirm__icon"
          :style="{ color: iconColor }"
        ></i>
        {{ title }}
      </p>
      <div class="td-popconfirm__action">
        <td-button size="mini" :type="cancelButtonType" @click="cancel">
          {{ displayCancelButtonText }}
        </td-button>
        <td-button size="mini" :type="confirmButtonType" @click="confirm">
          {{ displayConfirmButtonText }}
        </td-button>
      </div>
    </div>
    <slot name="reference" slot="reference"></slot>
  </td-popover>
</template>

<script>
import ElPopover from "@tenado/ui/packages/popover";
import ElButton from "@tenado/ui/packages/button";
import { t } from "@tenado/ui/src/locale";

export default {
  name: "TdPopconfirm",
  props: {
    title: {
      type: String,
    },
    confirmButtonText: {
      type: String,
    },
    cancelButtonText: {
      type: String,
    },
    confirmButtonType: {
      type: String,
      default: "primary",
    },
    cancelButtonType: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "td-icon-question",
    },
    iconColor: {
      type: String,
      default: "#f90",
    },
    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ElPopover,
    ElButton,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    displayConfirmButtonText() {
      return this.confirmButtonText || t("el.popconfirm.confirmButtonText");
    },
    displayCancelButtonText() {
      return this.cancelButtonText || t("el.popconfirm.cancelButtonText");
    },
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit("confirm");
    },
    cancel() {
      this.visible = false;
      this.$emit("cancel");
    },
  },
};
</script>

<template>
  <div
    class="td-icon-picker"
    :class="[iconPickerSize ? 'td-icon-picker--' + iconPickerSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <td-input
      :value="value"
      ref="reference"
      type="text"
      :disabled="iconPickerDisabled"
      :class="[iconPickerSize ? `is-${iconPickerSize}` : '']"
      :placeholder="placeholder"
      :readonly="true"
      @focus="handleFocus"
      @blur="handleBlur"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template slot="prepend">
        <i v-if="value" :class="value"></i>
      </template>
      <template slot="suffix">
        <i
          v-show="!showClose"
          :class="[
            'td-select__caret',
            'td-input__icon',
            'td-icon-' + iconClass,
          ]"
        ></i>
        <i
          v-if="showClose"
          class="td-select__caret td-input__icon td-icon-circle-close"
          @click="handleClearClick"
        ></i>
      </template>
    </td-input>
    <transition name="td-zoom-in-top" @after-leave="doDestroy">
      <TdIconPickerDropdown
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible"
      >
        <td-scrollbar
          tag="ul"
          wrap-class="td-icon-picker-dropdown__wrap"
          view-class="td-icon-picker-dropdown__list"
          ref="scrollbar"
          v-show="options.length > 0"
        >
          <slot>
            <div class="td-icon-picker-dropdown__icon-wrap">
              <div
                class="td-icon-picker-dropdown__icon-item"
                :class="{ selected: item.value === value }"
                v-for="item in options"
                :key="item.value"
                @click.stop="handlerIconSelect(item)"
              >
                <i :class="item.value"></i>
              </div>
            </div>
          </slot>
        </td-scrollbar>
      </TdIconPickerDropdown>
    </transition>
  </div>
</template>

<script>
import Emitter from "@tenado/ui/src/mixins/emitter";
import Focus from "@tenado/ui/src/mixins/focus";
import Locale from "@tenado/ui/src/mixins/locale";
import Clickoutside from "@tenado/ui/src/utils/clickoutside";
import { valueEquals } from "@tenado/ui/src/utils/util";
import TdInput from "@tenado/ui/packages/input";
import TdScrollbar from "@tenado/ui/packages/scrollbar";
import TdIconPickerDropdown from "./picker-dropdown.vue";
import { t } from "@tenado/ui/src/locale";
export default {
  name: "TdIconPicker",
  mixins: [Emitter, Locale, Focus("reference")],
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
  directives: { Clickoutside },
  components: {
    TdInput,
    TdScrollbar,
    TdIconPickerDropdown,
  },
  props: {
    value: {
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: () => t("el.select.placeholder"),
    },
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    popperClass: String,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    iconPickerSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    iconPickerDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    showClose() {
      return (
        this.value !== "" &&
        !this.iconPickerDisabled &&
        this.clearable &&
        this.inputHovering
      );
    },
    iconClass() {
      return this.visible ? "arrow-up is-reverse" : "arrow-up";
    },
  },
  data() {
    return {
      visible: false,
      softFocus: false,
      menuVisibleOnFocus: false,
      inputHovering: false,
    };
  },
  watch: {
    value(val, oldVal) {
      if (!valueEquals(val, oldVal)) {
        this.dispatch("TdFormItem", "el.form.change", val);
      }
    },
    visible(val) {
      this.$emit("visible-change", val);
    },
  },
  methods: {
    toggleMenu() {
      if (!this.iconPickerDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },
    handleClose() {
      this.visible = false;
    },
    handleFocus(event) {
      if (!this.softFocus) {
        this.$emit("focus", event);
      } else {
        this.softFocus = false;
      }
    },
    handleBlur() {
      this.softFocus = false;
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit("change", val);
      }
    },
    handlerIconSelect(item) {
      this.$emit("input", item.value);
      this.emitChange(item.value);
      this.visible = false;
    },
    deleteSelected(event) {
      event.stopPropagation();
      const value = "";
      this.$emit("input", value);
      this.emitChange(value);
      this.visible = false;
      this.$emit("clear");
    },
    handleClearClick(event) {
      this.deleteSelected(event);
    },
  },
};
</script>

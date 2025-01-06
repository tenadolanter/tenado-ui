<template>
  <div
    class="td-tree-select"
    :class="[selectSize ? 'td-tree-select--' + selectSize : '']"
    @click.stop="toggleMenu"
    v-clickoutside="handleClose"
  >
    <div
      class="td-tree-select__tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
    >
      <span v-if="collapseTags && selected.length">
        <td-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions
        >
          <span class="td-tree-select__tags-text">
            {{ selected[0][locProps.label] }}
          </span>
        </td-tag>
        <td-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions
        >
          <span class="td-tree-select__tags-text">
            + {{ selected.length - 1 }}
          </span>
        </td-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <td-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="item.hitState"
          type="info"
          @close="deleteTag($event, item)"
          disable-transitions
        >
          <span class="td-tree-select__tags-text">{{
            item[locProps.label]
          }}</span>
        </td-tag>
      </transition-group>
      <input
        type="text"
        class="td-tree-select__input"
        :class="[selectSize ? `is-${selectSize}` : '']"
        :disabled="selectDisabled"
        @keyup="managePlaceholder"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        v-model="query"
        @input="debouncedQueryChange"
        v-if="filterable"
        :style="{
          'flex-grow': '1',
          width: inputLength / (inputWidth - 32) + '%',
          'max-width': inputWidth - 42 + 'px',
        }"
        ref="input"
      />
    </div>
    <td-input
      v-model="selectedLabel"
      ref="reference"
      type="text"
      :placeholder="currentPlaceholder"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      @input="debouncedOnInputChange"
      @keydown.esc.stop.prevent="visible = false"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
    >
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
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
      <td-tree-select-dropdown
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible"
      >
        <td-tree
          ref="tree"
          v-bind="$attrs"
          :data="data"
          :lazy="lazy"
          :props="locProps"
          :show-checkbox="multiple"
          :check-strictly="checkStrictly"
          :node-key="locProps.value"
          :expand-on-click-node="false"
          :check-on-click-node="true"
          :filter-node-method="filterNodeMethod"
          @node-click="nodeClick"
          @check="nodeCheck"
        ></td-tree>
      </td-tree-select-dropdown>
    </transition>
  </div>
</template>

<script>
import Emitter from "@tenado/ui/src/mixins/emitter";
import Focus from "@tenado/ui/src/mixins/focus";
import Locale from "@tenado/ui/src/mixins/locale";
import TdTree from "@tenado/ui/packages/tree";
import TdInput from "@tenado/ui/packages/input";
import TdTag from "@tenado/ui/packages/tag";
import TdTreeSelectDropdown from "./tree-select-dropdown.vue";
import Clickoutside from "@tenado/ui/src/utils/clickoutside";
import {
  addResizeListener,
  removeResizeListener,
} from "@tenado/ui/src/utils/resize-event";
import { valueEquals, isEqual } from "@tenado/ui/src/utils/util";
import { isKorean } from "@tenado/ui/src/utils/shared";
import debounce from "throttle-debounce/debounce";
import { t } from "@tenado/ui/src/locale";
export default {
  name: "TdTreeSelect",
  componentName: "TdTreeSelect",
  mixins: [Emitter, Locale, Focus("reference")],
  components: {
    TdInput,
    TdTag,
    TdTree,
    TdTreeSelectDropdown,
  },
  props: {
    value: {
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({
        value: "value",
        label: "label",
        children: "children",
        disabled: "disabled",
      }),
    },
    size: String,
    placeholder: {
      type: String,
      required: false,
      default: () => t("el.select.placeholder"),
    },
    multiple: Boolean,
    lazy: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    checkStrictly: Boolean,
    popperClass: String,
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true,
    },
    valueLabels: {
      type: Array,
      default: () => [],
    },
  },
  directives: { Clickoutside },
  inject: {
    elForm: {
      default: "",
    },
    elFormItem: {
      default: "",
    },
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    readonly() {
      return !this.filterable || !this.visible;
    },
    collapseTagSize() {
      return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small";
    },
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== "";
      let criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },
    iconClass() {
      return this.visible ? "arrow-up is-reverse" : "arrow-up";
    },
    locProps() {
      return {
        value: "value",
        label: "label",
        children: "children",
        disabled: "disabled",
        ...this.props,
      };
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.setSelected();
      if (!valueEquals(newVal, oldVal)) {
        this.dispatch("TdFormItem", "el.form.change", newVal);
      }
    },
    visible() {
      if (!this.visible) {
        this.broadcast("TdTreeSelectDropdown", "destroyPopper");
        if (this.$refs?.input) {
          this.$refs.input.blur();
        }
        this.query = "";
        this.previousQuery = null;
        this.selectedLabel = "";
        this.inputLength = 20;
        this.$nextTick(() => {
          if (
            this.$refs.input &&
            this.$refs.input.value === "" &&
            this.selected.length === 0
          ) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            this.selectedLabel = this.selected?.[this.props?.label];
            if (this.filterable) this.query = this.selectedLabel;
          }
          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast("TdTreeSelectDropdown", "updatePopper");
        if (this.filterable) {
          this.query = "";
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = "";
            }
          }
        }
      }
      this.$emit("visible-change", this.visible);
    },
    placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
  },
  data() {
    return {
      visible: false,
      inputLength: 20,
      inputWidth: 0,
      inputHovering: false,
      selected: this.multiple ? [] : {},
      selectedLabel: "",
      cachedPlaceHolder: "",
      currentPlaceholder: "",
      query: "",
      previousQuery: null,
      isOnComposition: false,
      initialInputHeight: 0,
    };
  },
  created() {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit("input", []);
      this.emitChange(value);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit("input", "");
      this.emitChange("");
    }
    this.debouncedQueryChange = debounce(300, (e) => {
      this.handleQueryChange(e.target.value);
    });
    this.debouncedOnInputChange = debounce(300, () => {
      this.onInputChange();
    });
  },
  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = "";
    }
    addResizeListener(this.$el, this.handleResize);
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28,
      };
      const input = reference.$el.querySelector("input");
      this.initialInputHeight =
        input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.$attrs?.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },
  beforeDestroy() {
    if (this.$el && this.handleResize)
      removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }
      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = this.value.slice();
        value.pop();
        this.$emit("input", value);
        this.emitChange(value);
      }
    },
    managePlaceholder() {
      if (this.currentPlaceholder !== "") {
        this.currentPlaceholder = this.$refs.input.value
          ? ""
          : this.cachedPlaceHolder;
      }
    },
    handleComposition(event) {
      const text = event.target.value;
      if (event.type === "compositionend") {
        this.isOnComposition = false;
        this.$nextTick((_) => this.handleQueryChange(text));
      } else {
        const lastCharacter = text[text.length - 1] || "";
        this.isOnComposition = !isKorean(lastCharacter);
      }
    },
    filterNodeMethod(value, data) {
      if (!value) return true;
      return this.getPropValue(data, "label")?.indexOf(value) !== -1;
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return;
      this.previousQuery = val;
      this.$nextTick(() => {
        if (this.visible)
          this.broadcast("TdTreeSelectDropdown", "updatePopper");
      });
      if (this.multiple && this.filterable) {
        this.$nextTick(() => {
          const length = this.$refs.input.value.length * 15 + 20;
          this.inputLength = this.collapseTags ? Math.min(50, length) : length;
          this.managePlaceholder();
          this.resetInputHeight();
        });
      }
      if (
        this.$attrs?.remote &&
        typeof this.$attrs?.remoteMethod === "function"
      ) {
        this.$attrs?.remoteMethod(val);
      } else {
        this.$refs?.tree?.filter(val);
      }
    },
    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },
    getValueKey(item) {
      return item?.[this.locProps.value];
    },
    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        let value = this.value.slice();
        value.splice(index, 1);
        // 如果checkStrictly为false，则需要过滤掉已选中带有children的节点
        if (!this.checkStrictly) {
          const checkedNodeKeys = this.selected
            .filter((item) => item?.[this.locProps["children"]]?.length)
            .map((item) => item[this.locProps["value"]]);
          value = value.filter((item) => !checkedNodeKeys?.includes(item));
        }
        this.$emit("input", value);
        this.emitChange(value);
        this.$emit("remove-tag", tag.value);
      }
      event.stopPropagation();
    },
    setSelected() {
      if (this.multiple) {
        this.$refs?.tree?.setCheckedKeys(this.value);
      } else {
        this.$refs?.tree?.setCurrentKey(this.value);
      }
      let result = [];
      if (this.multiple) {
        const value = Array.isArray(this.value) ? this.value : [];
        result = value
          ?.map((item) => {
            return this.getNodeByKey(this.data, item);
          })
          .filter(Boolean);
      } else {
        const checked = this.getNodeByKey(this.data, this.value);
        this.selectedLabel = checked?.[this.locProps?.label];
        result = checked;
      }
      this.selected = result;
    },
    getNodeByKey(data, key) {
      // 如果是懒加载，则没有data，应该通过tree的getNode方法获取节点
      const tree = this.$refs?.tree;
      if (tree?.getNode && key) {
        const nodeData = tree?.getNode(key)?.data;
        if (!nodeData) {
          const label =
            this.valueLabels?.find((item) => item.value === key)?.label ?? key;
          return {
            [this.locProps.value]: key,
            [this.locProps.label]: label,
          };
        }
        return nodeData;
      }
      const { value, children } = this.locProps ?? {};
      for (const node of data) {
        if (node[value] === key) return node;
        if (node[children]?.length) {
          const target = this.getNodeByKey(node[children], key);
          if (target) return target;
        }
      }
      return undefined;
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(
          inputChildNodes,
          (item) => item.tagName === "INPUT"
        )[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags
          ? Math.round(tags.getBoundingClientRect().height)
          : 0;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height =
          this.selected.length === 0
            ? sizeInMap + "px"
            : Math.max(
                tags ? tagsHeight + (tagsHeight > sizeInMap ? 6 : 0) : 0,
                sizeInMap
              ) + "px";
        if (this.visible) {
          this.broadcast("TdTreeSelectDropdown", "updatePopper");
        }
      });
    },
    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    toggleMenu() {
      if (!this.selectDisabled) {
        this.visible = !this.visible;
      }
    },
    handleClearClick(event) {
      this.deleteSelected(event);
    },
    deleteSelected(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : "";
      this.$emit("input", value);
      this.emitChange(value);
      this.visible = false;
      this.$emit("clear");
    },
    emitChange(val) {
      if (!valueEquals(this.value, val)) {
        this.$emit("change", val);
        this.emitLabelChange(val);
      }
    },
    emitLabelChange(val) {
      if (this.lazy) {
        let result = [];
        if (this.multiple) {
          result = val
            ?.map((item) => {
              return this.getNodeByKey(this.data, item);
            })
            .map((item) => {
              return {
                value: item[this.locProps.value],
                label: item[this.locProps.label],
              };
            });
        } else {
          const checked = this.getNodeByKey(this.data, val);
          if (checked) {
            result = [
              {
                value: checked[this.locProps.value],
                label: checked[this.locProps.label],
              },
            ];
          }
        }
        this.$emit("label-change", result);
      }
    },
    handleClose() {
      this.visible = false;
    },
    doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },
    nodeClick(data, node, component) {
      const value = this.getPropValue(data, "value");
      const disabled = this.getPropValue(data, "disabled");
      const children = this.getPropValue(data, "children");
      if (
        disabled ||
        (!this.multiple && !this.checkStrictly && children?.length)
      ) {
        return component.handleExpandIconClick();
      }
      if (this.multiple) return;
      if (!isEqual(this.value, value)) {
        this.$emit("input", value);
        this.emitChange(value);
      }
      this.blur();
    },
    nodeCheck(node, data) {
      if (!this.multiple) return;
      let { checkedKeys, checkedNodes } = data ?? {};
      // 过滤掉有children的节点
      if (!this.checkStrictly) {
        const checkedNodeKeys = checkedNodes
          .filter((item) => item?.[this.locProps["children"]]?.length)
          .map((item) => item[this.locProps["value"]]);
        checkedNodes = checkedNodes.filter(
          (item) => !item?.[this.locProps["children"]]?.length
        );
        checkedKeys = checkedKeys.filter(
          (item) => !checkedNodeKeys.includes(item)
        );
      }
      this.selected = checkedNodes;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
      this.$emit("input", checkedKeys);
      this.emitChange(checkedKeys);
    },

    getPropValue(data, prop) {
      return typeof this.locProps?.[prop] === "function"
        ? this.locProps?.[prop]?.(data)
        : data?.[this.locProps?.[prop]];
    },
  },
};
</script>

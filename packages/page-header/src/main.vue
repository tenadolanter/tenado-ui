<template>
  <div class="td-page-header">
    <div class="td-page-header__left" @click="$emit('back')">
      <i class="td-icon-back"></i>
      <div class="td-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="td-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script>
import { t } from "@tenado/ui/src/locale";
export default {
  name: "ElPageHeader",

  props: {
    title: {
      type: String,
      default() {
        return t("el.pageHeader.title");
      },
    },
    content: String,
  },
};
</script>

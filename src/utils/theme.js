import { mix, rgba, tint } from "./color.js";
const DEFAULT_STYLE = {
  "--td-color-primary": "#409eff",
  "--td-color-success": "#67c23a",
  "--td-color-warning": "#e6a23c",
  "--td-color-danger": "#f56c6c",
  "--td-color-info": "#909399",
  "--td-color-text-primary": "#303133",
  "--td-color-text-regular": "#606266",
  "--td-color-text-secondary": "#909399",
  "--td-color-text-placeholder": "#c0c4cc",
  "--td-border-color-base": "#dcdfe6",
  "--td-border-color-light": "#e4e7ed",
  "--td-border-color-lighter": "#ebeef5",
  "--td-border-color-extra-light": "#f2f6fc",
  "--td-background-color-base": "#f5f7fa",
};

export const theme2Variable = (style) => {
  const theme = {
    ...DEFAULT_STYLE,
    ...style,
  };
  let variables = {
    ...theme,
  };
  // 生成primary
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-primary-light-${i}`] = mix(
      "#ffffff",
      theme["--td-color-primary"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-primary-dark-${i}`] = mix(
      "#000000",
      theme["--td-color-primary"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-primary-tint-${i}`] = tint(
      theme["--td-color-primary"],
      i / 10
    );
  }
  // success
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-success-light-${i}`] = mix(
      "#ffffff",
      theme["--td-color-success"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-success-dark-${i}`] = mix(
      "#000000",
      theme["--td-color-success"],
      i / 10
    );
  }
  // danger
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-danger-light-${i}`] = mix(
      "#ffffff",
      theme["--td-color-danger"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-danger-dark-${i}`] = mix(
      "#000000",
      theme["--td-color-danger"],
      i / 10
    );
  }
  // warning
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-warning-light-${i}`] = mix(
      "#ffffff",
      theme["--td-color-warning"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-warning-dark-${i}`] = mix(
      "#000000",
      theme["--td-color-warning"],
      i / 10
    );
  }
  // info
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-info-light-${i}`] = mix(
      "#ffffff",
      theme["--td-color-info"],
      i / 10
    );
  }
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-info-dark-${i}`] = mix(
      "#000000",
      theme["--td-color-info"],
      i / 10
    );
  }
  // text-secondary
  for (let i = 1; i < 10; i++) {
    variables[`--td-color-text-secondary-alpha-${i}`] = rgba(
      theme["--td-color-text-secondary"],
      i / 10
    );
  }
  // border-color-base
  for (let i = 1; i < 10; i++) {
    variables[`--td-border-color-base-transparent-${i}`] = mix(
      theme["--td-border-color-base"],
      "transparent",
      i / 10
    );
  }
  return variables;
};

import { theme2Variable } from "../src/utils/theme.js";
export default (style) => {
  const variables = theme2Variable(style);
  for (let variable in variables) {
    document.body.style.setProperty(variable, variables[variable]);
  }
};

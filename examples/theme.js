import { theme2Variable } from "../src/utils/theme.js";
export default (baseStyle) => {
  const variables = theme2Variable(baseStyle);
  let styleContent = "";
  for (let variable in variables) {
    styleContent += `${variable}: ${variables[variable]};`;
  }
  styleContent = `:root { ${styleContent} }`;
  let style = document.getElementById("theme");
  if (!style) {
    style = document.createElement("style");
    style.id = "theme";
    style.innerHTML = styleContent;
    document.head.appendChild(style);
  } else {
    style.innerHTML = styleContent;
  }
};

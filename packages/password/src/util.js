export const supportsWebkitTextSecurity = () => {
  const el = document.createElement("span");
  el.style.cssText = "-webkit-text-security: disc;";
  return el?.style?.webkitTextSecurity === "disc";
};

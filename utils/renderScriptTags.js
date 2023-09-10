export const renderScriptTags = (node, scripts) => {
  try {
    const div = document.createElement('div');
    div.innerHTML = scripts;
    div.childNodes.forEach((elem) => {
      if (elem.nodeType === 1) {
        const cur = document.createElement('script');
        cur.innerHTML = elem.innerHTML;
        const attrNames = elem.getAttributeNames();
        attrNames.forEach((attr) => {
          cur.setAttribute(attr, elem.getAttribute(attr));
        });
        node.appendChild(cur);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

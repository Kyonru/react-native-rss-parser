export const getElements = (node: Element, tagName: string): Element[] => {
  if (!node || !node.getElementsByTagName(tagName)) {
    return [];
  }

  const elements = node.getElementsByTagName(tagName);

  return Array.prototype.slice.call(elements);
};

export const getChildElements = (
  node: Element,
  tagName: string,
  namespace?: string
): Element[] => {
  if (!node) {
    return [];
  }

  const elements = namespace
    ? node.getElementsByTagNameNS(namespace, tagName)
    : node.getElementsByTagName(tagName);

  if (!elements) {
    return [];
  }

  return Array.prototype.filter.call(
    elements,
    (element: Element) =>
      element.parentNode && element.parentNode.nodeName === node.nodeName
  );
};

export const getElementTextContentArray = (
  node: Element,
  tagName: string,
  namespace?: string
): string[] => {
  const nodes = getChildElements(node, tagName, namespace);

  if (!nodes || nodes.length === 0) {
    return [];
  }

  return nodes.map((n: Element) => n.textContent || '');
};

export const getElementTextContent = (
  node?: Element,
  tagName?: string,
  namespace?: string
): string | undefined => {
  if (!node || !tagName) {
    return undefined;
  }

  const array = getElementTextContentArray(node, tagName, namespace);

  return array.length === 0 ? undefined : array[0];
};

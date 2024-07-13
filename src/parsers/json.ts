export function xmlToJson(xml: any) {
  let obj: any = {};

  if (xml.nodeType === 1) {
    // element
    // Process attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        const parts = attribute.nodeName.split(':');
        const propName = parts?.[0];
        const attrName = parts?.[1];

        if (!obj[propName]) {
          obj[propName] = {};
        }

        if (typeof attrName === 'undefined') {
          obj[propName] = attribute?.nodeValue?.trim() || '';
        } else {
          obj[propName][attrName] = attribute.nodeValue;
        }
      }
    }
  } else if (xml.nodeType === 3) {
    obj = xml.nodeValue.trim();
  }

  // Process child nodes

  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName || item.tagName;
      const parts = nodeName?.split(':');
      const propName = parts?.[0];
      const childName = parts?.[1];

      if (item.nodeType === 3 && item.nodeValue.trim()) {
        return item.nodeValue.trim();
      } else if (!obj[propName]) {
        obj[propName] = {};
      }

      if (item.nodeType === item.TEXT_NODE) {
        obj[propName || item.tagName] = item.nodeValue.trim();
      } else if (typeof obj[propName][childName] === 'undefined') {
        if (typeof childName === 'undefined') {
          obj[propName] = xmlToJson(item);
        } else {
          obj[propName][childName] = xmlToJson(item);
        }
      } else {
        if (typeof obj[propName][childName].push === 'undefined') {
          const old = obj[propName][childName];
          obj[propName][childName] = [];
          obj[propName][childName].push(old);
        }
        obj[propName][childName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

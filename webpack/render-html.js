module.exports = function (template, tagName) {

  let beginIndex = -1, endIndex = -1;

  for (beginIndex = 0; beginIndex + tagName.length + 2 <= template.length; beginIndex++) {
    if (`<${tagName}>` == template.substr(beginIndex, tagName.length + 2)) {
      break;
    }
  };

  for (endIndex = template.length; endIndex - (tagName.length + 3) >= 0; endIndex--) {
    if (`</${tagName}>` == template.substr(endIndex - (tagName.length + 3), tagName.length + 3)) {
      break;
    }
  }

  if (beginIndex >= endIndex) {
    return '';
  }

  return template.substring(beginIndex + tagName.length + 2, endIndex - (tagName.length + 3));
};
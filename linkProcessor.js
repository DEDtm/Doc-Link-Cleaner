/**
 * Google Apps Script for removing, preserving, or adjusting spaces around external links in Google Docs
 * Functions:
 *   removeExternalLinksAndText()       – removes all external links along with their text.
 *   removeExternalLinksKeepText()      – removes only the external links, preserving the text.
 *   addSpacesBeforeExternalLinksSimple() – adds a single space before each external link.
 *   removeSpacesBeforeExternalLinks()  – removes all spaces immediately preceding external links.
 */

function removeExternalLinksAndText() {
  const count = processExternalLinks(true);
  Logger.log(`Removed ${count} external link${count !== 1 ? 's' : ''} and text`);
}

function removeExternalLinksKeepText() {
  const count = processExternalLinks(false);
  Logger.log(`Removed ${count} external link${count !== 1 ? 's' : ''}, kept text`);
}

function processExternalLinks(removeText) {
  const docUrl = DocumentApp.getActiveDocument().getUrl().split('#')[0];
  const body = DocumentApp.getActiveDocument().getBody();
  let removedCount = 0;
  const recurse = (element) => {
    if (element.getType() === DocumentApp.ElementType.TEXT) {
      const textElem = element.asText();
      const content = textElem.getText();
      const indices = textElem.getTextAttributeIndices();
      for (let i = indices.length - 1; i >= 0; i--) {
        const start = indices[i];
        const url = textElem.getLinkUrl(start);
        if (!url) continue;
        const internal = url.startsWith('#') || url.startsWith(docUrl) ||
                         url.includes('#heading=') || url.includes('#bookmark=');
        if (!internal) {
          let end = content.length - 1;
          for (let j = i + 1; j < indices.length; j++) {
            if (indices[j] > start) { end = indices[j] - 1; break; }
          }
          if (removeText) textElem.deleteText(start, end);
          else textElem.setLinkUrl(start, end, null);
          removedCount++;
        }
      }
    } else if (typeof element.getNumChildren === 'function') {
      for (let i = 0; i < element.getNumChildren(); i++) {
        recurse(element.getChild(i));
      }
    }
  };
  recurse(body);
  return removedCount;
}

function addSpacesBeforeExternalLinksSimple() {
  const body = DocumentApp.getActiveDocument().getBody();
  const textElems = [];
  collectTextElements(body, textElems);
  let addedCount = 0;
  
  for (let i = textElems.length - 1; i >= 0; i--) {
    const element = textElems[i];
    const text = element.getText();
    const textObj = element.editAsText();
    
    for (let j = text.length - 1; j >= 0; j--) {
      const url = textObj.getLinkUrl(j);
      if (url && isExternalLink(url)) {
        let linkStart = j;
        while (linkStart > 0 && textObj.getLinkUrl(linkStart - 1) === url) {
          linkStart--;
        }
        if (linkStart > 0) {
          const charBefore = text.charAt(linkStart - 1);
          if (charBefore !== ' ' && charBefore !== '\n' && charBefore !== '\t') {
            textObj.insertText(linkStart, ' ');
            addedCount++;
          }
        }
        j = linkStart;
      }
    }
  }
  
  Logger.log(`Added spaces before ${addedCount} external link${addedCount !== 1 ? 's' : ''}`);
}

function removeSpacesBeforeExternalLinks() {
  const body = DocumentApp.getActiveDocument().getBody();
  const textElems = [];
  collectTextElements(body, textElems);
  let processedCount = 0;

  for (let i = textElems.length - 1; i >= 0; i--) {
    const element = textElems[i];
    const text = element.getText();
    const textObj = element.editAsText();
    
    for (let j = text.length - 1; j >= 0; j--) {
      const url = textObj.getLinkUrl(j);
      if (url && isExternalLink(url)) {
        let linkStart = j;
        while (linkStart > 0 && textObj.getLinkUrl(linkStart - 1) === url) {
          linkStart--;
        }
        let spacesToRemove = 0;
        for (let k = linkStart - 1; k >= 0 && text.charAt(k) === ' '; k--) {
          spacesToRemove++;
        }
        if (spacesToRemove > 0) {
          textObj.deleteText(linkStart - spacesToRemove, linkStart - 1);
          processedCount++;
        }
        j = linkStart;
      }
    }
  }

  Logger.log(`Removed spaces before ${processedCount} external link${processedCount !== 1 ? 's' : ''}`);
}

function collectTextElements(element, list) {
  if (element.getType() === DocumentApp.ElementType.TEXT) {
    list.push(element);
  } else if (typeof element.getNumChildren === 'function') {
    const numChildren = element.getNumChildren();
    for (let i = 0; i < numChildren; i++) {
      collectTextElements(element.getChild(i), list);
    }
  }
}

function isExternalLink(url) {
  return (url.startsWith('http://') || url.startsWith('https://')) &&
         !url.includes('docs.google.com/document');
}
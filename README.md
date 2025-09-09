# Google Apps Script for removing, preserving, or adjusting spaces around external links in Google Docs

A Google Apps Script that provides a unified toolkit for handling external links in Google Docs. It can remove external links (with or without text), add spaces before links, and remove spaces before links.

## ⚙️ How It Works

1. **Document Traversal**
   Recursively scans all elements in the document body to collect text elements.

2. **Link Removal**
   - `removeExternalLinksAndText()` removes all external links along with their text.
   - `removeExternalLinksKeepText()` removes only the external link URLs, preserving the display text.

3. **Space Management**
   - `addSpacesBeforeExternalLinksSimple()` inserts a single space before each external link if one is missing.
   - `removeSpacesBeforeExternalLinks()` deletes all spaces immediately preceding external links.

4. **Logging**
   Each function logs a concise summary of the number of links processed in the execution log.

## 🚀 Getting Started

1. Open your Google Doc.
2. Go to **Extensions → Apps Script**.
3. Remove any existing template code and paste the contents of `linkProcessor.js`.
4. Save the project (e.g., **doc-link-cleaner**).
5. Select the desired function (e.g., `removeExternalLinksKeepText`) from the dropdown and click ▶️.
6. Grant the required permissions when prompted.

## 📋 Requirements

- A Google account with access to Google Docs.
- Permission to run Google Apps Script (view and edit the document).

## ⚠️ Limitations

- Only processes links within the open document; does not affect external or cross-document references.
- Does not handle specialized document structures like built-in table of contents or sidebar links.

## 🔧 Functions Overview

- **`removeExternalLinksAndText()`**
  Removes all external links and their associated text.

- **`removeExternalLinksKeepText()`**
  Removes external link URLs but leaves the text intact.

- **`addSpacesBeforeExternalLinksSimple()`**
  Adds a single space before each external link if not already present.

- **`removeSpacesBeforeExternalLinks()`**
  Removes any spaces immediately preceding external links.

- **`processExternalLinks(removeText)`**
  Internal helper that traverses the document and either removes links or deletes link text based on the `removeText` parameter.

- **`collectTextElements(element, list)`**
  Recursively collects all text elements in the document for processing.

- **`isExternalLink(url)`**
  Checks whether a URL is external (i.e., not pointing to the current Google Doc).

# Google Apps Script for removing, preserving, or adjusting spaces around external links in Google Docs

A Google Apps Script that provides a unified toolkit for handling external links in Google Docs. It can remove external links (with or without text), add spaces before links, and clean up organization/client pattern strings.

## ⚙️ How It Works

1. **Document Traversal**
   Recursively scans all elements in the document body to collect text elements.

2. **Link Removal**
   - `removeExternalLinksAndText()` removes all external links along with their text.
   - `removeExternalLinksKeepText()` removes only the external link URLs, preserving the display text.

3. **Space Management**
   - `addSpacesBeforeExternalLinksSimple()` inserts a single space before each external link if one is missing.

4. **Pattern Cleanup**
   - `removeOrganizationAndClientPatterns()` removes organization_* and client_*.md pattern strings from the document.

5. **Logging**
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

- Processes content only within the currently open document.
- Does not handle specialized document structures like built-in table of contents or sidebar links.

## 🔧 Functions Overview

- **`removeExternalLinksAndText()`**
  Removes all external links and their associated text.

- **`removeExternalLinksKeepText()`**
  Removes external link URLs but leaves the text intact.

- **`addSpacesBeforeExternalLinksSimple()`**
  Adds a single space before each external link if not already present.

- **`removeOrganizationAndClientPatterns()`**
  Removes organization_* and client_*.md pattern strings (where * is a 10 or 12 digit number) from the document.

- **`processExternalLinks(removeText)`**
  Internal helper that traverses the document. When `removeText=true`, it deletes the link text; when `removeText=false`, it removes only the URL while preserving the text.

- **`collectTextElements(element, list)`**
  Recursively collects all text elements in the document for processing.

- **`isExternalLink(url)`**
  Checks whether a URL is external by verifying it starts with http:// or https:// and does not contain docs.google.com/document. Note: Determination of whether a link belongs to the current document is handled in the `processExternalLinks()` function.

# Auto Refresh on Focus

Auto Refresh on Focus is a Chrome extension that refreshes the active tab automatically when the Chrome window regains focus after switching from another application.

This can be useful for keeping web pages up to date in real-time without manual refreshes.

## The Story Hehind The Idea

When I'm working on my React Projects, althought the server is up and running, it needed me to refresh the browser window to look out for warning and bugs in the browser's console.

Today, I fixed a bug in my ReactJS project and yet spent 30 - 35 mintues on the same bug, just becuase I forgot to refresh the browser window. Once I refreshed I could proceed to see the next issues that I needed to work on.

I wanted to figure out, if there was a way that would refresh the briwser window as soon as the focus changes from it, which led to the creation of this lightweight chrome extension.

## Features

- **Automatic Refresh**: Refreshes the active tab whenever the Chrome window regains focus.
- **Simple and Lightweight**: Minimal impact on browser performance.
- **Wide Compatibility**: Works on all web pages.

## Installation

### Prerequisites

- Google Chrome browser (latest version recommended).

### Steps

## Step for Google Chrome

1. **Clone or Download** the repository to your local machine. Use the following command in your working direcotry to clone this repository.
   ```
   git clone https://github.com/ShrinivasV73/Auto-Refresh-on-Focus.git
   ```
3. **Open Chrome** and navigate to `chrome://extensions/`.
4. **Enable Developer Mode** by toggling the switch in the top right.
5. **Click "Load unpacked"** and select the directory containing your extension files.

## Usage

Once installed, the extension will automatically refresh the current page whenever Chrome regains focus. There is no need for manual interaction.
If you want this extension to not operate beyond your wokring prupose, you can always disable it from the broswer's tool bar where all your extensions reside.

## Files

### `manifest.json`

Defines the extension's metadata, permissions, and main scripts.

```json
{
  "manifest_version": 3,
  "name": "Auto Refresh on Focus",
  "version": "1.0",
  "description": "Refreshes the page when the browser window regains focus.",
  "permissions": ["tabs"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "host_permissions": ["<all_urls>"]
}
```

### `background.js`

Listens for focus changes of the Chrome window and sends a message to the active tab to refresh the page.

```javascript
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "refresh" });
      }
    });
  }
});
```

### `content.js`

Handles the message from `background.js` and refreshes the page.

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "refresh") {
    window.location.reload();
  }
});
```

## Development

To modify or extend the functionality:

1. **Edit the `background.js`** to adjust how focus events are handled.
2. **Edit the `content.js`** to customize the page refresh behavior.
3. **Update `manifest.json`** if you add new permissions or features.

### Debugging

- Use Chrome's developer tools (`Ctrl + Shift + I`) to view console logs for debugging.
- Monitor the `chrome://extensions/` page for any errors or warnings related to the extension.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## Contact

For questions or feedback, please email on [shrinivasv73@gmail.com](mailto:shrinivasv73@gmail.com).

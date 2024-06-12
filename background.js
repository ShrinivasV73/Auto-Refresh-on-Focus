chrome.windows.onFocusChanged.addListener((windowId) => {
  // Only proceed if the window is focused
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs.length > 0) {
        // Send a message to the active tab to refresh the page
        chrome.tabs.sendMessage(tabs[0].id, { action: "refresh" });
      }
    });
  }
});

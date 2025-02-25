# Directory Paths in FoW Suite

Understanding directory paths is crucial for working with files and imports in FoW Suite. Here’s a beginner-friendly guide to help you navigate like a pro!

---

## Relative Paths
Relative paths are used to reference files based on their location relative to the current file. Here’s how they work:

- `./` refers to the **current directory**.
- `../` goes up **one directory level**.
- `../../` goes up **two directory levels**, and so on.

### Example
If `UIClone.js` is located in `frontend/js/` and you need to import `app.js` from the root `scripts/` directory, the import statement would look like this:
```javascript
import { app } from "../../../../scripts/app.js";

---

### Absolute Paths
Absolute paths start from the root directory and specify the full path to the file. They are useful when you know the exact location of the file.

##Example

import { app } from "/extensions/FoW_Suite/scripts/app.js";
Debugging Path Issues
If you’re having trouble with paths, here are some tips:

Use console.log: Print the resolved path to verify it’s correct.

console.log("Resolved path:", require.resolve("../../core/ui_core.js"));
Check the Network Tab: Open your browser’s developer tools (F12) and go to the Network tab. Look for requests to the file and check if they’re successful (status code 200).

Verify File Permissions: Ensure the file or directory has the correct permissions to be accessed by the server.

---

Pro Tip
Always double-check your paths. A small typo can lead to big headaches!

Use relative paths for flexibility and absolute paths for precision.

# Directory Paths in Force of Will Suite

Understanding directory paths is crucial for working with files and imports in `FoW_Suite_LIGHT`. Here’s a beginner-friendly guide to help you navigate like a pro in ComfyUI! 🚀🎮

-----

## Relative Paths
Relative paths reference files based on their location relative to the current file:

- `./` refers to the **current directory**.
- `../` goes up **one directory level**.
- `../../` goes up **two directory levels**, and so on.

### Example
If `PromptRefinerLightModal.js` is in `frontend/` and you need to import `app.js` from `frontend/scripts/`, the import statement would look like this:

import { app } from "../scripts/app.js";
For ComfyUI, if importing a Python node from backend/nodes/:

from .nodes.PromptRefinerLight import PromptRefinerLight

-----

Absolute Paths
Absolute paths start from the root directory and specify the full path to the file. They’re useful when you know the exact location in ComfyUI.

Example
For ComfyUI’s custom_nodes/FoW_Suite_LIGHT:

from /custom_nodes/FoW_Suite_LIGHT/backend/nodes.PromptRefinerLight import PromptRefinerLight

-----

Paths for Git and GitHub

Local Path: C:\Ai Programming\ComfyUI\custom_nodes\FoW_Suite_LIGHT (your local repo for development).
GitHub Path: Clone from https://github.com/SirWillance/FoW_Suite_LIGHT to ComfyUI/custom_nodes/FoW_Suite_LIGHT.
ComfyUI Manager Path: After installing via ComfyUI Manager, nodes are in ComfyUI/custom_nodes/FoW_Suite_LIGHT/. Use “Install Custom Nodes” to pull from GitHub.
Debugging Path Issues
If you’re having trouble with paths, try these tips:

Use console.log: Print the resolved path in JavaScript to verify:

console.log("Resolved path:", require.resolve("../scripts/app.js"));
Check the Network Tab: Open your browser’s developer tools (F12), go to the Network tab, and look for requests to the file (status code 200 means success).
Verify File Permissions: Ensure files in custom_nodes/FoW_Suite_LIGHT have correct permissions for ComfyUI access.

-----

Pro Tip

Always double-check your paths—typos can cause big headaches in FoW_Suite_LIGHT!
Use relative paths for flexibility in frontend/ and absolute paths for precision in backend/ within ComfyUI. Install via ComfyUI Manager to avoid path errors.
Help me level up on Twitch (https://www.twitch.tv/sirwillance) to unlock FoW_Suite_Standard (€15) for free—see Gamers_Corner for streaming tips!
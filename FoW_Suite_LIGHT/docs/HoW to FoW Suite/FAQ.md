# FAQs: Frequently Asked Questions

Here are answers to some common questions about `FoW_Suite_LIGHT`, especially for `PromptRefinerLight`. 🚀🎮

---

## 1. How do I install `FoW_Suite_LIGHT`?
1. **Download the Suite**: Clone or download the files from [GitHub](https://github.com/SirWillance/FoW_Suite_LIGHT).
2. **Place the Files**: Copy the `FoW_Suite_LIGHT` folder into the `custom_nodes` directory of your ComfyUI installation (e.g., `ComfyUI/custom_nodes/FoW_Suite_LIGHT`).
3. **Restart ComfyUI**: Refresh your ComfyUI browser interface or restart the server to load the suite.
   - **Alternative**: Use ComfyUI Manager—click “Manager,” go to “Install Custom Nodes,” search for “Force of Will Suite Light,” and install from GitHub.

---

## 2. Why am I getting a 403 error?
A **403 error** means the server is denying access to a file. Here’s how to fix it in ComfyUI:
- **Check File Permissions**: Ensure files in `custom_nodes/FoW_Suite_LIGHT` have read permissions.
- **Verify the Path**: Confirm the file exists in `custom_nodes/FoW_Suite_LIGHT/backend/` or `frontend/`.
- **Check ComfyUI Configuration**: Ensure ComfyUI’s web server allows access to custom nodes. Restart if installed via ComfyUI Manager.

---

## 3. How do I add a new node like `PromptRefinerLight`?
1. **Create New Files**: Add `.py` files in `backend/nodes/` and `.js` files in `frontend/` (if needed).
2. **Define the Node**: Use `app.registerExtension` in JavaScript and `NODE_CLASS_MAPPINGS` in `__init__.py` to define behavior.
3. **Register the Node**: Update `backend/__init__.py` to include the new node. Install via ComfyUI Manager for automatic updates.

---

## 4. How do I debug my code in `PromptRefinerLight`?
- **Use `console.log`**: Print messages in `frontend/PromptRefinerLightModal.js` to trace JavaScript flow.
- **Check the Network Tab**: In ComfyUI’s browser, use developer tools (F12) to check for failed requests or missing files.
- **Read Error Messages**: The ComfyUI console or browser console provides error details—look for `404`, `500`, or prompt loading issues.

---

## 5. Why aren’t my prompts saving correctly in `PromptRefinerLight`?
- Ensure you’ve enabled save in the modal (💾).
- Check `.txt` files use newline-separated Positive/Negative prompts (e.g., `an apple, on a tree\nbad quality, watermark`).
- Verify file paths in `custom_nodes/FoW_Suite_LIGHT/docs/` or `data/` are correct. Restart ComfyUI or reinstall via ComfyUI Manager if needed.
- See [Troubleshooting](Troubleshooting.md) for solutions.

---

## 6. How do I get free `FoW_Suite_Standard`?
- Follow my [Twitch channel](https://www.twitch.tv/sirwillance) to join the guild—the first 50 followers get free access to `FoW_Suite_Standard` (€15 value) via my [Discord server](https://discord.gg/BHSxf8HB).
- Help me meet Twitch Affiliate requirements (50+ followers, 500+ minutes, 7+ days, 3+ viewers in 30 days) by streaming with `FoW_Suite_LIGHT`. Check [Gamers_Corner](Gamers_Corner.md) for tips!

---

## 7. Can I contribute to `FoW_Suite_LIGHT`?
Absolutely! Check out the [Contribution Guide](Contribution_Guide.md) for details on reporting bugs, suggesting features, or submitting code. Help me level up on Twitch to unlock `FoW_Suite_Standard` for free!

---

## 8. Pricing might change depending on your support
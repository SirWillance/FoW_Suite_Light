# FAQs: Frequently Asked Questions

Here are answers to some common questions about FoW Suite.

---

## 1. How do I install FoW Suite?
1. **Download the Suite**: Grab the files from the repository (a.k.a. the fancy folder where code lives).
2. **Place the Files**: Copy the `FoW_Suite` folder into the `custom_nodes` directory of your ComfyUI installation.
3. **Restart ComfyUI**: Refresh the browser or restart ComfyUI to load the suite.

---

## 2. Why am I getting a 403 error?
A **403 error** means the server is denying access to a file. Here’s how to fix it:
- **Check File Permissions**: Ensure the file or directory has the correct permissions.
- **Verify the Path**: Make sure the file exists and the path is correct.
- **Check Server Configuration**: If you’re using a web server, ensure it’s configured to allow access to the file.

---

## 3. How do I add a new node?
1. **Create a New File**: Add a new `.js` file in the `frontend/js/` directory.
2. **Define the Node**: Use the `app.registerExtension` function to define the node’s behavior.
3. **Register the Node**: Add the node to `NODE_CLASS_MAPPINGS` in `__init__.py`.

---

## 4. How do I debug my code?
- **Use `console.log`**: Print messages to the browser console to trace the flow of your code.
- **Check the Network Tab**: Look for failed requests or missing files.
- **Read Error Messages**: The browser console will often provide clues about what went wrong.

---

## 5. Can I contribute to FoW Suite?
Absolutely! Check out the [Contribution Guide](CONTRIBUTING.md) for details on how to report bugs, suggest features, or submit code.
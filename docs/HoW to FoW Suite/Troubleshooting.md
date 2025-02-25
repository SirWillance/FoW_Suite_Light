# Troubleshooting Guide

Encountering issues? Don’t worry—here’s a guide to help you solve common problems in FoW Suite.

---

## 1. SyntaxError: Invalid or unexpected token
- **Cause**: This usually occurs when there’s a syntax error in your JavaScript code.
- **Solution**: Check for missing brackets, semicolons, or invalid characters. Use proper commenting syntax (`//` or `/* ... */`).

---

## 2. Module not found
- **Cause**: The import path is incorrect or the file doesn’t exist.
- **Solution**: Verify the directory structure and adjust the import path. Use `console.log` to debug the resolved path.

---

## 3. 403 Forbidden Error
- **Cause**: The server is denying access to the requested resource.
- **Solution**: Check file permissions and server configuration. Ensure the file exists and is accessible.

---

## 4. Node Not Working
- **Cause**: The node might not be registered correctly or has a bug.
- **Solution**: Check the browser console for errors. Ensure the node is properly defined in `NODE_CLASS_MAPPINGS`.

---

## Pro Tip
- Always check the browser console for error messages. They often provide clues about what went wrong.
- Use `console.log` to trace the flow of your code and identify where things go wrong.
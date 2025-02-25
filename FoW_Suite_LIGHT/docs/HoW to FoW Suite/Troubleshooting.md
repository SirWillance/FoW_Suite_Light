# Troubleshooting Guide: Don’t Rage Quit!

Encountering issues with `FoW_Suite_LIGHT` or `PromptRefinerLight`? Here’s how to solve common problems in ComfyUI. 🚀🎮

---

## 1. SyntaxError: Invalid or Unexpected Token
- **Cause**: A syntax error in your JavaScript (e.g., `PromptRefinerLightModal.js`).
- **Solution**: Check for missing brackets, semicolons, or invalid characters. Use proper commenting (`//` or `/* ... */`—see [Legends](Legends.md)).

---

## 2. Module Not Found
- **Cause**: The import path is incorrect or the file doesn’t exist in `FoW_Suite_LIGHT`.
- **Solution**: Verify the directory structure and adjust the path. Use `console.log` to debug—see [Gamers_Corner](Gamers_Corner.md).

---

## 3. 403 Forbidden Error
- **Cause**: The server denies access to a resource in ComfyUI.
- **Solution**: Check file permissions in `custom_nodes/FoW_Suite_LIGHT/`, ensure paths are correct (see [Directory_Paths.md](Directory_Paths.md)), and restart ComfyUI.
  - If installed via ComfyUI Manager, reinstall “Force of Will Suite Light” from “Install Custom Nodes” to refresh paths.

---

## 4. Node Not Working
- **Cause**: `PromptRefinerLight` or supporting nodes might not be registered or have bugs.
- **Solution**: Check the browser console for errors. Ensure nodes are in `NODE_CLASS_MAPPINGS` (see `__init__.py`). Restart ComfyUI if needed.
  - If using ComfyUI Manager, verify “Force of Will Suite Light” is enabled and updated from GitHub (`https://github.com/SirWillance/FoW_Suite_LIGHT`).

---

## 5. UI Freezes or Slows Down in `PromptRefinerLight`
- **Cause**: Performance issues with large prompts or file I/O.
- **Solution**:
  - Use asynchronous programming to keep `PromptRefinerLight` responsive—always `await` async functions in `PromptRefinerLight.py`:
    ```python
    async def load_prompt_async(self, file_path):
        await asyncio.sleep(1)  # Simulate async file load
        return "Loaded prompt"

Avoid asyncio.run() in ComfyUI’s event loop—use await instead.
Handle errors with try-except:

try:
    prompt = await self.load_prompt_async("path/to/prompt.txt")
except Exception as e:
    print(f"Error loading prompt: {e}")

Test small changes and debug with console.log (see Gamers_Corner).
If installed via ComfyUI Manager, ensure dependencies in requirements.txt are installed—reinstall if needed.

## 6. Git Pull/Push Issues
Cause: Conflicts or mismatches with GitHub (https://github.com/SirWillance/FoW_Suite_LIGHT).
Solution: Use git pull origin main before pushing, resolve conflicts (see Directory_Paths.md for Git tips), and push with git push -u origin main. If errors persist, force push cautiously (git push --force -u origin main) if the repository is empty.
Check Gamers_Corner for version control tips and Twitch followers for updates.

## Pro Tip
Always check the browser console for error messages—they’re your clues to solving bugs in FoW_Suite_LIGHT.
Use FAQs and Gamers_Corner for streaming tips to help me level up on Twitch (`https://www.twitch.tv/sirwillance`) and unlock FoW_Suite_Standard (€15) for free via Discord (`https://discord.gg/BHSxf8HB`)!
# Legends: Tips and Tricks for Using Force of Will Suite

Welcome to the **Force of Will Suite** documentation! This guide is designed to help you understand key concepts, avoid common pitfalls, and master `FoW_Suite_LIGHT` and beyond. It’s like having an experienced player guide you through the game. 🚀🎮

## Table of Contents

1. [Directory Paths](#directory-paths)
2. [Coding Tips](#coding-tips)
3. [Widget Types and Display Options](#widget-types-and-display-options)
4. [Examples](#examples)
5. [Troubleshooting](#troubleshooting)

---

## Directory Paths
When working with files and imports, it’s important to understand how directory paths work. Learn more in [Directory_Paths.md](Directory_Paths.md) to prevent getting lost in the depths of the filesystem for `FoW_Suite_LIGHT`.

---

## Coding Tips
Code like a pro in `FoW_Suite_LIGHT` with these tips:
- **Comment Your Code**: Use comments to explain *why* your code does something, not just *what*. For JavaScript (e.g., `PromptRefinerLightModal.js`), use `//` for single-line or `/* ... */` for multi-line:

  // Toggle prompt state in PromptRefinerLightModal.js
textareas.forEach(textarea => (textarea.value = "")); // Clear for newbie usability
For Python (e.g., PromptRefinerLight.py), use # for single-line or """ ... """ for docstrings:


"""
Refines prompts for image generation in ComfyUI.

Args:
    positive_prompt (str): The positive prompt text to refine.
    negative_prompt (str): The negative prompt text to refine.
Returns:
    tuple: Refined positive and negative prompts.
"""
def fuse(self, clip, **kwargs):
    return positive_fused, negative_fused, combined_positive_prompt, combined_negative_prompt

Keep Comments Concise: Don’t overwhelm—focus on why PromptRefinerLight strips weights or why agents/villains use predefined libraries.
Test Small Changes: Verify PromptRefinerLight updates in ComfyUI before upgrading to Standard (€15), Pro (€25), or Ultimate (€100).
Use Git: Track changes in FoW_Suite_LIGHT with Git (see Directory_Paths.md for GitHub paths) and commit often for Twitch followers to access updates.

---

## Widget Types and Display Options

When creating or customizing nodes in Force of Will Suite, define widgets (UI elements) in Python for ComfyUI. These allow users to interact with FoW_Suite_LIGHT nodes. Below is a summary, with examples for PromptRefinerLight.

Widget Types
FLOAT (Slider):
Used for numeric values, ideal for future weights in Pro/Ultimate.
Example (in TextWeight.py):

"weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.05})
STRING (Text Input):
Used for prompts in PromptRefinerLight.
Example:

"positive_prompt": ("STRING", {"default": "an apple, on a tree", "multiline": True})
BOOLEAN (Checkbox):
Used for toggling, e.g., tips in PromptRefinerLight.

"show_tips": ("BOOLEAN", {"default": True})
Display Options
Customize widgets with:

display: Show as “slider,” “number,” or “dropdown.”
label: Add a custom label (e.g., “Prompt Weight” for Pro).
tooltip: Guide newbies (e.g., “Adjust prompt emphasis in Pro with customized tokens”).

---

## Examples
Check out the Examples folder for ready-to-use code snippets. They’re a great way to learn PromptRefinerLight workflows, with hints at Standard/Pro/Ultimate features (e.g., customized tokens in Pro).

---

## Troubleshooting
Encountering issues? Check out the Troubleshooting Guide for common problems and solutions. Don’t rage quit—follow the steps to solve PromptRefinerLight bugs or prepare for Pro/Ultimate customization.

---

## Pro Tip
Use Gamers_Corner for streaming tips to help me level up on Twitch (https://www.twitch.tv/sirwillance) and unlock FoW_Suite_Standard (€15) for free via Discord (https://discord.gg/BHSxf8HB)!
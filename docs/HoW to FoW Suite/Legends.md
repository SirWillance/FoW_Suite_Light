# Legends: Tips and Tricks for Using FoW Suite

Welcome to the **FoW Suite** documentation! This guide is designed to help you understand the key concepts, avoid common pitfalls, and make the most of this node suite. It's like having an experienced player guide you through the game.

## Table of Contents

1. [Directory Paths](#directory-paths)
2. [Commenting in JavaScript vs. Python](#commenting)
3. [Widget Types and Display Options](#widget-types-and-display-options)
4. [Examples](#examples)
5. [Troubleshooting](#troubleshooting)

---

## Directory Paths
When working with files and imports, it’s important to understand how directory paths work. Learn more in [DirectoryPaths.md](DirectoryPaths.md), to prevent being lost in the depths of the filesystem.

---

## Commenting in JavaScript vs. Python
JavaScript and Python use different syntax for comments. Learn more in [Commenting.md](Commenting.md). Take note of the correct language to write your comments, otherwise your code will refuse to work.

---

## Widget Types and Display Options
When creating or customizing nodes in the FoW Suite, you can define various types of widgets (UI elements) in the backend (Python). These widgets allow users to interact with your nodes in the ComfyUI interface. Below is a summary of the available widget types and display options.

### Widget Types
1. **FLOAT (Slider)**:
   - Used for numeric values with a range.
   - Example:
     ```python
     "weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.05})
     ```
   - Options:
     - `default`: Default value.
     - `min`: Minimum value.
     - `max`: Maximum value.
     - `step`: Increment step.

2. **INT (Integer Slider or Input)**:
   - Used for integer values.
   - Example:
     ```python
     "number_of_inputs": ("INT", {"default": 1, "min": 1, "max": 11, "step": 1})
     ```

3. **STRING (Text Input)**:
   - Used for text input.
   - Example:
     ```python
     "prompt": ("STRING", {"default": "A beautiful landscape", "multiline": True})
     ```

4. **COMBO (Dropdown)**:
   - Used for selecting from a list of options.
   - Example:
     ```python
     "style": (["realistic", "cartoon", "abstract"], {"default": "realistic"})
     ```

5. **BOOLEAN (Checkbox)**:
   - Used for toggling a boolean value (True/False).
   - Example:
     ```python
     "enable_feature": ("BOOLEAN", {"default": True})
     ```

6. **IMAGE (Image Input)**:
   - Used for uploading or displaying images.
   - Example:
     ```python
     "image_input": ("IMAGE",)
     ```

7. **LATENT (Latent Space Input)**:
   - Used for latent space representations.
   - Example:
     ```python
     "latent_input": ("LATENT",)
     ```

8. **CONDITIONING (Conditioning Input)**:
   - Used for conditioning inputs (e.g., text prompts or embeddings).
   - Example:
     ```python
     "subject": ("CONDITIONING",)
     ```

9. **CUSTOM (Custom Widgets)**:
   - Used for defining custom widgets.
   - Example:
     ```python
     "custom_widget": ("CUSTOM", {"widget": "my_custom_widget"})
     ```

### Display Options
You can customize how widgets are displayed in the UI using the following options:

1. **`display` Key**:
   - Controls the widget's appearance.
   - Example:
     ```python
     "weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.05, "display": "slider"})
     ```
   - Options:
     - `"slider"`: Displays the widget as a slider.
     - `"number"`: Displays the widget as a numeric input box.
     - `"dropdown"`: Displays the widget as a dropdown.

2. **`label` Key**:
   - Provides a custom label for the widget.
   - Example:
     ```python
     "weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.05, "label": "Subject Weight"})
     ```

3. **`tooltip` Key**:
   - Adds a tooltip to provide additional information.
   - Example:
     ```python
     "weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.05, "tooltip": "Adjust the weight of the subject conditioning."})
     ```

---

## Examples
Check out the [Examples](Examples/) folder for ready-to-use code snippets. They’re a great way to learn and build on existing code. Use this as a base and modify it to your needs.

---

## Troubleshooting
Encountering issues? Check out the [Troubleshooting Guide](Troubleshooting.md) for common problems and solutions. Don't rage quit, follow the steps to solve your bugs.
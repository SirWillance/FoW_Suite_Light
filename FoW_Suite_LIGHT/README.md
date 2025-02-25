# FoW_Suite_LIGHT

Welcome to the **FoW Suite** (Force of Will)—your ultimate gaming-inspired node suite for ComfyUI! Level up your prompt creation with `PromptRefinerLight`, designed for beginners and experienced users alike. I built this suite in just 2 months, starting with zero coding knowledge, and I’m thrilled to share it with you. If you encounter severe bugs, join my stream at [Twitch](https://www.twitch.tv/sirwillance) to let me know! 🚀🎮

---

## Table of Contents
- [What is FoW_Suite_LIGHT?](#what-is-fow_suitelight)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start with `PromptRefinerLight`](#quick-start-with-promptrefinerlight)
- [Nodes in FoW_Suite_LIGHT](#nodes-in-fow_suitelight)

Welcome to the **FoW Suite**, a user-friendly node suite designed for beginners and experienced users alike! Whether you’re just starting out or already a coding wizard, this suite has something for everyone. Developing this suite took me 2 month without any prior knowledge of coding or what ComfyUI is capable of. If u encounter any severe bugs feel free to join in on my stream and tell me
 ---   https://www.twitch.tv/sirwillance   ---

## Table of Contents
- [What is the FoW Suite?](#what-is-the-fow-suite)
- [Key Features](#key-features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Join the Community](#join-the-community)
- [Contribute](#contribute)
- [License](#license)

---

## What is FoW_Suite_LIGHT?
`FoW_Suite_LIGHT` is the beginner-friendly version of the "FoW" (Force Of Will) suite for ComfyUI, featuring `PromptRefinerLight` as the flagship node for simple prompt creation. It helps low-spec users craft raw prompts and collaborate with high-spec users for image generation, with a light, stable design—no tokenization or weighing, perfect for newbies! I developed it as my first coding project in 2 months, learning ComfyUI’s capabilities along the way.

The suite also includes supporting nodes for prompt refinement, weights, and agents/villains, all streamlined for ease of use. Future expansions like `PromptRefinerPro` will add advanced features, but `FoW_Suite_LIGHT` keeps it approachable and fun.

---

## Key Features

- **PromptRefinerLight**:
  - Enter Positive and Negative prompts in a draggable, resizable modal.
  - Save prompts as `.txt` files (e.g., newline-separated Positive/Negative) for cross-platform collaboration.
  - Clear, confirm, and collapse prompts with intuitive buttons (🧼, 💾, ✔).
  - Newbie-friendly UI with tooltips (e.g., “Clear All Prompts”) and optional tips (toggle “Show Tips”).
- **Supporting Nodes**: Streamlined nodes for prompt splitting, fusion, conditioning weights, and agent/villain roles (see [Nodes in FoW_Suite_LIGHT](#nodes-in-fow_suitelight)).
- **QoL Features**: Drag, resize, collapse for ease of use.
- **Beginner-Friendly**: Gaming-inspired tone, clear alerts, and defaults for beginners.
- **TextLoaderCombiner**: Load and combine text files with ease.
- **TokenSelector**: Select and manage tokens for your workflows.
- **UIClone**: Clone UI elements for faster prototyping.

---

## Installation
Ready to join the guild? Here’s how to install `FoW_Suite_LIGHT` in ComfyUI:

1. **Download the Suite**: Clone or download the files from this [GitHub repository](https://github.com/SirWillance/FoW_Suite_LIGHT).
2. **Place the Files**: Copy the `FoW_Suite_LIGHT` folder into the `custom_nodes` directory of your ComfyUI installation (e.g., `ComfyUI/custom_nodes/FoW_Suite_LIGHT`).
3. **Restart ComfyUI**: Refresh your ComfyUI browser interface or restart the server to load the suite.

See [FAQs](docs/FAQs.md) for troubleshooting or [Legends](docs/Legends.md) for widget tips.

---

## Quick Start with `PromptRefinerLight`
1. **Open the Modal**: In ComfyUI, find the “Prompt Refiner Light” node (⌨ FoW - Prompt Refiner Light) and click “Open Prompt Editor” to launch the modal.
2. **Enter Prompts**:
   - Type a Positive prompt (e.g., “an apple, on a tree”) in the Positive textarea.
   - Type a Negative prompt (e.g., “bad quality, watermark”) in the Negative textarea.
3. **Save for Collaboration**:
   - Click 💾 to save prompts to `PromptRefinerLightOutput.txt` (e.g., `an apple, on a tree, Photorealistic, detailed, natural lighting, Medium shot, Masterpiece, high resolution, `).
   - Share the file with high-spec users for image generation.
4. **Confirm and Clear**:
   - Use ✔ to send prompts to ComfyUI, mapping Positive to `Positive Prompt` and Negative to `Negative Prompt`.
   - Click 🧼 to clear individual or all prompts.
5. **Toggle Tips**: Use the “Show Tips” checkbox to enable/disable guidance alerts (on by default for newbies).

Check [How_to_Use_FoW_Suite.md](docs/How_to_Use_FoW_Suite.md) for step-by-step workflows and [Examples](docs/Examples/) for ready-to-use snippets.

---

## Boost My Twitch Channel with `FoW_Suite_Standard`
Want to help me level up my Twitch channel (`https://www.twitch.tv/sirwillance`) and gain Affiliate status faster? The first 50 followers on my Twitch channel will get **free access** to `FoW_Suite_Standard` (€15 value) via my [Discord server](https://discord.gg/BHSxf8HB)! Here’s how:

- Follow my Twitch channel to join the guild and unlock `FoW_Suite_Standard`, including all Light nodes with predefined library access (no customized tokens).
- Stream regularly (500+ minutes, 7+ days, 3+ viewers in 30 days) to help me meet Twitch Affiliate requirements (50 followers minimum, plus streaming/engagement goals).
- Engage on Discord to share workflows, report bugs, and suggest features—I’ll use your feedback to improve `FoW_Suite` and grow my community.

Check [Gamers_Corner](docs/Gamers_Corner.md) for tips on streaming success and [Contribution_Guide](docs/Contribution_Guide.md) to contribute to `FoW_Suite`.

---

## Future Tiers
- **Standard (€15)**: Unlocks all Light nodes and enhances them (e.g., `PromptSplitterLight` -> `PromptSplitter` and gets more outputs, weights, agents, villains) for intermediate users, still newbie-friendly but with more tools. Affordable and attractive for upgrading from Light.
- **Pro (€25)** Includes all Light and Standard nodes, plus `PromptRefinerPro`—advanced prompt refinement with tokenization, weighing (0-2), and file I/O. 
- **Ultimate (€100)**: Includes all Light, Standard, and Pro nodes, plus premium features

---

## Nodes in FoW_Suite_LIGHT
Here’s the full list of nodes in the light suite, all designed for simplicity and newbie-friendliness:

- **PromptSplitterLight** (🔱 FoW - Prompt Splitter Light): Splits prompts into manageable parts.
- **PromptFusionLight** (🧬 FoW - Prompt Fusion Light): Combines prompts for unified output.
- **PromptFusionNegative** (🧬 FoW - Prompt Fusion Negative): Fuses negative prompts for refining.
- **ConditionFunnelLight** (💫 FoW - Condition Funnel Light): Streams conditions for prompt processing.
- **SubjectWeight** (👤 FoW - Subject Weight Light): Adjusts subject emphasis (light version, no sliders).
- **EnvironmentWeight** (🌍 FoW - Environment Weight Light): Adjusts environment emphasis (light version).
- **StyleWeight** (🎨 FoW - Style Weight Light): Adjusts style emphasis (light version).
- **ShotWeight** (📷 FoW - Shot Weight Light): Adjusts shot emphasis (light version).
- **DetailsWeight** (🔍 FoW - Details Weight Light): Adjusts detail emphasis (light version).
- **StaticWeight** (💀 FoW - Static Weight Light): Adjusts static negative emphasis (light version).
- **DefinitionWeight** (👺 FoW - Definition Weight Light): Adjusts definition negative emphasis (light version).
- **ContentWeight** (🙈 FoW - Content Weight Light): Adjusts content negative emphasis (light version).
- **DynamicWeight** (😈 FoW - Dynamic Weight Light): Adjusts dynamic negative emphasis (light version).
- **ConditionWeight** (⚖ FoW - Condition Weight): Adjusts overall condition emphasis (light version).
- **TextWeight** (⚖ FoW - Text Weight Light): Adjusts text emphasis (light version).
- **StyleAgent** (🎨 FoW - Style Agent Light): Enhances style prompts (light version).
- **ShotAgent** (📷 FoW - Shot Agent Light): Enhances shot prompts (light version).
- **DetailAgent** (🔍 FoW - Detail Agent Light): Enhances detail prompts (light version).
- **StaticVillain** (💀 FoW - Static Villain Light): Refines static negatives (light version).
- **DefinitionVillain** (👺 FoW - Definition Villain Light): Refines definition negatives (light version).
- **ContentVillain** (🙈 FoW - Content Villain Light): Refines content negatives (light version).
- **StyleVillain** (😈 FoW - Style Villain Light): Refines style negatives (light version).
- **PromptRefinerLight** (⌨ FoW - Prompt Refiner Light): The flagship node for raw prompt entry, save, and confirmation.

All nodes are streamlined for ease of use, focusing on raw prompts and simple conditioning, with no advanced features like tokenization or drag-and-drop.

1. Download the FoW Suite from the repository.
2. Copy the `FoW-Suite-LIGHT` folder into your ComfyUI `custom_nodes` directory.
3. Restart ComfyUI.
4. The FoW Suite nodes should now be available in your node list.

---

## Quick Start
1. Drag the `TextLoaderCombiner` node into your workspace.
2. Connect it to a text input node.
3. Run the workflow to see the combined text output.


---

## Documentation
Dive deeper into `FoW_Suite_LIGHT` with our epic guides:
- **[Changelog](docs/Changelog.md)**: Track updates (e.g., `[0.14.0] - Light Version Released`).
- **[Legends](docs/Legends.md)**: Master tips, tricks, and widget types for all nodes, focusing on `PromptRefinerLight`.
- **[FAQs](docs/FAQs.md)**: Solve common issues (e.g., 403 errors,).
- **[Troubleshooting](docs/Troubleshooting.md)**: Fix bugs like a pro.
- **[Gamers_Corner](docs/Gamers_Corner.md)**: Level up your coding skills with fun analogies for `PromptRefinerLight`.
- **[Glossary](docs/Glossary.md)**: Understand terms like “node” and “prompt” for `FoW_Suite_LIGHT`.
- **[Contribution_Guide](docs/Contribution_Guide.md)**: Join the guild and contribute to `FoW_Suite_LIGHT`!
- **[Development_Journey](docs/Development_Journey.md)**: Learn my 2-month quest to build `FoW_Suite_LIGHT` from scratch.

For detailed instructions on each node, check out the [FoW Suite Documentation](docs/).


---

## Troubleshooting
- **Issue**: Nodes not appearing in ComfyUI.
  **Solution**: Ensure the `FoW_Suite_LIGHT` folder is in `custom_nodes/` and restart ComfyUI. Check [Troubleshooting](docs/Troubleshooting.md) for more.
- **Issue**: Prompts not saving correctly in `PromptRefinerLight`.
  **Solution**: Verify `.txt` files use newline-separated Positive/Negative prompts. See [FAQs](docs/FAQs.md) for path issues.



---

## Join the Community
Have questions or want to share your workflows? Join our [Discord server](https://discord.gg/BHSxf8HB)!
**Note**: The first 50 followers on my [Twitch channel](https://www.twitch.tv/sirwillance) get access to the “Standard” version (`PromptRefiner`)! Tune in to level up your suite—eligibility is based on following during a live stream, and I’ll DM you the access details.

---

## Contribute
Found a bug or have an idea for `FoW_Suite_LIGHT` or its nodes? Join the guild! Check out the [Contribution Guide](docs/Contribution_Guide.md) for reporting bugs, suggesting features, or submitting code.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Achievement Unlocked: FoW Suite Light Adventurer
You’ve mastered `FoW_Suite_LIGHT`! Keep exploring, contributing, and crafting amazing workflows in ComfyUI with `PromptRefinerLight` and its supporting nodes. 🚀🎮



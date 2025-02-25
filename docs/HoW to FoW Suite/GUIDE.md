# How to Use FoW Suite: A Beginner’s Guide to Building Amazing Workflows

## Introduction
Welcome to the **FoW Suite**! This guide will help you get started with this user-friendly node suite, whether you’re a beginner or an experienced coder.

---

## Getting Started
1. **Download the Suite**: Grab the files from this *fancy place where code lives* (a.k.a. the repository).
2. **Set Up**: Follow the instructions in the [Legends](docs/Legends.md) to install and configure the suite.
3. **Explore**: Dive into the examples and start building your workflows!

---

## Directory Paths and Imports
Learn how to navigate directories and import files correctly. Check out the [DirectoryPaths.md](docs/DirectoryPaths.md) for more details. A wrong directory path is like taking the wrong exit in a dungeon.

---

## Commenting in JavaScript vs. Python
Understand the differences between commenting in JavaScript and Python. See [Commenting.md](docs/Commenting.md) for examples. Learn to leave clear messages in your code, to prevent you getting lost inside it.

---

## Examples and Templates
Explore the [Examples](docs/Examples/) folder for ready-to-use code snippets. Think of it as your starting gear, and improve on it as you go.
### Workflow Examples
You can find workflow examples in the "examples" folder, that are designed for showing the functionalities of each node. These include text to image, image to image, and some experimental ones.

---

## Troubleshooting
Encountering issues? Check out the [Troubleshooting Guide](docs/Troubleshooting.md) for common problems and solutions. It’s like having a walkthrough when you get stuck in a level.

---

## Tips and Tricks
Discover pro tips and hidden features in the [Legends](docs/Legends.md). Learn all the game mechanics to improve your gameplay.

---

## Contributing
Want to contribute? Check out the [Contribution Guide](docs/Contribution.md) for details. Join the guild and make your mark in the world of code.

---

## Glossary
Confused by technical terms? Check out the [Glossary](docs/Glossary.md) for beginner-friendly explanations. Understand the language of the coding world and improve your communication skills.

---

## Asynchronous Programming in FoW Suite

### Why Asynchronous Programming Matters
Asynchronous programming is crucial for ensuring that your nodes remain responsive and don’t freeze the UI. It’s especially important for handling I/O-bound tasks like reading files, making API calls, or interacting with external systems.

### Common Challenges
- **Event Loop Conflicts**: Calling `asyncio.run()` inside an already running event loop will cause a `RuntimeError`.
- **Unawaited Coroutines**: Forgetting to `await` a coroutine can lead to unexpected behavior or warnings like `RuntimeWarning: coroutine was never awaited`.

### Best Practices
1. **Use `await` for Asynchronous Operations**:
   - Always `await` asynchronous functions to ensure they complete before moving on to the next task.
   - Example:
     ```python
     async def load_tokens_async(self):
         await asyncio.sleep(1)  # Simulate async operation
     ```

2. **Avoid `asyncio.run()` in Running Loops**:
   - If you’re already inside an event loop (e.g., in a ComfyUI node), use `await` instead of `asyncio.run()`.
   - Example:
     ```python
     async def execute_async(self):
         await self.load_tokens_async()  # Correct
         # asyncio.run(self.load_tokens_async())  # Incorrect (causes RuntimeError)
     ```

3. **Handle Errors Gracefully**:
   - Use `try-except` blocks to catch and handle exceptions in asynchronous code.
   - Example:
     ```python
     try:
         await self.load_tokens_async()
     except Exception as e:
         print(f"Error loading tokens: {e}")
     ```

For more details, check out the [Asynchronous Programming Guide](docs/AsynchronousProgramming.md).

---

## FAQs
Got questions? Find answers in the [FAQs](docs/FAQs.md).
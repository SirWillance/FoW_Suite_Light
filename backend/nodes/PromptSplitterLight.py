import re
from typing import Tuple
from ...config.category import get_category

NODE_ID_PREFIX = "FoWL" # Add a prefix
TYPE_NAME = "Prompt"
NODE_FUNCTION = "Splitter"
NODE_VERSION = "Light"
NODE_EMOJI = "🔱"

class PromptSplitterLight:
    MAX_OUTPUT_COUNT = 5  

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "default": "Insert your Prompt her. For the most accurate experience remove all weighting. Enjoy. Also, disconnect the node after dividing your prompt 😁"}),  # Default example
                "inputcount": ("INT", {"default": 5, "min": 1, "max": cls.MAX_OUTPUT_COUNT, "hidden": True}),  # Default to 5 outputs
            },
            "optional": {},
        }

    RETURN_TYPES = tuple(["STRING"] * MAX_OUTPUT_COUNT)  # Allow up to MAX_OUTPUT_COUNT outputs
    RETURN_NAMES = tuple([f"Prompt Token {i+1}" for i in range(MAX_OUTPUT_COUNT)])
    FUNCTION = "split_prompt"
    CATEGORY = get_category("2") 
    DESCRIPTION = """Splits a text prompt into individual components based on common delimiters (commas, periods, "and", "with", etc.).

This node allows you to easily separate complex prompts into smaller, manageable parts, for more granular control over different aspects of the image generation process.

Key Features:
- Divides prompts into components based on delimiters, points, and parenthesis, weight etc
- Provides a dynamically adjustable number of output nozzles (up to 5).
- This allows for clean access for the tokens/components, and easy maniplation over the outputs.

PS: Follow me on https://www.twitch.tv/sirwillance/ for more information"""

    def split_prompt(self, prompt: str, inputcount: int) -> Tuple[str, ...]:
        """Splits the input prompt into individual components."""
        if not prompt.strip():
            print("⚠️ Warning: Empty prompt received.")
            return tuple([""] * inputcount)  # Return empty strings if input is empty

        # **Improved Delimiters:** Handles various punctuation and logical separators
        delimiters = r"\s*(?:,|\||\.|\band\b|\bor\b|\bwith\b|\bfeaturing\b)\s*"

        # Split and clean components
        components = [c.strip() for c in re.split(delimiters, prompt) if c.strip()]

        # **Limit output count dynamically**
        num_outputs = min(len(components), inputcount)
        output = components[:num_outputs]

        # **Ensure correct output length (pad with empty strings if needed)**
        output += [""] * (inputcount - len(output))

        print(f"🔹 Splitting prompt: '{prompt}' → {output}")
        return tuple(output)


NODE_CLASS_MAPPINGS = {f"{NODE_ID_PREFIX}{TYPE_NAME}{NODE_FUNCTION}{NODE_VERSION}": PromptSplitterLight}



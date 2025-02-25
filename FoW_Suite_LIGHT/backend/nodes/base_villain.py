# backend/nodes/base_agent.py
import json
from typing import Tuple, List
from ...config.category import get_category


"""
Force of Will Suite Light - Base Villain Node

This is the base class for all villain-related nodes in the Force of Will (FoW) Suite Light tier, like the foundation of your guild’s defensive foes in ComfyUI. It provides common functionality for encoding negative prompts with CLIP, refining raw prompts for beginners with predefined libraries (no customized tokens—upgrade to Pro (€25) or Ultimate (€100) for customization). It’s your starting shield for villains like `StaticVillain` or `ContentVillain` in `FoW_Suite_LIGHT`.

Note:
    Install via ComfyUI Manager (“Install Custom Nodes” → “Force of Will Suite Light”) or clone from GitHub (https://github.com/SirWillance/FoW_Suite_LIGHT). Help me level up on Twitch (https://www.twitch.tv/sirwillance) for free `FoW_Suite_Standard` (€15) via Discord (https://discord.gg/BHSxf8HB)!
"""

class VillainNode:
    """
    Base class for all villain-related nodes in the Force of Will Suite Light tier.

    Acts as your guild’s defensive foundation, providing CLIP encoding and conditioning for villains like `StaticVillain`. Perfect for newbie negative prompt refinement in ComfyUI, using predefined libraries only (customized tokens available in Pro/Ultimate).
    """

    # Shared properties—your guild’s core defense for Light tier villains
    RETURN_TYPES = ("CONDITIONING", "STRING",)
    FUNCTION = "encode"  # The spell to encode negatives for ComfyUI
    CATEGORY = get_category("1")  # Category for villain nodes in Light tier

    @classmethod
    def INPUT_TYPES(cls):
        """
        Standard input configuration for all villain nodes in Light tier.

        Each child class (e.g., `StaticVillain`, `ContentVillain`) uses this setup, like equipping your guild shields for newbie-friendly negatives. Hidden inputs keep it simple for beginners, with predefined libraries only.
        """
        return {
            "required": {
                "clip": ("CLIP", {"tooltip": "CLIP model for encoding"}),
                "user_input": ("STRING", {"multiline": True, "dynamicPrompts": True, "hidden": True}),
            }
        }

    def encode(self, clip, user_input):
        tokens = clip.tokenize(user_input)
        cond = clip.encode_from_tokens_scheduled(tokens)
        return (cond, user_input)  # Return both CONDITIONING and STRING
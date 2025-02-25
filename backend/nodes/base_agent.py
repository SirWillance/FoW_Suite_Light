# backend/nodes/base_agent.py
import json
from typing import Tuple, List
from ...config.category import get_category

"""
Force of Will Suite Light - Base Agent Node

This is the base class for all agent-related nodes in the Force of Will (FoW) Suite Light tier, like the foundation of your guild’s magical allies in ComfyUI. It provides common functionality for encoding prompts with CLIP, enhancing raw prompts for beginners with predefined libraries (no customized tokens—upgrade to Pro (€25) or Ultimate (€100) for customization). It’s your starting spellbook for agents like `StyleAgent` or `ShotAgent` in `FoW_Suite_LIGHT`.

Note:
    Install via ComfyUI Manager (“Install Custom Nodes” → “Force of Will Suite Light”) or clone from GitHub (https://github.com/SirWillance/FoW_Suite_LIGHT). Help me level up on Twitch (https://www.twitch.tv/sirwillance) for free `FoW_Suite_Standard` (€15) via Discord (https://discord.gg/BHSxf8HB)!
"""

class AgentNode:
    """
    Base class for all agent-related nodes in the Force of Will Suite Light tier.

    Acts as your guild’s magical foundation, providing CLIP encoding and conditioning for agents like `StyleAgent`. Perfect for newbie prompt enhancement in ComfyUI, using predefined libraries only (customized tokens available in Pro/Ultimate).
    """

    # Shared properties—your guild’s core magic for Light tier agents
    RETURN_TYPES = ("CONDITIONING", "STRING",)
    FUNCTION = "encode"  # The spell to encode prompts for ComfyUI
    CATEGORY = get_category("1")  # Category for agent nodes in Light tier

    @classmethod
    def INPUT_TYPES(cls):
        """
        Standard input configuration for all agent nodes in Light tier.

        Each child class (e.g., `StyleAgent`, `ShotAgent`) uses this setup, like equipping your guild tools for newbie-friendly prompts. Hidden inputs keep it simple for beginners, with predefined libraries only.
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
# backend/nodes/base_agent.py
import json
from typing import Tuple, List
from ...config.category import get_category


class AgentNode:
    """
    Base class for all agent-related nodes in FoW Suite.
    Provides common functionality for CLIP encoding and conditioning.
    """

    # Shared properties all agent nodes use
    RETURN_TYPES = ("CONDITIONING", "STRING",)
    FUNCTION = "encode"
    CATEGORY = get_category("1")


    @classmethod
    def INPUT_TYPES(cls):
        """
        Standard input configuration for all agent nodes.
        Each child class will use this same configuration.
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
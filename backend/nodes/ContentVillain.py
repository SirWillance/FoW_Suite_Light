# backend/nodes/ContentVillain.py
from .base_villain import VillainNode

NODE_ID_PREFIX = "FoWL" # Add a prefix
TYPE_NAME = "Content"
NODE_FUNCTION = "Villain"
NODE_VERSION = "Light"
NODE_EMOJI = "🙈"

class ContentVillain(VillainNode):
    """Content Villain node for FoW Suite."""
    
    DESCRIPTION = "The Content Villain fights against unwanted visual elements."
    RETURN_NAMES = (f"{TYPE_NAME} Conditioning", f"{TYPE_NAME} Text", )  # No spaces in return names


NODE_CLASS_MAPPINGS = {f"{NODE_ID_PREFIX}{TYPE_NAME}{NODE_FUNCTION}{NODE_VERSION}": ContentVillain}

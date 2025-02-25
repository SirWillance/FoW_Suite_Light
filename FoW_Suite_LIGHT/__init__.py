import os

EXTENSION_ROOT = os.path.dirname(os.path.abspath(__file__))
WEB_DIRECTORY = os.path.join(EXTENSION_ROOT, "frontend")  # Point to js/

from .backend.nodes import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
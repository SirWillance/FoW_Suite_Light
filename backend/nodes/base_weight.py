# backend/nodes/base_weight.py
from ...config.category import get_category

class WeightNode:
    """
    Base class for all weight-related nodes in FoW Suite.
    Provides common functionality for applying weights to conditioning inputs.
    """
    
    # Shared properties all weight nodes use
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "apply_weight"
    CATEGORY = get_category("3")
    DESCRIPTION = 	"""Increase the Influence of your Prompt by adjusting the W8"""


    @classmethod
    def INPUT_TYPES(cls):
        """
        Standard input configuration for all weight nodes.
        Each child class will use this same configuration.
        """
        return {
            "required": {
                "RAW Condition": ("CONDITIONING",),  # Will be renamed by child classes
                "Weight": ("FLOAT", {
                    "default": 1,
                    "min": 0,
                    "max": 2.0,
                    "step": 0.1,
                    "display": "slider"
                }),
            },
        }

    def apply_weight(self, Weight=1.0, **kwargs):
        """
        Core weight application logic shared by all weight nodes.
        Args:
            Weight: The weight value to apply (default: 1.0)
            **kwargs: Dictionary containing the conditioning input with varying names
                     (e.g., 'Style', 'Shot', etc.)
        """
        try:
            # Get the conditioning input (first value from kwargs)
            condition = next(iter(kwargs.values()))
            
            weighted = []
            for tensor, metadata in condition:
                weighted.append((tensor.clone() * Weight, metadata))
            return (weighted,)
        except Exception as e:
            print(f"🔥 Weight Error: {e}")
            # Return the original condition from kwargs if available, otherwise empty list
            return (next(iter(kwargs.values()), []),)
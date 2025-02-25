from .base_weight import WeightNode

NODE_ID_PREFIX = "FoWL" # Add a prefix
TYPE_NAME = "Content"
NODE_FUNCTION = "Weight"
NODE_VERSION = "Light"
NODE_EMOJI = "🙈"

class ContentWeight(WeightNode):
    pass

    RETURN_NAMES = (f"W8ed {TYPE_NAME} Condition", )  # No spaces in return names


NODE_CLASS_MAPPINGS = {f"{NODE_ID_PREFIX}{TYPE_NAME}{NODE_FUNCTION}{NODE_VERSION}": ContentWeight}

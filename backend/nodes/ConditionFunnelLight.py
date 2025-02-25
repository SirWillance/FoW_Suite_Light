from ...config.category import get_category
import re  # Used for regex
# **Important:** Depending on comfyUI, this may need to be adjusted and the text may need to be encoded instead.

NODE_ID_PREFIX = "FoWL" # Add a prefix
TYPE_NAME = "Condition"
NODE_FUNCTION = "Funnel"
NODE_VERSION = "Light"
NODE_EMOJI = "💫"


class ConditionFunnelLight:
    """
    Combines text prompts and encodes them into a single conditioning object.
    """

    MAX_INPUT_COUNT = 5

    @classmethod
    def INPUT_TYPES(cls):
        inputs = {
            "required": {
                "clip": ("CLIP",),  # Add CLIP input
            },
            "optional": {},
        }
        return inputs


    RETURN_TYPES = ("CONDITIONING", "STRING",) #Return both condition and string,
    RETURN_NAMES = ("Combined Conditioning","Combined Prompt",)
    FUNCTION = "fuse"
    CATEGORY = get_category("2")
    DESCRIPTION = """Combines text prompts and encodes them into a single conditioning object. 
    Note: This tier has its restrictions join me on https://www.twitch.tv/sirwillance for more informations"""

    def fuse(self, clip, **kwargs):
        """
        Combines text prompts and encodes them into a single conditioning object.
        """
        #Used for the prompt.
        text_inputs = []
     

        # Iterate over the received inputs in sorted order.
        for i in range(1, self.MAX_INPUT_COUNT + 1):
            k = f"Text {i}"  # Use keys from text.
            v = kwargs.get(k)

            # Only process string input ports.
            if isinstance(v, str):
                # Use regular expression to find and remove empty weights (e.g., "(:1)")
                v = re.sub(r'(\s*,\s*\(:[-+]?[0-9]+(?:\.[0-9]+)?\))+\s*|^\s*\(:[-+]?[0-9]+(?:\.[0-9]+)?\)\s*', '', v)
                #Override the value, check if the current weight is given, else apply the given weight.
                if v.strip():  # Only append if v is not empty after stripping whitespace
                    text_inputs.append(v)

            else:
                if(v != None):
                    print("Incorrect Input Format, skipping this line and going to the next one")
                    continue

        # Merge the inputs. Will always generate an output, even if empty.
        #Create new conditional and return.
        prompt = ", ".join(text_inputs)
        tokens = clip.tokenize(prompt)
        cond = clip.encode_from_tokens_scheduled(tokens)

        return (cond, prompt)

NODE_CLASS_MAPPINGS = {f"{NODE_ID_PREFIX}{TYPE_NAME}{NODE_FUNCTION}{NODE_VERSION}": ConditionFunnelLight,}

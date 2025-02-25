# config/category.py

from .constants import CATEGORY_EMOJI, LIBRARY_EMOJI, PROMPT_REFINEMENT_EMOJI, WEIGHTING_EMOJI, FOW_LIGHT_NAME

MAIN_CATEGORY = f"{CATEGORY_EMOJI} {FOW_LIGHT_NAME}"  # Use the constant
SUBCATEGORIES = {
    "1": f"{LIBRARY_EMOJI} Library",           # For Agents/Villains
    "2": f"{PROMPT_REFINEMENT_EMOJI} Prompt Refinement", # For Funnel/Fusion/Refiner
    "3": f"{WEIGHTING_EMOJI} Weighting",        # For Weights
}

def get_category(subcategory_key: str) -> str:
    if subcategory_key not in SUBCATEGORIES:
        raise KeyError(f"Subcategory key '{subcategory_key}' not found.")
    return f"{MAIN_CATEGORY}/{SUBCATEGORIES[subcategory_key]}"
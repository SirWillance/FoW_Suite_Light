# FoW Suite Changelog

## [Unreleased]

### Added
    - Dynamic output logic to the `TokenSelector` node using ComfyUI methods.
    - Added `get_output_types` method to the `TokenSelector` to set the output types.
    - Added `get_output_names` method to the `TokenSelector` to set the output names.
    - Added a new button "Update Outputs" to update the node with new outputs using the token count.
### Changed
  -Refactored `TokenSelector` to use the new dynamic output logic.
    - Refactored `TokenSelectorUI` to use the new output update logic.
### Removed
- Dropped all logic for dropdowns from `TokenSelectorUI`.
-Removed unecessary code, and code smells.

## [0.13.0] - Dynamic Directory Selection and Token Management

### Added

*   **Directory Selection Button:**
    *   Added a directory selection button to the TokenSelector node, allowing users to choose a directory containing the `tokens.csv` file.
    *   Implemented a file input with the `webkitdirectory` attribute for directory selection.
*   **Dynamic Dropdown Updates:**
    *   Updated `TokenSelectorUI.js` to dynamically populate the dropdown with tokens from the selected directory.
    *   Added a `loadTokensFromDirectory` method to fetch tokens from the backend and update the dropdown.
*   **Backend Support for Directory Selection:**
    *   Added a new `/api/set_csv_directory` endpoint in `api_service.py` to handle directory selection and token reloading.
    *   The backend now updates the `csv_path` and reloads tokens from the specified directory.
*   **Error Handling:**
    *   Added error handling for invalid or missing CSV files in the selected directory.
    *   Improved error messages in both the frontend and backend for better debugging.

### Fixed

*   **CSV File Path Resolution:**
    *   Fixed issues with CSV file path resolution by ensuring the path is absolute and falls back to a default path if the configured path is invalid.
*  **Frontend-Backend Communication:**
    * Resolved issues with frontend requests failing to reach the backend by ensuring proper endpoint URLs and HTTP methods.

### Changed

*  **Frontend Logic:**
    *   Updated `TokenSelectorUI.js` to use asynchronous fetch calls for better performance and error handling.
    *   Improved the UI by adding a loading spinner for visual feedback during token loading.
*   **Backend Structure:**
    *   Refactored `api_service.py` to improve code readability and maintainability.
    *   Moved CSV file handling logic into the `TokenSelector` class for better separation of concerns.

### Removed

*   **Hardcoded CSV Path:**
    *   Removed the hardcoded CSV file path from `api_service.py` and replaced it with a configurable path via `ConfigManager`.

## [0.12.0] - Enhanced API Integration and Frontend-Backend Communication

### Added

*   **API Endpoints:** Added robust error handling for `/api/get_tokens` and `/api/refresh_tokens` endpoints to ensure graceful failure in case of missing or invalid CSV files.
*   **Frontend Enhancements:** Implemented a file picker in `TokenSelectorUI.js` to allow users to upload and switch between different CSV files dynamically.
*   **CORS Support:** Enabled CORS for all origins in the backend (`api_service.py`) using `aiohttp_middlewares` to resolve cross-origin issues between the frontend and backend.
*   **Configuration Management:** Updated `ConfigManager.py` to dynamically load the CSV file path from `fow_suite_config.json`, making the file path configurable and eliminating hardcoding.

### Fixed

*   **CORS Issues:** Resolved CORS-related errors by ensuring proper headers and middleware configuration in the backend.
*   **CSV File Handling:** Fixed issues with CSV file path resolution by ensuring the path is absolute and falls back to a default path if the configured path is invalid.
*   **Frontend-Backend Communication:** Addressed issues with frontend requests failing to reach the backend by ensuring proper endpoint URLs and HTTP methods (POST for `/api/get_tokens` and `/api/refresh_tokens`).

### Changed

*  **Backend Structure:** Refactored `api_service.py` to improve code readability and maintainability. Moved CSV file handling logic into the `TokenSelector` class for better separation of concerns.
*   **Frontend Logic:** Updated `TokenSelectorUI.js` to use asynchronous fetch calls for better performance and error handling.

### Removed

*   **Hardcoded CSV Path:** Removed the hardcoded CSV file path from `api_service.py` and replaced it with a configurable path via `ConfigManager`.

## [0.11.0] - Migration to Aiohttp for API endpoints and proper route registration.

*   **Major Update:** Switched from using the Flask web framework to Aiohttp to integrate with ComfyUI's internal web server.
    *   This change ensures compatibility with ComfyUI's server architecture.
    *   All API route registration is now done through `api/api_service.py` using Aiohttp's route decorators.
    *   Flask dependencies have been removed.
*   **New Structure:** Added `api/api_service.py` to manage the API routes.
*   **API routes:** Added `get_tokens` and `refresh_tokens` endpoints which now use the Aiohttp framework.
*   **Code Comments:** Added code comments to better describe the functionality of each file.
*   **Fixed Indentation Error:** Corrected indentation error in `api/__init__.py`

### Removed

*   Removed `api/api.py` as it is no longer necessary.

### Added

*   Added `api/__init__.py` to be used as the entrypoint for the api and is called in the `__init__.py`

## [0.10.0] - New UI implementation based on ComfyUI built-in features

*   Implemented a new approach based on ComfyUI built-in widget components for creating UI elements.
*   The `ui_core.js` now implements the following methods:
    *   `createButtonWidget` method is used to implement the button component logic.
    *   `createImageWidget` now renders the image preview in a more robust way.
    *   The `dispatchEvent` method is still responsible for sending the data to the backend.
*   Updated the `ui_button.js` and `node_button.py` to use the new logic.
*   Updated the `__init__.py` with the correct mappings.

## [0.9.0] - Implemented core logic for ui elements and modular implementation

*   Implemented the `ui_core.js` file to create reusable functions for custom UI elements.
    *   The `createButtonWidget` method implements the creation of a button, and also includes the logic to correctly handle events.
    *   The `createImageWidget` method to implement logic for image previewing in nodes.
    *   The `dispatchEvent` for sending data to the backend.
*   Updated the `ui_button.js` to use the code defined in the `ui_core.js`.
*   Implemented the node settings dictionary, for individual node settings.
*   Implemented the custom event listener in python to catch frontend events.
*   Implemented the `on_custom_event` method.
*   The UI logic was removed from the python code, and migrated to the javascript side.
*   The core logic is now centralized.

## [0.8.0] - Implementation of Core UI Logic and Abstraction

*   Implemented the `ui_core.js` file to create reusable functions for custom UI elements.
    *   The `createButtonWidget` method implements the creation of a button, and also includes the logic to correctly handle events.
    *   The `createImageWidget` method to implement logic for image previewing in nodes.
    *   The `dispatchEvent` for sending data to the backend.
*   The UI logic was removed from the python code, and migrated to the javascript side.
*   The core logic is now centralized.

## [0.7.0] - Implemented an exact clone of the JDCN_LoadImage node

*   Implemented the `FoW_Clone_JDCN_LoadImage` node in `node_clone.py` using the code from the JDCN suite.
*   Implemented the matching javascript file in `node_clone.js`, and also added a logging function in the `onNodeCreated` method.
*   Included the new mappings into the `__init__.py` file.
*   Created the node `FoW_Clone_JDCN_LoadImage` to help narrow down where the UI rendering issue resides.

## [0.6.0] - Attempted Fix of UI Button Implementation using custom callbacks

*   Implemented a custom `callback` property on the button widget definition, as seen in the JDCN implementation.
*   Implemented an `onclick` method in `ButtonV2.js` using the `onCustomWidgetBeforeDraw` hook and trigger a custom event after.
*   Updated `ButtonV2.py` with the same core logic as before.
*   Re-analyzed my training data, to identify other methods for UI implementation.

## [0.5.0] - Testing UI Implementation with `ButtonV2`

*   Implemented `ButtonV2.js` to test UI element rendering.
    *   Used `onCustomWidgetBeforeDraw` to correctly render the HTML element.
    *   Implemented the `afterQueued` property of the widgets, to correctly trigger UI updates.
*   Implemented `ButtonV2.py` with the core logic of our testing node.
    *   Implemented the `on_custom_event` method, to listen for the javascript event.
*   Added `ButtonNodeV2` to `__init__.py`.
*   Identified limitations of previous methods by attempting to implement UI elements directly through `addWidget` or pushing elements into `widgets` array.
*   Confirmed that the JavaScript and core event logic was working correctly with the help of our test file.
*   Re-evaluated our implementation approach based on Inspire Pack and JDCN code analyses.
*   Focused our approach to widget control through widget properties and the afterQueued method for dynamic UI updates.

## [0.4.0] - UI Button Implementation

*   Implemented a UI button using HTML element in node's widgets array.
*   Added event listener to the button for triggering custom events.
*   Custom Widget Hook Added for event handling.

## [0.3.0] - Dynamic Event Implementation

*   Implemented the node settings dictionary, for individual node settings.
*   Implemented the custom event listener in python to catch frontend events.
*   Implemented the `on_custom_event` method.

## [0.2.0] - Added Directory Type Selection and Input

*   Added `directory_type` input dropdown (`default`, `custom`).
*   Added `custom_directory` input field.
*   Implemented basic directory selection logic.

## [0.1.0] - In Development

*   Initial setup of the `FoW_Suite` project structure.
*   Creation of core logic with `BaseNode`.
*   Initialized `ConfigManager`, logging capabilities.
*   Implemented initial `LICENSE` file.
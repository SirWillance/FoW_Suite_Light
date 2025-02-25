# config/ConfigManager.py
import json
import logging
import os
from typing import Any, Dict, Optional

class ConfigManager:
    def __init__(self, config_path: str):
        """
        Initialize the ConfigManager with the path to the configuration file.

        Args:
            config_path (str): The path to the configuration file.
        """
        # Resolve the config_path relative to the current file's directory
        self.config_path = os.path.join(os.path.dirname(__file__), config_path)
        self.logger = self._setup_logger()  # Initialize logger
        self.config = self._load_config()
        print("ConfigManager initialized. Config path:", self.config_path)

    def _load_config(self) -> Dict[str, Any]:
        """
        Load the configuration from the JSON file.

        Returns:
            Dict[str, Any]: The loaded configuration as a dictionary.
        """
        try:
            with open(self.config_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            self.logger.warning(f"Configuration file '{self.config_path}' not found. Using default settings.")
            return {}
        except json.JSONDecodeError as e:
            self.logger.error(f"Configuration file '{self.config_path}' is not valid JSON: {e}. Using default settings.")
            return {}
        except Exception as e:
            self.logger.error(f"Unexpected error loading configuration: {e}. Using default settings.")
            return {}

    def _setup_logger(self) -> logging.Logger:
        """
        Set up and configure the logger for the ConfigManager.

        Returns:
            logging.Logger: The configured logger instance.
        """
        logger = logging.getLogger('fow_suite')
        logger.setLevel(logging.DEBUG)  # Default log level

        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        ch = logging.StreamHandler()
        ch.setFormatter(formatter)
        logger.addHandler(ch)

        return logger

    def get(self, key: str, default: Optional[Any] = None) -> Any:
        """
        Get a value from the configuration by key.

        Args:
            key (str): The key to look up in the configuration.
            default (Optional[Any]): The default value to return if the key is not found.

        Returns:
            Any: The value associated with the key, or the default value if the key is not found.
        """
        return self.config.get(key, default)

    def save_config(self) -> None:
        """
        Save the current configuration back to the file.
        """
        try:
            with open(self.config_path, 'w') as f:
                json.dump(self.config, f, indent=4)
            self.logger.info(f"Configuration saved to '{self.config_path}'.")
        except Exception as e:
            self.logger.error(f"Failed to save configuration: {e}")

if __name__ == '__main__':
    # Example usage
    config_path = 'config.json'  # Relative to the config directory
    config_manager = ConfigManager(config_path)

    # Example Usage:
    log_level = config_manager.get('log_level')
    node_category = config_manager.get('node_category')
    prompt_fusion_category = config_manager.get_category("1")
    
    print(f"Log Level: {log_level}")
    print(f"Node Category: {node_category}")
    print(f"Prompt Fusion Category: {prompt_fusion_category}")

    # Example of saving the configuration
    config_manager.save_config()
// frontend/js/PromptFusionUI.js
import { app } from "../../../../scripts/app.js";

app.registerExtension({
    name: "FoW_Suite_LIGHT.PromptFusionLight",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "FoWLPromptFusionLight") {
            const MAX_INPUT_COUNT = 5;  // Hard-coded maximum input count
            const NAMED_INPUTS = ["Subject", "Environment", "Style", "Shot", "Details"];  // First 6 inputs

            nodeType.prototype.onNodeCreated = function () {
                // Create options for the combo box (1 to MAX_INPUT_COUNT)
                const inputCountOptions = Array.from({ length: MAX_INPUT_COUNT }, (_, i) => (i + 1).toString());

                // Add the inputcount widget as a combo box (dropdown)
                this.addWidget("combo", "inputcount", "1", (value) => {
                    // Ensure inputcount is within the allowed range
                    const inputcount = parseInt(value, 10);
                    if (inputcount < 1 || inputcount > MAX_INPUT_COUNT) {
                        console.error(`Input count must be between 1 and ${MAX_INPUT_COUNT}`);
                        return;
                    }

                    // Update the inputs dynamically
                    this.updateInputs(inputcount);
                }, {
                    values: inputCountOptions,  // List of options (1 to MAX_INPUT_COUNT)
                    default: "1",  // Default value
                });

                // Initialize with the first input (Subject)
                this.updateInputs(1);
            };

            // Method to dynamically update inputs
            nodeType.prototype.updateInputs = function (inputcount) {
                // Ensure inputcount is within the allowed range
                if (inputcount < 1 || inputcount > MAX_INPUT_COUNT) {
                    console.error(`Input count must be between 1 and ${MAX_INPUT_COUNT}`);
                    return;
                }

                // Current number of inputs
                const currentInputCount = this.inputs.length;

                // Add or remove inputs based on inputcount
                if (inputcount > currentInputCount) {
                    // Add new inputs
                    for (let i = currentInputCount + 1; i <= inputcount; i++) {
                        const inputName = i <= NAMED_INPUTS.length ? NAMED_INPUTS[i - 1] : `Extra ${i - NAMED_INPUTS.length}`;
                        this.addInput(inputName, "CONDITIONING");
                    }
                } else if (inputcount < currentInputCount) {
                    // Remove extra inputs
                    for (let i = currentInputCount; i > inputcount; i--) {
                        this.removeInput(i - 1);
                    }
                }

                // Notify the graph that the node has been modified
                if (app.graph) {
                    app.graph.change();
                } else {
                    console.error("app.graph is not available");
                }
            };
        }
    },
    VERSION: "Light",  // Updated version
});
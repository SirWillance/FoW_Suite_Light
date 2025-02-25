import { app } from "../../../../../scripts/app.js";
import { PromptRefinerLightModal } from "./PromptRefinerLightModal.js";

export const VERSION = "Light";

app.registerExtension({
    name: "FoW_Suite_LIGHT.PromptRefinerLightUI",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "FoWLPromptRefinerLight") {
            console.log("Setting to load for", nodeData.name);

            nodeType.prototype.onNodeCreated = function () {
                console.log(`PromptRefinerLightUI v${VERSION}: Node created.`);

                const modal = new PromptRefinerLightModal(this);
                const openModalButton = this.addWidget(
                    "button",
                    "Open Prompt Editor",
                    "open_editor",
                    () => {
                        try {
                            modal.create(this);
                        } catch (error) {
                            console.error("Error creating modal:", error);
                        }
                    }
                );

                this.openModalButton = openModalButton;

                // Match widget names to backend
                const widgetNames = [
                    "positive_subject", "positive_environment", "positive_style", "positive_shot", "positive_detail",
                    "negative_static", "negative_content", "negative_definition", "negative_dynamic"
                ];

                widgetNames.forEach(widgetName => {
                    const widget = this.widgets.find(w => w.name === widgetName);
                    if (widget) {
                        widget.callback = (value) => {
                            console.log(`${widgetName} updated:`, value);
                            if (this.onUpdate) this.onUpdate();
                        };
                    }
                });

                this.onRemoved = () => {
                    console.log(`PromptRefinerLightUI v${VERSION}: Node removed.`);
                    modal.cleanup(this);
                };
            };
        }
    },
    nodes: [["Prompt Refiner Light", "PromptRefinerLight"]],
});
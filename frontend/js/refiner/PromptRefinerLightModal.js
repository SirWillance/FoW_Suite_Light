export class PromptRefinerLightModal {
    constructor(config) {
        this.type = "promptrefinerlight";
        this.modal = null;
        this.isOpen = false;
        this.modalClassName = "prl-modal";
        this.defaultWidth = 600;
        this.defaultHeight = 300;
        this.minimizedWidth = 390; // Match Pro's minimized width
        this.minHeight = 40; // Minimum height in pixels
        this.maxHeight = 800; // Maximum height to prevent excessive growth
        this.currentWidth = this.defaultWidth;
        this.currentHeight = this.defaultHeight;
        this.originalWidth = this.defaultWidth;
        this.originalHeight = this.defaultHeight;
        this.node = null;
        this.isCollapsed = false;
        this.isCollapsedPositive = true; // Initially collapsed
        this.isCollapsedNegative = true; // Initially collapsed
        this.loadCSS();
    }

    loadCSS() {
        const cssId = "prl-modal-styles";
        if (!document.getElementById(cssId)) {
            const link = document.createElement("link");
            link.id = cssId;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = new URL("./PromptRefinerLightModal.css", import.meta.url).href;
            document.head.appendChild(link);
        }
    }

    getModalTemplate() {
        return `
            <div class="prl-modal-titlebar">
                <h3>⌨ FoW - Prompt Refiner Light</h3>
                <button class="prl-modal-collapse" title="Collapse/Expand Modal"> ${this.isCollapsed ? "+" : "-"}</button>
                <button class="prl-modal-close" title="Close Modal">×</button>
            </div>
            <div class="prl-modal-content-wrapper" style="display: ${this.isCollapsed ? 'none' : 'block'}">
                <div class="prl-operation-window">
                    <label class="prl-alert-toggle-label" title="Toggle Guidance Alerts (On by Default for Newbies)">
                        <input type="checkbox" class="prl-alert-toggle" ${this.showAlerts ? "checked" : ""}> Show Tips
                    </label>
                    <div class="prl-button-group">
                        <button title="Clear All Prompts" class="prl-clear-all">🧼</button>
                        <button title="Save Prompts to .txt File for Collaboration" class="prl-save">💾</button>
                        <button title="Confirm and Send Prompts to ComfyUI" class="prl-confirm">✔</button>
                    </div>
                </div>
                <div class="prl-prompt-category-container" data-prompt-type="positive">
                    <div class="prl-prompt-category-header">
                        <label class="prl-prompt-category-label">Positive Prompt</label>
                    </div>
                    <div class="prl-prompt-category-content${this.isCollapsedPositive ? ' collapsed' : ''}">
                        <div class="prl-input-container">
                            <textarea id="positive" class="prl-input-textarea" placeholder="Enter positive prompt..."></textarea>
                            <button class="prl-clear-input" data-input="positive" title="Clear Positive Prompt">🧼</button>
                        </div>
                    </div>
                </div>
                <div class="prl-prompt-category-container" data-prompt-type="negative">
                    <div class="prl-prompt-category-header">
                        <label class="prl-prompt-category-label">Negative Prompt</label>
                    </div>
                    <div class="prl-prompt-category-content${this.isCollapsedNegative ? ' collapsed' : ''}">
                        <div class="prl-input-container">
                            <textarea id="negative" class="prl-input-textarea" placeholder="Enter negative prompt..."></textarea>
                            <button class="prl-clear-input" data-input="negative" title="Clear Negative Prompt">🧼</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="prl-modal-resize-handle" style="display: ${this.isCollapsed ? 'none' : 'block'}" title="Resize Modal"></div>
        `;
    }

    create(node) {
        if (node.modal && node.modal.isOpen) {
            console.log("Modal is already open.");
            return;
        }

        if (node.modal) {
            node.modal.close(node);
        }

        node.modal = this;
        this.isOpen = true;

        console.log(`Opening ${this.type} modal...`);

        this.node = node;
        this.modal = document.createElement("div");
        this.modal.classList.add(this.modalClassName);
        this.modal.style.width = `${this.currentWidth}px`;
        this.modal.style.height = `${this.currentHeight}px`;
        this.modal.style.top = "100px";
        this.modal.style.left = "100px";
        this.modal.innerHTML = this.getModalTemplate();
        document.body.appendChild(this.modal);

        this.loadModalState(node);
        this.setupEventHandlers(this.modal, node);
        this.adjustModalHeight(); // Set initial height based on content after setup

        return this.modal;
    }

    setupEventHandlers(modal, node) {
        const closeButton = modal.querySelector(".prl-modal-close");
        const collapseButton = modal.querySelector(".prl-modal-collapse");
        const clearAllButton = modal.querySelector(".prl-clear-all");
        const saveButton = modal.querySelector(".prl-save");
        const confirmButton = modal.querySelector(".prl-confirm");
        const clearInputButtons = modal.querySelectorAll(".prl-clear-input");
        const textareas = modal.querySelectorAll(".prl-input-textarea");
        const alertToggle = modal.querySelector(".prl-alert-toggle");
    
        const titleBar = modal.querySelector(".prl-modal-titlebar");
        const contentWrapper = modal.querySelector(".prl-modal-content-wrapper");
        const resizeHandle = modal.querySelector(".prl-modal-resize-handle");
    
        this.setupDragHandlers(modal, titleBar);
        this.setupResizeHandle(resizeHandle);
    
        // Initialize showAlerts from state or default to true for newbies
        this.showAlerts = this.getNodeData(node).showAlerts !== false; // Default to true if undefined
    
        // Update alert toggle checkbox state
        if (alertToggle) {
            alertToggle.checked = this.showAlerts;
        }
    
        closeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.saveModalState(node); // Save state before closing
            this.close(node);
            if (this.showAlerts) {
                alert("Modal closed! Reopen with the 'Open Prompt Editor' button in ComfyUI.");
            }
        });
    
        collapseButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.isCollapsed = !this.isCollapsed;
            collapseButton.textContent = this.isCollapsed ? "+" : "-";
            contentWrapper.style.display = this.isCollapsed ? "none" : "block";
            resizeHandle.style.display = this.isCollapsed ? "none" : "block";
            if (this.isCollapsed) {
                const titleBarWidth = this.minimizedWidth;
                const titleBarHeight = Math.max(this.minHeight, titleBar.offsetHeight); // Ensure minimum height
                this.originalWidth = this.currentWidth; // Save current width before collapse
                this.originalHeight = this.currentHeight; // Save current height before collapse
                this.currentWidth = titleBarWidth;
                this.currentHeight = titleBarHeight;
                this.modal.style.width = `${this.currentWidth}px`;
                this.modal.style.height = `${this.currentHeight}px`;
            } else {
                this.adjustModalHeight(); // Adjust height based on content when expanded
            }
            this.saveModalState(node); // Save state after collapsing/expanding
            if (this.showAlerts) {
                alert("Modal collapsed/expanded! Drag to move, resize to adjust, or close with ×.");
            }
        });
    
        clearAllButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to clear all prompts?")) {
                textareas.forEach(textarea => (textarea.value = ""));
                this.saveModalState(node); // Save state after clearing
                this.adjustModalHeight(); // Adjust height on content change
                if (this.showAlerts) {
                    alert("All prompts cleared! Enter new prompts or load a .txt file with 💾.");
                }
            }
        });
    
        saveButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.saveFile();
            this.saveModalState(node); // Save state after saving file
            this.adjustModalHeight(); // Adjust height on content change
            if (this.showAlerts) {
                alert("Prompts saved to PromptRefinerLightOutput.txt! Share this file for collaboration.");
            }
        });
    
        confirmButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.saveModalState(node); // Save state before confirming
            this.confirmInput(node);
            if (this.showAlerts) {
                alert("Prompts confirmed and sent to ComfyUI! Check your workflow for results.");
            }
        });
    
        clearInputButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                const inputId = button.dataset.input;
                const textarea = modal.querySelector(`#${inputId}`);
                if (textarea) {
                    textarea.value = "";
                    this.saveModalState(node); // Save state after clearing input
                    this.adjustModalHeight(); // Adjust height on content change
                    if (this.showAlerts) {
                        alert(`"${inputId === "positive" ? "Positive" : "Negative"} Prompt" cleared! Enter new text or load a file.`);
                    }
                }
            });
        });
    
        textareas.forEach(textarea => {
            textarea.addEventListener("input", (e) => {
                e.stopPropagation();
                this.saveModalState(node); // Save state on input
                this.adjustModalHeight(); // Adjust height on content change
            });
        });
    
        alertToggle.addEventListener("change", (e) => {
            e.stopPropagation();
            this.showAlerts = alertToggle.checked;
            this.saveModalState(node); // Save alert preference
            if (this.showAlerts) {
                alert("Guidance tips enabled! Uncheck 'Show Tips' to disable for advanced use.");
            } else {
                alert("Guidance tips disabled! Check 'Show Tips' to re-enable for beginners.");
            }
        });
    
        const categoryContainers = modal.querySelectorAll(".prl-prompt-category-container");
        categoryContainers.forEach(container => {
            const header = container.querySelector(".prl-prompt-category-header");
            const promptType = container.dataset.promptType;
            header.addEventListener("click", (event) => {
                if (event.target.closest(".prl-input-textarea, .prl-clear-input")) return;
                event.stopPropagation();
                if (promptType === "positive") {
                    this.isCollapsedPositive = !this.isCollapsedPositive;
                } else {
                    this.isCollapsedNegative = !this.isCollapsedNegative;
                }
                const content = container.querySelector(".prl-prompt-category-content");
                content.classList.toggle("collapsed", promptType === "positive" ? this.isCollapsedPositive : this.isCollapsedNegative);
                this.saveModalState(node); // Save state after collapsing/expanding category
                this.adjustModalHeight(); // Adjust height on content change
                if (this.showAlerts) {
                    alert(`${promptType === "positive" ? "Positive" : "Negative"} Prompt ${this.isCollapsedPositive || this.isCollapsedNegative ? "collapsed" : "expanded"}! Click to toggle.`);
                }
            });
        });
    }

    adjustModalHeight() {
        if (!this.isCollapsed && this.modal) {
            const contentWrapper = this.modal.querySelector(".prl-modal-content-wrapper");
            if (contentWrapper) {
                requestAnimationFrame(() => {
                    const contentHeight = contentWrapper.scrollHeight + 40; // Add padding for spacing
                    const newHeight = Math.max(this.minHeight, Math.min(contentHeight, this.maxHeight)); // Cap at maxHeight, ensure minHeight
                    this.currentHeight = newHeight;
                    this.originalHeight = newHeight; // Update original height for collapse
                    this.modal.style.height = `${newHeight}px`;
                    this.saveModalState(this.node); // Save the new height state
                });
            }
        }
    }

    setupDragHandlers(modal, titleBar) {
        let isDragging = false;
        let offsetX, offsetY;

        const mousemoveHandler = (e) => {
            if (!isDragging) return;
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
        };

        const mouseupHandler = () => {
            isDragging = false;
            document.removeEventListener("mousemove", mousemoveHandler);
            document.removeEventListener("mouseup", mouseupHandler);
        };

        titleBar.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - modal.offsetLeft;
            offsetY = e.clientY - modal.offsetTop;
            document.addEventListener("mousemove", mousemoveHandler);
            document.addEventListener("mouseup", mouseupHandler);
        });
    }

    setupResizeHandle(resizeHandle) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizeHandle.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (this.isCollapsed) return; // Prevent resizing when collapsed
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = this.modal.offsetWidth;
            startHeight = this.modal.offsetHeight;
            document.addEventListener("mousemove", resizeHandler);
            document.addEventListener("mouseup", () => {
                isResizing = false;
                document.removeEventListener("mousemove", resizeHandler);
                this.currentWidth = Math.max(this.modal.offsetWidth, this.defaultWidth); // Ensure minimum width
                this.currentHeight = Math.max(this.modal.offsetHeight, this.minHeight); // Ensure minimum height
                this.originalWidth = this.currentWidth; // Update original dimensions after resize
                this.originalHeight = this.currentHeight;
                this.modal.style.width = `${this.currentWidth}px`;
                this.modal.style.height = `${this.currentHeight}px`;
                if (this.node) {
                    this.saveModalState(this.node);
                }
                this.adjustModalHeight(); // Re-adjust height after resize to ensure content fits
            });
        });

        const resizeHandler = (e) => {
            if (!isResizing) return;
            const newWidth = Math.max(startWidth + (e.clientX - startX), this.defaultWidth); // Ensure minimum width
            const newHeight = Math.max(startHeight + (e.clientY - startY), this.minHeight); // Ensure minimum height
            this.modal.style.width = `${newWidth}px`;
            this.modal.style.height = `${newHeight}px`;
        };
    }

    saveFile() {
        const positive = this.modal.querySelector("#positive").value.trim();
        const negative = this.modal.querySelector("#negative").value.trim();
        const textToSave = `${positive}\n${negative}`.trim();
        this.downloadFile(textToSave, "PromptRefinerLightOutput.txt", "text/plain");
        this.saveModalState(this.node); // Save state after saving file
        this.adjustModalHeight(); // Adjust height on content change
    }

    confirmInput(node) {
        const positive = this.modal.querySelector("#positive").value.trim();
        const negative = this.modal.querySelector("#negative").value.trim();

        // Map positive to positive_subject only, clear others
        const positiveWidgets = [
            "positive_subject", "positive_environment", "positive_style",
            "positive_shot", "positive_detail"
        ];
        positiveWidgets.forEach(name => {
            const widget = node.widgets.find(w => w.name === name);
            if (widget) {
                widget.value = name === "positive_subject" ? positive : "";
                if (widget.callback) widget.callback(widget.value);
            }
        });

        // Map negative to negative_static only, clear others
        const negativeWidgets = [
            "negative_static", "negative_content", "negative_definition",
            "negative_dynamic"
        ];
        negativeWidgets.forEach(name => {
            const widget = node.widgets.find(w => w.name === name);
            if (widget) {
                widget.value = name === "negative_static" ? negative : "";
                if (widget.callback) widget.callback(widget.value);
            }
        });

        this.saveModalState(node); // Save state before closing
        this.close(node);
    }

    downloadFile(text, name, type) {
        const file = new Blob([text], { type });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    saveModalState(node) {
        console.log("Saving modal state...");
        const nodeData = this.getNodeData(node) || {};
        nodeData.currentWidth = this.currentWidth;
        nodeData.currentHeight = this.currentHeight;
        nodeData.originalWidth = this.originalWidth;
        nodeData.originalHeight = this.originalHeight;
        nodeData.isCollapsed = this.isCollapsed;
        nodeData.positive = this.modal.querySelector("#positive").value;
        nodeData.negative = this.modal.querySelector("#negative").value;
        nodeData.isCollapsedPositive = this.isCollapsedPositive;
        nodeData.isCollapsedNegative = this.isCollapsedNegative;
        nodeData.showAlerts = this.showAlerts; // Persist alert preference
        this.setNodeData(node, nodeData);
        console.log("Modal state saved:", nodeData);
    }
    
    loadModalState(node) {
        console.log("Loading modal state...");
        const nodeData = this.getNodeData(node) || {};
        this.currentWidth = Math.max(nodeData.currentWidth || this.defaultWidth, this.defaultWidth); // Ensure minimum width
        this.currentHeight = Math.max(nodeData.currentHeight || this.defaultHeight, this.minHeight); // Ensure minimum height
        this.originalWidth = nodeData.originalWidth || this.defaultWidth; // Load original dimensions
        this.originalHeight = nodeData.originalHeight || this.defaultHeight;
        this.isCollapsed = nodeData.isCollapsed || false;
        this.isCollapsedPositive = nodeData.isCollapsedPositive !== undefined ? nodeData.isCollapsedPositive : true; // Default to collapsed
        this.isCollapsedNegative = nodeData.isCollapsedNegative !== undefined ? nodeData.isCollapsedNegative : true; // Default to collapsed
        this.showAlerts = nodeData.showAlerts !== false; // Default to true for newbies
    
        this.modal.style.width = `${this.currentWidth}px`;
        this.modal.style.height = `${this.currentHeight}px`;
    
        const contentWrapper = this.modal.querySelector(".prl-modal-content-wrapper");
        const resizeHandle = this.modal.querySelector(".prl-modal-resize-handle");
        const collapseButton = this.modal.querySelector(".prl-modal-collapse");
        contentWrapper.style.display = this.isCollapsed ? "none" : "block";
        resizeHandle.style.display = this.isCollapsed ? "none" : "block";
        collapseButton.textContent = this.isCollapsed ? "+" : "-";
    
        if (this.isCollapsed) {
            this.modal.style.width = `${this.minimizedWidth}px`;
            this.modal.style.height = `${this.minHeight}px`; // Use minHeight for collapsed state
        } else {
            this.adjustModalHeight(); // Adjust height based on content when expanded
        }
    
        const positiveTextarea = this.modal.querySelector("#positive");
        const negativeTextarea = this.modal.querySelector("#negative");
        const alertToggle = this.modal.querySelector(".prl-alert-toggle");
        positiveTextarea.value = nodeData.positive || "";
        negativeTextarea.value = nodeData.negative || "";
        if (alertToggle) {
            alertToggle.checked = this.showAlerts;
        }
    
        const positiveContent = this.modal.querySelector('.prl-prompt-category-container[data-prompt-type="positive"] .prl-prompt-category-content');
        const negativeContent = this.modal.querySelector('.prl-prompt-category-container[data-prompt-type="negative"] .prl-prompt-category-content');
        positiveContent.classList.toggle("collapsed", this.isCollapsedPositive);
        negativeContent.classList.toggle("collapsed", this.isCollapsedNegative);
        console.log("Modal state loaded successfully.");
    }

    close(node) {
        this.saveModalState(node); // Ensure state is saved before closing
        this.cleanup();
        if (node && node.modal === this) node.modal = null;
        this.isOpen = false;
    }

    cleanup() {
        if (this.modal) {
            document.body.removeChild(this.modal);
            this.modal = null;
        }
    }

    getNodeData(node) {
        return node.widgets_values || {};
    }

    setNodeData(node, data) {
        node.widgets_values = data;
    }
}
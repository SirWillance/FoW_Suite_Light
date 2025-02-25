let cssLoaded = false; // Global flag for CSS loading

export class BaseModal {
    constructor(config) {
        this.type = config?.type || "Default";
        this.rootKey = config?.rootKey || "styles";
        this.version = config?.version || "Alpha";
        this.modal = null;
        this.isOpen = false;
        this.modalClassName = `fow-${this.type.toLowerCase()}-modal`;
        this.selectedTokens = new Set();
        this.loadCSS();
        this.updateSelectedTokenOutputDebounced = this.debounce(this.updateSelectedTokenOutput.bind(this), 200); // Debounce
        this.isResizing = false; // Flag for resizing
        this.isCollapsed = false; // Flag for collapse state
        this.collapseWidth = config?.collapseWidth || "420px"; // Default collapse width
        this.expandWidth = config?.expandWidth || "420px"; // Default expand width
        this.minHeight = 40; // Minimum height in pixels
        this.maxHeight = 800; // Maximum height to prevent excessive growth
    }

    loadCSS() {
        if (!cssLoaded) {
            const cssId = 'fow-modal-styles';
            if (!document.getElementById(cssId)) {
                const link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = new URL('./styles.css', import.meta.url).href;
                document.head.appendChild(link);
                cssLoaded = true;
            }
        }
    }

    getNodeData(node) {
        return node.widgets_values || {};
    }

    setNodeData(node, data) {
        node.widgets_values = data;
    }

    create(node) {
        console.log(`Opening ${this.type} catalogue modal...`);
        const modalId = `modal-${node.id}`;
        const modalClassName = `${this.modalClassName}-${modalId}`;

        const existingModal = document.querySelector(`.${modalClassName}`);
        if (existingModal) {
            existingModal.style.display = "flex"; // Show the existing modal
            this.modal = existingModal; // Ensure this.modal is set

            // Load selected tokens from node data
            const nodeData = this.getNodeData(node);
            const savedTokens = nodeData.selectedTokens || [];
            this.selectedTokens = new Set(savedTokens);

            // Load collapse state
            this.isCollapsed = nodeData.isCollapsed || false;
            const contentWrapper = this.modal.querySelector(".fow-modal-content-wrapper");
            const resizeHandle = this.modal.querySelector(".fow-modal-resize-handle");
            if (contentWrapper) {
                contentWrapper.style.display = this.isCollapsed ? "none" : "block";
            }
            if (resizeHandle) {
                resizeHandle.style.display = this.isCollapsed ? "none" : "block";
            }

            this.updateSelectedTokenOutput(); // Update the output
            this.adjustModalHeight(); // Set initial height based on content
            return existingModal;
        }

        // Create the modal container
        this.modal = document.createElement("div");
        this.modal.classList.add(modalClassName, "fow-modal");
        this.modal.style.display = "flex";
        this.modal.style.position = "fixed";
        this.modal.style.top = "100px";
        this.modal.style.left = "100px";
        this.modal.style.backgroundColor = "#383838";
        this.modal.style.borderRadius = "12px";
        this.modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
        this.modal.style.zIndex = "1001";
        this.modal.style.flexDirection = "column";
        this.modal.style.minHeight = `${this.minHeight}px`; // Minimum height
        this.modal.style.maxHeight = `${this.maxHeight}px`; // Maximum height
        this.modal.style.overflow = "hidden";

        // Store original dimensions
        this.originalWidth = this.modal.offsetWidth;
        this.originalHeight = this.modal.offsetHeight;

        // Use a DocumentFragment to build the modal content
        const modalFragment = document.createDocumentFragment();

        // Create the title bar
        const titleBar = this.createTitleBar(node.title || "Modal Title", node);
        modalFragment.appendChild(titleBar);

        // Create the content wrapper
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("fow-modal-content-wrapper");
        contentWrapper.style.display = "block"; // Default to visible
        contentWrapper.style.flexDirection = "column"; // Ensure content flows vertically

        // Create the modal content container
        const modalContent = this.createModalContent();
        contentWrapper.appendChild(modalContent);

        // Set the modal content using innerHTML (for the basic structure)
        modalContent.innerHTML = this.getModalTemplate();

        modalFragment.appendChild(contentWrapper);
        this.modal.appendChild(modalFragment);

        // Append the modal to the document body
        document.body.appendChild(this.modal);

        // Force a layout recalculation to ensure sticky positioning works
        requestAnimationFrame(() => {
            this.modal.style.display = "flex";
            this.setupEventHandlers(this.modal, node); // Setup handlers after DOM is ready
            this.adjustModalHeight(); // Ensure initial height is set after DOM attachment
        });

        // Load collapse state after the modal is created and attached to the DOM
        const nodeData = this.getNodeData(node);
        this.isCollapsed = nodeData.isCollapsed || false;
        contentWrapper.style.display = this.isCollapsed ? "none" : "block";
        const resizeHandle = this.modal.querySelector(".fow-modal-resize-handle");
        if (resizeHandle) {
            resizeHandle.style.display = this.isCollapsed ? "none" : "block";
        }

        // Set initial dimensions based on collapse state
        if (this.isCollapsed) {
            this.toggleCollapse(node);
        }

        return this.modal;
    }

    getModalTemplate() {
        return `
            <div class="modal-content">
                <div class="operation-window">
                    <input type="text" class="search-bar" placeholder="Search tokens..." />
                    <div class="button-group">
                        <button class="deselect-all-button">🧼</button>
                        <button class="file-button">📂</button>
                        <button class="confirm-button">✔</button>
                    </div>
                </div>
                <div class="control-window">
                    <p id="selected-token-output" style="white-space: pre-line;"></p>
                </div>
                <input type="file" accept=".json" style="display: none;" />
                <div class="categories-container"></div>
            </div>`;
    }

    createTitleBar(title, node) {
        const titleBar = document.createElement("div");
        titleBar.classList.add("fow-modal__titlebar"); // BEM naming

        const header = document.createElement("h3");
        header.textContent = title;
        header.style.flexGrow = "1";
        header.style.margin = "0";
        titleBar.appendChild(header);

        // Create collapse button
        const collapseButton = document.createElement("button");
        collapseButton.classList.add("fow-modal__collapse"); // BEM naming
        collapseButton.innerHTML = "-"; // Or any other collapse icon
        collapseButton.style.marginRight = "5px"; // Add some spacing
        titleBar.appendChild(collapseButton);

        const closeButton = document.createElement("button");
        closeButton.classList.add("fow-modal__close"); // BEM naming
        closeButton.innerHTML = "×";
        closeButton.addEventListener("click", () => {
            this.saveModalState(node); // Save the state
            this.close(node);
        });
        titleBar.appendChild(closeButton);

        // Event listener for collapse button
        collapseButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent drag from being triggered
            this.toggleCollapse(node);
        });

        return titleBar;
    }

    toggleCollapse(node) {
        const contentWrapper = this.modal.querySelector(".fow-modal-content-wrapper");
        const resizeHandle = this.modal.querySelector(".fow-modal-resize-handle");
        const titleBar = this.modal.querySelector(".fow-modal__titlebar");

        this.isCollapsed = !this.isCollapsed;
        const isCollapsed = this.isCollapsed; // Cache the value

        this.setModalDimensions(isCollapsed, titleBar);

        if (contentWrapper) {
            contentWrapper.style.display = isCollapsed ? "none" : "block";
        }
        if (resizeHandle) {
            resizeHandle.style.display = isCollapsed ? "none" : "block";
        }

        // Save the collapse state
        const nodeData = this.getNodeData(node);
        nodeData.isCollapsed = isCollapsed;
        this.setNodeData(node, nodeData);

        // Update the collapse button text
        const collapseButton = this.modal.querySelector(".fow-modal__collapse");
        collapseButton.innerHTML = isCollapsed ? "+" : "-";

        // Adjust height after toggling collapse
        if (!isCollapsed) {
            this.adjustModalHeight(); // Adjust height based on content when expanded
        }
    }

    setModalDimensions(isCollapsed, titleBar) {
        if (isCollapsed) {
            this.modal.style.width = this.collapseWidth;
            this.modal.style.height = `${Math.max(titleBar.offsetHeight, this.minHeight)}px`; // Ensure minimum height
            this.modal.style.minWidth = "0"; // Override min-width
            this.modal.style.minHeight = "0"; // Override min-height
        } else {
            this.modal.style.width = this.expandWidth;
            this.modal.style.height = `${this.currentHeight}px`; // Use current height, will be adjusted by adjustModalHeight
            this.modal.style.minWidth = ""; // Remove the override
            this.modal.style.minHeight = ""; // Remove the override
        }
    }

    createModalContent() {
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.style.flexGrow = "1";
        modalContent.style.overflow = "visible"; // Remove scrolling, allow content to expand
        return modalContent;
    }

    setupEventHandlers(modal, node) {
        const modalContent = modal.querySelector(".modal-content");
        const fileInput = modal.querySelector('input[type="file"]');
        const tokensContainer = modalContent.querySelector(".categories-container"); // Select the parent

        // Dragging logic (applied to the title bar)
        this.setupDragHandlers(modal, modal.querySelector(".fow-modal__titlebar")); // BEM Naming

        // Button handlers
        this.setupButtons(modal, modalContent, node, fileInput);

        // File handling
        this.setupFileHandlers(fileInput, modalContent);

        // Search handling
        this.setupSearch(modalContent);

        // Token click delegation
        tokensContainer.addEventListener('click', (event) => { // Attach listener to the container
            if (event.target.tagName === 'LI') {
                const tokenItem = event.target;
                const tokensList = tokenItem.closest('.tokens-list');
                const value = tokenItem.textContent;
                this.toggleToken(tokenItem, value, tokensList);
            }
        });

        // Resize handle (if needed)
        if (this.createResizeHandle) {
            const resizeHandle = this.createResizeHandle();
            modal.appendChild(resizeHandle);
        }

        // Adjust height after initial setup
        this.adjustModalHeight(); // Set initial height based on content
    }

    createResizeHandle() {
        const resizeHandle = document.createElement("div");
        resizeHandle.classList.add("fow-modal-resize-handle");

        resizeHandle.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (this.isCollapsed) return; // Prevent resizing when collapsed
            this.isResizing = true;

            const startWidth = this.modal.offsetWidth;
            const startHeight = this.modal.offsetHeight;
            const startX = e.clientX;
            const startY = e.clientY;

            const mousemoveHandler = (e) => {
                if (!this.isResizing) return;

                const newWidth = Math.max(startWidth + (e.clientX - startX), 200); // Minimum width of 200px
                const newHeight = Math.max(startHeight + (e.clientY - startY), this.minHeight); // Ensure minimum height
                this.modal.style.width = `${newWidth}px`;
                this.modal.style.height = `${Math.min(newHeight, this.maxHeight)}px`; // Cap at maxHeight
                this.currentWidth = newWidth;
                this.currentHeight = Math.min(newHeight, this.maxHeight);
                this.originalWidth = this.currentWidth; // Update original dimensions
                this.originalHeight = this.currentHeight;
            };

            const mouseupHandler = () => {
                this.isResizing = false;
                document.removeEventListener("mousemove", mousemoveHandler);
                document.removeEventListener("mouseup", mouseupHandler);
                if (this.node) {
                    this.saveModalState(this.node);
                }
                this.adjustModalHeight(); // Re-adjust height after resize to ensure content fits
            };

            document.addEventListener("mousemove", mousemoveHandler);
            document.addEventListener("mouseup", mouseupHandler);
        });

        return resizeHandle;
    }

    setupDragHandlers(modal, titleBar) {
        let isDragging = false;
        let offsetX, offsetY;

        const mousemoveHandler = (e) => {
            if (!isDragging || this.isResizing) return; // Prevent dragging during resizing
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

    setupButtons(modal, modalContent, node, fileInput) {
        modal.querySelector(".file-button").onclick = () => fileInput.click();

        modal.querySelector(".confirm-button").onclick = () => {
            this.updateNodeInput(node); // Updates node AND saves state
            this.close(node);
            this.adjustModalHeight(); // Adjust height on content change
        };

        modal.querySelector(".deselect-all-button").onclick = () => {
            this.selectedTokens.clear();
            modalContent.querySelectorAll(".tokens-list li").forEach(item => {
                item.classList.remove("token-enabled");
            });
            this.updateSelectedTokenOutputDebounced(); // Use debounced version
            this.adjustModalHeight(); // Adjust height on content change
        };

        modal.querySelector(".fow-modal__close").addEventListener("click", () => { // BEM naming
            this.saveModalState(node); // Save the state
            this.close(node); // Close the modal
        });
    }

    setupFileHandlers(fileInput, modalContent) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                this.loadFile(file, modalContent);
            }
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    setupSearch(modalContent) {
        const searchBar = modalContent.querySelector(".search-bar");
    
        const performSearch = () => {
            const searchTerm = searchBar.value.toLowerCase();
            const styleItems = modalContent.querySelectorAll(".style-item");
            const categoryElements = modalContent.querySelectorAll(".category"); // Get all category elements
    
            styleItems.forEach(styleItem => {
                const label = styleItem.querySelector('label');
                const tokensList = styleItem.querySelector('.tokens-list');
                const tokens = tokensList.querySelectorAll('li');
                const stylesContainer = styleItem.closest('.styles-container');
    
                let hasMatchingTokens = false;
                let matchCount = 0;
    
                tokens.forEach(token => {
                    const tokenText = token.textContent.toLowerCase();
                    const matches = tokenText.includes(searchTerm);
                    token.style.display = matches ? "" : "none";
                    if (matches) {
                        hasMatchingTokens = true;
                        matchCount++;
                    }
                });
    
                if (hasMatchingTokens) {
                    styleItem.style.display = ""; //Show style item
                    tokensList.style.display = "block";
                    //Uncollapse the Styles Container
                    if (stylesContainer) {
                        stylesContainer.style.display = "block";
                    }
                    label.textContent = `${label.getAttribute('data-original-name') || label.textContent} (${matchCount})`;
                } else {
                    styleItem.style.display = "none"; //Hide style item
                    tokensList.style.display = "none";
                }
            });
    
            // Iterate through each category element
            categoryElements.forEach(categoryElement => {
                const hasVisibleStyleItems = Array.from(categoryElement.querySelectorAll(".style-item"))
                    .some(styleItem => styleItem.style.display !== "none"); // at least one style item is visible
    
                // If there are visible style items, display the category, otherwise hide it
                categoryElement.style.display = hasVisibleStyleItems ? "" : "none";
            });
    
            // Reset display if search term is empty
            if (searchTerm === "") {
                styleItems.forEach(styleItem => {
                    styleItem.style.display = ""; // Show the style item
                    const label = styleItem.querySelector('label');
                    const tokensList = styleItem.querySelector('.tokens-list');
                    const stylesContainer = styleItem.closest('.styles-container');
                    const tokens = tokensList.querySelectorAll('li');
    
                    label.textContent = label.getAttribute('data-original-name') || label.textContent; // Restore original label
    
                    tokens.forEach(token => token.style.display = ""); // Show all tokens
                    if (stylesContainer) {
                        stylesContainer.style.display = "none"; // Collapse the styles container
                    }
                    tokensList.style.display = 'none'; // Hide the token List
                });
                 // Make all category elements visible again
                 categoryElements.forEach(categoryElement => {
                    categoryElement.style.display = "";
                });
            }
        };
    
        // Add event listener for the "Enter" key
        searchBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                // Prevent search if the search bar is empty
                if (searchBar.value.trim() === "") {
                    performSearch();
                    return; // and perform the reset
                }
                performSearch();
            }
        });
    }

    loadFile(file, modalContent) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                this.updateModalWithTokens(jsonData, modalContent);
                requestAnimationFrame(() => {
                    this.adjustModalHeight(); // Adjust height on content change after JSON parsing, ensure DOM is ready
                });
            } catch (error) {
                console.error("Error parsing JSON:", error);
                alert("Invalid JSON file. Please ensure the file is properly formatted.");
            }
        };
        reader.readAsText(file);
    }

    updateModalWithTokens(jsonData, modalContent) {
        const categoriesContainer = modalContent.querySelector(".categories-container");
        categoriesContainer.innerHTML = ""; // Clear existing content

        if (jsonData[this.rootKey] && Array.isArray(jsonData[this.rootKey])) {
            // Group styles by category
            const groupedStyles = jsonData[this.rootKey].reduce((acc, style) => {
                const category = style.category || "Uncategorized";
                acc[category] = acc[category] || [];
                acc[category].push(style);
                return acc;
            }, {});

            // Create UI for each category
            for (const categoryName in groupedStyles) {
                const categoryStyles = groupedStyles[categoryName];
                const categoryElement = this.createCategoryElement(categoryName, categoryStyles, jsonData, modalContent); // Pass modalContent
                categoriesContainer.appendChild(categoryElement);
            }
        } else {
            const noStylesMessage = document.createElement("p");
            noStylesMessage.textContent = "Incorrect Catalogue.";
            categoriesContainer.appendChild(noStylesMessage);
        }
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change after rendering, ensure DOM is ready
        });
    }

    createCategoryElement(categoryName, categoryStyles, jsonData, modalContent) {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("category");

        const categoryTitle = document.createElement("h4");
        categoryTitle.textContent = categoryName;
        categoryTitle.style.cursor = "pointer";
        categoryElement.appendChild(categoryTitle);

        const stylesContainer = document.createElement("div");
        stylesContainer.classList.add("styles-container");
        stylesContainer.style.display = "none"; // Initially hide the styles

        categoryStyles.forEach(style => {
            const styleItem = this.createStyleItem(style, jsonData, modalContent); // Pass modalContent
            stylesContainer.appendChild(styleItem);
        });

        categoryElement.appendChild(stylesContainer);

        categoryTitle.addEventListener("click", () => {
            stylesContainer.style.display = stylesContainer.style.display === "none" ? "block" : "none";
            requestAnimationFrame(() => {
                this.adjustModalHeight(); // Adjust height on content change
            });
        });

        return categoryElement;
    }

    createStyleItem(style, jsonData, modalContent) {
        const styleItem = document.createElement("div");
        styleItem.classList.add("style-item");

        const styleName = document.createElement("label");
        styleName.textContent = style.name;
        styleName.setAttribute('data-original-name', style.name); // Store the original name
        styleName.style.fontWeight = "bold";
        styleName.style.cursor = "pointer";
        styleName.title = style.notes || ""; // Add tooltip here

        const tokensList = document.createElement("ul");
        tokensList.classList.add("tokens-list");
        tokensList.style.display = "none";

        if (style.tokens && Array.isArray(style.tokens)) {
            this.createTokenItems(style, tokensList, jsonData, modalContent); // Pass modalContent
        }

        styleItem.appendChild(styleName);
        styleItem.appendChild(tokensList);

        styleName.onclick = () => this.toggleTokensList(tokensList, style, jsonData);

        return styleItem;
    }

    createTokenItems(style, tokensList, jsonData, modalContent) {
        const fragment = document.createDocumentFragment();
        style.tokens.forEach(token => {
            const tokenItem = document.createElement("li");
            tokenItem.textContent = token.value;
            tokenItem.id = `token-${token.value}`;

            if (this.selectedTokens.has(token.value)) {
                tokenItem.classList.add("token-enabled");
            }
            fragment.appendChild(tokenItem);
        });
        tokensList.appendChild(fragment);
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    toggleToken(tokenItem, value, tokensList) {
        if (this.selectedTokens.has(value)) {
            this.selectedTokens.delete(value);
            tokenItem.classList.remove("token-enabled");
        } else {
            this.selectedTokens.add(value);
            tokenItem.classList.add("token-enabled");
        }

        this.updateSelectedTokenOutputDebounced(); // Use debounced version
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    toggleTokensList(tokensList, style, jsonData) {
        const isExpanding = tokensList.style.display === "none"; // Determine if we are expanding or collapsing

        tokensList.style.display = isExpanding ? "block" : "none";

        if (isExpanding) {
            this.updateTokensState(tokensList, style, jsonData, true); // Call updateTokensState when expanding, and pass a flag
        } else {
            this.updateTokensState(tokensList, style, jsonData, false); // and pass the opposite flag for collapsing
        }
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    updateTokensState(tokensList, style, jsonData, isExpanding) {
        tokensList.querySelectorAll("li").forEach(tokenItem => {
            const tokenValue = tokenItem.textContent.trim();
            const jsonStyle = jsonData[this.rootKey].find(s => s.name === style.name);

            if (jsonStyle?.tokens) {
                const originalToken = jsonStyle.tokens.find(t => t.value === tokenValue);
                if (originalToken?.enabled) { // Only process pre-selected tokens
                    if (isExpanding) {
                        if (!this.selectedTokens.has(tokenValue)) {
                            this.selectedTokens.add(tokenValue);
                            tokenItem.classList.add("token-enabled");
                        }
                    } else {
                        if (this.selectedTokens.has(tokenValue)) {
                            this.selectedTokens.delete(tokenValue);
                            tokenItem.classList.remove("token-enabled");
                        }
                    }
                }
            }
        });
        this.updateSelectedTokenOutputDebounced();
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    updateNodeInput(node) {
        const selectedTokens = Array.from(this.selectedTokens);
        const userInputWidget = node.widgets.find(w => w.name === "user_input");
        if (userInputWidget) {
            userInputWidget.value = selectedTokens.join(", ");
        }
        this.saveModalState(node); // Save the state
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    saveModalState(node) {
        const selectedTokens = Array.from(this.selectedTokens);

        // Save the selected tokens and collapse state to the node's data
        const nodeData = this.getNodeData(node);
        nodeData.selectedTokens = selectedTokens;
        nodeData.isCollapsed = this.isCollapsed;
        nodeData.currentWidth = this.modal.offsetWidth;
        nodeData.currentHeight = this.currentHeight;
        this.setNodeData(node, nodeData);
    }

    cleanup(node) {
        const modalId = `modal-${node.id}`;
        const modal = document.querySelector(`.${this.modalClassName}-${modalId}`);
        if (modal) modal.remove();
    }

    close(node) {
        if (this.modal) {
            this.modal.style.display = "none"; // Hide the modal instead of removing it
            this.isOpen = false;
            this.saveModalState(node); // Save state before closing
        }
    }

    updateSelectedTokenOutput() {
        const selectedTokens = Array.from(this.selectedTokens);
        const modalContent = this.modal.querySelector(".modal-content");
        if (modalContent) {
            const outputElement = modalContent.querySelector("#selected-token-output");
            if (outputElement) {
                outputElement.textContent = selectedTokens.join(", ");
            }
        }
        requestAnimationFrame(() => {
            this.adjustModalHeight(); // Adjust height on content change
        });
    }

    adjustModalHeight() {
        if (!this.isCollapsed && this.modal) {
            const contentWrapper = this.modal.querySelector(".fow-modal-content-wrapper");
            if (contentWrapper) {
                // Only adjust if content is visible and not being manipulated by other operations
                requestAnimationFrame(() => {
                    const contentHeight = contentWrapper.scrollHeight + 40; // Add padding for spacing
                    const newHeight = Math.max(this.minHeight, Math.min(contentHeight, this.maxHeight)); // Cap at maxHeight, ensure minHeight
                    this.currentHeight = newHeight;
                    this.modal.style.height = `${newHeight}px`;
                    this.saveModalState(this.node); // Save the new height state
                });
            }
        }
    }

    debounce(func, delay) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
}
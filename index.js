class MFElement extends HTMLElement {
    /**
     * Init function in difference of connectedCallback is invoked after DOMContentLoaded
     */
    init() {}
    connectedCallback() {
        if(typeof document !== undefined && document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {this.init()})
        }
        else {
            this.init();
        }
    }
}

module.exports = {MFElement}
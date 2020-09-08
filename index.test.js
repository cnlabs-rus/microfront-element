/**
 * @jest-environment node
 */
global.HTMLElement = class {};
const {MFElement} = require('./index');

describe('Base tests', function () {
    beforeEach(() => {
        global.document = {};
    });

    afterEach(() => {
        delete global.document;
    });

    test('Document is complete', async () => {
        document.readyState = 'complete';
        let invoked = false;
        const element = new class extends MFElement {
            init() {
                invoked = true;
            }
        }();
        element.connectedCallback();
        expect(invoked).toBeTruthy();
    })
    test('Document is interactive', async () => {
        document.readyState = 'interactive';
        let invoked = false;
        const element = new class extends MFElement {
            init() {
                invoked = true;
            }
        }();
        element.connectedCallback();
        expect(invoked).toBeTruthy();
    })

    test('Document is loading', async () => {
        document.readyState = 'loading';
        document.addEventListener = jest.fn();
        let invoked = false;
        const element = new class extends MFElement {
            init() {
                invoked = true;
            }
        }();
        element.connectedCallback();
        expect(invoked).toBeFalsy();
        expect(document.addEventListener.mock.calls[0][0]).toEqual('DOMContentLoaded');
        document.addEventListener.mock.calls[0][1]();
        expect(invoked).toBeTruthy();
    })
});
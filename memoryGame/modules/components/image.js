const template = `
    <root></root>
    <style>
        root {
            display: block;
            background-color: red;
            height: 100px;
            width: 100px;
        }
    </style>
`;

class GameImage extends HTMLElement {

    constructor() {
        super();
        console.log("constructor GameImage");

        this.root = this.attachShadow({ mode: "open"})
    }

    connectedCallback() {
        this.root.innerHTML = template;
    }

}

customElements.define("game-image", GameImage);
import { getRandomListImages } from "../../config.js";
import { EventBus } from "../utils/EventBus.js";
import { range } from "../utils/utils.js";

const template = `
    <style>
        .grid-container {
            width: 50%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .grid-cell {
            position: relative;
            height: 50px;
            width: 50px;
            margin: 8px;
            background-color: #cdb1c4;
        }
    </style>
`;

class GameGrid extends HTMLElement {

    get repeatImages() {
        return parseInt(this.getAttribute('repeatImages'), 10);
    }

    get numberImages() {
        return parseInt(this.getAttribute('numberImages'), 10);
    }


    constructor () {
        super();

        this.root = this.attachShadow({ mode: "open"});

        // Init properties
        this.listImages = getRandomListImages(this.numberImages);
        this.mapping    = [];

        EventBus.subscribe('onCreateImage', image => {
            this.mapping.push(this.initGridImagePath(image));
        })

        EventBus.subscribe('onTurnImage', () => {
            this.tryGridCombination(this.findGridTurnImages());
        })
    }


    connectedCallback() {
        const dynamicTemplate = `
            <div class='grid-container'>
                ${range(this.repeatImages * this.numberImages).map(n =>
                    `<div class='grid-cell'>
                        <game-image></game-image>
                    </div>`
                ).join("")}
            </div>`;
        this.root.innerHTML = template + dynamicTemplate;
    }


    /**
     * Initialisation des images présentes dans la grille
     *
     * @param  Image image sans path initialisé
     * @return Image image avec path initialisé
     */
    initGridImagePath(image) {

        let repeatFind = 0;

        do {
            image.path = this.listImages[Math.floor(Math.random()*this.listImages.length)];
            repeatFind = 0;
            this.mapping.forEach( element => {
                if(element.path === image.path) {
                    repeatFind++;
                }
            });
        } while ( repeatFind >= this.repeatImages);

        return image;
    }



    findGridTurnImages() {
        return this.mapping.filter(image => image.turned === true && image.found === false);
    }

    findGridFoundImages() {
        return this.mapping.filter(image => image.turned === true && image.found === true);
    }

    turnOffGridImages(turnedImages) {
        turnedImages.map(image => image.turned = false);
    }


    markFoundGridImage(turnedImages) {
        turnedImages.map(image => image.found = true);
    }


    tryGridCombination(turnedImages) {
        let zeroForSimilar = turnedImages.reduce((accumulator, currentValue) => {
            return accumulator += turnedImages[0].path === currentValue.path ? 0 : 1;
        }, 0);

        console.log(turnedImages.length, this.repeatImages, zeroForSimilar);
        if(turnedImages.length === this.repeatImages && zeroForSimilar === 0) {
            console.log("okkkkkkk");
            this.markFoundGridImage(turnedImages);
        }

        if(zeroForSimilar !== 0){
            this.turnOffGridImages(turnedImages)
        }
    }
}

customElements.define("game-grid", GameGrid);
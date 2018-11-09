const listImages = [
    "browser.svg",
    "chrome.svg",
    "firefox.svg",
    "globe.svg",
    "ie.svg",
    "opera.svg",
    "safari.svg",
    "safari2.svg",
    "share.svg",
    "tor.svg"
];


export function getRandomListImages(numberImages) {

    let randomList = [];

    if(numberImages < 2 || numberImages > listImages.length){
        console.error("Parameter 'numberImages' on getRandomListImage is too lower or too high");
    }

    while(randomList.length < numberImages) {
        let chooseImage = listImages[Math.floor(Math.random()*listImages.length)];
        if(randomList.indexOf(chooseImage) === -1){
            randomList.push(chooseImage);
        }
    }

    return randomList;
}
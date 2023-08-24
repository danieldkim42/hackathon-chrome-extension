// creating the baseball img
const body = document.querySelector('body');

// invoke our whole throw baseball and crack screen every x milliseconds
const throwBall = setInterval(() => {
    let clicked = false;
    let node = document.createElement('img');
    node.setAttribute('id', 'baseball');
    node.setAttribute('src', chrome.extension.getURL("src/assets/baseball.png"));
    // keeps the entire img in screen - looks like its moving 
    node.style.position = "fixed";
    // set start of where the ball comes in
    node.style.top = "0";
    node.style.left = "0";
    // prioritizing layer
    node.style.zIndex = "9999";
    // 1px is in string form
    node.style.height = "1px";
    node.style.width = "1px";
    node.onclick = function() {
        node.parentNode.removeChild(node);
        clicked = true;
    };
    body.appendChild(node);

    let crack = document.createElement('img');
    crack.setAttribute('id', 'crack');
    crack.setAttribute('src', chrome.extension.getURL("src/assets/crack.png"));
    crack.onclick = function() {
        crack.parentNode.removeChild(crack);
    };

    // no meaning just variables
    let currentBBWidth = 1;
    let currentBBHeight = 1;
    const scaleFactor = 1.1;
    let deg = 0;

    const increaseSizeAndRotate = () => {
        if(deg>359) deg = 0;
        deg+=30;
        node.style.transform = "rotate("+ deg + "deg)";
        currentBBWidth *= scaleFactor; // (nums) 1.1 => 1.2 => 1.3   // 1 *= 1.1 (num) + 'px'  // = 1.1 * current + 'px' -> "1.1px" first interval (1.1*1.1)
        currentBBHeight *= scaleFactor;
        node.style.width = currentBBWidth + 'px';    // style. is a string // => "1.1px" => "1.2px" 
        node.style.height = currentBBHeight + "px";
    }

    const clickOrCrack = setInterval(() => {
        if(!clicked) {
            increaseSizeAndRotate();
            if (currentBBWidth >= 5000 && currentBBHeight >= 5000){
                clearInterval(clickOrCrack);
                // apply crack on screen
                crack.style.position = "fixed";
                crack.style.top = "0";
                crack.style.left = "0";
                crack.style.zIndex = "10000";
                body.style.height = "100%";
                body.style.width = "100%";
                body.appendChild(crack);
            }
        } else {
            clearInterval(clickOrCrack);
        }
    }, 100);

}, 5000);

// 300,000 ms is 5 min

// window.scrollTo(0, document.body.scrollHeight + 1000);

// after a certain amount of time we want to trigger:
// we want to center the ball in the middle of our current screen
// intervals that gain size and end up the original size of it rn
// and if you can click fast enough, the ball goes away in intervals small in size
// but if u cant click fast enough, trigger an inspirational image/quote that boosts morale

// Apply styles to position the image on top of the page
// image.style.position = "fixed";
// image.style.top = "0";
// image.style.left = "0";
// image.style.zIndex = "9999"; // Adjust the z-index as needed
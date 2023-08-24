// creating the baseball img
const body = document.querySelector('body');
const quotes = ["When you have a dream, you've got to grab it and never let go.",
    "Nothing is impossible. The word itself says 'I'm possible!'",
    "There is nothing impossible to they who will try.",
    "The bad news is time flies. The good news is you're the pilot.",
    "Life has got all those twists and turns. You've got to hold on tight and off you go.",
    "Keep your face always toward the sunshine, and shadows will fall behind you.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "You define your own life. Don't let other people write your script.",
    "You are never too old to set another goal or to dream a new dream.",
    "When you are asked if you can do a job, tell em, Certainly I can! Then get busy and find out how to do it.",
    "Confidence is 10% hard work and 90% delusion.",
    "Hard work never killed anybody, but why take a chance?",
    "Oh, you hate your job? Why didn’t you say so? There’s a support group for that. It’s called everybody, and they meet at the bar.",
];


function endGame() {
    let index = Math.floor(Math.random() * quotes.length);
    let quote = quotes[index];
    confirm(quote + "\n\nWould you like to focus again?");
}
function throwBall() {
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
    const scaleFactor = 1.3;
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
                crack.style.height = "10000";
                crack.style.width = "10000";
                body.appendChild(crack);
                setTimeout(endGame, 100);
            }
        } else {
            clearInterval(clickOrCrack);
        }
    }, 100);
}

// invoke our whole throw baseball and crack screen every x milliseconds
const interval = setInterval(() => {
    throwBall();
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
const canvas = document.getElementById('back-canvas');
const ctx = canvas.getContext('2d');

let backPosX = 0;
let backPosY = 0;
let backSizeP = 100;

/**
 * Sets up main canvas background
 */
export function setBackplate() {
    let inp = document.getElementById('backplate');

    if (inp.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function() {
            let img = new Image();
            img.onload=function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let scaleFact = 1;
                if (img.naturalHeight > canvas.height) {
                    scaleFact = canvas.height / img.naturalHeight;
                }
                ctx.drawImage(
                    img, backPosX, backPosY,
                    img.naturalWidth*scaleFact, img.naturalHeight*scaleFact
                );
                const drawCanvas = document.getElementById('pcanvas');
                drawCanvas.style.background = 'url(\''+canvas.toDataURL()+'\')';
                drawCanvas.style.backgroundRepeat = 'no-repeat';
                drawCanvas.style.backgroundPositionX =
                    backPosX.toString() + 'px';
                drawCanvas.style.backgroundPositionY =
                    backPosY.toString() + 'px';
                adjustBackplateSizeAndPos();
            };
            img.src = reader.result;
            console.log(reader.result);
        };
        reader.readAsDataURL(inp.files[0]);
    }
}

/**
 * Sets up background position and scale
 */
export function adjustBackplateSizeAndPos() {
    const drawCanvas = document.getElementById('pcanvas');
    drawCanvas.style.background = 'url(\''+canvas.toDataURL()+'\')';
    drawCanvas.style.backgroundRepeat = 'no-repeat';
    drawCanvas.style.backgroundPositionX = backPosX.toString() + 'px';
    drawCanvas.style.backgroundPositionY = backPosY.toString() + 'px';
    drawCanvas.style.backgroundSize = parseInt(backSizeP, 10).toString() + '%';
    drawCanvas.style.opacity = '0.75';
}

export function enterAdjustBackplateState() {
    const posXElement = document.getElementById('posX');
    posXElement.onchange = function() {
        backPosX = parseInt(posXElement.value, 10);
        adjustBackplateSizeAndPos();
    };

    const posYElement = document.getElementById('posY');
    posYElement.onchange = function() {
        backPosY = parseInt(posYElement.value, 10);
        adjustBackplateSizeAndPos();
    };

    const scaleElement = document.getElementById('inpScale');
    scaleElement.onchange = function() {
        backSizeP = parseInt(scaleElement.value, 10);
        adjustBackplateSizeAndPos();
    };
}

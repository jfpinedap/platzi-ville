const xGridNum = 11;
const yGridNum = 11;

var canvas = document.getElementById("ville");
var context = canvas.getContext("2d");

var lastCharacterStep = { x: 0, y: 0, length: 7 };

var moveKeys = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
};

var background = {
    url: "images/tile.png",
    loadOK: false,
    num: 1
};

var pig = {
    url: "images/cerdo.png",
    loadOK: false,
    num: getRandomIntInclusive(3, 15),
    x: [],
    y: []
};

var chicken = {
    url: "images/pollo.png",
    loadOK: false,
    num: getRandomIntInclusive(3, 15),
    x: [],
    y: []
};

var cow = {
    url: "images/vaca.png",
    loadOK: false,
    num: getRandomIntInclusive(3, 15),
    x: [],
    y: []
};

characters = randomizeArray([pig, chicken, cow])

background.image = new Image();
background.image.src = background.url;
background.image.onload = function () {
    background.loadOK = true;
    drawVille();
};

characters.forEach((character) => {
    character.image = new Image();
    character.image.src = character.url;
    character.image.onload = function () {
        character.loadOK = true;
        drawVille();
    };
});


function drawVille(redraw = false) {

    if (background.loadOK) {
        context.drawImage(background.image, 0, 0);
    }

    characters.forEach((character) => {
        if (character.loadOK) {
            for (i = 0; i < character.num; i++) {
                drawCharacter(character, i, redraw)
            }
        }
    });
}


function drawCharacter(character, idx, redraw) {
    if (redraw) {
        context.drawImage(character.image, character.x[idx], character.y[idx]);
    }
    else {

        coords = getRandomCoordinates(character.image.width, character.image.height);
        character.x[idx] = coords.x;
        character.y[idx] = coords.y;
        context.drawImage(character.image, coords.x, coords.y);
    }
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        lastCharacterStep.y++;
    } else if (event.key === "ArrowDown") {
        lastCharacterStep.y--;
    }
    if (event.key === "ArrowLeft") {
        lastCharacterStep.x++;
    } else if (event.key === "ArrowRight") {
        lastCharacterStep.x--;
    }
});

document.addEventListener("keydown", moverTecla);
function moverTecla(event) {
    lastCharacter = characters[characters.length - 1]
    switch (event.key) {
        case moveKeys.UP:
            for (i = 0; i < lastCharacter.num; i++) {
                if (i == 0) {
                    // User UP event for the first image of the lastCharacter.
                    lastCharacter.y[i] = lastCharacter.y[i] - lastCharacterStep.length;
                }
                else {
                    // Oscillates the other characters.
                    if (lastCharacterStep.y % 2 == 0) {
                        lastCharacter.x[i] = lastCharacter.x[i] + lastCharacterStep.length;
                    }
                    else {
                        lastCharacter.x[i] = lastCharacter.x[i] - lastCharacterStep.length;
                    }
                }
            }
            drawVille(redraw = true);
            break;
        case moveKeys.DOWN:
            for (i = 0; i < lastCharacter.num; i++) {
                if (i == 0) {
                    lastCharacter.y[i] = lastCharacter.y[i] + lastCharacterStep.length;
                }
                else {
                    if (lastCharacterStep.y % 2 == 0) {
                        lastCharacter.x[i] = lastCharacter.x[i] - lastCharacterStep.length;
                    }
                    else {
                        lastCharacter.x[i] = lastCharacter.x[i] + lastCharacterStep.length;
                    }
                }
            }
            drawVille(redraw = true);
            break;
        case moveKeys.LEFT:
            for (i = 0; i < lastCharacter.num; i++) {
                if (i == 0) {
                    lastCharacter.x[i] = lastCharacter.x[i] - lastCharacterStep.length;
                }
                else {
                    if (lastCharacterStep.x % 2 == 0) {
                        lastCharacter.y[i] = lastCharacter.y[i] + lastCharacterStep.length;
                    }
                    else {
                        lastCharacter.y[i] = lastCharacter.y[i] - lastCharacterStep.length;
                    }
                }
            }
            drawVille(redraw = true);
            break;
        case moveKeys.RIGHT:
            for (i = 0; i < lastCharacter.num; i++) {
                if (i == 0) {
                    lastCharacter.x[i] = lastCharacter.x[i] + lastCharacterStep.length;
                }
                else {
                    if (lastCharacterStep.x % 2 == 0) {
                        lastCharacter.y[i] = lastCharacter.y[i] - lastCharacterStep.length;
                    }
                    else {
                        lastCharacter.y[i] = lastCharacter.y[i] + lastCharacterStep.length;
                    }
                }
            }
            drawVille(redraw = true);
            break;
        default:
            break;
    }
}


function getRandomCoordinates(width, height, grid = { x: xGridNum, y: yGridNum }) {
    var random_coords = {};
    width = canvas.width - width;
    height = canvas.height - height;
    random_coords.x = getRandomIntInclusive(0, grid.x);
    random_coords.y = getRandomIntInclusive(0, grid.y);
    random_coords.x = random_coords.x * width / grid.x;
    random_coords.y = random_coords.y * height / grid.y;
    return random_coords;
};


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};


function randomizeArray(array) {
    return array.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

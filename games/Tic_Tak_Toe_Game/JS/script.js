let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset_btn")
let newBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st column
    [1, 4, 7], // 2nd column
    [2, 5, 8], // 3rd column
    [0, 4, 8], // 1st diagonal
    [2, 4, 6] // 2nd diagonal
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML === "") {
            if (turnO) {
                box.classList.add("playerO"); 
                box.innerHTML = "O";
                turnO = false;
            } else {
                box.classList.add("playerX"); 
                box.innerHTML = "X";
                turnO = true;
            }
            count++;
            if (checkWin()) {
            } else if (count === 9) {
                msg.classList.add('draw');
                msg.innerHTML = " Sorry! Game Is Draw";
                msgContainer.classList.remove("hide");
            }
        }
    });
});


resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerHTML = ""
        box.classList.remove("playerO", "playerX"); 
    });
    enableBoxes();
    msgContainer.classList.add("hide")
    msg.classList.remove('winner', 'draw');
    count = 0;
});


newBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerHTML = ""
        box.classList.remove("playerO", "playerX");
        box.disabled = false;
    });
    msgContainer.classList.add("hide")
    msg.classList.remove('winner', 'draw');
    turnO = true;
    count = 0;
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    })
};


const checkWin = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWin(pos1Val);
                return true;
            }
        }
    }
    // Check for a draw if no win is detected
    if (count === 9) {
        msg.classList.add('draw');
        msg.innerHTML = "Sorry! Game Is Draw";
        msgContainer.classList.remove("hide");
        disableBoxes(); // Disable boxes when the game is a draw
        return true;
    }
    return false;
};



const showWin = (winner) => {
    msg.innerHTML = `Congratulations! Winner is ${winner}`;
    msg.classList.add('winner');
    msgContainer.classList.remove('hide');
    disableBoxes();
}


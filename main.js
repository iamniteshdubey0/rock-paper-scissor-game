document.addEventListener("DOMContentLoaded", () => {
    const btnPlay = document.querySelector("#play-now");
    const leftSide = document.querySelector(".wrapper .left-side");
    const middleTop = document.querySelector(".middle .top");
    const mainGameBox = document.querySelector(".main-game-box");
    const rockBtn = document.querySelector(".rock");
    const paperBtn = document.querySelector(".paper");
    const scissorBtn = document.querySelector(".scissor");
    const userBox = document.querySelector(".user-box");
    const computerBox = document.querySelector(".computer-box");
    const userScoreBox = document.querySelector("#user-score");
    const computerScoreBox = document.querySelector("#computer-score");
    const userStar = document.querySelector("#u-star");
    const computerStar = document.querySelector("#c-star");
    const winnerModal = document.querySelector(".winner-modal");
    const modalMsg = document.querySelector(".score-title");
    const playAgainBtn = document.querySelector("#play-again");

    let userscore = 0;
    let computerScore = 0;

    const choices = ["rock", "paper", "scissor"];

    btnPlay.addEventListener("click", () => {
        leftSide.classList.add("fade-left");
        middleTop.classList.add("fade-up");
        btnPlay.classList.add("fade-down");
        mainGameBox.classList.replace("hidden", "pop");
    });

    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function updateScores() {
        userScoreBox.textContent = userscore;
        computerScoreBox.textContent = computerScore;

        // Check if either user or computer has won 5 matches
        if (userscore === 5 || computerScore === 5) {
            // Determine the winner and update the modal message
            let winner = userscore === 5 ? "You" : "Computer";
            modalMsg.textContent = `${winner} won the game!`;

            // Display the winner modal
            winnerModal.style.visibility = "visible";
        }
    }


    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return "It's a tie!";
        if (
            (playerChoice === "rock" && computerChoice === "scissor") ||
            (playerChoice === "scissor" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) {
            userscore++;
            userStar.innerHTML += `<i class="fa fa-star"></i>`;
            return "You win!";
        } else {
            computerScore++;
            computerStar.innerHTML += `<i class="fa fa-star"></i>`;
            return "Computer wins!";
        }
    }

    function game(playerChoice) {
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);

        userBox.innerHTML = `<img src="./images/${playerChoice}.png" alt="${playerChoice}">`;
        userBox.classList.add("element-fade-in-left");

        computerBox.innerHTML = `<img src="./images/${computerChoice}.png" alt="${computerChoice}">`;
        computerBox.classList.add("element-fade-in-right");

        updateScores();

        setTimeout(() => {
            userBox.classList.remove("element-fade-in-left");
            computerBox.classList.remove("element-fade-in-right");
        }, 800);
    }

    [rockBtn, paperBtn, scissorBtn].forEach((button) => {
        button.addEventListener("click", () => game(button.id));
    });

    updateScores();

    playAgainBtn.addEventListener("click", resetGame);

    function resetGame() {
        // Reset scores
        userscore = 0;
        computerScore = 0;
        // Clear stars
        userStar.innerHTML = '';
        computerStar.innerHTML = '';
        userBox.innerHTML = '';
        computerBox.innerHTML = '';
        // Update the score display
        updateScores();
        // Hide the winner modal
        winnerModal.style.visibility = "hidden";
    }


});

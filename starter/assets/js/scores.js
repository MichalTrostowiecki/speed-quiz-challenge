const highScoresContainer = document.getElementById("highscores");
const resetBtn = document.getElementById("clear");

let players = [];
players = JSON.parse(localStorage.getItem("players"));

if (players !== null) {
    for (let i = 0; i < players.length; i++) {
        let playerInitials = players[i].initials;
        let playerScores = players[i].scores;
    
        let displayPlayer = document.createElement("li");
        displayPlayer.textContent = playerInitials + " - " + playerScores;
        highScoresContainer.appendChild(displayPlayer);
    }
    
    resetBtn.addEventListener("click", function() {
        while (highScoresContainer.firstChild) {
            highScoresContainer.removeChild(highScoresContainer.firstChild);
        }
        localStorage.removeItem("players");
    });
}





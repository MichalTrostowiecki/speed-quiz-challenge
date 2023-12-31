// Grabbing Dom elements to be manipulated.
const highScoresContainer = document.getElementById("highscores");
const resetBtn = document.getElementById("clear");

// Getting data from local storage.
let players = [];
players = JSON.parse(localStorage.getItem("players"));

// Sort the players array by score in descending order
if (players !== null) {

    // Sorts players arrays in descending order
    players.sort(function (a, b) {
        return b.scores - a.scores
    });
    
    for (let i = 0; i < players.length; i++) {
        let playerInitials = players[i].initials;
        let playerScores = players[i].scores;
    
        let displayPlayer = document.createElement("li");
        displayPlayer.textContent = playerInitials + " - " + playerScores;
        highScoresContainer.appendChild(displayPlayer);
    }
    
    // Clear the scores from DOM and removes players from the local storage.
    resetBtn.addEventListener("click", function() {
        while (highScoresContainer.firstChild) {
            highScoresContainer.removeChild(highScoresContainer.firstChild);
        }
        localStorage.removeItem("players");
    });
}

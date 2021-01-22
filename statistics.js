class Statistics {
    constructor(){
        this.gameResults = [];
    }
    
    addGameResult(win, bid){
        let result = {
            win, // nie trzeba pisac tak: win: win, jezeli nazwa parametru f-cji jest taka sama jak wlasciwosci w obiekcie
            bid //bid: bid
        };
        this.gameResults.push(result)
    }

    showGameStats(){
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(result => result.win).length;
        let losses = this.gameResults.filter(result => !result.win).length; //result.win === false;
        
        return [games, wins, losses]
    }
}


//const stats = new Statistics();
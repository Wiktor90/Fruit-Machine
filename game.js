// link do gry: https://websamuraj.pl/examples/js/gra/ 

class Game{
    constructor(start){
        this.stats = new Statistics();
        this.wallet = new Wallet(start);

        this.boards = document.querySelectorAll('div.color');
        this.inputBid = document.getElementById('bid');
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        //trzeba zwiazac bo metoda wyolana na przyciusku traci wiazanie z obiektem Game (bo wywoluje sie na buttonie i on staje sie thisem)

        this.spanWallet = document.querySelector('.panel span.wallet')
        this.spanResult = document.querySelector('.score span.result')
        this.spanGames = document.querySelector('.score span.number')
        this.spanWins = document.querySelector('.score span.win')
        this.spanLosses = document.querySelector('.score span.loss')

        this.render();
    }

    render(
        colors = ['gray','gray','gray'],
        money = this.wallet.getWalletValue(),
        result = '',
        stats = [0,0,0],
        wonMoney = 0,
        bid = 0,
        ){
            this.boards.forEach((board, index) => {
                board.style.backgroundColor = colors[index];
            })
            this.spanWallet.textContent = money
            if(result){
                result = `You won ${wonMoney}$`
            } else if(!result && result !==''){
                result =`You lost ${bid}$`
            }
            this.spanResult.textContent = result;
            this.spanGames.textContent = stats[0];
            this.spanWins.textContent = stats[1];
            this.spanLosses.textContent = stats[2];

            this.inputBid.value = "";
    }

    startGame(){
        if(this.inputBid.value < 1) return alert('Incorect amount')
        //console.log(this) // apropo komentarza w konstruktorze Game
        const bid = Math.floor(this.inputBid.value) // Math konwertuje string do number

        if(!this.wallet.checkCanPlay(bid)){
            return alert(`Incorrect value or you don't have enough money`)
        }

        this.wallet.changeWallet(bid, '-');

        this.draw = new Draw(); //  w metodzien Game tworzy nowa instancje innej klasy (Draw) -JAKO WLASCIWOSC OBIEKTU GAME
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        // console.log(win)
        // console.log(colors)
        const wonMoney = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonMoney)
        this.stats.addGameResult(win, bid)

        this.render(
            colors,
            this.wallet.getWalletValue(),
            win,
            this.stats.showGameStats(),
            wonMoney,
            bid,
            )

    }
}
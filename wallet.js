class Wallet {
    constructor(money){
        let _money = money;

        //pobieranie aktualnej zawartosci portfela
        this.getWalletValue = ()=> _money;

        //Sprawdz czy user ma srodki
        this.checkCanPlay = value => {
            if(_money >= value) return true;
            return false;
        }

        this.changeWallet = (value, type='+') => {
            if(typeof value === 'number' && !isNaN(value)){
                if(type ==='+'){
                    return _money += value;
                }
                else if(type ==='-'){
                    return _money -= value;
                }
                else{
                    throw new Error('Bad type of action')
                }
            }
            else{
                console.log(typeof value);
                throw new Error('incorrect number')
            }
        }
    }
}

// const wallet = new Wallet(100)
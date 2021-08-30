//Elements du DOM

const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('button');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

//Modeles de coeur
const coeurPlein = '<ion-icon name="heart"></ion-icon>';
const coeurVide = '<ion-icon name="heart-empty"></ion-icon>';

//Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107a 29%, #FF1361 67%, #fff800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

//PLAY :
const play = () => {

    //nombre aleatoire
    const randomNumber = Math.floor(Math.random() * 101); //3
    const totalVies = 6;
    //let vies = totalVies;
    let vies = 4;
    console.log(randomNumber);

    //Actualisation a chaque essai - Toute la logique
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value);//convertir une chaine de caractere en entier

        if(valeurInput < 0 || valeurInput > 100) return;//on sort de la condition
        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre etait bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
        };

        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brulant !!!" ;
            }else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud !" ;
            }else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiede !" ;
            }else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid !" ;
            }
            vies--;
            verifyloose();
        }
        actualiseCoeurs(vies)

    });

    const verifyloose = () => {
        if(vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute('disabled', "");
            message.textContent = `Vous avez perdu. La reponse etait ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => { //4
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for (let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
            
        }
        for (let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }  
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur; 
        });  
    }
    

    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    })
}

play();

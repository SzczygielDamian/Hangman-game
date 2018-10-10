const game = {
    elemLetters : document.querySelector('.alphabet'), //lista z literami
    elemPassword : document.querySelector('#game-board'),   //element z hasłem
    currentPassword : null,
    currentPasswordLetters : null,
    mishit : 0,

    password : ["Warszawa", "Poznań",
                 "Wrocław", "Gdańsk",
                 "Javascript", "PHP",
                 "Legia Warszawa", "Lech Poznań"
    ],


   letterButtons : function () {
       const alphabet = ['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł',
           'm','n','ń','o','ó','p','q','r','s','ś','t','u','v','w','x','y','z','ź','ż'];

       alphabet.forEach(function(letter) {
           const button = document.createElement('button');
           button.classList.add('letter');
           button.getElementsByTagName('');
           button.setAttribute("id", letter.toUpperCase());
           button.type = 'button';
           button.dataset.letter = letter;
           button.innerHTML = letter;
           this.elemLetters.appendChild(button);
       }.bind(this));
   },

    isLetterExists : function () {
        return this.currentPasswordLetters.length;
    },

    enableLetters : function() {
        const letters  = this.elemLetters.querySelectorAll('.letter');
        [].forEach.call(letters, function(letter) {
            letter.disabled = false;
        });
    },

    disableLetters : function() {
        const letters = this.elemLetters.querySelectorAll('.letter');
        [].forEach.call(letters, function(letter) {
            letter.disabled = true;
        });
    },

    gameComplete : function() {
        alert("Koniec gry udało Ci się odgadnąć hasło :)");
        this.disableLetters();
    },

    gameOver : function() {
        alert("GAME OVER");
        this.disableLetters();
    },

    checkLettersInPassword : function(letter) {
        console.log(letter);
        if (this.currentPassword.indexOf(letter) !== -1) {
            for (let i=0; i<this.currentPassword.length; i++) {
                if (this.currentPassword[i] === letter) {
                    this.elemPassword.querySelectorAll('.game-password')[i].innerHTML = letter;
                    const buttonLetter = document.getElementById(letter);
                    buttonLetter.classList.toggle('hit-letter');
                }
            }
            // usuwamy trafioną litere
            this.currentPasswordLetters = this.currentPasswordLetters.replace( new RegExp(letter, 'g'), '');

            if (!this.isLetterExists()) {
                this.gameComplete();
            }
            } else {
                this.mishit++;
                console.log(this.mishit);
                let picture = "img/s"+ this.mishit + ".jpg";
                document.getElementById('gallows').innerHTML = '<img src="'+picture+'" alt="">';
                const buttonLetter = document.getElementById(letter);
                buttonLetter.classList.toggle('mis-letter');
                if (this.mishit >= 9) {
                    this.gameOver();
                }
            }
    },

    randomPassword : function() {
        const max = this.password.length-1;
        const min = 0;
        const rand = Math.floor(Math.random()*(max-min+1)+min);

        this.currentPassword = this.password[rand].toUpperCase();
        this.currentPasswordLetters = this.currentPassword.replace(/ /g, '');

        this.elemPassword.innerHTML = '';

        const letters = this.currentPassword.split('');

        for (let i=0; i<letters.length; i++) {
            const div = document.createElement('div');
            div.classList.add('game-password');
            if (letters[i] === ' ') {
                div.classList.add('game-password-space');
            }
            this.elemPassword.appendChild(div);
        }
    },

    bindEvents : function() {
        this.elemLetters.addEventListener('click', function(e) {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains('letter')) {
                const letter = e.target.dataset.letter;
                this.checkLettersInPassword(letter.toUpperCase());
                e.target.disabled = true;
            }
        }.bind(this));
    },

    reset : function() {
        this.mishit = 0;
        document.getElementById('gallows').innerHTML = '<img src="img/s0.jpg" alt="">';
        const button = document.getElementsByClassName('letter');
        [].forEach.call(button, function(letter) {
            letter.classList.remove('mis-letter');
            letter.classList.remove('hit-letter');
        });

    },

    initBoard : function() {
        this.letterButtons();
        this.bindEvents();
        this.disableLetters();
    },

    startGame : function() {
        this.randomPassword();
        this.enableLetters();
        this.reset();
    },
};

document.querySelector('.game-start').addEventListener('click', function() {
    game.startGame();
});

game.initBoard();


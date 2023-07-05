document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.querySelector('.container');
    const userResult = document.querySelector('.user_input img');
    const cpuResult = document.querySelector('.cpu_result img');
    const result = document.querySelector('.result');
    const option = document.querySelectorAll('.optional_image');

    option.forEach((image, index) => {
        image.addEventListener("click", (e) => {
            image.classList.add("active");

            option.forEach((image2, index2) => {
                if (index !== index2) {
                    image2.classList.remove("active");
                }
            });

            gameContainer.classList.add("start");

            setTimeout(() => {
                gameContainer.classList.remove("start");

                let imageSrc = image.querySelector("img").src;
                userResult.src = imageSrc;

                let randomNumber = Math.floor(Math.random() * 3);
                let cpuImages = ["../img/rock.png", "../img/Paper.png", "../img/scissor.png"];
                cpuResult.src = cpuImages[randomNumber];

                let cpuValue = ['R', 'P', 'S'][randomNumber];
                let userValue = ['R', 'P', 'S'][index];

                let outcome = {
                    RR: 'Draw',
                    RP: 'CPU',
                    RS: 'User',
                    PP: 'Draw',
                    PS: 'CPU',
                    PR: 'User',
                    SS: 'Draw',
                    SR: 'CPU',
                    SP: 'User'
                };

                let outcomeValue = outcome[userValue + cpuValue];

                result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!!`;

                console.log(cpuValue);
            }, 2500);
        });
    });
});
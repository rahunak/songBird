function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function randomColor() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Fireball {
    constructor(pos) {
        this.container = document.querySelector('#salutBlock');// Привязка к блоку взрыва
        this.x = pos.x;
        this.y = pos.y;
        // Координаты точки,которая взрывается.
    }

    startBoom() {
        // запуск ракеты вверх
        this.ball = document.createElement('div');
        this.ball.className = 'fireBall';
        this.ball.style.background = randomColor();
        this.container.append(this.ball);
        this.ball.style.left = `${this.x}px`;

        this.ball.timeFunc = setInterval(() => {
            let fly = true;

            const currPositionBall = parseInt(getComputedStyle(this.ball).top, 10);
            const speed = (this.y - currPositionBall) / 10;

            if (currPositionBall !== this.y) {
                // долетел ли шар до точки взрыва
                fly = false;
            }

            this.ball.style.top = `${currPositionBall + speed}px`;
            if (fly) {
                // шарик долетел до точки взрыва
                clearInterval(this.ball.timeFunc);
                this.ball.remove();
                this.startExplouse();
            }
        }, 30);
    }

    startExplouse() {
        // Старт взрыва

        const countSmallBalls = random(10, 40);// Кол-во маленьких частей (от 10 до 20)
        for (let i = 0; i < countSmallBalls; i++) { // Самый главный загрузчик процессора
            const ball = document.createElement('div');
            ball.className = 'small-fire';
            ball.style.background = randomColor();
            this.container.appendChild(ball);
            ball.style.left = `${this.x}px`;
            ball.style.top = `${this.y}px`;

            // Задаем движение шарика
            const speedX = random(-20, 20);// Возможный разлет по Х диапазону
            let speedY = random(-20, 0);
            // Возможный разлет по Y(-20 чтобы шары летели вверх, имитируя инерцию феерверка)

            ball.timeFunc = setInterval(() => {
                if (ball.offsetTop > this.container.offsetHeight) {
                    // Фрагмент шарика ниже чем высота контейнера
                    clearInterval(ball.timeFunc);
                    ball.remove();
                } else {
                    // Иначе двигаться нормально в соответствии с длиной шага
                    ball.style.left = `${ball.offsetLeft + speedX}px`;
                    // В процессе длина шага по Y увеличивается, вызывая эффект ускорения падения
                    ball.style.top = `${ball.offsetTop + (speedY++)}px`;
                }
            }, 30);
        }
    }
}
if (document.querySelector('#resultsBlock')) {
    const salutBlock = document.querySelector('.salutBlock');
    // Точка взрыва заряда
    const fireBall = new Fireball({
        x: random(100, +salutBlock.clientWidth - 100),
        y: random(0, salutBlock.clientHeight * 0.4),
    });
    fireBall.startBoom();
    // Точка взрыва заряда
    const fireBall2 = new Fireball({
        x: random(100, +salutBlock.clientWidth - 100),
        y: random(0, salutBlock.clientHeight * 0.4),
    });
    fireBall2.startBoom();
}
export default Fireball;

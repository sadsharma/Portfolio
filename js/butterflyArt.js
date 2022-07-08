let canvas1, ctx1, w, h, dots;
        let mouse = {
            x: undefined,
            y: undefined
        }

        function init() {
            canvas1 = document.getElementById('canvas2');
            ctx1 = canvas1.getContext("2d");
            resizeReset();
            animationLoop();
        }

        function resizeReset() {
            w = canvas1.width = window.innerWidth;
            h = canvas1.height = window.innerHeight;

            dots = [];
            for (let i = 0; i < 100; i++) {
                dots.push(new Dot());
            }
        }

        function mousemove(e) {
            mouse.x = e.x;
            mouse.y = e.y;
        }

        function mouseout() {
            mouse.x = undefined;
            mouse.y = undefined;
        }

        function animationLoop() {
            ctx1.clearRect(0, 0, w, h);
            ctx1.globalCompositeOperation = 'lighter';
            drawScene();
            requestAnimationFrame(animationLoop);
        }

        function drawScene() {
            for (let i = 0; i < dots.length; i++) {
                dots[i].update();
                dots[i].draw();
            }
        }

        function getRandomInt(min, max) {
            return Math.round(Math.random() * (max - min)) + min;
        }

        function easeOutQuad(x) {
            return 1 - (1 - x) * (1 - x);
        }
        function easeOutElastic(x) {
            const c4 = (2 * Math.PI) / 3;

            return x === 0
                ? 0
                : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }

        class Dot {
            constructor() {
                this.reset();
                this.constructed = true;
            }
            reset() {
                this.x = getRandomInt(0, w);
                this.y = getRandomInt(h * 1, h * 1.3);
                this.baseX = this.x;
                this.baseY = this.y;

                if (mouse.x) {
                    this.centerX = mouse.x;
                } else {
                    this.centerX = getRandomInt(0, w);
                }

                this.size = getRandomInt(2, 4);

                if (this.constructed) {
                    this.rgba = [106, 149, 82, 1];
                } else {
                    this.rgba = [0, 0, 0, 0];
                }
                
                this.time = 0;
                this.ttl = getRandomInt(100, 300);
            }
            draw() {
                ctx1.beginPath();
                ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx1.fillStyle = `rgba(${this.rgba[0]} ,${this.rgba[1]} ,${this.rgba[2]} ,${this.rgba[3]})`;
                ctx1.fill();
                ctx1.closePath();
            }
            update() {
                if (this.time <= this.ttl) {
                    let progress = 1 - (this.ttl - this.time) / this.ttl;

                    this.x = this.baseX + ((this.centerX - this.baseX) * easeOutElastic(progress));
                    this.y = this.baseY - (this.baseY * easeOutQuad(progress));

                    this.time++;
                } else {
                    this.reset();
                }
            }
        }

        window.addEventListener("DOMContentLoaded", init);
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseout", mouseout);
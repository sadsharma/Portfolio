/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const finalWidth =  canvas.width


class Root {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 5 + 2;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.05;
        this.angle = Math.random() * 6.2;
        this.va = Math.random() * 0.6 - 0.3;
        this.lightness = 10;
    }

    update() {
        this.x += this.speedX + Math.sin(this.angle);
        this.y += this.speedY + Math.sin(this.angle);
        this.size += this.vs;
        this.angle += this.va;

        if(this.lightness < 70)
        {
            this.lightness += .40;
        }
        if(this.size < this.maxSize)
        {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(140, 100%, ' + this.lightness + '%)';
            ctx.fill();
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        }
        else 
        {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }
    }
}

class Flower{
    constructor(x,y,size)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() + 30;
        this.image = new Image();
        this.flowerNumber = Math.floor(Math.random() * 7 + 1);
        this.image.src;
        this.rand = Math.random() * 1;
        if(this.rand < 0.7)
        {
            this.image.src = 'images (potential)/flower' + this.flowerNumber + '.png';
        }
        else
        {
            this.image.src = 'images (potential)/leaf.png';
        }
        this.frameSize = 80;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.size > 6.7 ? this.willFlower = true : this.willFlower = false;
        this.angle = 0; 
        this.va = Math.random() * 0.05 - 0.025;
    }
    grow(){
        if(this.size < this.maxFlowerSize && this.willFlower)
        {
            this.size += this.vs;
            this.angle += this.va;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.image,0, 0, this.frameSize, this.frameSize, 0 - this.size /2, 0 - this.size/2, this.size, this.size);

            ctx.restore();
            requestAnimationFrame(this.grow.bind(this));
        }
    }
}

function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    location.reload();
}


window.addEventListener('mousemove', function(e)
{
    
    for(let i = 0; i < 2; i++)
    {
        const root = new Root(e.x, e.y);
        root.update();
    }
        
});

window.addEventListener("resize", resizeReset);

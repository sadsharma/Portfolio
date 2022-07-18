const canvas5 = document.getElementById('footerCanvas');
const ctx5 = canvas5.getContext('2d');
canvas5.width = window.innerWidth;
canvas5.height = window.innerHeight / 4;

class Drop {
    constructor()
    {
        this.x = Math.random() * canvas5.width;
        this.y = Math.random() * canvas5.height;
        this.r = Math.random() * 3.5;
        this.v = Math.random() * .5;
    }

    make()
    {
        ctx5.fillStyle = "#6a9552";
        ctx5.beginPath();
        ctx5.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx5.fill();
        ctx5.closePath();
        this.y += this.v;
        if(this.y > canvas5.height)
        {
            this.x = Math.random() * canvas5.width;
            this.y = 0;
        }
    }
}

let drops = [];
for(let i = 0; i < 40; i++)
{
    drops.push(new Drop());
}

function anim()
{
    ctx5.fillStyle = "rgba(0,0,0,0.5)";
    ctx5.fillRect(0,0,canvas5.width, canvas5.height);
    drops.forEach(drop => drop.make());
    requestAnimationFrame(anim);
}

anim();


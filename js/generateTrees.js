const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree-button');
const header = document.querySelector('h1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve,randomThick;

class Drop {
    constructor()
    {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 3.5;
        this.v = Math.random() * .5;
    }

    make()
    {
        ctx.fillStyle = 'rgba(' + (Math.random() * 200 ) + 40 + "," + (Math.random() * 200 ) + 40 + "," + (Math.random() * 200 ) + 40 + ', .2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

let drops = [];
for(let i = 0; i < 80; i++)
{
    drops.push(new Drop());
}

function anim()
{
    drops.forEach(drop => drop.make());
    requestAnimationFrame(anim);
}

anim();

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    //ctx.lineTo(0, -len);
    if(angle > 0)
    {
        ctx.bezierCurveTo(10, -len/2, 50, -len/2, 0, -len);
    }
    else
    {
        ctx.bezierCurveTo(10, -len/2, -30, -len/2, 0, -len);
    }
    ctx.stroke();

    var leaves = (Math.random() * 15) + 5;
    if (len < 10) {
        ctx.beginPath();
        ctx.arc( 0, -len, 12, 0, Math.PI/2);
        ctx.fill();

        ctx.restore();
        return;
    }

    curve = (Math.random() * 10) + 10;
    branchWidthSpread = (Math.random() * .4) + .5;
    drawTree(0, -len + branchWidthSpread, len * 0.8, angle+ curve, branchWidth * branchWidthSpread);
    drawTree(0, -len + branchWidthSpread, len * 0.8, angle - curve , branchWidth * branchWidthSpread);
    ctx.restore();
}

var num = 6;
if(canvas.width < 1000)
{
    num = 9;
}
drawTree(canvas.width/2, canvas.height - 80 ,canvas.height/num, 0, 20, '#317773', '#E2D1F9');
generateButton.style.background =  '#317773';
header.style.color = '#317773';

function generateRandomTree () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let centerPointX = canvas.width / 2;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = (Math.random() * 10) - 5;
    let branchWidth =  (Math.random() * 20) + 10;
    let color1 = 'rgb(' + Math.random() * 200 + "," + Math.random() * 150 + "," + Math.random() * 180 + ')';
    let color2 = 'rgb(' + (Math.random() * 200 ) + 40 + "," + (Math.random() * 200 ) + 40 + "," + (Math.random() * 200 ) + 40 + ')';
    curve = (Math.random() * 80) + 10;
    drawTree(centerPointX, canvas.height - 80, canvas.height/num,angle, branchWidth, color1, color2);
    generateButton.style.background =  color1;
    header.style.color = color1;
}

generateButton.addEventListener('click', generateRandomTree);
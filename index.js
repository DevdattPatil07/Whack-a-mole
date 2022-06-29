const holes=document.querySelectorAll('.hole');
const scoreBoard=document.querySelectorAll('.score');
const moles=document.querySelectorAll('.mole');
const btnxyz=document.querySelector('.btn');


let lastHole;
let timeUp=false;
let score=0;
let seconds=15;

function randomTime(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

function randomHole(holes){
    const index=Math.floor(Math.random()*holes.length);
    const hole =holes[index];

    if(hole===lastHole){
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
}

function peep(){
    const time= randomTime(800,1100);
    const hole=randomHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        if(!timeUp){
            peep();
        }
    },time);
}

function startGame(){
    scoreBoard.forEach(board=>board.textContent=0);
    timeUp=false;
    score=0;
    peep();
    seconds=15;
    setTimeout(()=> timeUp=true,15000) //show random mole for 15sec(timeUp will be true for 15sec)
    interval=setInterval(updateCount,1000);
}

//counter function
function updateCount(){
    btnxyz.innerHTML=`${seconds}`;
    if(seconds===1){
        btnxyz.innerText='Retry'
        clearInterval(interval);
    }
    seconds--;
}


function wack(e){
    console.log(e);
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.forEach(board=>board.textContent=score);
}

moles.forEach(mole=>mole.addEventListener('click',wack));
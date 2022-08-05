const holes=document.querySelectorAll('.hole');
const scoreBoard=document.querySelector('.score');
const moles=document.querySelectorAll('.mole');
const btnxyz=document.querySelector('.btn');

let highscore=localStorage.getItem("HighScore");

if(highscore){
    updateHighScore(highscore);
}

let lastHole;
let timeUp=false;
let score=0;
let seconds=document.getElementById("time").value;
let difficulty=document.getElementById("speed").value;

//mole peep time
function randomTime(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

//randome hole selector function
function randomHole(holes){
    const index=Math.floor(Math.random()*holes.length);
    const hole =holes[index];

    if(hole===lastHole){
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
}

//mole peeping function taking argument as speed
function peep(low,high){
    const time= randomTime(low,high);
    const hole=randomHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        if(!timeUp){
            peep(low,high);
        }
    },time);
}

function startGame(){
    scoreBoard.textContent=0;
    timeUp=false;
    score=0;
    difficulty=document.getElementById("speed").value;
    seconds=document.getElementById("time").value;
    let n=3-difficulty+1;
    peep(n*800,n*1100);
    setTimeout(()=> timeUp=true,seconds*1000) //show random mole for 15sec(timeUp will be true for 15sec)
    interval=setInterval(updateCount,1000);
}

//counter function
function updateCount(){
    btnxyz.innerHTML=`${seconds}`;
    if(seconds===0){
        btnxyz.innerText="Retry ⟳"
        clearInterval(interval);
    }
    seconds--;
}

//wack function executed only when you hit mole
function wack(e){
    var child=this.childNodes;
    console.log(child[1]);
    child[1].style="opacity:1";
    setTimeout(() => {
        child[1].style.opacity="0";
       }, 500);
    if(!e.isTrusted) return;
    score++;
    if(score>highscore){
        highscore=score;
        updateHighScore(highscore);
    }
    this.parentNode.classList.remove('up');
    scoreBoard.textContent=score;
}

moles.forEach(mole=>mole.addEventListener('click',wack));

function updateHighScore(highscore){
    document.getElementById("highScore").innerText=highscore;
    localStorage.setItem("HighScore",highscore);
}
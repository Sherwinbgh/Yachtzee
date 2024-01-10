let player1Score=[];
let player2Score=[];
let player1Dice=[];
let player2Dice=[];
let rollcount=0;
let roundcount=0;
let isplayeroneturn=true;
let transformvalues=[
    [0,30],[-5.40],[0,35],[5,40],[0,30]
];
const player1Container=document.getElementById("player1Container");
const player2Container=document.getElementById("player2Container");
const diceElements=document.querySelectorAll(".dice");
const rollbutton= document.getElementById("Roll");
const scoreTableCells=document.querySelectorAll(".cell");
function rolldice(){
    rollcount++;
    let diceArr=[1,2,3,4,5];
    let randomDice=[];
    for (let i=0; i < diceArr.length;i++) {
        randomDice.push(Math.floor(Math.random()*6)+1);
    }

    let playArea=document.getElementById("playarea");
    let diceContainer=document.getElementById("player1Container");
    let numdice=diceContainer.children.length;
    let playAreawidth=playArea.offsetWidth-numdice*50;
    let playAreheight=playArea.offsetHeight-50;

    diceElements.forEach(function(diceElement,index){
        if(diceElement.classList.contains("active")|| rollcount==1){
            resetDicePositions();
            const x = transformvalues[index][0];
            const y = transformvalues[index][1];

            setTimeout(function(){
                changeDiePosotion(diceElement,x,y);
                chamgediceFaces(randomDice);
                if(rollcount==3){
                    rollbutton.disabled=true;
                    rollbutton.style.opacity=0,5;
                }
            },500);
        }
    });
}
function resetDicePositions(){
    diceElements.forEach(function(diceElement){
        diceElement.style.transform="none";
    })
}
function changeDiePosotion(diceElement,x,y){
    let angle=135*Math.floor(Math.random()*10);
    let diceRollDirection = -1;
    if(!isplayeroneturn)diceRollDirection=1;
    angle=135*Math.floor(Math.random()*10);
    diceElement.style.transform=
    "translateX("+
    x +"vw) translateY("+diceRollDirection*y+
    "vh) rotate(" + angle + "deg)";
}
function changediceFaces(randomDice) {
    for (let i=0; i < diceElements.length;i++) {
        if(rollcount ===1) diceElements[1].classList.add("active");
        if(diceElements[i].classList.contains("active")) {
            if(isplayeroneturn) player1Dice[i]=randomDice[i];
            else player2Dice[i]=randomDice[i];

            let face = diceElements[i].getElementsByClassName("face")[0];
            face.src="dice"+randomDice[i]+".png";
        }
    }
}
function resetDicefaces() {
    for(let i=0; i < diceElements.length;i++){
        let face = diceElements[i].getElementsByClassName("face")[0];
        diceElements[i].classList.remove("active");
        let diceNumber=i+1;
        face.src="dice"+diceNumber+".png";
    }
}
diceElements.forEach(function(diceElement,index){
    diceElement.addEventListener("click",function(){
        if(rollcount==0) return;
        diceElement.classList.toggle("active");
        if(!diceElement.classList.contains("active")){
            diceElement.style.transform="none";
        }
        else {
            const diceNumber=diceElement.id.charAt(3);
            const x = transformvalues[diceNumber-1[0]];
            const y = transformvalues[diceNumber-1[1]];
            changedicePositions(diceElement,x,y);
        }
    })
})

function calculateOnes(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===1) {
            score+=1;
        }
    }
    return score;
}

function calculateTwos(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===2) {
            score+=2;
        }
    }
    return score;
}

function calculateThrees(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===3) {
            score+=3;
        }
    }
    return score;
}

function calculatefours(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===4) {
            score+=4;
        }
    }
    return score;
}

function calculateFives(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===5) {
            score+=5;
        }
    }
    return score;
}

function calculateSixs(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===6) {
            score+=6;
        }
    }
    return score;
}

function calculateChances(dice) {
    let score=0;
    for (let i=0; i < dice.length; i++){
        score+=dice[i];
    }
    return score;
}

function calculateYachtzee(dice) {
    let firstdie=dice[0];
    for (let i=0; i < dice.length; i++){
        if(dice[i]===firstdie) {
            score+=6;
        }
    }
    return score;
}
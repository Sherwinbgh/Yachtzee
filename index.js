let player1Score=[];
let player2Score=[];
let player1Dice=[];
let player2Dice=[];
let rollcount=0;
let roundcount=0;
let isplayeroneturn=true;
// roll dice function
const player1Container=document.getElementById("player1Container");
const player2Container=document.getElementById("player2Container");
const diceElements=document.querySelectorAll(".dice");
const rollbutton= document.getElementById("Roll");
const scoreTable = document.querySelectorAll(".cell");
const scoreTableCells=document.querySelectorAll(".cell");
const allecells=document.querySelectorAll(".cell");
let cells=[];
selectcells();
function selectcells(){
    for(var i = 0; i < allecells.length;i++){
        if(i%3==0){
            continue
        }
        cells.push(allecells[i])
    }
}
// forloop
function rolldice(){
    let die1;
    let die2;
    let die3;
    let die4;
    let die5;

    const dice1 = document.getElementById("Dice-1");
    const dice2 = document.getElementById("Dice-2");
    const dice3 = document.getElementById("Dice-3");
    const dice4 = document.getElementById("Dice-4");
    const dice5 = document.getElementById("Dice-5");

    rollcount++;
 randomDice=[];
    die1 = randomNumber();
    randomDice.push(die1);
    dice1.src = "dice_images/Dice-" + die1 + ".png";

    die2 = randomNumber();
    randomDice.push(die2);
    dice2.src = "dice_images/Dice-" + die2 + ".png";

    die3 = randomNumber();
    randomDice.push(die3);
    dice3.src = "dice_images/Dice-" + die3 + ".png";

    die4 = randomNumber();
    randomDice.push(die4);
    dice4.src = "dice_images/Dice-" + die4 + ".png";

    die5 = randomNumber();
    randomDice.push(die5);
    dice5.src = "dice_images/Dice-" + die5 + ".png";
}

function randomNumber() {
    let random = Math.floor(Math.random()*6)+1;
    return random;
}
function resetDicePositions(){
    diceElements.forEach(function(diceElement){
        diceElement.style.transform="none";
    })
}
function changediceFaces(randomDice) {
    for (let i=0; i < diceElements.length;i++) {
        if(rollcount ===1) diceElements[1].classList.add("active");
        if(diceElements[i].classList.contains("active")) {
            if(isplayeroneturn) player1Dice[i]=randomDice[i];
            else player2Dice[i]=randomDice[i];

            let face = diceElements[i].getElementsByClassName("face")[0];
            face.src="dice"+randomDice[i];
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
            changeDicePosition(diceElement,x,y);
        }
    })
})
// eerste gedeelde van scores
function calculateOnes(dice) {
    let score = 0;
    dice.forEach(die => {
        if (die === 1) {
            score++;
        }
    });
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

// tweede gedeelde van scores
function calculateThreeOfAKind(dice) {
    let score = 0;
    for (let i = 0; i < dice.length; i++) {
        let count = 1;

        for (let j = 0; j < dice.length; j++) {
            if (i !== j && dice[i] === dice[j]) {
                count++;
            }
        }
        if (count >= 3) {
            score = dice.reduce((acc, val) => acc + val);
            break;
        }
    }
    return score;
}

function calculateFourOfAKind(dice) {
    let score = 0;

    for (let i = 0; i < dice.length; i++) {
        let count = 1;
        for (let j = 0; j < dice.length; j++) {
            if (i !== j && dice[i] === dice[j]) {
                count++;
            }
        }
        if (count >= 4) {
            score = dice.reduce((acc, val) => acc + val);
            break;
        }
    }
    return score;
}

function calculateFullhouce(dice){
    let score=0;
    let dicecopy=dice.slice();
    dicecopy.sort();
    if(
        (dicecopy[0]==dicecopy[1] &&
        dicecopy[1]==dicecopy[2] &&
        dicecopy[3]==dicecopy[4]
        ) ||
        (dicecopy[0]==dicecopy[1] &&
            dicecopy[1]==dicecopy[2] &&
            dicecopy[3]==dicecopy[4] )
    ){
        score=25;
        return score;
    }
    return score;
}

function calculateSmallstraight(dice){
    let score=0;
    let dicecopy=[...new setInterval(dice)];
    dicecopy.sort();
    if(
        (dicecopy[1]==dicecopy[0]+1 &&
        dicecopy[2]==dicecopy[1]+1 &&
        dicecopy[3]==dicecopy[2]+1
        ) ||
        (dicecopy[2]==dicecopy[1]+1 &&
            dicecopy[3]==dicecopy[2]+1 &&
            dicecopy[4]==dicecopy[3]+1 )
    ){
        score=30;
        return score;
    }
    return score;
}

function calculateLargestraight(dice){
    let score=0;
    let dicecopy=[...new setInterval(dice)];
    dicecopy.sort();
    if(
        (dicecopy[1]==dicecopy[0]+1 &&
        dicecopy[2]==dicecopy[1]+1 &&
        dicecopy[3]==dicecopy[2]+1
        )
    ){
        score=40;
        return score;
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
    let score=50;
    for (let i=0; i < dice.length; i++){
        if(dice[i]===firstdie) {
            score=0;
        }
    }
    return score;
}
function writeTempValuesInScoreTable(dice){
    let scoreTable=[];
    scoreTable=player1Score.slice();
    let playerNumber = 1;
    if(!isplayeroneturn){
        scoreTable=[];
        scoreTable=player2Score.slice();
        playerNumber= 2;
    }
    if(scoreTable[0]===undefined) {
        let onesScore = calculateOnes(dice);
        document.getElementById("ones"+playerNumber).innerHTML=onesScore;
    }
    if(scoreTable[1]===undefined) {
        let twosScore = calculateTwos(dice);
        document.getElementById("twos"+playerNumber).innerHTML=twosScore;
    }
    if(scoreTable[2]===undefined) {
        let threesScore = calculateThrees(dice);
        document.getElementById("threes"+playerNumber).innerHTML=threesScore;
    }
    if(scoreTable[3]===undefined) {
        let foursScore = calculatefours(dice);
        document.getElementById("fours"+playerNumber).innerHTML=foursScore;
    }
    if(scoreTable[4]===undefined) {
        let fivesScore = calculateFives(dice);
        document.getElementById("fives"+playerNumber).innerHTML=fivesScore;
    }
    if(scoreTable[5]===undefined) {
        let sixsScore = calculateSixs(dice);
        document.getElementById("sixs"+playerNumber).innerHTML=sixsScore;
    }
    if(scoreTable[6]===undefined) {
        let ThreeofakindScore = calculateThreeOfAKind(dice);
        document.getElementById("ThreeOfAkinds"+playerNumber).innerHTML=ThreeofakindScore;
    }
    if(scoreTable[7]===undefined) {
        let FourofAkindScore = calculateFourOfAkinds(dice);
        document.getElementById("fourOfAkinds"+playerNumber).innerHTML=FourofAkindScore;
    }
    if(scoreTable[8]===undefined) {
        let FullhouceScore = calculateFullhouce(dice);
        document.getElementById("Fullhouces"+playerNumber).innerHTML=FullhouceScore;
    }
    if(scoreTable[9]===undefined) {
        let SmallstraightScore = calculateSmallstraight(dice);
        document.getElementById("Smallstraight"+playerNumber).innerHTML=SmallstraightScore;
    }
    if(scoreTable[10]===undefined) {
        let LargestraightScore = calculateLargestraight(dice);
        document.getElementById("Largestraight"+playerNumber).innerHTML=LargestraightScore;
    }
    if(scoreTable[11]===undefined) {
        let ChanceScore = calculateChances(dice);
        document.getElementById("Chance"+playerNumber).innerHTML=ChanceScore;
    }
    if(scoreTable[12]===undefined) {
        let YachtzeeScore = calculateYachtzee(dice);
        document.getElementById("Yachtzee"+playerNumber).innerHTML=YachtzeeScore;
    }
}
///Scoretable funtioneren
scoreTableCells.forEach(function(cell){

});
function oncellclick(){
    let row=this.getAttribute("data-row");
    let column=this.getAttribute("data-column");
    if(
        rollcount=0 ||
        row===null
    ) return;
    if(isplayeroneturn && column==1){
        player1Score[row-1]=parseInt(this.innerHTML);
        let upperSectionScore1=calculateUpperSectionScore(player1Score);
        let bonusScore1=upperSectionScore1>63 ? 35 : 0;
        let lowerSectionScore1=calculatelowerSectionScore1(player1Score);
        let totalScore1=upperSectionScore1+lowerSectionScore1+bonusScore1;
        sum1.innerHTML=upperSectionScore1;
        bonus1.innerHTML=bonusScore1;
        total1.innerHTML=totalScore1;
        this.style.color="green";
        sum1.style.color="green";
        bonus1.style.color="green";
        total1.style.color="green";
        changeTurn();
    }
    if(!isplayeroneturn && column==2){
        player2Score[row-1]=parseInt(this.innerHTML);
        let upperSectionScore2=calculateUpperSectionScore(player2Score);
        let bonusScore2=upperSectionScore2>63 ? 35 : 0;
        let lowerSectionScore2=calculatelowerSectionScore1(player2Score);
        let totalScore2=upperSectionScore2+lowerSectionScore2+bonusScore2;
        sum1.innerHTML=upperSectionScore2;
        bonus1.innerHTML=bonusScore2;
        total1.innerHTML=totalScore2;
        this.style.color="green";
        sum2.style.color="green";
        bonus2.style.color="green";
        total2.style.color="green";
        changeTurn();
    }
    return score;
}
//scores van upper and down sections bijelkaar
function calculateUpperSectionScore(playerScore){
    let score=0;
    let ones=playerScore[0]==undefined ? 0 : playerScore[0];
    let twos=playerScore[1]==undefined ? 0 : playerScore[1];
    let threes=playerScore[2]==undefined ? 0 : playerScore[2];
    let fours=playerScore[3]==undefined ? 0 : playerScore[3];
    let fives=playerScore[4]==undefined ? 0 : playerScore[4];
    let sixs=playerScore[5]==undefined ? 0 : playerScore[5];
    score=ones+twos+threes+fours+fives+sixs;
    return score;
}
function calculateclowerSectionScore(playerScore){
    let lowerSectionScore=0;
    let ThreeOfAkinds=playerScore[6]==undefined ? 0 : playerScore[6];
    let fourOfAkinds=playerScore[7]==undefined ? 0 : playerScore[7];
    let Fullhouces=playerScore[8]==undefined ? 0 : playerScore[8];
    let Smallstraight=playerScore[9]==undefined ? 0 : playerScore[9];
    let Largestraight=playerScore[10]==undefined ? 0 : playerScore[10];
    let Chance=playerScore[11]==undefined ? 0 : playerScore[11];
    let Yachtzee=playerScore[12]==undefined ? 0 : playerScore[12];
    lowerSectionScore=ThreeOfAkinds+fourOfAkinds+Fullhouces+Smallstraight+Largestraight+Chance+Yachtzee;
    return lowerSectionScore;
}
function switchPlayer() {
    if (activePlayer === 'player 1') {
        activePlayer = 'player 2';
        console.log("Switched to player 2");
    } else {
        activePlayer = 'player 1';
        console.log("Switched to player 1");
    }
}
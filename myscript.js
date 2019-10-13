var origBoard;
const huPlayer='O';
const aiPlayer='X';
const winCombs=[
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2]

]
const cells=document.querySelectorAll('.cell');
startGame();
function startGame(){
	document.querySelector(".endgame").style.display="none";
	origBoard=Array.from(Array(9).keys());
	for(var i=0;i<cells.length;i++){
		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',turnClick,false);
	}
}

function turnClick(square){
	//console.log(square.target.id)
	//can't click on places already clicked
	//if id==number that means it is not played
	if(typeof origBoard[square.target.id]=='number'){
	turn(square.target.id,huPlayer);
	if(!checkTie()) turn(bestSpot(),aiPlayer);
}
}
function turn(squareId,player){
	origBoard[squareId]=player;
	document.getElementById(squareId).innerText=player;
	let gameWon=checkWin(origBoard,player);
	if(gameWon) gameOver(gameWon);
}

function checkWin(board,player){
	//find all the places on board that are already played in 
	//a=accumulator initialized to empty array
	//e=element
	//i=index
	let plays=board.reduce((a,e,i)=>
		(e==player)?a.concat(i):a, []);
	let gameWon= null;
	//check if game is won
	for(let [index,win] of winCombs.entries()){
		if(win.every(elem=>plays.indexOf(elem)>-1)){
			gameWon={index:index,player:player};
				break;
		}
	}
	return gameWon;
}


function gameOver(gameWon){
	for(let index of winCombs[gameWon.index])
	{
		document.getElementById(index).style.backgroundColor=
		gameWon.player==huPlayer? "blue" : "red";

	}
	for(var i=0;i<cells.length;i++){
		cells[i].removeEventListener('click',turnClick,false);
	}
	declareWinner((gameWon.player==huPlayer) ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display="block";
	document.querySelector(".endgame.text").innerText=who;
}
function emptySquares(){
	//if ele is number i.e. empty
	return origBoard.filter(s=>typeof s=='number')
}
function bestSpot(){
	//min max AI algorithm
	return minmax(origBoard,aiPlayer).index;
}
function checkTie(){
	if(emptySquares().length==0){
		for(var i=0;i<cells.length;i++){
			cells[i].style.backgroundColor="green";
			cells[i].removeEventListener('click',turnClick,false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;
}

function minmax(newBoard,player){
	var availSpots=emptySquares(newBoard);
	if(checkWin(newBoard,player)){
		return{score : -10};
	}
	else if(checkWin(newBoard,aiPlayer)){
		return{score:20};
	}else if(availSpots.length==0){
		return {score:0};
	}
	var moves=[];
	for(var i=0;i<availSpots.length;i++){
		var move={};
		move.index=newBoard[availSpots[i]];
		newBoard[availSpots[i]]=player;
		if(player==aiPlayer){
			var result=minmax(newBoard,huPlayer);
			move.score=result.score;
		}else{
			var result=minmax(newBoard,aiPlayer);
			move.score=result.score;
		}
		newBoard[availSpots[i]]=move.index;
		moves.push(move);
	}
	var bestMove;
	if(player==aiPlayer){
		var bestScore=-10000;
		for(var i=0;i<moves.length;i++){
			if(moves[i].score>bestScore){
				bestScore=moves[i].score;
				bestMove=i;
			}
		}
	}else{
		var bestScore=10000;
		for(var i=0;i<moves.length;i++){
			if(moves[i].score<bestScore){
				bestScore=moves[i].score;
				bestMove=i;
			}
		}
	}
	return moves[bestMove];
}



//restart game button
/*var restart=document.querySelector("#b");

//grab all the squares
var squares=document.querySelectorAll('td');
//clear all squares

function clearBoard(){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].textContent='';
	}
}
restart.addEventListener('click',clearBoard);

//clear square marker
function changeMarker(){
	if(this.textContent===''){
		this.textContent='X';
	}
	else if(this.textContent==='X'){
		this.textContent='O';
	}else{
		this.textContent='';
	}
}
//for loop to add event listeners to all the squares
for(var i=0;i<squares.length;i++){
	squares[i].addEventListener('click',changeMarker)
}

*/

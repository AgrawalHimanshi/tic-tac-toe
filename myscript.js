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
	turn(square.target.id,huPlayer);
}
function turn(squareId,player){
	origBoard[squareId]=player;
	document.getElementById(squareId).innerText=player;
	let gameWon=checkWin(origBoard,player);
	if(gameWon) gameOver(gameWon)
}

function checkWin(board,player){
	//find all the places on board that are already played in 
	//a=accumulator initialized to empty array
	//e=element
	//i=index
	let plays=board.reduce((a,e,i)=>
		(e==player)?a.concat(i):a, []);
	let gameWon=null;
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

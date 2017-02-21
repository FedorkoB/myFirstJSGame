window.onload = init;


var map;
var ctxMap;

var startBtn;
var clearBtn;
var resumeBtn;
    
var gameheigh = 500;
var gamewidth = 900;

var background = new Image();
background.src = "Images/Space.jpg";

var SkinHero = new Image();
SkinHero.src = "Images/Skins.png";

var finImg = new Image();
finImg.src = "Images/winner.png";

var GoverImg = new Image();
GoverImg.src = "Images/Gover.jpg";

var Final;
var ctxFinal;


var Hero;
var ctxHero;

var enemyCvs;
var ctxEnemy;

var HeroHeigh = 98;
var HeroWidth = 101;

var isPlaying;

var player;
var en1;

var temp;

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;
												

function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");
	
	Final = document.getElementById("Finish");
    ctxFinal = Final.getContext("2d");
         
	Hero = document.getElementById("Hero");
	ctxHero = Hero.getContext("2d");
	
	
	enemyCvs = document.getElementById("Enemy1");
	ctxEnemy = enemyCvs.getContext("2d");
	
    map.height = gameheigh;
    map.width = gamewidth;
    
	Final.height = gameheigh;
    Final.width = gamewidth;
	
	Hero.height = gameheigh;
	Hero.width = gamewidth;
	
	enemyCvs.height = gameheigh;
	enemyCvs.width = gamewidth;
	
    startBtn = document.getElementById("StartButton");
    resumeBtn = document.getElementById("ResumeButton");
    clearBtn = document.getElementById("PauseButton");
        
    startBtn.addEventListener("click", Start, false);
	resumeBtn.onclick = resumGame;
    clearBtn.onclick = Pause;
    
	player = new Player();
	en1 = new Enem1();
	
    drawBg();
	StartLoop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function Loop()
{
	if(isPlaying)
	{
	
		drawHero();
		update();
		requestAnimFrame(Loop);
		
		
	}
	 
}

function StartLoop()
{
	isPlaying = true;
	Loop();
}

function StopLoop()
{
	isPlaying = false;
}

function update()
{
	
	player.update();
	en1.update();
}


function drawHero() 
{
	player.draw();
	en1.draw();
}

function Player() 
{	
	this.srcX = 0;
	this.srcY = 0;
	
	this.drawX = 5;
	this.drawY = gameheigh/2 - HeroHeigh/2;
	
	this.height = HeroHeigh;
	this.width = HeroWidth;
	this.speed = 0;
	
	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;
}

function Enem1() 
{
	
	this.srcX = 0;
	this.srcY = 165;
	
	this.drawX = gamewidth;
	this.drawY = Math.floor(Math.random() * gameheigh);
	
	this.height = HeroHeigh;
	this.width = HeroWidth;
	
	this.speed = 0;
	
	
}



Player.prototype.draw = function() 
{
	clearCtxHero();
	ctxHero.drawImage(SkinHero, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
}

Player.prototype.update = function()
{
	if(this.drawX < 0)
	{
		this.drawX = 1;
	}
	if(this.drawX > gamewidth - this.width)
	{
		this.drawX = gamewidth - this.width -2;
	}
	if(this.drawY < 0)
	{
		this.drawY = 1;
	}
	if(this.drawY > gameheigh - this.height)
	{
		this.drawY =  gameheigh - this.height -2;
	}
	this.chooseDir();
	
	

}



Player.prototype.chooseDir = function()
{
	if(this.isUp == true)
		this.drawY -= this.speed;
	if(this.isDown == true)
		this.drawY += this.speed;
	if(this.isLeft == true)
		this.drawX -= this.speed;
	if(this.isRight == true)
		this.drawX += this.speed;
}


function checkKeyDown(e)
{
	var keyId = e.keyCode || e.which;
	
	if(keyId == 87 || keyId ==  119)
	{
		player.isUp = true;
		e.preventDefault();
	}
	if(keyId == 83 || keyId == 115)
	{
		player.isDown = true;
		e.preventDefault();
	}
	if(keyId == 65 || keyId==97)
		
	{
		player.isLeft = true;
		e.preventDefault();
	}
	if(keyId == 68|| keyId== 100)
	{
		player.isRight = true;
		e.preventDefault();
	}
}

function checkKeyUp(e)
{
	var keyId = e.keyCode || e.which;
	
	if(keyId == 87 || keyId ==  119)
	{
		player.isUp = false;
		e.preventDefault();
	}
	if(keyId == 83 || keyId == 115)
	{
		player.isDown = false;
		e.preventDefault();
	}
	if(keyId == 65 || keyId==97)	
	{
		player.isLeft = false;
		e.preventDefault();
	}
	if(keyId == 68|| keyId == 100)
	{
		player.isRight = false;
		e.preventDefault();
	}
}




Enem1.prototype.draw = function() 
{
	clearCtxEnemy();
	ctxEnemy.drawImage(SkinHero, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
}

Enem1.prototype.update = function() 
{
	this.drawX -= this.speed;
	if(this.drawX < 0 - this.width)
	   {
	   		this.drawX = Math.floor(Math.random() * 15) + gamewidth;
			this.drawY = Math.floor(Math.random() * gameheigh);
		   this.speed += 0.15;
		   player.speed += 0.01;
	   }
	if(this.drawY > gameheigh - this.height)
	{
		this.drawY =  gameheigh - this.height;
	}
	Failed();
	Finish();
	
	
}

function Start() {
	
	clearCtxFail();
	player.speed = 5;
    en1.speed = 6;
	en1.drawX = Math.floor(Math.random() * 15) + gamewidth;
	en1.drawY = Math.floor(Math.random() * gameheigh);
	
}

function resumGame() {
	
   en1.speed = temp;
	console.log("I See you");
}


function Pause() 
{	
	temp = en1.speed;
   	en1.speed = 0;
		
}

function Failed()
{
	if(en1.drawX >= player.drawX && en1.drawX < player.drawX + player.width 
	   && en1.drawY >= player.drawY - player.height/2 && en1.drawY < player.drawY + player.height){
	en1.speed = 0;
		
		Gover();
	}
}

function Gover()
{
	ctxFinal.drawImage(GoverImg, 0, 0, 1280, 720, 0, 0, gamewidth, gameheigh);	
	
}

function Finish()
{	
	if(en1.speed > 12)
	{
		ctxFinal.drawImage(finImg, 0, 0, 757, 757, 0, 0, gamewidth, gameheigh);
		en1.speed = 0;
	}
}

function clearCtxFail()
{
	ctxFinal.clearRect(0, 0, gamewidth, gameheigh);
}

function clearCtxHero()
{
	ctxHero.clearRect(0, 0, gamewidth, gameheigh);
}

function clearCtxEnemy()
{
	ctxEnemy.clearRect(0, 0, gamewidth, gameheigh);
}
 
function drawBg() {
	ctxMap.drawImage(background, 0, 0, 1920, 1080, 0, 0, gamewidth, gameheigh);
}



     


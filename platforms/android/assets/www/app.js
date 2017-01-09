$(document).ready(function () {

	var myGamePiece;
	var myObstacles = [];
	var myScore;
	var width = 342;
	var height = 480;
	
	var myGameArea = {
		canvas : document.createElement("canvas"),		
		alertDismissed : function () {
			location.reload(); 
		},
		show_pDialog: function () {
			
			cordova.plugin.pDialog.init({
				theme : 'HOLO_DARK',
				progressStyle : 'SPINNER',
				cancelable : false,
				title : 'Please Wait...',
				message : 'Loading ...'
			});
			
		},
		
		start : function () {
			var mainObject = this;
			this.canvas.width = width;
			this.canvas.height = height;
			this.context = this.canvas.getContext("2d");
			document.body.insertBefore(this.canvas, document.body.childNodes[2]);
			this.frameNo = 0;
			this.interval = setInterval(function () {
					var result = updateGameArea();
					if (!result) {						
						clearInterval(mainObject.interval);
						refreshAdMob(false);
						navigator.notification.vibrate(500);
						navigator.notification.alert('You lose try again!', mainObject.alertDismissed, 'Game Over', 'Play');
					}

				}, 20);
		},
		clear : function () {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	
	function startGame() {
		myGamePiece = new component(30, 30, "red", 10, 120);
		myGamePiece.gravity = 0.05;
		
		
		myScore = new component("30px", "Consolas", "red", 100, 450, "text");		
		myGameArea.start();
	}

	function component(width, height, color, x, y, type) {
		this.type = type;
		this.score = 0;
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		this.x = x;
		this.y = y;
		this.gravity = 0;
		this.gravitySpeed = 0;
		this.update = function () {
			ctx = myGameArea.context;
			if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = color;
				ctx.fillText(this.text, this.x, this.y);
			} else {
				ctx.fillStyle = color;				
				ctx.fillRect(this.x, this.y, this.width, this.height);
				
			}
		}
		this.newPos = function (btnY) {
			
			this.gravitySpeed += this.gravity;
			
			this.x += this.speedX;
			this.y += btnY;
			this.hitBottom();
			this.hitTop();
		}
		this.hitBottom = function () {
			var rockbottom = myGameArea.canvas.height - this.height;
			
			if (this.y > rockbottom) {
				this.y = rockbottom;
				this.gravitySpeed = 0;
			}			
		}
		
		this.hitTop = function () {
			var rockTop = this.height - 30;			
			if (this.y <= rockTop) {
				this.y = rockTop;
				this.gravitySpeed = 0;
			}				
		}
		
		this.crashWith = function (otherobj) {
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
				crash = false;
			}
			return crash;
		}
	}

	function updateGameArea() {
		var x,
		height,
		gap,
		minHeight,
		maxHeight,
		minGap,
		maxGap;
		for (i = 0; i < myObstacles.length; i += 1) {
			if (myGamePiece.crashWith(myObstacles[i])) {
				return false;
			}
		}
		myGameArea.clear();
		myGameArea.frameNo += 1;
		if (myGameArea.frameNo == 1 || everyinterval(150)) {
			x = myGameArea.canvas.width;
			minHeight = 20;
			maxHeight = 200;
			height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
			minGap = 50;
			maxGap = 200;
			gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
			
			myObstacles.push(new component(50, height, "brown", x, 0));
			myObstacles.push(new component(50, x - height - gap, "green", x, height + gap));
		}
		for (i = 0; i < myObstacles.length; i += 1) {
			myObstacles[i].x += -1;
			myObstacles[i].update();
		}
		
		myScore.text = "SCORE: " + myGameArea.frameNo;
		myScore.update();	
		
		myGamePiece.update();
		return true;
	}

	function everyinterval(n) {
		if ((myGameArea.frameNo / n) % 1 == 0) {
			return true;
		}
		return false;
	}

	
	function touchstart(e) {
		
		var touchobj = e.changedTouches[0]; 
        startY = parseInt(touchobj.clientY);
		
		var curr_y = height/2 ;
		
		if (curr_y < startY)
			myGamePiece.newPos(10);
		else	
		   myGamePiece.newPos(-10);
	   
        e.preventDefault();		
	}
	
	myGameArea.canvas.addEventListener("touchmove", touchstart);
	myGameArea.canvas.addEventListener("touchstart", touchstart);
			
		
	document.addEventListener('deviceready', onDeviceReady, false);

	function onDeviceReady() {		
		navigator.splashscreen.show();
		myGameArea.show_pDialog();
		refreshAdMob(true);		
		setTimeout(function(){  
			cordova.plugin.pDialog.dismiss();
			navigator.splashscreen.hide();
			startGame();
		}, 2000);
		
		
	}

	function refreshAdMob(WithBaner) {

		var admob_android_key = 'ca-app-pub-2296554833975967/2385778139';
		var interstitial = 'ca-app-pub-2296554833975967/3862511332';

		if (admob) {

			admob.setOptions({
				publisherId : admob_android_key,
				interstitialAdId : interstitial,
				bannerAtTop : false,
				overlap : false,
				offsetTopBar : false,
				isTesting : false,
				autoShow : true
			});

			if (WithBaner)
				admob.createBannerView();
			else
				admob.requestInterstitialAd();

		}

	}

});
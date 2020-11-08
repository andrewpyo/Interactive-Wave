import { 
	WaveGroup 
} from './wavegroup.js';

class App{
	constructor(){
		//캔버스를 스크립트로 만들고 context를 가져온다
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		
		document.body.appendChild(this.canvas);

		this.waveGroup = new WaveGroup();
		
		//윈도우에 resize 이벤트 걸어놓기
		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();
		
		//애니메이션 지정
		requestAnimationFrame(this.animate.bind(this));
	}	
	//스크린 사이즈를 가져오는 함수를 먼저 정의해주고 작업을 하는게 유지보수에 유리
	resize(){
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;
		
		this.canvas.width = this.stageWidth * 2;
		this.canvas.height = this.stageHeight * 2;
		this.ctx.scale(2, 2);

		this.waveGroup.resize(this.stageWidth,this.stageHeight);
	}
	
	animate(t) {
		//캔버스 클리어
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
	
		this.waveGroup.draw(this.ctx);
		
		requestAnimationFrame(this.animate.bind(this));
	}
}

window.onload=() => {
	new App();
}
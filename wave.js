import {
    Point 
} from './point.js';

export class Wave{
    //고유 인덱스 번호를 넘겨줘서 웨이브가 약간의 차이를 두고 움직일 수 있게 함
    constructor(index, totalPoints, color){
        this.index = index; 
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];

    }
    //애니메이션을 만들때 중요한것: 애니메이션의 좌표값 가져오기
    //그러기 위해서는 애니메이션의 크기를 알아야됨 -> 스테이지 넓이와 높이를 가져옴
    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;
        
        //포인트간의 간격 = 스테이지넓이 / 포인트의 개수
        this.pointGap = this.stageWidth /(this.totalPoints -1 );

        this.init();
    }

    init(){
        //각각의 포인트가 화면 중간에서 일어날 수 있도록 정의
        this.points = [];

        for(let i = 0; i < this.totalPoints; i++){
            const point = new Point(
                this.index + i,
                this.pointGap * i,
                this.centerY
            );

            this.points[i] = point;
        }
    }

    draw(ctx){
        ctx.beginPath();
        //현재 웨이브의 컬러
        ctx.fillStyle = this.color;

        //처음 포인트와 마지막 포인트는 움직이지 않음
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        //인덱스 값을 확인하고 0이거나 totalPoints-1(마지막)이면 update()를 실행하지 않음
        ctx.moveTo(prevX, prevY);
        
        for(let i = 1; i < this.totalPoints; i++){
            if(i < this.totalPoints - 1){
                this.points[i].update();
            }

            //현재포인트 x,y를 그대로 적는 것이아니고
            //이전 point + 현재 point 인덱스위치의 중간값
            //곡선을 그려야되기 때문에 선의 중간값 구함
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        ctx.lineTo(prevX,prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }

}
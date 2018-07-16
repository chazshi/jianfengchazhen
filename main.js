$(function(){
    var ctx=$("canvas")[0].getContext("2d");

    var line=150;
    var arr=[0, 90, 180];
    var rotateSpeed = 1;

    var cyclePos = [300, 400];
    var nowDeg = 180; //刚开始是180度
    var flag = false;//游戏控制

    $('canvas').click(function(e){
        if(judgeGame(180)) {
            arr.push(180);  //忽略坐标系变化，直接插入180即可
        } else {
            
            arr.push(180);  //忽略坐标系变化，直接插入180即可
            
            flag = true;
            setTimeout(stopTimer,50);



            
            
        }
        // console.log('nowDeg: ' + nowDeg +'#'+ arr);
        // console.log('arr: ' + arr);
    });

    function stopTimer() {
        clearInterval(timer);
    }

    var judgeParam = 5; //游戏难度，判断精度
    function judgeGame(deg) {
        for(var i=0;i<arr.length;i++) {
            if( Math.abs(Math.abs(arr[i])%360 - deg) < judgeParam) return false;
        }
        return true;
    }

    function reDraw(){
        ctx.clearRect(0,0,600,580);

        //画中心圆
        disc(cyclePos[0], cyclePos[1], 50);
        drawGameLine([180], 0, 200);


        drawGameLine(arr,0,0);
        nowDeg -= rotateSpeed;

        // console.log('now deg:' + nowDeg);

        if(flag) {
            // ctx.clearRect(0,0,600,580);
            ctx.font = '60px 宋体';
            ctx.fillStyle= 'blue';
            ctx.fillText('Game Over!', cyclePos[0] - 80, cyclePos[1]);
        }
    }



    function drawGameLine(arr, x,y){
        // nowDeg = arr[0] + 180;
        for(var i=0;i<arr.length;i++) {

            arr[i] += rotateSpeed;
            

            ctx.beginPath();
            ctx.save();
            ctx.globalCompositeOperation="destination-over";
            ctx.translate(cyclePos[0], cyclePos[1]);
            ctx.rotate(ang(arr[i]));
            ctx.moveTo(x,y);
            ctx.lineTo(x,y + line);
            // console.log(line);

            ctx.strokeStyle="pink";
            ctx.stroke();
            ctx.beginPath();
            ctx.globalCompositeOperation="source-over";
            disc(x,y + line,5);
            ctx.restore();
            
        }
    }

    function ang(deg){
        return deg*Math.PI/180;
    }


    function disc(x,y,r){
        ctx.beginPath();
        ctx.arc(x,y,r,0,ang(360));
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
    }

    // function doRball(deg){
    //     ctx.beginPath();
    //     ctx.save();
    //     ctx.globalCompositeOperation="destination-over";
    //     ctx.translate(300,150);
    //     ctx.rotate(deg);
    //     ctx.moveTo(0,0);
    //     ctx.lineTo(0,line);
    //     ctx.strokeStyle="pink";
    //     ctx.stroke();
    //     ctx.beginPath();
    //     ctx.globalCompositeOperation="source-over";
    //     disc(0,line,10);
    //     ctx.restore();
    // }

    // function doArr(){
    //     for(var i=0;i<arr.length;i++){
    //         arr[i]+=1;
    //         doRball(arr[i]);
    //     }
    //     console.log(arr)
    // }
    var timer = setInterval(reDraw,10)
})
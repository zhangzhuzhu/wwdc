window.onload = function(){

    var oCanvas = document.getElementById('canvas');
    var oC = document.getElementById('jCanvaScript');
    var oGC = oC.getContext('2d');
    var width=0;
    var oR =0;
    var oRW = 0;//外层方形宽度
    var oCR = 0;//外层圆形半径
    var mCR =0;//中间层直径
    var cSW = 0;//中心层转的方形宽度
    var cLW = 0;//中心层文字的方形宽度
    var center = 0;//中心位置
    var color=null;//初始化颜色
    var logoW=0;
    var outLayerPos=[];//最外层位置和颜色，均记录中心位置
    var middleLayerPos=[];//中间层位置和颜色
    var timer = null;
    var outerNum = 0;
    var middleNum=0;
    var centerNum = 0;
    var preRotate = 0.504;

    //页面初始化
    init();

    /*var middleCircle =[
        {'fill':'rgba(16, 63, 236, 0.75)',x:mCR*Math.cos(135*Math.PI/180),y:mCR*Math.sin(135*Math.PI/180)},
        {'fill':'rgba(37, 172, 162, 0.75)',x:mCR*Math.cos(90*Math.PI/180),y:mCR*Math.sin(90*Math.PI/180)},
        {'fill':'rgba(233, 124, 32, 0.75)',x:mCR*Math.cos(45*Math.PI/180),y:mCR*Math.sin(45*Math.PI/180)},
        {'fill':'rgba(235, 67, 35, 0.75)',x:mCR*Math.cos(0*Math.PI/180),y:mCR*Math.sin(0*Math.PI/180)},
        {'fill':'rgba(190, 28, 65, 0.75)',x:mCR*Math.cos(-45*Math.PI/180),y:mCR*Math.sin(-45*Math.PI/180)},
        {'fill':'rgba(208, 57, 159, 0.75)',x:mCR*Math.cos(-90*Math.PI/180),y:mCR*Math.sin(-90*Math.PI/180)},
        {'fill':'rgba(150, 32, 198, 0.75)',x:mCR*Math.sin(-135*Math.PI/180),y:mCR*Math.sin(-135*Math.PI/180)},
        {'fill':'rgba(95, 33, 203, 0.75)',x:mCR*Math.cos(-180*Math.PI/180),y:mCR*Math.sin(-180*Math.PI/180)}
    ]

    var outerElem=[
        {'fill':'rgba(16, 63, 236, 0.75)',x:oR*Math.cos(135*Math.PI/180),y:oR*Math.sin(135*Math.PI/180)},
        {'fill':'rgba(37, 172, 162, 0.75)',x:oR*Math.cos(90*Math.PI/180),y:oR*Math.sin(90*Math.PI/180)},
        {'fill':'rgba(233, 124, 32, 0.75)',x:oR*Math.cos(45*Math.PI/180),y:oR*Math.sin(45*Math.PI/180)},
        {'fill':'rgba(235, 67, 35, 0.75)',x:oR*Math.cos(0*Math.PI/180),y:oR*Math.sin(0*Math.PI/180)},
        {'fill':'rgba(190, 28, 65, 0.75)',x:oR*Math.cos(-45*Math.PI/180),y:oR*Math.sin(-45*Math.PI/180)},
        {'fill':'rgba(208, 57, 159, 0.75)',x:oR*Math.cos(-90*Math.PI/180),y:oR*Math.sin(-90*Math.PI/180)},
        {'fill':'rgba(150, 32, 198, 0.75)',x:oR*Math.sin(-135*Math.PI/180),y:oR*Math.sin(-135*Math.PI/180)},
        {'fill':'rgba(95, 33, 203, 0.75)',x:oR*Math.cos(-180*Math.PI/180),y:oR*Math.sin(-180*Math.PI/180)}
    ]
    */

    //原生Canvas写法
    function init(){
        //设置canvas大小；
        setCanvasWidth();
        initWidth();
        //窗口大小发生变化事件监测
        window.addEventListener('resize',function(){
            setCanvasWidth();
            initWidth();
        });

        //初始化中间圆形位置和颜色
        color =[
            'rgba(16, 63, 236, 0.75)',
            'rgba(37, 172, 162, 0.75)',
            'rgba(233, 124, 32, 0.75)',
            'rgba(235, 67, 35, 0.75)',
            'rgba(190, 28, 65, 0.75)',
            'rgba(208, 57, 159, 0.75)',
            'rgba(150, 32, 198, 0.75)',
            'rgba(95, 33, 203, 0.75)'
        ];

        //初始化外层圆形方形的位置和颜色

        for(var i = 0;i<8;i++){
            var outerObj ={};
            outerObj.x = oR*Math.cos((3-i)*45*Math.PI/180);
            outerObj.y = oR*Math.sin((3-i)*45*Math.PI/180);
            outerObj.fill=color[i];
            outLayerPos.push(outerObj);

            var middleObj ={};
            middleObj.x =mCR*Math.cos((3-i)*45*Math.PI/180);
            middleObj.y =mCR*Math.sin((3-i)*45*Math.PI/180);
            middleObj.fill=color[i];
            middleLayerPos.push(middleObj);


        }

        setMiddleLayer();
        setOuterLayer();
        setCenterRectMove();
        setCenterRectText();
//      开启定时器
        startRotate();

        


    }

    function initWidth(){
        oR =(165/420)*width;
        oRW = (60/420)*width;//外层方形宽度
        oCR = (30/420)*width;//外层圆形半径
        mCR =(80/420)*width;//中间层直径
        cSW = (160/420)*width;//中心层转的方形宽度
        cLW = (180/420)*width;//中心层文字的方形宽度
        logoW =(40/420)*width;
        center = 0.5*width;//中心位置
    }

    //中间圆形

    function setMiddleLayer(){
        for(var i = 0;i<8;i++){

            oGC.save();
            oGC.beginPath();
            oGC.fillStyle=middleLayerPos[i].fill;
            oGC.arc(center+middleLayerPos[i].x,center+middleLayerPos[i].y,mCR,0,2*Math.PI);
            oGC.closePath();
            oGC.fill();
            oGC.restore();
        }
    }

    //最外层圆形

    function setOuterLayer(){
        for(var i =0;i<8;i++){
            oGC.beginPath();
            if(i%2==0){
                oGC.save();
                oGC.beginPath();
                oGC.arc(center+outLayerPos[i].x,center+outLayerPos[i].y,oCR,0,2*Math.PI);
                oGC.fillStyle=outLayerPos[i].fill;
                oGC.closePath();
                oGC.fill();
                oGC.restore()

            }else{
                rectRadius(outLayerPos[i].x,outLayerPos[i].y,6,oCR,outLayerPos[i].fill,45)
            }

        }
    }
    // 设置中心层转动的方块
    function setCenterRectMove(){
        rectRadius(0,0,15,cSW/2,'rgba(30, 7, 66, 0.65)',45);
    }
    // 设置中心层不转动的方块
    function setCenterRectText(){
        rectRadius(0,0,15,cLW/2,'rgba(30, 7, 66, 0.65)',0);
        // 设置logo图标
        var oImg = document.createElement('img');
        oImg.src = './logo.gif';
        oGC.drawImage(oImg,center-logoW/2,center-1.7*logoW,logoW,logoW);
        // 设置文字
        oGC.fillStyle="#fff";
        oGC.font=23/420*width+'px Georgia';
        oGC.fillText('The epicenter',center-68/420*width,center+5/420*width);
        oGC.fillText('of change.',center-50/420*width,center+38/420*width);
        oGC.font=16/420*width+'px Georgia';
        oGC.fillText('wwdc 15',center-34/420*width,center+70/420*width);
    }

// 带圆角的矩形
    function rectRadius(x,y,r,R,color,rotate) {
        var dis = R - r;
        var transX= x+center;
        var transY=y+center;
        oGC.save();
        oGC.fillStyle=color;
        oGC.translate(transX,transY);
        oGC.rotate(rotate*Math.PI/180);
        oGC.translate(-transX,-transY);
        oGC.beginPath();
        oGC.moveTo(transX-dis,transY-R);           // 创建开始点
        oGC.lineTo(transX+dis,transY-R);          // 创建水平线
        oGC.arc(transX+dis,transY-dis,r,-90*Math.PI/180,0); // 创建弧
        oGC.lineTo(transX+R,transY+dis);
        oGC.arc(transX+dis,transY+dis,r,0,90*Math.PI/180); // 创建弧
        oGC.lineTo(transX-dis,transY+R);
        oGC.arc(transX-dis,transY+dis,r,90*Math.PI/180,180*Math.PI/180); // 创建弧
        oGC.lineTo(transX-R,transY-dis);
        oGC.arc(transX-dis,transY-dis,r,180*Math.PI/180,270*Math.PI/180); // 创建弧
        oGC.closePath();
        oGC.fill();
        oGC.restore();

    }

    //设置canvas大小
    function setCanvasWidth(){
        width = oCanvas.clientWidth;
        oC.height=oC.width = width;

    }
    // canvas画布旋转
    function canvasRotate(rotate,layer){
        oGC.save();  
        oGC.translate(center,center);
        oGC.rotate(rotate/180*Math.PI);
        oGC.translate(-center,-center);
        switch(layer){
            case 'outer':
                setOuterLayer();    
                break;
            case 'middle':
                setMiddleLayer();
                break;
            case 'center':
                setCenterRectMove();
                break;    

        }
        oGC.restore();


    }
// 开启旋转功能
    function startRotate(){
        clearInterval(timer);
        timer = setInterval(function(){
            if(middleNum==1000000000000){
               clearInterval(timer); 
            }

            middleNum++;
            if(middleNum%2==0){
                outerNum++;
            }
            if(middleNum%3==0){
                centerNum++;
            }
            oGC.clearRect(0,0,width,width);

            canvasRotate(preRotate*middleNum,'middle');
            canvasRotate(preRotate*outerNum,'outer');
            canvasRotate(preRotate*centerNum,'center');      
            setCenterRectText();
        },20)


    }
}
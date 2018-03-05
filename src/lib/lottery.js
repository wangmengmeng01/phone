export default class Lottery {
    constructor(id, cover, coverType, width, height, drawPercentCallback){
        this.conId = id;
        this.conNode = document.getElementById(this.conId);
        this.cover = cover;
        this.coverType = coverType;
        this.background = null;
        this.backCtx = null;
        this.mask = null;
        this.maskCtx = null;
        this.lottery = null;
        this.lotteryType = 'image';
        this.width = width;
        this.height = height;
        this.clientRect = null;
        this.text = null;
        this.drawPercentCallback = drawPercentCallback;
    }
    init (lottery, text, lotteryType) {
        this.lottery = lottery;
        this.text = text;
        this.lotteryType = lotteryType || 'image';
        this.drawLottery();
    }
   createElement (tagName, attributes) {
        var ele = document.createElement(tagName);
        for (var key in attributes) {
            ele.setAttribute(key, attributes[key]);
        }
        return ele;
    }
    getTransparentPercent(ctx, width, height) {
        var imgData = ctx.getImageData(0, 0, width, height),
            pixles = imgData.data,
            transPixs = [];
        for (var i = 0, j = pixles.length; i < j; i += 4) {
            var a = pixles[i + 3];
            if (a < 128) {
                transPixs.push(i);
            }
        }
        var point = parseInt(transPixs.length / (pixles.length / 4) * 100);
        return  this
    }
    resizeCanvas (canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').clearRect(0, 0, width, height);
    }
    drawPoint (x, y) {
        this.maskCtx.beginPath();
        var radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
        radgrad.addColorStop(0, 'rgba(0,0,0,0.6)');
        radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.maskCtx.fillStyle = radgrad;
        this.maskCtx.arc(x, y, 30, 0, Math.PI * 2, true);
        this.maskCtx.fill();
        if (this.drawPercentCallback) {
            this.drawPercentCallback.call(null, this.getTransparentPercent(this.maskCtx, this.width, this.height));
        }
    }
    bindEvent () {
        var _this = this;
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var clickEvtName = device ? 'touchstart' : 'mousedown';
        var moveEvtName = device? 'touchmove': 'mousemove';
        if (!device) {
            var isMouseDown = false;
            document.addEventListener('mouseup', function(e) {
                isMouseDown = false;
            }, false);
        } else {
            document.addEventListener("touchmove", function(e) {
                if (isMouseDown) {
                    e.preventDefault();
                }
            }, false);
            document.addEventListener('touchend', function(e) {
                isMouseDown = false;
            }, false);
        }
        this.mask.addEventListener(clickEvtName, function (e) {
            isMouseDown = true;
            var docEle = document.documentElement;
            if (!_this.clientRect){
                _this.clientRect = {
                    left: 0,
                    top:0
                };
            }
            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
            _this.drawPoint(x, y);
        }, false);

        this.mask.addEventListener(moveEvtName, function (e) {
            if (!device && !isMouseDown) {
                return false;
            }
            var docEle = document.documentElement;
            if (!_this.clientRect) {
                _this.clientRect = {
                    left: 0,
                    top:0
                };
            }
            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
            _this.drawPoint(x, y);
        }, false);
    }
    drawLottery () {
        this.background = this.background || this.createElement('canvas', {
            style: 'position:absolute;left:0;top:0;width:200px;height:100px'
        });
        this.mask = this.mask || this.createElement('canvas', {
            style: 'position:absolute;left:0;top:0;'
        });

        if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
            this.conNode.appendChild(this.background);
            this.conNode.appendChild(this.mask);
            this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
            this.bindEvent();
        }

        this.backCtx = this.backCtx || this.background.getContext('2d');
        this.maskCtx = this.maskCtx || this.mask.getContext('2d');

        if (this.lotteryType == 'image') {//如果底下被遮住的是图片
            var image = new Image();
                _this = this;
            image.onload = function () {
                _this.width = this.width;
                _this.height = this.height;
                _this.resizeCanvas(_this.background, this.width, this.height);
                _this.backCtx.drawImage(this, 0, 0);
                _this.drawMask();
            };
            image.src = this.lottery;
        } else if (this.lotteryType == 'text') {//如果底下被遮住的是文字
            // this.width = this.width;
            // this.height = this.height;
            // this.resizeCanvas(this.background, this.width, this.height);
            // this.backCtx.save();
            // this.backCtx.fillStyle = '#fff4d9';
            // this.backCtx.fillRect(0, 0, this.width, this.height);
            // this.backCtx.restore();
            // this.backCtx.save();
            // var fontSize = 20;
            // this.backCtx.font = 'Bold ' + fontSize + 'px Arial'; // 第一行字体大小
            // this.backCtx.textAlign = 'center'; 
            // this.backCtx.fillStyle = '#F60'; //第一行字体颜色
            // this.backCtx.fillText(this.lottery, this.width / 2, this.height / 3 + fontSize / 2);
            // this.backCtx.font  = '12px Verdana';  // 第二行字体大小
            // this.backCtx.fillStyle = '#999'; //第二行字体颜色
            // this.backCtx.fillText(this.text, this.width/2, this.height-10);
            // this.backCtx.restore();
            this.drawMask();
        }
    }
    drawMask() {
        this.resizeCanvas(this.mask, this.width, this.height);
        if (this.coverType == 'color') {
            this.maskCtx.fillStyle = this.cover;
            this.maskCtx.fillRect(0, 0, this.width, this.height);
            this.maskCtx.globalCompositeOperation = 'destination-out';
        } else if (this.coverType == 'image'){
            var image = new Image(),
                _this = this;
            image.onload = function () {
                _this.maskCtx.drawImage(this, 0, 0);
                _this.maskCtx.globalCompositeOperation = 'destination-out';
            };
            image.src = this.cover;
        }
    }

}
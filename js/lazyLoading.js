let loadLazyImg = function (){
    this.time = 250;
    this.copyList = [];
    this.imgList = [];
    this.offset = 0;
}

loadLazyImg.prototype = {
    _delay:function (selector) {
        let delay,
            self  = this;
        for(var i = 0 ; i<selector.length ;i++){
            self.imgList[i]=selector[i];
            self.copyList[i] = self.imgList[i];
        }
        self.imgList = Array.apply(null,self.imgList);
        self.copyList = Array.apply(null,self.copyList);
        clearTimeout(delay);
        delay = setTimeout(function () {
            self._loadImg();
        })
    },
    _loadImg:function () {
        for(var i = 0; i<this.imgList.length;i++){
            if(this._isShow(this.imgList[i])&&this.imgList[i].src.indexOf("img_bg")>-1){
                this.imgList[i].src = this.imgList[i].getAttribute("data-src");
                this.copyList.splice(i,1);
            }
        }
    },
    _isShow:function (el) {
       var coords = el.getBoundingClientRect();
        return  ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(this.offset));
    },
    _imgLoad:function (selector) {
        let self = this;
        window.addEventListener('scroll',function(){self._delay(selector)},false);
        self._delay(selector);
    }
}

window.lazyloadImg = function (selector) {
   let lazyObj;
   if (lazyObj == undefined || lazyObj == null) {
        lazyObj = new loadLazyImg();
        lazyObj._imgLoad(selector);
   }
}
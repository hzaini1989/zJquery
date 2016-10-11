
/*
created by huangzhao  2016/10/11
    众信 js api, 
    version:1.0.0

    提示：zJquery库 只是提供了部分选择器和一些事件，如有不全，纯属正常；如有补充，请记得更改版本号version！！
 */
;(function(){
    var $ =  function(args){
        return new _$(args);
    }

    function _$(args){
        this.elements = [];    // 创建一个elements数组，来保存获取的节点和节点数组----后面会经常用到
        if(typeof args == 'string'){
            // css模拟
            if(args.indexOf(' ') != -1){
                var elements = args.split(' '); // 把节点拆开分别保存到数组中
                var childElements = [];  // 存放临时节点对象的数组，解决被覆盖的问题；
                var node = [];              // 用来存放父节点
                for(var i = 0;i < elements.length;i++ ){
                    if(node.length == 0){
                        node.push(document);  // 如果没有父节点，就把document放入
                    }
                    switch (elements[i].charAt(0)){
                        case '#':
                            childElements =[];   // 清理掉临时节点，以便父节点失效，子节点有效
                            childElements.push(this.getId(elements[i].substring(1))) ;
                            node = childElements;  // 保存父节点，因为childElements要清理，所以需要创建node数组；
                            break;
                        case '.':
                            childElements = [];
                            for(var j= 0;j<node.length;j++){
                                var temps = this.getClass(elements[i].substring(1),node[j]);
                                for(var k =0;k<temps.length;k++){
                                    childElements.push(temps[k]);
                                }
                            }
                            node = childElements;
                            break;
                        default :
                            childElements = [];
                            for(var j=0;j<node.length;j ++){
                                var temps = this.getTagName(elements[i],node[j]);
                                for(var k= 0; k< temps.length;k++){
                                    childElements.push(temps[k]);
                                }
                            }
                            node = childElements;
                    }
                }
                this.elements = childElements;
            }else{
                // find 模拟
                switch (args.charAt(0)){
                    case '#' :
                        this.elements.push(this.getId(args.substring(1)));
                        break;
                    case '.' :
                        this.elements = this.getClass(args.substring(1));
                        break;
                    default :
                        this.elements = this.getTagName(args);
                }
            }
        }else if ( typeof args =='object'){
            if(args != undefined){  // _this是一个对象，undefiend 也是一个对象，区别于typeof返回的带单引号的‘undefind’
                this.elements[0] = args;
            }
        }else if(typeof args =='function'){
            this.ready(args);
        }
    }
    _$.prototype = {
        constructor:_$,
        ready:function(fn){
           // 待 todo...
        }, 
        inArray:function(array,val){  // 查看值是否在数组中 存在返回索引 不存在返回-1
            var index = -1;
            for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] === val) {
                            return i;
                    }
            }
            return index;
        },
        // 事件监听
        addEvent:function(obj,type,fn){
            if(obj.addEventListener){
                obj.addEventListener(type,fn,false);
            }else if(obj.attachEvent){
                obj.attachEvent('on'+type,fn); //为了在IE8以及更早版本中运行，此事件类型比较加上"on"前缀－－（大家了解就行，移动端无需考虑）
            }else{
                obj['on'+type] = fn;           //使用DOM0级方法（可忽略）
            }
        },
        removeEvent:function(element,type,handler){
            if(element.removeEventListener){
                element.removeEventListener(type,handler,false);
            }else if(element.detachEvent){
                element.detachEvent('on'+type,handler);
            }else{
                element['on'+type] = null;
            }
        },
        // 获取id节点
        getId:function(id){
            return document.getElementById(id);
        },
        // 获取元素节点数组
        getTagName:function(tag,parentNode){
            var node = null,temps = [];
            if(parentNode != undefined){
                node  = parentNode;
            }else{
                node = document;
            }
            var tags = node.getElementsByTagName(tag);
            for (var i =0;i< tags.length; i++){
                temps.push(tags[i]);
            }
            return temps;
        },
        // 获取class节点数组
        getClass:function(className,parentNode){
            var node = null,temps = [];
            if (parentNode != undefined){
                node = parentNode;
            }else {
                node = document;
            }
            var all = node.getElementsByTagName('*');
            for(var i =0; i< all.length; i++){
                if (all[i].className == className){
                    temps.push(all[i]);
                }
            }
            return temps;
        },
        // 获取style---即 css 样式
        getStyle:function(ele,attr){
            var value;
            if(typeof window.getComputedStyle != 'undefined'){    // w3c
                value = window.getComputedStyle(ele,null)[attr];
            }else if(typeof ele.currentStyle != 'undefined'){
                value = ele.currentStyle[attr];
            }
            return value;
        },
        // 设置css选择器子节点   find查找
        find:function(str){
            var childElements = [];
            for (var i =0,len=this.elements.length; i< len; i++){
                switch (str.charAt(0)){     //charAt() 方法可返回指定位置的字符
                    case '#' :
                        childElements.push(this.getId(str.substring(1)));
                        break;
                    case '.' :
                        var temps = this.getClass(str.substring(1),this.elements[i]);
                        for (var j=0;j< temps.length;j++){
                            childElements.push(temps[j]);
                        }
                        break;
                    default :  // 即标签查找
                        var temps = this.getTagName(str,this.elements[i]);
                        for (var j=0; j< temps.length;j++){
                            childElements.push(temps[j]);
                        }
                }
            }
            this.elements = childElements;
            return this;
        },
        // 获取某一个节点，并返回这个节点对象
        ge:function(num){
            return this.elements[num];
        },
        // 获取首个子元素，并返回这个节点对象
        first:function(){
            return this.elements[0];
        },
        // 获取最后一个子元素，并返回这个节点对象
        last:function(){
            return this.elements[this.elements.length - 1];
        },
        // 获取某一个节点，并且_$对象
        eq:function(num){
            var element = this.elements[num];
            this.elements = [];
            this.elements[0] = element;
            return this;
        },
        // 获取数组的长度
        length:function(){
            return this.elements.length;
        },
        // index 获取下标
        index:function(){
            var children = this.elements[0].parentNode.children;
            for(var i= 0,len= children.length; i<len;i++){
                if(this.elements[0] == children[i]){
                    return i;
                }
            }
        },
        // 获取下一个子节点
        next:function(){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.elements[i] = this.elements[i].nextSibling;
                if(this.elements[i] == null){
                    throw new Error('没有找到下一个节点');//  抛出error
                }
                if(this.elements[i].nodeType == 3){
                    this.next();
                }
            }
            return this;
        },
        // 获取上一个子节点
        prev:function(){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.elements[i] = this.elements[i].prevSibling;
                if(this.elements[i] == null){
                    throw new Error('没有找到上一个节点');// 控制台抛出error
                }
                if(this.elements[i].nodeType == 3){
                    this.prev();
                }
            }
            return this;
        },
        // parent 获取父节点----目前只支持父节点（用的时候需要注意）
        parent:function(ele){
            var parents=[];
            for(var i =0,len=this.elements.length;i<len;i++){
                if(this.elements[i].parentNode && this.inArray(parents,this.elements[i]) === -1){
                    parents.push(this.elements[i].parentNode);
                }
            }
            return parents;

        },
        // 设置css
        css:function(attr,value){
            for (var i =0,len=this.elements.length;i<len;i++){
                if (arguments.length ==1){
                    return this.getStyle(this.elements[i],attr);
                }
                this.elements[i].style[attr] = value;
            }
            return this;
        },
        // hasClass
        hasClass:function(element,className){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));   // \s 元字符用于查找空白字符
            }
            return this;
        },
        // 添加class
        addClass :function (className){
            for (var i =0,len=this.elements.length;i<len;i++) {
                if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
                    this.elements[i].className += ' ' + className;
                }
            }
            return this;
        },
        // 移除class
        removeClass:function(className){
            for (var i =0,len=this.elements.length;i<len;i++) {
                if (this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
                    this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
                }
            }
            return this;
        },
        // toggleclass  切换class状态
        toggleClass:function(className){
            for(var i =0,len=this.elements.length;i<len;i++){
                if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
                    this.removeClass(className);
                }else{
                    this.addClass(className);
                }
            }
            return this;
        },
        // remove 删除元素
        remove:function(){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.elements[i].parentNode.removeChild(this.elements[i]);
            }
            return this;
        },
        // appendDom 
        appendDom:function(el,position,str){
            el.insertAdjacentHTML(position,str);
        },
        // append 追加内容
        append:function(str){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.appendDom(this.elements[i],'beforeend',str);
            }
            return this;
        },
        // 在某个元素之前追加  before
        before:function(str){
            for(var i =0,len=this.elements.length;i<len;i++){
                this.appendDom(this.elements[i],'beforebegin',str);
            }
            return this;
        },
        // 设置innerhtml
        html:function(str){
            for (var i =0,len=this.elements.length;i<len;i++){
                if(arguments.length ==0 ){
                    return this.elements[i].innerHTML;
                }
                this.elements[i].innerHTML = str;
            }
            return this;
        },
        // 获取value值
        val:function(str){
            for(var i =0,len=this.elements.length;i<len;i++){
                if(arguments.length == 0){
                    return this.elements[i].value;
                }
                this.elements[i].value = str;
            }
            return this;
        },
        // attribute
        attr:function(str,value){
            for(var i =0,len=this.elements.length;i<len;i++){
                if(arguments.length == 1){
                    return this.elements[i].getAttribute(str);
                }else if(arguments.length ==2){
                    this.arguments[i].setAttribute(str,value);
                }
            }
            return this;
        },
        // 设置显示show
        show:function(){
            for (var i =0,len=this.elements.length;i<len;i++){
                this.elements[i].style.display = 'block';
            }
            return this;
        },
        // 设置隐藏
        hide:function(){
            for (var i =0,len=this.elements.length;i<len;i++){
                this.elements[i].style.display ='none';
            }
            return this;
        },
        // 触发点击事件
        click:function(fn){
            for (var i =0,len=this.elements.length;i<len;i++){
                this.elements[i].onclick = fn;
            }
            return this;
        },
        // 跨浏览器获取浏览器窗口大小
        getInner:function(){
            if(typeof window.innerWidth !='undefined'){
                return {
                    width :window.innerWidth,
                    height:window.innerHeight
                }
            }else {
                return {
                    width :document.documentElement.clientWidth,
                    height :document.documentElement.clientHeight
                }
            }
        },
        // 触发浏览器窗口事件
        resize:function(fn){
            for (var i=0;i<this.elements.length;i++){
                var element = this.elements[i];
                this.addEvent(window,'resize',function(){
                    fn();
                    if(element.offsetLeft > getInner().width - element.offsetWidth){
                        element.style.left = getInner().width - element.offsetWidth + 'px';
                    }
                    if(element.offsetTop > getInner().height - element.offsetHeight){
                        element.style.top = getInner().height - element.offsetHeight + 'px'
                    }
                })
            }
            return this;
        },
        // 阻止事件的默认行为
        preventDefault:function(event){
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }        
        },
        stopPropagation:function(event){
            if (event.stopPrapagation) {
                event.stopPropagation();
            }
            else {
                event.cancelBubble = true;
            }            
        },
        // 事件绑定
        on:function(events,fn){
            for(var i=0;i<this.elements.length;i++){
                this.addEvent(this.elements[i],events,fn);
            }
            return this;
        },
        // 删除前后空格
        trim:function(str){
            return str.replace(/(^\s*) | (\s*$)/g,'');
        },
        // 数组或对象遍历迭代方法
        each:function(obj,callbcak,args){
            var i = 0,
                key,
                length = obj.length,
                isArray = Array.isArray; // es5 判断数组

            if (args) {
                // 存在参数的时候用apply传递参数
                if (isArray(obj)) {
                    for (; i < length; i++) {
                        if (callbcak.apply(obj[i], args) === false) {
                            break;
                        }
                    }
                } else {
                    // obj为对象时用for in循环，能遍历到原型中的属性
                    for (key in obj) {
                        if (callbcak.apply(obj[key], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                // 不存在外部传参时，使用call方法传递参数，回调第一个参数是key，第二个是value
                if (isArray(obj)) {
                    for (; i < length; i++) {
                        if (callbcak.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                } else {
                    for (key in obj) {
                        if (callbcak.call(obj[key], key, obj[key]) === false) {
                            break;
                        }
                    }
                }
            }
            return obj;
        }
    }

    _$.prototype.extend = function(name,fn){
        _$.prototype[name] = fn;
    }

    window.$ = window.$ || $;  // 暴露给全局

    // As you know, if you add your code ,plase update version! Anyway,thank you!
})();























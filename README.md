# zJquery
zJquery这个库，只是针对个人项目对jquery一部分选择器对抽取以及其它的事件，如果不全，实属正常；

构造函数 _$

  实现思路：创建构造函数 _$，最后暴露给全局，以便外部访问；
  
基础函数

  1，$(sel).eq(index)----可以获取下标元素；
  
  2，$(sel).length()----可以获取元素集合大长度；
  
  3，$(sel).first() && $(sel).last() ----获取子元素的首个和最后一个；
  
  4，$(sel).index() ---- 获取元素下标；
  
  5，$(sel).next()  && $(sel).prev() ----获取元素的下一个元素 和上一个元素；
  
  6，$(sel).parent()  ---- 获取元素的父元素
  
     如：$('div1').parent('.allDiv');
     
  7，$(sel).addClass(className) && $(sel).removeClass(className);
  
      增加calss 或者 移除class
  
  8，$(sel).toggleClass(className);
  
      切换class状态
  
  9，$(sel).remove() ---- 删除某个元素  如 $('div').remove()
  
  10，$().each(obj,callback,args) --- 此方法只能循环遍历数组，不支持元素遍历；
  
      var arr = ['andy','jack','lucy']
      
      $().each(arr,function(index,val){
      
          console.log(index,val);
      
      })
      
插件引入入口的调用

    extend(name,fn);实现在prototype上扩展，需要两个参数，一个是插件名称name 和 函数fn；
    
    在外部引入的时候，通过$().extend(name,function(){....})  ;
    
本文档，提供了部分api的用法，其它用法基本和jquery类似；


   
  
  
  
  
  

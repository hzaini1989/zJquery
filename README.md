# zJquery
zJquery这个库，只是针对个人项目对jquery一部分选择器对抽取以及其它的事件，如果不全，实属正常；

构造函数_$
  实现思路：创建构造函数_$，最后暴露给全局，以便外部访问；
  
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
      
   
  
  
  
  
  

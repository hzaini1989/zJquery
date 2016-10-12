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



以下是关于js规范－－－及时更新中！！！

/*
    关于 众信 前端js 书写规范－－－目的是为了方便前后端看起来方便，减少沟通成本！

    1，统一采用闭包的立即执行的方式，不要污染全局变量；
    
        ;（funcction(){
        
            //  to do ...

        }）(window)
        
    2，不要污染全局变量，尽量采用局部变量的；

        ;（function(){
        
        不规范的书写方式：
        
            var name = 'andy';
            
            var age = 'lcuy';
            
            ....

            function createNums(params) {
            
                var sex = 'boy';
                
                var city = 'BeiJing';
                
                ...
                
            }

        规范的书写方式：

            统一的类型可以new 一个公共函数

            function createPeople(){
                var name = 'andy',
                    age = 'lcuy',
                    sex = 'boy',
                    city = 'BeiJing';
            }

        }）(window)；
    
    3，为了区分全局变量和局部变量，书写方式如下：

        全局变量采用 $ 符   如  var  $name = 'andy';
        
        局部变量采用 _ 符   如  var  _age = '30';

    4，不要想当然的创建过多的函数，统一放到一个位置，或在原型里添加：
    
        若是构造函数，首字母要大写

        var Union_config = function(){

            create:function(){
            
                var Union_config = function(){
                    
                    init:function(){   //  初始化函数
                        ....
                        
                    },
                    
                    sumbit:function(){  //  提交表单信息
                        ...
                        
                    },

                    ...
                    
                    ...

                };

                return Union_config;
                
            }

        };

        var myUnion = Union_config.create();  //  调用函数
        
        以下可以按需调用函数方法；

        myUnion.sumbit();  
        
        ...

    5，注释！！！－－－为了方便其它同事，自己写代码的时候一定要写注释；

    6，链式调用以及其它用法

      如：
      
      $('.div1').html('');
      
      $('.div2').html('');

      可以写成： $('.div1,.div2').html('');

      如：
      
      $('.div1').css('color','red');
      
      $('.div1').addClass('active');

      可以写成： $('.div1').css('color','red').addClass('active');  //  可以采用链式
    
    7，函数命名统一采用驼峰命名法

        如：
        
        function createNums(){
        
            //....
            
        }
    8，


 */






   
  
  
  
  
  

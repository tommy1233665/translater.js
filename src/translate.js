var Translate = function(option,callback){
    // 默认给URL参数 ?lang=en
    this.lang_key = (option && option.lang) || 'lang';
    // 回调函数
    this.callback = callback || function(){};
    this.langs = getElems() || []
}
// 获取所有节点里面的注释信息
// 返回一个数组
function getElems(){
    var str = document.getElementById("box").innerHTML;
    var str1 = str.replace(/<.*>(.*)<.*>/i,"$1"); 
    var str2 = str.replace(/^.*<!--(.*)-->.*$/,"$1");

    var elems = getTextNodes(document);
    for (var i = 0; i < elems.length; i++) {
        elems[i].nodeValue = trim(elems[i].nodeValue)
        if(elems[i].nodeValue !== ''){
            console.log("=="+i,elems[i]);
        };
    }
}

//过滤左右的空格以及换行符
function trim(text) {
    return "" + (null == text ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "").replace(/[\r\n]+/g,""));
}

//兼容的获取简单方案
var getTextNodes = window.NodeFilter?function(e){
    //支持TreeWalker的浏览器
    var r=[],o,s;
    s=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,null);
    while(o=s.nextNode())r.push(o); //遍历迭代器
    return r;
}:function(e){
    //不支持的需要遍历
    switch(e.nodeType){
      case 3:return [e]; //注释节点直接返回
      case 1:case 9: //文档或元素需要遍历子节点
        var i,s=e.childNodes,result=[];
        for(i=0;i<s.length;i++) //递归每个子节点
          getTextNodes(s[i]) && result.push(getTextNodes(s[i]));
        return Array.prototype.concat.apply([],result); //合并子数组
    };
};

Translate.prototype = {
    setLang:function(name){
        console.log('dd')
    }
}
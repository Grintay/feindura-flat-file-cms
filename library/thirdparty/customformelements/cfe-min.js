/*
LICENCE INFORMATION ON Custom Form Elements
****************************************************

Custom Form Elements (CFE) for mootools 1.2 - style form elements on your own
by Maik Vlcek (http://www.mediavrog.net)

Copyright (c) Maik Vlcek (mediavrog.net)

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.

The file GNU.txt contains the complete license text.
If this package didn't come with an GNU.txt, you may
get the full text on http://www.gnu.org/licenses/gpl.html
*/
var cfe={};cfe.module={};cfe.addon={};cfe.version="0.9.3";cfe.spacer="spacer.gif";cfe.generic=new Class({Implements:[new Options,new Events],type:"Generic",options:{instanceID:0,spacer:"",aliasType:"span",replaces:null,label:null,name:"",disabled:false,onMouseOver:Class.empty,onMouseOut:Class.empty,onFocus:Class.empty,onBlur:Class.empty,onClick:Class.empty,onPress:Class.empty,onRelease:Class.empty,onUpdate:Class.empty,onEnable:Class.empty,onDisable:Class.empty},initialize:function(a){this.setOptions(this.options,a);if(!this.options.spacer){this.options.spacer=cfe.spacer}this.buildWrapper.bind(this)();this.setupOriginal();this.addLabel($pick(this.o.getLabel(),this.setupLabel(this.options.label)));this.initializeAdv();this.build()},getAlias:function(){return this.a},getLabel:function(){return this.l},getFull:function(){return[this.l,this.a]},buildWrapper:function(){this.a=new Element(this.options.aliasType);this.setupWrapper()},setupWrapper:function(){this.a.addClass("js"+this.type).addEvents({mouseover:this.hover.bind(this),mouseout:this.unhover.bind(this),mousedown:this.press.bind(this),mouseup:this.release.bind(this),disable:this.disable.bind(this),enable:this.enable.bind(this)}).setStyle("cursor","pointer")},setupOriginal:function(){if($defined(this.options.replaces)){this.o=this.options.replaces;this.a.addClass("js"+this.o.id).inject(this.o,"before")}else{this.o=this.createOriginal();if(this.options.id){this.o.setProperty("id",this.options.id)}if(this.options.disabled){this.o.disable()}if(this.options.name){this.o.setProperty("name",this.options.name);if(!$chk(this.o.id)){this.o.setProperty("id",this.options.name+this.options.instanceID)}}if(this.options.value){this.o.setProperty("value",this.options.value)}this.a.adopt(this.o)}if($chk(this.o.name)){this.o.setProperty("clearname",this.o.name.replace("]","b-.-d").replace("[","d-.-b"))}this.o.addEvents({focus:this.setFocus.bind(this),blur:this.removeFocus.bind(this),change:this.update.bind(this),keydown:function(a){if(new Event(a).key=="space"){this.press()}}.bind(this),keyup:function(a){if(new Event(a).key=="space"){this.release()}}.bind(this),onDisable:function(){this.a.fireEvent("disable")}.bind(this),onEnable:function(){this.a.fireEvent("enable")}.bind(this)});this.o.store("cfe",this)},isDisabled:function(){return this.o.getProperty("disabled")},createOriginal:function(){return new Element("img",{src:this.options.spacer,"class":"spc"})},hideOriginal:function(){this.o.setStyles({position:"absolute",left:"-9999px",opacity:0.01});if(Browser.Engine.trident&&!Browser.Features.query){this.o.setStyles({width:0,height:"1px"})}},setupLabel:function(){if($defined(this.options.label)){return new Element("label").set("html",this.options.label).setProperty("for",this.o.id)}return null},addLabel:function(a){if(!$defined(a)){return}this.l=a;if(!this.dontRemoveForFromLabel){this.l.removeProperty("for")}this.l.addClass("js"+this.type+"L");if(this.o.id||this.o.name){this.l.addClass("for_"+(this.o.id||(this.o.name+this.o.value).replace("]","-").replace("[","")))}this.l.addEvents({mouseover:this.hover.bind(this),mouseout:this.unhover.bind(this),mousedown:this.press.bind(this),mouseup:this.release.bind(this)});if(!this.o.implicitLabel||(this.o.implicitLabel&&!Browser.Engine.gecko)){this.l.addEvent("click",this.clicked.bindWithEvent(this))}this.addEvents({onPress:function(){this.l.addClass("P")},onRelease:function(){this.l.removeClass("P")},onMouseOver:function(){this.l.addClass("H")},onMouseOut:function(){this.l.removeClass("H");this.l.removeClass("P")},onFocus:function(){this.l.addClass("F")},onBlur:function(){this.l.removeClass("F")},onEnable:function(){this.l.removeClass("D")},onDisable:function(){this.l.addClass("D")}})},initializeAdv:function(){if(!this.o.implicitLabel){this.a.addEvent("click",this.clicked.bindWithEvent(this))}if(this.isDisabled()){this.a.fireEvent("disable")}},build:function(){},press:function(){if(!this.isDisabled()){this.a.addClass("P");this.fireEvent("onPress")}},release:function(){if(!this.isDisabled()){this.a.removeClass("P");this.fireEvent("onRelease")}},hover:function(){if(!this.isDisabled()){this.a.addClass("H");this.fireEvent("onMouseOver")}},unhover:function(){if(!this.isDisabled()){this.a.removeClass("H");this.fireEvent("onMouseOut");this.release()}},setFocus:function(){this.a.addClass("F");this.fireEvent("onFocus")},removeFocus:function(){this.a.removeClass("F");this.fireEvent("onBlur")},clicked:function(){if(!this.isDisabled()){if($chk(this.o.click)){this.o.click()}this.o.focus();this.fireEvent("onClick")}},update:function(){this.fireEvent("onUpdate")},enable:function(){this.a.removeClass("D");this.fireEvent("onEnable")},disable:function(){this.a.addClass("D");this.fireEvent("onDisable")}});Element.Helpers=new Class({disableTextSelection:function(){if(Browser.Engine.trident||Browser.Engine.presto){this.setProperty("unselectable","on")}else{if(Browser.Engine.gecko){this.setStyle("MozUserSelect","none")}else{if(Browser.Engine.webkit){this.setStyle("KhtmlUserSelect","none")}}}},disable:function(){if($type(this)==="element"&&["button","input","option","optgroup","select","textarea"].contains(this.get("tag"))){this.setProperty("disabled",true);this.fireEvent("onDisable");return true}return false},enable:function(){if($type(this)==="element"&&["button","input","option","optgroup","select","textarea"].contains(this.get("tag"))){this.setProperty("disabled",false);this.fireEvent("onEnable");return true}return false},toggleDisabled:function(){if($type(this)==="element"&&["button","input","option","optgroup","select","textarea"].contains(this.get("tag"))){this.setProperty("disabled",!this.getProperty("disabled"));this.fireEvent(this.getProperty("disabled")?"onDisable":"onEnable");return true}return false},getLabel:function(){var a=null;if(this.id){a=$$("label[for="+this.id+"]")[0]}if(!a){a=this.getParents("label")[0];if(a){this.implicitLabel=true}}return a},setSlidingDoors:function(d,c,e){var a=null;var b=this;e=$pick(e,"sd");for(i=d;i>0;i--){a=new Element(c);a.addClass(i==d?e:i==0?e+"Slide":e+"Slide"+i);a.grab(b);b=a}b=null;return a}});Element.implement(new Element.Helpers);cfe.replace=new Class({Implements:[new Options,new Events],options:{scope:false,spacer:"",onInit:$empty,onInitSingle:$empty,onBeforeInitSingle:$empty,onSetModuleOption:$empty,onRegisterModule:$empty,onUnregisterModule:$empty,onComplete:$empty},modules:{},moduleOptions:{},moduleOptionsAll:{},initialize:function(){this.options.spacer=cfe.spacer;this.registerAllModules.bind(this)()},registerAllModules:function(){$each(cfe.module,function(b,a){if(a!="Generic"){this.registerModule(a)}}.bind(this))},registerModule:function(a){modObj=cfe.module[a];this.fireEvent("onRegisterModule",[a,modObj]);this.modules[a]=modObj;this.moduleOptions[a]={};return true},registerModules:function(a){$each(a,function(b){this.registerModule(b)},this)},unregisterModule:function(a){modObj=cfe.module[a];this.fireEvent("onUnregisterModule",[a,modObj]);delete this.modules[a]},unregisterModules:function(a){$each(a,function(b){this.unregisterModule(b)},this)},setModuleOption:function(b,a,c){modObj=cfe.module[b];this.fireEvent("onSetModuleOption",[b,modObj,a,c]);if(!modObj){this.moduleOptionsAll[a]=c}else{this.moduleOptions[b][a]=c}},setModuleOptions:function(b,a){$each(a,function(d,c){this.setModuleOption(b,c,d)}.bind(this))},init:function(a){this.setOptions(this.options,a);if($type(this.options.scope)!="element"){this.options.scope=$(document.body)}this.fireEvent("onInit");$each(this.modules,function(e,c,d){var b=e.prototype.selector;this.options.scope.getElements(b).each(function(g,f){var h={instanceID:f,spacer:this.options.spacer,replaces:g};this.fireEvent("onBeforeInitSingle",[g,f,h]);var j=new e($merge(h,$merge(this.moduleOptions[c],this.moduleOptionsAll)));this.fireEvent("onInitSingle",j)},this)},this);this.fireEvent("onComplete")}});cfe.module.checkbox=new Class({Extends:cfe.generic,type:"Checkbox",selector:"input[type=checkbox]",options:{onCheck:Class.empty,onUncheck:Class.empty},getFull:function(){return[this.a,this.l]},initializeAdv:function(){this.parent();this.hideOriginal();this.o.defaultChecked=this.o.checked;if(Browser.Engine.presto){if(!this.o.implicitLabel){this.a.addEvent("click",this.update.bind(this));if(this.l){this.l.addEvent("click",this.update.bind(this))}}else{this.o.addEvent("click",this.update.bind(this))}}if(Browser.Engine.trident){this.o.addEvent("click",this.update.bind(this))}},createOriginal:function(){return new Element("input",{type:"checkbox",checked:this.options.checked})},build:function(){new Element("img",{src:this.options.spacer,"class":"spc"}).inject(this.a,"top");this.update()},setStateTo:function(a){a?this.check():this.uncheck()},check:function(){this.a.addClass("A");this.fireEvent("onCheck")},uncheck:function(){this.a.removeClass("A");this.fireEvent("onUncheck")},update:function(){this.setStateTo(this.o.checked);this.parent()}});cfe.module.select=new Class({Extends:cfe.generic,type:"Selector",selector:"select:not(select[multiple])",options:{size:4,scrolling:true,scrollSteps:5},initializeAdv:function(){this.parent();this.hideOriginal();this.o.addEvent("keyup",this.keyup.bind(this));this.o.addEvent("keydown",this.keydown.bind(this));this.origOptions=this.o.getChildren();this.selectedIndex=this.o.selectedIndex||0;this.kind=[];if(this.options.size>this.origOptions.length||this.options.scrolling!=true){this.options.size=this.origOptions.length}this.boundWheelListener=this.mouseListener.bindWithEvent(this);this.boundClickedOutsideListener=this.clickOutsideListener.bindWithEvent(this)},createOriginal:function(){var b=new Element("select");if($chk(this.options.options)){for(var a in this.options.options){b.adopt(new Element("option",{value:a,selected:this.options.options[a].selected?"selected":""}).set("html",this.options.options[a].label))}}return b},build:function(){this.a.addClass("js"+this.type+this.options.instanceID);this.arrow=new Element("img",{"class":"js"+this.type+"Arrow",src:this.options.spacer,styles:{"float":"right",display:"inline"}}).injectInside(this.a);this.ai=new Element("span").addClass("js"+this.type+"Slide").injectInside(this.a).adopt(this.arrow);this.activeEl=new Element("span",{"class":"jsOptionSelected",styles:{"float":"left",display:"inline"}}).set("html",this.origOptions[0].get("text")).injectBefore(this.arrow);this.buildContainer();this.selectOption(this.selectedIndex,false,true)},buildOption:function(b,a){var c=new Element("div",{"class":"jsOption jsOption"+a+(b.get("class")?" "+b.get("class"):""),events:{mouseover:this.highlightOption.pass([a,true],this),mouseout:this.highlightOption.pass([a,true],this)}}).set("html",b.innerHTML);c.index=a;c.disableTextSelection();return c},setupScrolling:function(){this.scrollerWrapper=new Element("div",{"class":"js"+this.type+"ScrollerWrapper",styles:{height:this.gfxHeight}}).injectInside(this.cContent);this.scrollerTop=new cfe.generic().getAlias().addClass("scrollTop").addEvent("click",function(a){this.moveScroller.pass(-1*this.options.scrollSteps,this)()}.bind(this));this.scrollerBottom=new cfe.generic().getAlias().addClass("scrollBottom").addEvent("click",function(a){this.moveScroller.pass(this.options.scrollSteps,this)()}.bind(this));this.scrollerKnob=new Element("span",{"class":"scrollKnob spc"});this.scrollerBack=new Element("div");this.scrollerBack.adopt(this.scrollerKnob);this.scrollerWrapper.adopt([this.scrollerTop,this.scrollerBack,this.scrollerBottom]);this.scrollerBack.setStyle("height",this.gfxHeight-2*this.scrollerTop.getFirst().getHeight());this.sliderSteps=this.aliasOptions.getScrollSize().y-(this.options.size*this.aliasOptions.getScrollSize().y/this.aOptions.length);this.slider=new Slider(this.scrollerBack,this.scrollerKnob,{steps:this.sliderSteps,mode:"vertical",onChange:function(a){this.aliasOptions.scrollTo(false,a)}.bind(this)}).set(0)},buildContainer:function(){this.container=new Element("div",{"class":"js"+this.type+"Container",styles:{overflow:"hidden"}});this.container.setSlidingDoors(4,"div","jsSelectorContent").injectInside(this.a);this.cContent=this.container.getParent();this.containerSlide=this.cContent.getParents(".jsSelectorContentSlide1")[0];this.aliasOptions=this.container;if(this.cContent.getStyle("width").toInt()===0){var a=true}this.origOptions.each(function(c,b){this.buildOption(c,b).inject(this.aliasOptions)}.bind(this));this.aOptions=this.aliasOptions.getChildren();this.gfxHeight=this.aOptions[0].getHeight()*this.options.size;this.gfxWidth=this.cContent.getWidth()-(this.cContent.getStyle("padding-left")).toInt()-this.cContent.getStyle("padding-right").toInt();if(this.options.scrolling){this.setupScrolling();this.gfxWidth=this.gfxWidth-this.scrollerWrapper.getWidth()}if(this.gfxHeight!=0){this.aliasOptions.setStyle("height",this.gfxHeight)}if(this.gfxWidth!=0&&!a){this.aliasOptions.setStyle("width",this.gfxWidth)}},selectOption:function(b,a,c){b=b.limit(0,this.origOptions.length-1);this.highlightOption(b,c);this.selectedIndex=b;this.activeEl.set("html",(this.aOptions[b]).innerHTML);if(!$chk(a)){this.hideContainer()}},highlightOption:function(a,b){a=a.limit(0,this.origOptions.length-1);if(this.highlighted){this.highlighted.removeClass("H")}this.highlighted=this.aOptions[a].addClass("H");this.highlightedIndex=a;if(!b){this.scrollToSelectedItem(this.highlightedIndex)}},scrollToSelectedItem:function(a){if(this.options.scrolling){this.slider.set((this.sliderSteps/(this.aOptions.length-this.options.size))*a)}},moveScroller:function(b){var a=this.aliasOptions.getScroll().y;this.slider.set(a+b<this.sliderSteps?a+b:this.sliderSteps)},hideContainer:function(){$(document.body).removeEvent("mousewheel",this.boundWheelListener);$(document.body).removeEvent("click",this.boundClickedOutsideListener);this.containerSlide.setStyle("display","none");this.isShown=false},showContainer:function(){$(document.body).addEvent("mousewheel",this.boundWheelListener);$(document.body).addEvent("click",this.boundClickedOutsideListener);this.containerSlide.setStyles({display:"block",position:"absolute",top:this.a.getTop(),left:this.a.getLeft(),"z-index":1000-this.options.instanceID});this.isShown=true;this.highlightOption(this.o.selectedIndex)},clicked:function(c){if(!this.isDisabled()){var b=new Event(c);if($defined(b.target)){var a=$(b.target);if(a.getParent()==this.aliasOptions){this.selectOption(a.index,true,true);this.hideContainer();this.parent();this.o.selectedIndex=a.index;return}else{if(this.options.scrolling&&a.getParents("."+this.scrollerWrapper.getProperty("class"))[0]==this.scrollerWrapper){return}}}this.toggle();this.parent()}},toggle:function(){$chk(this.isShown)?this.hideContainer():this.showContainer()},keyup:function(b){var a=new Event(b);if(a.alt&&(a.key=="up"||a.key=="down")){this.toggle();return}switch(a.key){case"enter":case"space":this.toggle();break;case"up":this.updateOption(-1);break;case"down":this.updateOption(1);break;case"esc":this.hideContainer();break;default:this.o.fireEvent("change");break}},keydown:function(b){var a=new Event(b);if(a.key=="tab"){this.hideContainer()}},mouseListener:function(b){var a=new Event(b).stop();this.updateOption(-1*a.wheel)},updateOption:function(a){this.o.selectedIndex=(this.highlightedIndex+a).limit(0,this.origOptions.length-1);this.o.fireEvent("change")},clickOutsideListener:function(b){var c=new Event(b);var a=$(c.target).getParents(".js"+this.type+this.options.instanceID);if(a.length===0&&!(Browser.Engine.trident&&c.target==this.o)&&(this.l&&$(c.target)!=this.l)){this.hideContainer()}},update:function(){this.parent();this.selectOption(this.o.selectedIndex,true)}});cfe.module.submit=new Class({Extends:cfe.generic,type:"Submit",selector:"input[type=submit]",options:{slidingDoors:true},initializeAdv:function(){this.parent();this.hideOriginal();this.a.addClass("jsButton")},createOriginal:function(){return new Element("input",{type:"submit"})},build:function(){this.lab=new Element("span").addClass("label").set("html",this.o.value).inject(this.a);this.lab.disableTextSelection();if($chk(this.options.slidingDoors)){var a=new Element("span",{"class":"js"+this.type});a.wraps(this.lab);this.a.addClass("js"+this.type+"Slide").removeClass("js"+this.type).adopt(a)}}});cfe.module.text=new Class({Extends:cfe.generic,type:"Text",selector:"input[type=text]",options:{slidingDoors:2},dontRemoveForFromLabel:true,setupWrapper:function(){this.a.addClass("js"+this.type).addEvents({disable:this.disable.bind(this),enable:this.enable.bind(this)})},createOriginal:function(){return new Element("input",{type:"text"})},build:function(){if($chk(this.options.slidingDoors)){this.a.addClass("js"+this.type+"Slide");this.o.setSlidingDoors(this.options.slidingDoors-1,"span","js"+this.type).inject(this.a);this.o.setStyles({background:"none",padding:0,margin:0,border:"none"})}else{this.a.wraps(this.o)}}});cfe.module.file=new Class({Extends:cfe.generic,type:"File",selector:"input[type=file]",options:{fileIcons:true,trimFilePath:true},getFilePath:function(){return this.v},getFull:function(){return[this.l,this.a,this.v]},initializeAdv:function(){if(!this.o.implicitLabel&&!Browser.Engine.webkit){this.a.addEvent("click",this.clicked.bindWithEvent(this))}if(this.isDisabled()){this.a.fireEvent("disable")}},build:function(){this.a.addEvent("mousemove",this.follow.bindWithEvent(this)).setStyle("overflow","hidden");this.o.inject(this.a);this.initO();this.v=new Element("div",{"class":"js"+this.type+"Path"}).inject(this.a,"after").addClass("hidden");if(this.options.fileIcons){this.fileIcon=new Element("img",{src:this.options.spacer,"class":"fileIcon"}).inject(this.v)}this.path=new Element("span",{"class":"filePath"}).inject(this.v);this.cross=new cfe.generic().addEvent("click",this.deleteCurrentFile.bind(this)).getAlias().addClass("delete").inject(this.v);this.update()},createOriginal:function(){return new Element("input",{type:"file"})},initO:function(){this.o.addEvent("mouseout",this.update.bind(this));this.o.addEvent("change",this.update.bind(this));this.o.setStyles({cursor:"pointer",opacity:"0",visibility:"visible",height:"100%",width:"auto",position:"relative"})},follow:function(b){var a=new Event(b);this.o.setStyle("left",(a.client.x-this.a.getLeft()-(this.o.getWidth()-30)));if(Browser.Engine.trident){if(a.client.x<this.a.getLeft()||a.client.x>this.a.getLeft()+this.a.getWidth()){this.o.setStyle("left",-999)}}},update:function(){if(this.o.value!=""){this.oldValue=this.o.getProperty("value");this.oldValue=this.options.trimFilePath?this.trimFilePath(this.oldValue):this.oldValue;this.path.set("html",this.oldValue);if(this.options.fileIcons){var a=this.oldValue.lastIndexOf(".");this.fileIcon.setProperty("class","fileIcon "+this.oldValue.substring(++a).toLowerCase())}this.v.removeClass("hidden")}else{this.path.set("html","");this.v.addClass("hidden")}this.parent()},deleteCurrentFile:function(){var a=this.createOriginal();a.addClass(this.o.getProperty("class")).setProperties({name:this.o.name,id:this.o.id});a.replaces(this.o);this.o=a;this.initO();this.update()},trimFilePath:function(b){var a=false;if(!(a=b.lastIndexOf("\\"))){if(!(a=b.lastIndexOf("/"))){a=0}}return b.substring(++a)}});cfe.module.image=new Class({Extends:cfe.generic,type:"Image",selector:"input[type=image]",options:{statePrefix:"-cfeState-"},initializeAdv:function(){this.parent();this.a.wraps(this.o);this.stateRegEx=new RegExp(this.options.statePrefix+"([HFP])")},createOriginal:function(){return new Element("input",{type:"image"})},setState:function(b){this.clearState();var a=this.o.src.lastIndexOf(".");this.o.src=this.o.src.substring(0,a)+this.options.statePrefix+b+this.o.src.substring(a)},clearState:function(){this.o.src=this.o.src.replace(this.stateRegEx,"")},hover:function(){this.parent();this.setState("H")},unhover:function(){this.parent();this.clearState();if(this.a.hasClass("F")){this.setState("F")}},setFocus:function(){this.parent();if(!this.a.hasClass("P")){this.setState("F")}},removeFocus:function(){this.parent();this.clearState()},press:function(){this.parent();this.setState("P")},release:function(){this.parent();this.clearState();if(this.a.hasClass("F")){this.setState("F")}},enable:function(){this.parent();this.clearState()},disable:function(){this.parent();this.setState("D")}});cfe.module.password=new Class({Extends:cfe.module.text,type:"Password",selector:"input[type=password]",createOriginal:function(){return new Element("input",{type:"password"})}});cfe.module.radio=new Class({Extends:cfe.module.checkbox,type:"Radiobutton",selector:"input[type=radio]",createOriginal:function(){return new Element("input",{type:"radio",checked:this.options.checked})},initializeAdv:function(){this.parent();if(!(Browser.Engine.trident||Browser.Engine.gecko)){this.o.addEvent("click",this.update.bind(this))}},check:function(){this.parent();$$('input[clearName="'+this.o.getProperty("clearName")+'"]').each(function(a){if(a!=this.o){a.retrieve("cfe").uncheck()}}.bind(this))}});cfe.module.reset=new Class({Extends:cfe.module.submit,type:"Reset",selector:"input[type=reset]",createOriginal:function(){return new Element("input",{type:"reset"})},setupOriginal:function(){this.parent();this.o.addEvent("click",this.notifyReset.bind(this))},notifyReset:function(){(function(){$A(this.o.form.getElements("input, textarea, select")).each(function(a){a.fireEvent("change")})}).delay(40,this)}});cfe.module.select_multiple=new Class({Extends:cfe.module.select,type:"Selector",selector:"select[multiple]",options:{size:4,scrolling:true,scrollSteps:5},build:function(){this.a.addClass("jsSelectorMultiple jsSelectorMultiple"+this.options.instanceID);this.a.removeClass("jsSelector");this.buildContainer();this.o.addEvents({onDisable:function(){this.aliasOptions.getChildren().each(function(a){a.getChildren("input")[0].disable()})}.bind(this),onEnable:function(){this.aliasOptions.getChildren().each(function(a){a.getChildren("input")[0].enable()})}.bind(this)})},buildOption:function(b,a){var c=new cfe.module.checkbox({label:b.innerHTML,checked:$chk(b.selected),aliasType:"div",disabled:this.isDisabled()});c.index=a;c.addEvents({check:function(d){this.origOptions[d].selected=true;this.o.fireEvent("change")}.pass(a,this),uncheck:function(d){this.origOptions[d].selected=false;this.o.fireEvent("change")}.pass(a,this)});c.getAlias().addClass("jsOption jsOption"+a+(b.get("class")?" ".el.get("class"):"")).disableTextSelection();c.getLabel().removeEvents().inject(c.getAlias());return c.getAlias()},selectOption:function(a){a=a.limit(0,this.origOptions.length-1);this.highlightOption(a)},scrollToSelectedItem:function(a){},clicked:function(){if(!this.isDisabled()){this.o.focus();this.fireEvent("onClick")}},update:function(){this.fireEvent("onUpdate")},keyup:function(b){var a=new Event(b);switch(a.key){case"enter":case"space":break;case"up":this.updateOption(-1);break;case"down":this.updateOption(1);break;case"esc":this.hideContainer();break;default:this.o.fireEvent("change");break}},keydown:function(){}});cfe.module.textarea=new Class({Extends:cfe.module.text,type:"Textarea",selector:"textarea",options:{slidingDoors:4},createOriginal:function(){return new Element("textarea")}});cfe.addon.dependencies=new Class({addDependencies:function(a,b){$each(b,function(c){this.addDependency(a,c)}.bind(this));return true},addDependency:function(a,b){if($type(a.retrieve("deps"))!=="array"){a.store("deps",[])}if($type(b)==="string"){b=$(b)}if($type(b)==="element"){a.retrieve("deps").push(b);return true}return false},getDependencies:function(a){return a.retrieve("deps")},attachDependencies:function(c,b,a){var d=this.getDependencies(c);if($type(d)==="array"){a.deps=d;return true}return false}});cfe.replace.implement(new cfe.addon.dependencies);cfe.replace.prototype.addEvent("onBeforeInitSingle",cfe.replace.prototype.attachDependencies);cfe.addon.dependencies.modules=new Class({resolveDependencies:function(){var a=this.o.retrieve("deps");if(a){$each(a,function(c,b){c.checked=true;c.fireEvent("change")}.bind(this))}}});cfe.generic.implement(new cfe.addon.dependencies.modules);cfe.module.checkbox.prototype.addEvent("onCheck",function(){this.resolveDependencies()});cfe.addon.toggleCheckboxes=new Class({selectAll:function(a){(a||$(document.body)).getElements("input[type=checkbox]")[0].each(function(b){if(b.checked!=true){b.checked=true;b.fireEvent("change")}})},deselectAll:function(a){(a||$(document.body)).getElements("input[type=checkbox]")[0].each(function(b){if(b.checked!=false){b.checked=false;b.fireEvent("change")}})}});cfe.replace.implement(new cfe.addon.toggleCheckboxes);cfe.addon.toolTips=new Class({options:$merge(this.parent,{enableTips:true,ttStyle:"label",ttClass:"jsQM"}),initToolTips:function(){if(!window.Tips||!this.options.enableTips){if(this.options.debug){this.throwMsg.bind(this)("CustomFormElements: initialization of toolTips failed.\nReason: Mootools Plugin 'Tips' not available.")}return false}switch(this.options.ttStyle){default:case"label":this.toolTipsLabel.bind(this)();break}return true},toolTipsLabel:function(){var a=this.options.scope.getElements("label");a.each(function(g,d){f=g.getProperty("for");if(!f){var b=g.getProperty("class");if($defined(b)){var f=b.match(/for_[a-zA-Z0-9\-]+/);if(f){f=f.toString();el=$(f.replace(/for_/,""))}}if(!el){el=g.getElement("input")}}else{el=$(f)}if(el){if($chk(qmTitle=el.getProperty("title"))){el.setProperty("title","").setProperty("hint",qmTitle);var e=new Element("img",{src:this.options.spacer,"class":this.options.ttClass,title:qmTitle});var c=g.getElement("span[class=label]");e.injectInside($chk(c)?c:g)}}},this);new Tips($$("."+this.options.ttClass+"[title]"))}});cfe.replace.implement(new cfe.addon.toolTips);cfe.replace.prototype.addEvent("onComplete",function(){this.initToolTips()});
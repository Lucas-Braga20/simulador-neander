(function(t){function e(e){for(var n,a,o=e[0],c=e[1],u=e[2],d=0,m=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&m.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);l&&l(e);while(m.length)m.shift()();return r.push.apply(r,u||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],n=!0,o=1;o<s.length;o++){var c=s[o];0!==i[c]&&(n=!1)}n&&(r.splice(e--,1),t=a(a.s=s[0]))}return t}var n={},i={app:0},r=[];function a(e){if(n[e])return n[e].exports;var s=n[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=n,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(s,n,function(e){return t[e]}.bind(null,n));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/simulador-neander/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";s("85ec")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("Neander")],1)},r=[],a=(s("ce7a"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-simulador-neander"},[s("Instruction",{attrs:{pointerPc:t.programCounter,mem:t.memory,listMnemonic:t.listedMnemonic,componentKey:t.componentInstructionKey},on:{"emit-data":t.updateMemory,"emit-pc":t.refreshValuePc}}),s("div",{staticClass:"container-neander"},[t._m(0),s("div",{staticClass:"container-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"container-result-bin"},[s("table",[t._m(1),s("tbody",[s("tr",[s("td",[t._v("AC:")]),t._l(t.convertBin(t.acumulator),(function(e,n){return s("td",{key:n},[t._v(t._s(e))])}))],2),s("tr",[s("td",[t._v("PC:")]),t._l(t.convertBin(t.programCounter),(function(e,n){return s("td",{key:n},[t._v(t._s(e))])}))],2)])])]),s("div",{staticClass:"container-result-decimal"},[t._m(2),s("div",{staticClass:"result-body"},[s("div",{staticClass:"result-ac"},[s("span",[t._v("AC:")]),s("span",{attrs:{id:"ac-value"}},[t._v(t._s(t.acumulator))])]),s("div",{staticClass:"result-pc"},[s("span",[t._v("PC:")]),s("span",{attrs:{id:"pc-value"}},[t._v(t._s(t.programCounter))])])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"container-state"},[t._m(3),s("div",{staticClass:"state-body"},[s("div",{staticClass:"state ac-negative",class:{active:t.acumulator<0},attrs:{id:"ac-negative"}},[t._v("Negativo")]),s("div",{staticClass:"state ac-null",class:{active:0==t.acumulator},attrs:{id:"ac-null"}},[t._v("Nulo")])])]),s("div",{staticClass:"container-instruction-pc"},[t._m(4),s("div",{staticClass:"instruction-body"},[s("div",{staticClass:"instruction-address"},[s("span",[t._v("Endereço:")]),s("span",{attrs:{id:"instruction-address"}},[t._v(t._s(t.pcAddress))])]),s("div",{staticClass:"instruction-mnemonic"},[s("span",[t._v("Mnemônico:")]),s("span",{attrs:{id:"instruction-mnemonic"}},[t._v(t._s(t.pcMnemonic))])])])]),s("div",{staticClass:"container-total-execution"},[t._m(5),s("div",{staticClass:"execution-body"},[s("div",{staticClass:"execution-access"},[s("span",[t._v("Acessos:")]),s("span",{attrs:{id:"execution-acess"}},[t._v(t._s(t.countAcessInstruction+t.countAcessData))])]),s("div",{staticClass:"execution-instruction"},[s("span",[t._v("Instruções:")]),s("span",{attrs:{id:"execution-instruction"}},[t._v(t._s(t.countInstruction))])])])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"contaier-execution"},[s("button",{staticClass:"btn btn-execution",on:{click:function(e){return t.executNeander()}}},[t._v("Executar")])]),s("div",{staticClass:"contaier-execution"},[s("button",{staticClass:"btn btn-execution",on:{click:function(e){return t.executPassNeander()}}},[t._v("Executar Passo a Passo")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"container-reset"},[s("button",{staticClass:"btn btn-reset",on:{click:function(e){return t.resetAcumulator()}}},[t._v("Resetar Ac")])]),s("div",{staticClass:"container-reset"},[s("button",{staticClass:"btn btn-reset",on:{click:function(e){return t.resetProgramCounter()}}},[t._v("Resetar Pc")])]),s("div",{staticClass:"container-reset"},[s("button",{staticClass:"btn btn-reset",on:{click:function(e){return t.resetInstruction()}}},[t._v("Resetar Inst.")])]),s("div",{staticClass:"container-rese"},[s("button",{staticClass:"btn btn-reset",on:{click:function(e){return t.resetData()}}},[t._v("Resetar Dados")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"container-reset-all"},[s("button",{staticClass:"btn btn-reset-all",on:{click:function(e){return t.resetAll()}}},[t._v("Resetar Tudo")])])])])]),s("Data",{attrs:{mem:t.memory,componentKey:t.componentDataKey},on:{"emit-data":t.updateMemory}})],1)}),o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-title"},[s("i",{staticClass:"fas fa-microchip"}),s("h2",[t._v("Neander")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("td",[t._v("Bin:")]),s("td",[t._v("128")]),s("td",[t._v("64")]),s("td",[t._v("32")]),s("td",[t._v("16")]),s("td",[t._v("8")]),s("td",[t._v("4")]),s("td",[t._v("2")]),s("td",[t._v("1")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"result-header"},[s("h3",[t._v("Valores Decimais:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"state-header"},[s("h3",[t._v("Estado AC:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"instruction-header"},[s("h3",[t._v("Instrução no PC:")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"execution-header"},[s("h3",[t._v("Execução Total:")])])}],c=(s("ac1f"),s("1276"),s("d3b7"),s("25f0"),s("fb6a"),s("99af"),s("25eb"),s("a9e3"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-instruction"},[t._m(0),s("div",{staticClass:"container-body"},[s("div",{staticClass:"container-table",attrs:{id:"table-address"}},[t._m(1),s("div",{staticClass:"table-body"},[s("table",{key:t.key},t._l(t.memory.slice(0,128),(function(e,n){return s("TableInstructionRow",{key:n,class:{active:n==t.rowSelected},attrs:{pointer:t.pc==n,address:n+".",data:e,mnemonic:t.formatMnemonic(t.listedMnemonic[n],t.listedMnemonic[n-1])},nativeOn:{click:function(e){return t.selectTableRow(n)}}})})),1)]),s("div",{staticClass:"table-footer"})]),s("div",{staticClass:"container-set-values"},[s("div",{staticClass:"input-group input-group-address"},[s("label",{attrs:{for:"first-input-address"}},[t._v("Endereço")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"input input-set",attrs:{id:"first-input-address",type:"number"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})]),s("div",{staticClass:"input-group input-group-value"},[s("label",{attrs:{for:"first-input-data"}},[t._v("Valor")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],ref:"inputValueInstruction",staticClass:"input input-set",attrs:{id:"first-input-data",type:"number"},domProps:{value:t.value},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.setInstruction.apply(null,arguments)},input:function(e){e.target.composing||(t.value=e.target.value)}}})]),s("div",{staticClass:"container-button"},[s("button",{staticClass:"btn btn-set",on:{click:t.setInstruction}},[t._v("Setar")])])])])])}),u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-title"},[s("i",{staticClass:"fas fa-code"}),s("h2",[t._v("Instruções")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"table-header"},[s("div",{staticClass:"column-header column-pointer"},[t._v("P.")]),s("div",{staticClass:"column-header column-address"},[t._v("End.")]),s("div",{staticClass:"column-header column-data"},[t._v("Dado")]),s("div",{staticClass:"column-header column-mnemonic"},[t._v("Mnemônico")])])}],l=s("1da1"),d=(s("96cf"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",{staticClass:"column-body column-pointer"},[t.pointer?s("i",{staticClass:"fas fa-chevron-right"}):t._e()]),s("td",{staticClass:"column-body column-address"},[t._v(t._s(t.address))]),s("td",{staticClass:"column-body column-data"},[t._v(t._s(t.data))]),s("td",{staticClass:"column-body column-mnemonic"},[t._v(t._s(t.mnemonic))])])}),m=[],p={props:{pointer:{type:Boolean},address:{type:String},data:{type:Number},mnemonic:{type:String}}},h=p,v=s("2877"),f=Object(v["a"])(h,d,m,!1,null,null,null),_=f.exports,y={0:"NOP",16:"STA",32:"LDA",48:"ADD",64:"OR",80:"AND",96:"NOT",128:"JMP",144:"JN",160:"JZ",240:"HLT"},C={components:{TableInstructionRow:_},props:{mem:{type:Array,required:!0},pointerPc:{type:Number,required:!0},listMnemonic:{type:Object,required:!0},componentKey:{type:Number,required:!0}},data:function(){return{address:0,value:0,pc:0,rowSelected:0,memory:[],listedMnemonic:{},valuePc:{},key:0}},watch:{pointerPc:{deep:!0,handler:function(t){this.pc=t,this.setPointedInstruction()}},mem:{deep:!0,handler:function(t){this.memory=t}},listMnemonic:{deep:!0,handler:function(t){this.listedMnemonic=t}},componentKey:{handler:function(t){this.key=t}}},created:function(){this.memory=this.mem,this.pc=this.pointerPc,this.listedMnemonic=this.listMnemonic,this.setPointedInstruction()},methods:{selectTableRow:function(t){this.rowSelected=t,this.address=t,this.value=this.memory[this.address]},setPointedInstruction:function(){this.valuePc.address=this.pc,this.valuePc.mnemonic=this.formatMnemonic(this.listedMnemonic[this.pc],this.listedMnemonic[this.pc-1]),this.$emit("emit-pc",this.valuePc)},setInstruction:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.memory[this.address]=Number.parseInt(this.value),this.address=Number.parseInt(""==this.address?0:this.address)+1,this.value=this.memory[this.address],this.rowSelected=this.rowSelected+1,t.next=6,this.$emit("emit-data",this.memory,0);case 6:this.setPointedInstruction(),this.$refs.inputValueInstruction.select();case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),formatMnemonic:function(t,e){if(!t&&!e)return"NOP";if(!t&&e){var s=e.split(".")[0];return"64"==s||"80"==s||"96"==s||"240"==s?"NOP":" "}var n=t.split(".")[0],i=t.split(".")[1],r=y[n]+" "+i.toString();return r}}},b=C,g=Object(v["a"])(b,c,u,!1,null,null,null),w=g.exports,I=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-data"},[t._m(0),s("div",{staticClass:"container-body"},[s("div",{staticClass:"container-table"},[t._m(1),s("div",{staticClass:"table-body"},[s("table",{key:t.key},t._l(t.memory.slice(128,256),(function(e,n){return s("TableDataRow",{key:n+128,class:{active:n+128==t.rowSelected},attrs:{address:n+128+".",data:e},nativeOn:{click:function(e){return t.selectTableRow(n+128)}}})})),1)]),s("div",{staticClass:"table-footer"})]),s("div",{staticClass:"container-set-values"},[s("div",{staticClass:"input-group input-group-address"},[s("label",{attrs:{for:"second-input-address"}},[t._v("Endereço")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"input input-set",attrs:{id:"second-input-address",type:"number"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})]),s("div",{staticClass:"input-group input-group-value"},[s("label",{attrs:{for:"second-input-data"}},[t._v("Valor")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],ref:"inputValueData",staticClass:"input input-set",attrs:{id:"second-input-data",type:"number"},domProps:{value:t.value},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.setInstruction.apply(null,arguments)},input:function(e){e.target.composing||(t.value=e.target.value)}}})]),s("div",{staticClass:"container-button"},[s("button",{staticClass:"btn btn-set",on:{click:t.setInstruction}},[t._v("Setar")])])])])])},M=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-title"},[s("i",{staticClass:"fas fa-database"}),s("h2",[t._v("Dados")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"table-header",attrs:{id:"table-data"}},[s("div",{staticClass:"column-header column-address"},[t._v("End.")]),s("div",{staticClass:"column-header column-data"},[t._v("Dado")])])}],P=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("td",{staticClass:"column-body column-address"},[t._v(t._s(t.address))]),s("td",{staticClass:"column-body column-data"},[t._v(t._s(t.data))])])},x=[],A={props:{address:{type:String},data:{type:Number}}},k=A,N=Object(v["a"])(k,P,x,!1,null,null,null),O=N.exports,D={components:{TableDataRow:O},props:{mem:{type:Array,required:!0},componentKey:{type:Number,required:!0}},data:function(){return{address:128,value:0,rowSelected:128,memory:[],key:0}},watch:{mem:{deep:!0,handler:function(t){this.memory=t}},componentKey:{deep:!0,handler:function(t){this.key=t}}},created:function(){this.memory=this.mem},methods:{setInstruction:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.memory[this.address]=Number.parseInt(this.value),this.address=Number.parseInt(""==this.address?0:this.address)+1,this.value=this.memory[this.address],this.rowSelected=this.rowSelected+1,t.next=6,this.$emit("emit-data",this.memory,128);case 6:this.$refs.inputValueData.select();case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),selectTableRow:function(t){this.rowSelected=t,this.address=t,this.value=this.memory[this.address]}}},E=D,R=Object(v["a"])(E,I,M,!1,null,null,null),S=R.exports,$={0:"NOP",16:"STA",32:"LDA",48:"ADD",64:"OR",80:"AND",96:"NOT",128:"JMP",144:"JN",160:"JZ",240:"HLT"},j={16:2,32:2,48:2,64:0,80:0,96:1,128:0,144:0,160:0,240:1},T={16:2,32:2,48:2,64:1,80:1,96:1,128:2,144:1,160:1,240:1},K={16:1,32:1,48:1,64:0,80:0,96:0,128:0,144:0,160:0,240:0},L={components:{Instruction:w,Data:S},data:function(){return{memory:0,acumulator:0,programCounter:0,listedMnemonic:{},countAcessInstruction:0,countAcessData:0,countInstruction:0,pcAddress:0,pcMnemonic:"NOP",componentInstructionKey:0,componentDataKey:0}},computed:{convertBin:function(){return function(t){var e=t.toString(2).split("");"-"==e[0]&&(e=e.slice(1));for(var s=e.length;s<8;s++)e.unshift(0);return e}}},created:function(){this.resetAll(),this.listedMnemonic=this.getListMnemonic(this.memory)},methods:{getListMnemonic:function(t){for(var e,s,n=Object.create(null),i=!1,r=!1,a=0;a<128;a++)i||96!=t[a]?i||240!=t[a]?(i&&!r&&(e=t[a],r=!r),i||0==t[a]||void 0==$[t[a]]||(s=t[a],i=!i),i&&r&&(n[a-1]="".concat(s,".").concat(e),i=r=!1)):n[a]="240. ":n[a]="96. ";return n},updateMemory:function(t,e){for(var s=e;s<t.length-(128-e);s++)this.memory[s]=t[s];this.listedMnemonic=this.getListMnemonic(this.memory)},refreshValuePc:function(t){this.pcAddress=t.address,this.pcMnemonic=t.mnemonic},resetMemory:function(){for(var t=new Array,e=0;e<256;e++)t.push(0);this.memory=t,this.listedMnemonic=this.getListMnemonic(this.memory)},resetData:function(){for(var t=128;t<256;t++)this.memory[t]=0;this.forceRerender()},resetInstruction:function(){for(var t=0;t<128;t++)this.memory[t]=0;this.listedMnemonic=this.getListMnemonic(this.memory),this.forceRerender()},resetProgramCounter:function(){this.programCounter=0,this.forceRerender()},resetAcumulator:function(){this.acumulator=0,this.forceRerender()},resetAll:function(){this.resetMemory(),this.acumulator=0,this.programCounter=0,this.countAcessInstruction=0,this.countAcessData=0,this.countInstruction=0,this.forceRerender()},16:function(t){this.memory[t]=this.acumulator},32:function(t){this.acumulator=this.memory[t]},48:function(t){this.acumulator=this.acumulator+this.memory[t]},64:function(){this.programCounter++},80:function(){this.programCounter++},96:function(){this.acumulator=~this.acumulator},128:function(t){this.programCounter=Number.parseInt(t)},144:function(t){this.acumulator<0?(this.countAcessInstruction++,this.programCounter=Number.parseInt(t)):(this.countInstruction--,this.programCounter++)},160:function(t){0==this.acumulator?(this.countAcessInstruction++,this.programCounter=Number.parseInt(t)):(this.countInstruction--,this.programCounter++)},240:function(){console.log("Finaliza o Programa")},executNeander:function(){var t,e;while(this.programCounter<128&&"240"!=t)this.listedMnemonic[this.programCounter]?(t=this.listedMnemonic[this.programCounter].split(".")[0],e=this.listedMnemonic[this.programCounter].split(".")[1]," "!=e?this[t](e):this[t](),this.countInstruction++,this.countAcessInstruction+=T[t],this.countAcessData+=K[t],this.programCounter+=j[t]):(this.countAcessInstruction++,this.programCounter++);this.forceRerender()},executPassNeander:function(){var t,e;this.listedMnemonic[this.programCounter]?(t=this.listedMnemonic[this.programCounter].split(".")[0],e=this.listedMnemonic[this.programCounter].split(".")[1]," "!=e?this[t](e):this[t](),this.countInstruction++,this.countAcessInstruction+=T[t],this.countAcessData+=K[t],this.programCounter+=j[t]):(this.countAcessInstruction++,this.programCounter++),this.forceRerender()},forceRerender:function(){this.componentInstructionKey+=1,this.componentDataKey+=1}}},V=L,J=Object(v["a"])(V,a,o,!1,null,null,null),q=J.exports,B={name:"App",components:{Neander:q}},H=B,Z=(s("034f"),Object(v["a"])(H,i,r,!1,null,null,null)),z=Z.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(z)}}).$mount("#app")},"85ec":function(t,e,s){},ce7a:function(t,e,s){}});
//# sourceMappingURL=app.0f8ccd17.js.map
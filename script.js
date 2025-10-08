function cptl(a) {return a.split(" ").map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(" ");}

//the number of and the total number of each chip
let cnt={"not":[0,10],"and":[0,10],"nand":[5,10],"or":[0,10],"nor":[0,10],"xor":[0,10],"xnor":[0,10]}
//money amount and max mony
var my=1000,mmy=1000;

//get the suffix!
function gsx(a){let b = "";while (a >= 0) {b += String.fromCharCode(65 + (a % 26));a = Math.floor(a / 26) - 1;}return b;}
//round money!
function rdm(a) {if(a<=0)return"0";let b = Math.floor(Math.log10(a) / 3);return a/Math.pow(10,b*3).toFixed(3) + gsx(b)}

//buy sell toggle and chnage amount functions
let bst="Buy";
let bsa=1;
function bt(a){bst=["Buy","Sell"][a];document.querySelectorAll("#buySell").forEach(e => {e.textContent = bst})}
function ba(a){bsa=a;document.querySelectorAll("#buySellAmount").forEach(e => {e.textContent = a;})}

//update an individula info row display
function uid(a,b,c){const d=document.querySelector("#"+a+"_row #count #total");const e=document.querySelector("#"+a+"_row #count #max");if(!(d&&e)){return}d.textContent=b;d.className=(b<Math.ceil(c)*1/10?"resourceCountEmpty":(b>Math.ceil(c)*9/10?"resourceCountFull":(b>Math.ceil(c)*8/10?"resourceCountNearFull":"")));e.textContent=c;}
function ud(a){
    uid("money",my,mmy)
    if(a){uid(a,cnt[a][0],cnt[a][1])}
    else{for(var b in cnt){uid(b,cnt[b][0],cnt[b][1])}}
    // for(var i in cost){price[i].textContent=cost[i]*buySellAmnt}
    
    // if(chip){updateInfoDisp(chip,count[chip][0],count[chip][1])}
    // else{for(var i in count){updateInfoDisp(i,count[i][0],count[i][1])}}
}

//open a bar/tab
function otb(a){document.getElementById(a+"Bar").classList.remove("hideBar")}
//close a bar/tab
function ctb(a){document.getElementById(a+"Bar").classList.add("hideBar")}
//current open tab
var ont="store"
//close and open tabs (navigate the page)
function cotb(a){otb(a);ctb(ont);ont=a;}

//cost of each chip to BUILD
const cts={"not":["nand",1],"and":["nand",1,"not",1],"or":["nand",1,"not",2],"nor":["or",1,"not",1],"xor":["nand",4],"xnor":["not",1,"xor",1]}
//list of all the chips
var cl={"bsc_chp":["not","and","nand","or","nor","xor","xnor"],"adv_chp":[],"bsc_brd":[],"adv_brd":[]}
//unlocked Sections in store
var us={"bsc_chp":true,"adv_chp":false,"bsc_brd":false,"adv_brd":false}
//unlocked info rows
var ui=["money","nand_chip"]
//everything that has been unlocked
var ust={"bsc_chp":["nand"],"adv_chp":[],"bsc_brd":[],"adv_brd":[]}
//amount for buySell
var ab=[1,5,10,50]
//customize names
var stringPack={
    "money":"$","not":"NOT","and":"AND","nand":"NAND","or":"OR","nor":"NOR","xor":"XOR","xnor":"XNOR",
    "info_caption":"Resources",
    "buy_tglBtn":"Buy","sell_tglBtn":"Sell","store_tab":"Store","build_tab":"Build","research_tab":"Research","setting_tab":"Settings",
    "bsc_chp":"Basic Chips","adv_chp":"Advanced Chips","bsc_brd":"Basic Boards","adv_brd":"Advanced Boards",
}

document.addEventListener('DOMContentLoaded', function(){
    function makeLink(classes,id,onclick,href,text){return}
    function mtr(id,text){return""}
    function makeStoreButton(id,text){return ""}
    function makeBuildBtn(id,text,reqs){let bolds = 0;return ""}
    function makeSection(id,hides,text){return "<div class='"+(!hides?"hide":"")+"' id='"+id+"Section'><hr class='horizBar'><h3 id='"+id+"'>"+text+"s<hr class='horizBar'></h3><hr class='horizBar'></div>"}
    
    
    // const ib=document.getElementById("info-bar")
    // var ibt="<table id='info_table'><caption id='info_caption'>"+stringPack["info_table_caption"]+"</caption>"+ui.map(ir => mtr(infoRow,stringPack[infoRow])).join("");+"</table>"
    //color style
    const cls=document.createElement("style")
    function styles(parent = {}, child = {}) {return {bgcol: child.bgcol ?? parent.bgcol,col: child.col ?? parent.col,width: child.width ?? parent.width,bcol: child.bcol ?? parent.bcol,radius: child.radius ?? parent.radius,hover: child.hover ?? false,height:child.height??false,nth:parent.nth??child.nth};}
    
    var impStyle={"main":{bgcol:"#222",col:"#eee",width:0,bcol:"#000",radius:0,nth:-1,},
    "basicBtn":{bgcol:"#444",col:"#eee",width:2,bcol:"#393939",radius:10},"basicBtn:hover":{parent:"basicBtn",bgcol:"#555",bcol:"#ddd"},
    
    "tooExpensive":{parent:"basicBtn",bgcol:"#a00"},"tooExpensive:hover":{parent:"tooExpensive",},
    
    "vertBar":{width:2,color:"#444"},
    "horizBar":{height:3,bgcol:"#333",bcol:"#555"},
    
    "resourceCountEmpty":{col:"#F00"},"resourceCountNearFull":{col:"#FF0"},"resourceCountFull":{col:"#0F0"},
    "resourceRow":{bgcol:"#000",col:"#f0f0f0"},
    "resourceRow:nth-child(odd)":{bgcol:"#333",},
    "resourceRow:nth-child(even)":{bgcol:"#222",},
    
    "buySellBtn":{bgcol:"#000",col:"#000",width:2,bcol:"#333",radius:10},
    "buyBtn":{parent:"buySellBtn",bgcol:"#191"},"buyBtn:hover":{parent:"buyBtn",bgcol:"#181",bcol:"#343"},
    "sellBtn":{parent:"buySellBtn",bgcol:"#911"},"sellBtn:hover":{bgcol:"#811",bcol:"#433"},
    "buySellAmntBtn":{parent:"basicBtn",bgcol:"#444"},"buySellAmntBtn:hover":{parent:"basicBtn",bgcol:"#494949"},
    "curBuySellAmnt":{parent:"buySellAmntBtn",bgcol:"#555"},"curBuySellAmnt:hover":{parent:"buySellAmntBtn:hover",bgcol:"#595959"},
    
    
    }
    function btnStyle(name,stl){return "."+name+(stl.nth==1||stl.nth==2?":nth-child("+(stl.nth==1?"odd":"even")+")":"")+"{background-color:"+stl.bgcol+";color:"+stl.col+";border:"+stl.width+"px solid "+stl.bcol+";border-radius:"+stl.radius+"px;"+(stl.height?"height:"+stl.height+"px;":"")+"}"}
    function bst(a,{bgcol=null,col=null,width=null,bcol=null,radius=null,height=false,nth=0}={}){
        return "."+a+
            (nth==1||nth==2?":nth-child("+(nth==1?"odd":"even")+")":"")+
            "{"+(bgcol?"background-color:"+bgcol+";":"")+
            (col?"color:"+col+";":"")+
            (width?"border-width:"+width+"px;":"")+
            (bcol?"border-color:"+bcol+";":"")+
            (radius?"border-radius:"+radius+"px;":"")+
            (height?"height:"+height+"px;":"")+
            "}"
        // return "."+name++"{background-color:"+stl.bgcol+";color:"+stl.col+";border:"+stl.width+"px solid "+stl.bcol+";border-radius:"+stl.radius+"px;"+(stl.height?"height:"+stl.height+"px;":"")+"}"
    }
    s=Array.from(Object.entries(impStyle),function([k,v]){return bst(k,v)
        pr=v.parent??"main";if(k=="main"){return btnStyle(k,v)}else{var st=styles(impStyle[pr],v);impStyle["p."+pr]=impStyle[pr];console.log(k,pr,impStyle[pr],styles(impStyle[pr],v),impStyle["p."+pr]);return btnStyle(k,impStyle[pr])}}).join("");

    console.log(s)
    cls.textContent=s
    document.head.appendChild(cls);
    
    document.getElementById("body").insertAdjacentHTML("beforeend",
        "<div class='selectBar' id='selectBar'>"+
            (["store","build","research","settings"].map(a=>"<a class='closeTab'  href='javascript:void(0);' onclick='cotb(\""+a+"\")' id='"+a+"Tab'>"+cptl(a)+"</a>")).join("")+
        "</div>"+
        "<div class='infoBar' id='info_bar'><table id='info_table'><caption id='info_caption'>"+stringPack["info_caption"]+"</caption>"+
            "<tr class='infoRow resourceRow' id='money_row'><td id='type'>$</td><td id='count'><span class='countEmpty' id='total'>0</span> / <span class='countEmpty' id='max'>10</span></td><td id='perSec'>0 /s</td></tr>"+
            Array.from(["bsc_chp","adv_chp","bsc_brd","adv_brd"],(a,b)=>""+
                Array.from(cl[a],(A,B)=>"<tr class='infoRow resourceRow "+(ust[a].includes(A)?"":"hide")+"' id='"+A+"_row' style=''><td id='type'>"+stringPack[A]+"</td><td id='count'><span class='countEmpty' id='total'>0</span> / <span class='countEmpty' id='max'>10</span></td><td id='perSec'>0 /s</td></tr>"
                ).join("")
            ).join("")+
            "<tr class='infoRow hidel2' id='phantomRow' data-note='This is basically a row that will never get seen, but this way I can \"set\" the width of the info_row'><td>Phantom Row</td><td>100.00ZZ / 100.00ZZ</td><td>100.00ZZ /s</td></tr>"+
        "</table></div><div class='eventBar' id='eventBar'><div class='buildQue' id='buildQue'><h3>Building Queue: (<span id='count'>0</span>/<span id='max'>0</span></h3></div>"+
        
        "</div><div class='buildBar hideBar' id='buildBar'><h2 id='buildChips'>Build Chips!<hr class='horizBar'></h2>"+
            Array.from(Object.entries(cts),([k,v])=>"<button class='basicBtn' onclick=\"createChip('"+k+"')\" id='build"+k+"'>Create a "+stringPack[k]+" chip for "+
                v.reduce((a, b, c) => c % 2 ? a + `<b>${b} ${stringPack[v[c-1]]}</b>, ` : a, "").slice(0, -2)+
            " chips!</button>"
            ).join("")+
        "</div><div class='storeBar hideBar' id='storeBar'><h2 id='store'>Store</h2><hr class='horizBar'><button class='basicBtn buySell buySellBtn buyBtn' onclick='bt(0)'>Buy</button><button class='buySell buySellBtn sellBtn' onclick='bt(1)'>Sell</button><span class='vertBar'></span>"+
            Array.from({length:4}, (_, a) => "<button class='"+(a==0?"curBuySellAmnt":"")+" basicBtn buySellAmnt buySellAmntBtn' onclick='ba("+ab[a]+")'>"+ab[a]+"</button>"
            ).join("")+
        "<hr class='horizBar'>"+//"<span class='errorText' id='errorText'></span>"+
            Array.from(["bsc_chp","adv_chp","bsc_brd","adv_brd"],(a,b)=>"<div class='"+(us[a]?"":"hide")+"' id='"+a+"_sctn'><hr class='horizBar'><h3 id='"+a+"'>"+stringPack[a]+"<hr class='horizBar'></h3>"+
                Array.from(cl[a],(A,B)=>"<button class='basicBtn "+(ust[a].includes(A)?"":"hide")+"' id='"+A+"_buy' onclick=\"buyChip('"+A+"')\">"+(ust[a].includes(A)?"<span id='buySell'>Buy</span> <span id='buySellAmount'>1</span> "+stringPack[A]+" chip (Cost: $<span id='"+A+"Price'>0</span>)":"")+"</button>"
                ).join("")+
            "</div>"
            ).join("")+
        "<hr class='horizBar'></div></div><div class='researchBar hideBar' id='researchBar'>"+
            ""+
        "</div><div class='settingBar hideBar' id='settingsBar'><button class='basicBtn exportBtn' onclick=\"saveGame('export')\" id='exportBtn'>Export Game</button><button class='basicBtn importBtn' onclick=\"saveGame('import')\" id='importBtn'>Import Game</button><br><textarea id='saveBox' rows='5' cols='50' style='overflow-wrap: break-word;' wrap='soft'></textarea></div>"
    )
    otb(ont)

    // for(var i of chips){rowCount[i]=document.querySelector("#"+i+"Row #count");price[i]=document.getElementById(i+"Price")}
    // // const price={"not":document.getElementById("notPrice"),"and":document.getElementById("andPrice"),"nand":document.getElementById("nandPrice"),"or":document.getElementById("orPrice"),"nor":document.getElementById("norPrice"),"xor":document.getElementById("xorPrice"),"xnor":document.getElementById("xnorPrice")}
    ud()
});


//this for the background color 
var css=document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2=document.querySelector(".color2");
var body=document.querySelector("body");
var body2=document.getElementsByTagName("ul");
var rbutton=document.getElementById("randombutton");

var elementcolor=document.querySelector(".color3");
var choseelement=document.getElementsByClassName("odj2");

function changeElementColor(){
	for(let i =0;i<choseelement.length;i++){
		choseelement[i].style.background = elementcolor.value;
	}
}

elementcolor.addEventListener("input",changeElementColor);




function changeColor() {

	body.style.background=
	"linear-gradient(to right , " 
	+ color1.value 
	+ ", " 
	+ color2.value 
	+ ")";

	// body2.style.background=
	// "linear-gradient(to right , " 
	// + color1.value 
	// + ", " 
	// + color2.value 
	// + ")";

	css.textContent = body.style.background +";";
}
color1.addEventListener("input", changeColor);
color2.addEventListener("input", changeColor);

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


rbutton.addEventListener("click",function(){
	const color11=getRandomColor();
	const color22=getRandomColor();

	body.style.background=
	"linear-gradient(to right , " 
	+ color11 
	+ ", " 
	+ color22 
	+ ")";


})



//this section for adding elements to the bucket

var button=document.getElementById("button");
var input = document.getElementById("input");
var ul= document.getElementById("ninio");


function length(){
	return input.value.length;
}
function addItem(){
			
			
	var div = document.createElement("div");
	var li = document.createElement("li");
	var del = document.createElement("button");


	div.classList.add("element");
	ul.appendChild(div);
	div.append(li, del);
	li.classList.add("odj2");
	li.appendChild(document.createTextNode(input.value));
	input.value = "";

    del.classList.add("btnn");
    del.innerHTML = "Delete";
    del.addEventListener("click", function() {
        ul.removeChild(div);
    });
	
}

button.addEventListener("click",function(){
	if (length() > 0){
			addItem();
		}	
});

input.addEventListener("keypress",function(event){
	if (length()>0 && event.keyCode ===13){
				addItem();
			}
});

function doneTask(task) {
	if (task.target.tagName === "li"){
		task.target.classList.toggle("done");
	}
}




//execise 
const ninio =[1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];

ninio.sort((a,b)=>a-b);
console.log(ninio);

const funfun = (num) =>{
	ninio.sort((a,b)=>a-b);
	let result=[];
	let temp=[];
	for (let i = 0;i < num.length ; i++){

		if (temp.length === 0 || num[i] == temp[0]){
			temp.push(num[i]);
		}else {
			if (temp.length === 1 && num[i] != temp[0]){
				result.push(temp[0]);
			}else{
				result.push(temp);
			}
		temp=[num[i]];
		}


	}
	if (temp.length===1 ){
		result.push(temp[0]);
	}else{
		result.push(temp);
	}
	//converting to string
	for (let i=0;i<result.length ; i++){
		if (!Array.isArray(result[i])){
			result[i]=String(result[i]);
		}
	}
	let temp2=[];
	let result2=[];
	for (let i =0; i <result.length;i++){
		if(!Array.isArray(result[i])){
			temp2.push(result[i]);
		}

	}
	result2.push(temp2);
	console.log('result2',result2)


	console.log(result);

}

funfun(ninio);
function Stack(){
	this.top=null;
}
function Node(data,previous){
	this.data=data;
	this.previous=previous;
}
Stack.prototype.push=function(data){
	this.top=new Node(data,this.top);
	return this.top;
}
Stack.prototype.pop=function(){
	if(this.top){
		var temp=this.top;
		this.top=this.top.previous;
		return temp.data;
	}
	else return null;
}
Stack.prototype.pick=function(){
	return this.top? this.top.data:null;
}
var arr=[1,2,8];
var stack=new Stack();
for(var i=0;i<arr.length;i++)
	stack.push(arr[i]);
console.log(stack);
console.log(stack.pick());
console.log(stack.pop());
console.log(stack.pick());
console.log(stack.pick());
console.log(stack.pick());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());


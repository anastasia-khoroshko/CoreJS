function Dog(name){
	this.name=name;
};
Dog.prototype.bark=function(){
	console.log(this.name);
};
Dog.prototype.push=function(){
	setTimeout(this.bark.bind(this),1000);
};

var newDog=new Dog("Dog");
newDog.bark();
newDog.push();
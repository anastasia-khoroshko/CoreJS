var obj=[13,14,1,2,5,7,25,56,3];
function Node(root){
	this.root=root;
	this.left=null;
	this.right=null;
}
Node.prototype.add=function(node){
	(this.root>=node)? (this.right? this.right.add(node):this.right=new Node(node)):
		(this.left? this.left.add(node):this.left=new Node(node));
}

function Tree(data){
	this.head=new Node(data);
}

Tree.prototype.add=function(data){
	this.head.add(data);
}
var tree=new Tree(obj[0]);
for(var i=1;i<=obj.length;i++)
	tree.add(obj[i]);
console.log(tree);
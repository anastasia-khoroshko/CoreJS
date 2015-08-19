function List() {
    this._head = this._tail = null;
    this.length = 0;
}

function Node(data, previous) {
    this.data = data;
    this.previous = previous;
    this.next = null;
}
List.prototype.head = function () {
    return this._head?this._head.data:null;
}
List.prototype.tail = function () {
    return this._tail? this._tail.data:null;
}
List.prototype.append = function (data) {
    var newNode = new Node(data, null);
    if (!this._head)
        this._head = this._tail = newNode;
    else {
        newNode.previous = this._tail;
        this._tail = this._tail.next = newNode;
    }
    this.length++;
    return this;
}
List.prototype.prepend = function (data) {
    var temp = new Node(data, null);
    this._head?temp.next = this._head:{};
    this._head = this._head.next.previous = temp;
    this.length++;
    return this;
}
List.prototype.deleteAt = function (index) {
    if (typeof index === "number" && index >= 0 && index <= this.length) {
        var current = this._head,
			i = 0;
        while (current) {
            if (index === i++) {
                current.previous.next = current.next;
                current.next?current.next.previous = current.previous:this._tail = current.previous;
            }
            else current = current.next;
        }
        this.length--;
        return this;
    }
    else
        throw new Error("Invalid index");
}

List.prototype.at = function (index) {
    if (typeof index === "number" && index >= 0 && index <= this.length) {
        var current = this._head,
			i = 0;
        while (current) {
            if (index === i++) return current.data;
            current = current.next;
        }
    }
    else
        throw new Error("Invalid index");
}

List.prototype.insertAt = function (index, data) {
    if (typeof index==="number" && index >= 0 && index <= this.length) {
        var current = this._head,
			i = 0;
        if (index === 0)
            this.prepend(data);
        else {
            if (index == this.length + 1)
                this.append(data);
            else {
                while (current) {
                    if (index === i++) {
                        var newNode = new Node(data, current.previous);
                        newNode.next = current;
                        current.previous?current.previous.next = current.previous = newNode:{};
                        return this;
                    }
                    current = current.next;
                    this.length++;
                }
            }
        }
        return this;
    }
    else
        throw new Error("Invalid index");
}

List.prototype.reverse = function () {
    var i = bufferValue = 0,
		tempHead = this._head,
		tempTail = this._tail;
    while (i++ < Math.floor(this.length / 2)) {
        bufferValue = tempHead.data;
        tempHead.data = tempTail.data;
        tempTail.data = bufferValue;
        tempHead = tempHead.next;
        tempTail = tempTail.previous;
    }
    return this;
}
List.prototype.each = function (callback) {
    var current = this._head, i = 0;
    while (current) {
        current.data = callback(current.data);
        current = current.next;
        i++;
    }
    return this;
}
List.prototype.indexOf = function (searchData) {
    var current = this._head, i = 0;
    while (current) {
        if (current.data === searchData)
            return i;
        else {
            current = current.next;
            i++;
        }
    }
    return null;
}

var arr = [1, 2, 3, 4, 5];
var list = new List();
//for(var i=0;i<arr.length;i++)
//list.append(arr[i]);
//console.log(list);
console.log(list.head());
console.log(list.tail());
//console.log(list.at(1));
//console.log(list.deleteAt(1));
//console.log(list.insertAt(3,2));
//console.log(list.reverse());
//console.log(list.indexOf(3));
//console.log(list.reverse());
console.log(list.append(1).append(2).append(3).deleteAt(2).reverse().at(0))
console.log(list.each(function (a) { return 2 * a; }));
console.log(list.head());
console.log(list.tail());

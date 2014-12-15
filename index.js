var vitex = require('vitex'),
	_     = require('lodash');

var Queue = function(opts){
	if(!(this instanceof Queue)) return new Queue(opts);
	var mongodb = opts.mongodb;//
	if(_.isEmpty(mongodb)){
		throw new Error('mongodb contect config can not empty');
	}
	this.vitex = vitex(mongodb,'queue');
}

/*
	添加队列
*/
Queue.prototype.addTask = function(){

}

/*
	删除队列
*/
Queue.prototype.delTask = function(){

}


/*
	获取当前的队列列表
*/
Queue.prototype.task    = function(){

}

/*
	延迟一半时间
*/
function delayAdd(percent){

}

/*
	减少延迟
*/
function delayReduce(percent){

}

module.exports = Queue;
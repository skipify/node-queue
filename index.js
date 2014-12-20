var vitex  = require('vitex'),
	_      = require('lodash'),
	util   = require('util'),
	Events = require('events').EventEmitter,
	_tasks = [];

var Queue = function(opts){
	if(!(this instanceof Queue)) return new Queue(opts);
	Events.call(this);
}

util.inherits(Queue,Events);

/*
	添加队列
*/
Queue.prototype.addTask = function(task){
	_tasks.push(task);
	this.emit('addtask',_tasks);
	return this;
}
/*
	按顺序获取一个队列，返回队列并且从队列中删除
*/
Queue.prototype.getTask = function(){
	var t = _tasks.pop();

	if(_tasks.length == 0){
		this.emit('emptytask',null);
	}
	return t;
}
/*
	删除队列
	指定位置
*/
Queue.prototype.delTask = function(pos){
	_tasks.splice(pos,1);
	this.emit('addtask',pos);
	return this;
}

/*
	清空队列
*/
Queue.prototype.clearTask = function(){
	_tasks = [];
	this.emit('emptytask',null);
	return this;
}

/*
	获取当前的队列列表
*/
Queue.prototype.task    = function(){
	return _tasks;
}


module.exports = Queue;
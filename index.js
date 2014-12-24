var _      = require('lodash'),
	util   = require('util'),
	Events = require('events').EventEmitter,
	_tasks = [],
	root   = {};



;(function(){
	var Queue = function(opts){
		if(!(this instanceof Queue)) return new Queue(opts);
		Events.call(this);
	}

	util.inherits(Queue,Events);

	/*
		添加队列
		@param priority  优先级  low 10 high 50 higher 80 default 10
	*/
	Queue.prototype.addTask = function(task,priority){
		priority = priority || 10;
		task = {task:task,priority:priority}

		_tasks.push(task);
		this.emit('addtask',_tasks);
		return this;
	}
	/*
		按优先级获取一个队列
	*/
	Queue.prototype.getTask = function(){

		var ts = _tasks.slice(0);
		ts.sort(function(p,n){
			return p.priority < n.priority;
		})
		var t = ts.shift();
		if(_tasks.length == 0){
			this.emit('emptytask',null);
		}
		return t.task;
	}
	/*
		按顺序获取一个队列，返回队列并且从队列中删除
	*/
	Queue.prototype.getTaskOrder = function(){
		var t = _tasks.pop();
			t = t.task;
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

	root.Queue = Queue;
})();

;(function(){
	var maxTime = 24 * 60 * 10,
		minTime = 5,
		maxRetry = 5;

	var  Schedule = function(opts){
		if(!(this instanceof Schedule)) return new Schedule(opts);
	}



	//@param 上次更新时间 timestamp
	//@param 间隔时间
	Schedule.prototype.needSchedule = function(last,interval){
		interval = interval * 60;
		var now  = Math.round((new Date()).getTime()/1000);
		if(now >= (last + interval)){
			return true;
		}
		return false;
	}
	/*
		对比两个对象是否一致
	*/
	Schedule.prototype.compare = function(o1,o2){
		if(typeof o1 != typeof o2) return false;
		return JSON.stringify(o1) == JSON.stringify(o2);
	}

	//计算新时间调度结果
	Schedule.prototype.newTime = function(bool,oldtime){
		//eq
		if(bool){
			return Math.min(oldtime * 2,maxTime); 
		}else{
			var n = Math.round(oldtime / 2);
			return Math.max(minTime,n)
		}
	}
	//是否超过重试最大值，超过则拒绝任务
	//@return true 拒绝任务
	Schedule.prototype.isReject = function(task){
		if(task.interval >= maxTime && task.retry >= maxRetry){
			return true;
		}
		return false;
	}
	
	root.Schedule = Schedule;
})();

module.exports = root;
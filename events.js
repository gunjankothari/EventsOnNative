/*
* @Author: Gunjan
* @Date:   2017-04-24 14:30:30
* @Last Modified by:   Gunjan
* @Last Modified time: 2017-04-25 14:52:04
*/

'use strict';
(function(){
	HTMLElement.prototype.on = function(event, selector, listener, useCapture, once){
		var that = this;
		
	    if(!this.events){
	    	this.events = {};
	    }

	    if(!this.events[event]){
	    	this.events[event] = {};
	    }
	    
	    if(typeof selector === "function"){
	    	listener = selector;
	    	selector = 'noSelector';
	    	useCapture = listener;
	    	once = useCapture;
	    }

	    if(typeof this.events[event][selector] !== 'object'){    	
	    	this.events[event][selector] = [];
	    }

	    this.events[event][selector].push(function(e){
	    	if ( e.target.matches(selector) || selector == 'noSelector') {
		      if(typeof listener == 'function'){
		      	listener.call(that, e);
		      }
		   }		
	    });
	    
	    this.addEventListener(event, this.events[event][selector][this.events[event][selector].length-1], useCapture, once);
	}
	HTMLElement.prototype.off = function(event, selector){
		
		var that = this;

		if(event === undefined)
			return false;

		if(!this.events){
			return;
		}
		var object = this.events[event];

		Object.keys(object).map(function(objectKey, index) {
		    if(typeof selector === "undefined" || objectKey === selector){
		    	that.events[ event ][ objectKey ].forEach(function(listener, index){
		    		that.removeEventListener(event, listener);	
		    	});
		    }
		});

	}
	Object.prototype.on = function(event, selector, listener, useCapture, once){
		for(var i = 0; i < this.length ; i++){
			this[i].on(event, selector, listener, useCapture, once);
		}
	}
	Object.prototype.off = function(event, selector){
		for(var i = 0; i < this.length ; i++){
			this[i].off(event, selector);
		}
	}

}());
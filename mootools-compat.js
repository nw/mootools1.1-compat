/*
MooTools 1.2 Custom Backwards-Compatibility Library
By David Isaacson
Portions from Mootools 1.2 by the MooTools production team (http://mootools.net/developers/)
Copyright (c) 2006-2007 Valerio Proietti (http://mad4milk.net/)
Copyright (c) 2008 Siafoo.net

Cleaned up, shortened and logging added by Nathan White (http://www.nwhite.net)
*/

if(!window.console) var console = {};
if(!console.log) console.log = function(){};


// This is the definition from Mootools 1.2, with error handling
// to prevent an issue in IE where calling .item on an XML (non-HTML)
// element raises an error.
//
// We're using the 1.2 version in the first place because the compat version throws *other* weird errors sometimes
// Note that this will prevent you from using the $A(iterable, start, length) syntax allowed but undocumented (?) in Mootools 1.1 
function $A(iterable){
    var item
    try{
        item = iterable.item
    }
    catch(e){
        item = true
    }
    
    if (item){
        var array = [];
        for (var i = 0, l = iterable.length; i < l; i++) array[i] = iterable[i];
        return array;
    }
    return Array.prototype.slice.call(iterable);
}

function $extend(original, extended){
    if (!extended) {extended=original; original=this; console.warn('$extend requires two parameters'); } 
    for (var key in (extended || {})) original[key] = extended[key];
    return original;
}

(function(){
    var natives = [Array, Function, String, RegExp, Number];
    for (var i = 0, l = natives.length; i < l; i++) natives[i].extend =  natives[i].implement; // TODO
})();


Browser.__defineGetter__('hasGetter',function(){
	return true;
});

if(Browser.hasGetter){ // webkit, gecko, opera support
	
	window.__defineGetter__('ie',function(){
		console.warn('window.ie is deprecated. Use Browser.Engine.trident');
		return (Browser.Engine.name == 'trident') ? true : false;
	});
	window.__defineGetter__('ie6',function(){
		console.warn('window.ie6 is deprecated. Use Browser.Engine.trident and Browser.Engine.version');
		return (Browser.Engine.name == 'trident' && Browser.Engine.version == 4) ? true : false;
	});
	window.__defineGetter__('ie7',function(){
		console.warn('window.ie7 is deprecated. Use Browser.Engine.trident and Browser.Engine.version');
		return (Browser.Engine.name == 'trident' && Browser.Engine.version == 5) ? true : false;
	});
	window.__defineGetter__('gecko',function(){
		console.warn('window.gecko is deprecated. Use Browser.Engine.gecko');
		return (Browser.Engine.name == 'gecko') ? true : false;
	});
	window.__defineGetter__('webkit',function(){
		console.warn('window.webkit is deprecated. Use Browser.Engine.webkit');
		return (Browser.Engine.name == 'webkit') ? true : false;
	});
	window.__defineGetter__('webkit419',function(){
		console.warn('window.webkit is deprecated. Use Browser.Engine.webkit and Browser.Engine.version');
		return (Browser.Engine.name == 'webkit' && Browser.Engine.version == 419) ? true : false;
	});
	window.__defineGetter__('webkit420',function(){
		console.warn('window.webkit is deprecated. Use Browser.Engine.webkit and Browser.Engine.version');
		return (Browser.Engine.name == 'webkit' && Browser.Engine.version == 420) ? true : false;
	});
} else { // no warnings for IE
	window[Browser.Engine.name] = window[Browser.Engine.name + Browser.Engine.version] = true;

	window.ie = window.trident;
	window.ie6 = window.trident4;
	window.ie7 = window.trident5;	
}

Array.implement({

    copy: function(start, length){
		console.warn('Array.copy is deprecated. Use Array.splice');
        return $A(this, start, length);
    },

	remove : function(item){
		console.warn('Array.remove is deprecated. Use Array.erase');
		return this.erase(item);
	},
	
	merge : function(array){
		console.warn('Array.merge is deprecated. Use Array.combine');
		return this.combine(array);
	}

});


Function.extend({

    bindAsEventListener: function(bind, args){
				console.warn('Function.bindAsEventListener is deprecated.');
        return this.create({'bind': bind, 'event': true, 'arguments': args});
    }

});

Function.empty = function(){ 
	console.warn('replace Function.empty with $empty');
	return $empty();
};


Hash.implement({
	
	keys : function(){
		console.warn('Hash.keys is deprecated. Use Hash.getKeys');
		return this.getKeys();
	},
	
	values : function(){
		console.warn('Hash.values is deprecated. Use Hash.getValues');
		return this.getValues();
	},
	
	hasKey : function(item){
		console.warn('Hash.hasKey is deprecated. Use Hash.has');
		return this.has(item);
	},
	
	merge : function(properties){
		console.warn('Hash.merge is deprecated. Use Hash.combine');
		return this.combine(properties);
	},
	
    remove: function(key){
		console.warn('Hash.remove is deprecated. use Hash.erase');
        return this.erase(key)
    }
});

Object.toQueryString = Hash.toQueryString; // TODO

var Abstract = new Class({
		initialize : function(obj){
			console.warn('Abstract is deprecated. Use Hash');
			return new Hash(obj);
		}
});


Element.extend = function(obj){
	console.warn('Element.extend is deprecated. Use Element.implement');
	Element.implement(obj);
};

Elements.extend = function(obj){
	console.warn('Elements.extend is deprecated. Use Elements.implement');
	Elements.implement(obj);
};

Element.implement({
	
	remove : function(){
		console.warn('el.remove is deprecated. Use el.dispose');
		return this.dispose();
	},
	
	getLastChild : function(){
		console.warn('el.getLastChild is deprecated. Use el.getLast');
		return this.getLast();
	},

    getFormElements: function(){
		console.warn('el.getFormElements is deprecated.');
        return this.getElements('input, textarea, select');
    },

    replaceWith: function(el){
		console.warn('el.replaceWith is deprecated.');
        el = $(el);
        this.parentNode.replaceChild(el, this);
        return el;
    },
    
    removeElements: function(){
		console.warn('el.removeElements is deprecated. use el.dispose()');
        return this.dispose();
    },

    getText: function(){
		console.warn('el.getText is deprecated. use el.get("text")');
        return this.get('text');
    },

    setText: function(text){
		console.warn('el.setText is deprecated. use el.set("text",value)');
        return this.set('text', text);
    },

    setHTML: function(){
		console.warn('el.setHTML is deprecated. use el.set("html",value)');
        return this.set('html', arguments);
    },
    
    getHTML: function(){
		console.warn('el.getHTML is deprecated. use el.get("html")');
        return this.get('html');
    },

    getTag: function(){
		console.warn('el.getTag is deprecated. use el.get("tag")');
        return this.get('tag');
    },

    setOpacity: function(op){
		console.warn('el.setOpacity is deprecated. use el.set("opacity",value)');
        return this.set('opacity', op);
    },

    getValue: function(){
		console.warn('el.getValue is deprecated. use el.get("value")');
        return this.get('value')
    },
    
    // Very slightly modified from mootools
    toQueryString: function(){
		console.warn('warning el.toQueryString is slightly different');
        var queryString = [];
        this.getElements('input, select, textarea').each(function(el){
            if (!el.name || el.disabled) return;
            var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt){
                return opt.value;
            }) : ((el.type == 'radio' || el.type == 'checkbox') && !el.checked) ? null : el.value;
            $splat(value).each(function(val){
                /*if (val)*/ queryString.push(el.name + '=' + encodeURIComponent(val));
            });
        });
        return queryString.join('&');
    },

    effect: function(property, options){
		console.warn('el.effect is deprecated. use el.tween');
        return new Fx.Tween(this, $extend({property: property}, options));
    },

    effects: function(options){
		console.warn('el.effects is deprecated. use el.morph');
        return new Fx.Morph(this, options);
    },

    filterByTag: function(tag){
		console.warn('el.filterByTag is deprecated.');
        return this.filter(tag);
    },

    filterByClass: function(className){
		console.warn('el.filterByClass is deprecated.');
        return this.filter('.' + className);
    },

    filterById: function(id){
		console.warn('el.filterById is deprecated.');
        return this.filter('#' + id);
    },

    filterByAttribute: function(name, operator, value){
		console.warn('el.filterByAttribute is deprecated.');
        return this.filter('[' + name + (operator || '') + (value || '') + ']');
    }

});


window.extend = document.extend = function(properties){
	console.warn('(window||document).extend is deprecated');
    for (var property in properties) this[property] = properties[property];
};


Event.keys = Event.Keys; // TODO

Class.empty = function(){ 
	console.warn('replace Class.empty with $empty');
	return $empty;
};

//legacy .extend support

Class.prototype.extend = function(properties){
	console.warn('Class.extend is deprecated. See class mutators.');
    properties.Extends = this;
    return new Class(properties);
};


Fx.implement({

    custom: function(from, to){
		console.warn('Fx.custom deprecated. Use Fx.start');
        return this.start(from, to);
    },

    clearTimer: function(){
		console.warn('Fx.clearTimer deprecated. Use Fx.cancel');
        return this.cancel();
    },
    
    stop: function(){
	    console.warn('Fx.stop deprecated. Use Fx.cancel');
        return this.cancel();
    }

});

Fx.Base = new Class({
	Extends : Fx,
	initialize : function(options){
		console.warn('Fx.Base is deprecated. Use Fx.');
		return this.parent(options);
	}
});


Fx.Style = function(element, property, options){
	console.warn('Fx.Style is deprecated. Use Fx.Tween');
    return new Fx.Tween(element, $extend({property: property}, options));
};

Fx.Styles = new Class({
		Extends : Fx.Morph,
		initialize : function(el,options){
			console.warn('Fx.Styles is deprecated. Use Fx.Morph');
			return this.parent(el,options);
		}
	});
	


	JSON.toString = function(obj){ 
		console.warn('JSON.toString is deprecated. Use JSON.encode');
		return JSON.encode(obj); 
	}
	JSON.evaluate = function(str){
		console.warn('JSON.evaluate is deprecated. Use JSON.decode');
		return JSON.decode(str); 
	}
	var Json = JSON;


	var $E = function(selector, filter){
		console.warn('$E is deprecated.');
	    return ($(filter) || document).getElement(selector);
	};

	var $ES = function(selector, filter){
		console.warn('$ES is deprecated.');
	    return ($(filter) || document).getElements(selector);
	};



	Cookie.set = function(key, value, options){
		console.warn('Cookie.set is deprecated. Use Cookie.write');
	    return new Cookie(key, options).write(value);
	};

	Cookie.get = function(key){
		console.warn('Cookie.get is deprecated. Use Cookie.read');
	    return new Cookie(key).read();
	};

	Cookie.remove = function(key, options){
		console.warn('Cookie.remove is deprecated. Use Cookie.dispose');
	    return new Cookie(key, options).dispose();
	};
	
	

	var XHR = new Class({

	    Extends: Request,

	    options: {
	        update: false
	    },

	    initialize: function(options){
			console.warn('XHR is deprecated. Use Request.');
	        this.parent(options);
	        this.transport = this.xhr;
	    },

	    request: function(data){
	        return this.send(this.url, data || this.options.data);
	    },

	    send: function(url, data){
	        if (!this.check(arguments.callee, url, data)) return this;
	        return this.parent({url: url, data: data});
	    },

	    success: function(text, xml){
	        text = this.processScripts(text);
	        if (this.options.update) $(this.options.update).empty().set('html', text);
	        this.onSuccess(text, xml);
	    },

	    failure: function(){
	        this.fireEvent('failure', this.xhr);
	    }

	});


	var Ajax = new Class({
	    Extends: XHR,

	    initialize: function(url, options){
			console.warn('Ajax is deprecated. Use Request.');
	        this.url = url;
	        this.parent(options);
	    },

	    success: function(text, xml){
	        // This version processes scripts *after* the update element is updated, like Mootools 1.1's Ajax class
	        // Partially from Remote.Ajax.success
	        response = this.response;
	        response.html = text.stripScripts(function(script){
	            response.javascript = script;
	        })
	        if (this.options.update) $(this.options.update).empty().set('html', response.html);
	        if (this.options.evalScripts) $exec(response.javascript);
	        this.onSuccess(text, xml);
	    }
	});



	JSON.Remote = new Class({

	    options: {
	        key: 'json'
	    },

	    Extends: Request.JSON,

	    initialize: function(url, options){
			console.warn('JSON.Remote is deprecated. Use Request.JSON');
	        this.parent(options);
	        this.onComplete = $empty;
	        this.url = url;
	    },

	    send: function(data){
	        if (!this.check(arguments.callee, data)) return this;
	        return this.parent({url: this.url, data: {json: Json.encode(data)}});
	    },

	    failure: function(){
	        this.fireEvent('failure', this.xhr);
	    }

	});


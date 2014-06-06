if(!Object.isArray){
    Object.isArray = function(obj){
        return Array.isArray(obj);
    };
}

if(!Object.isDate){
    Object.isDate = function(obj){
        return !!obj.getTimezoneOffset && !!obj.getUTCMilliseconds;
    };
}

if(!Object.isString){
    Object.isString = function(obj){
        return typeof(obj) === 'string';
    };
}

if(!Object.isNumber){
    Object.isNumber = function(obj){
        return typeof(obj) === 'number';
    };
}

if(!Object.isJSON){
    Object.isJSON = function(obj){
        return obj !== null && obj !== undefined && !Array.isArray(obj)
            && !obj.getTimezoneOffset && !obj.getUTCMilliseconds
            && typeof(obj) !== 'string' && typeof(obj) !== 'number';
    };
}

if(!Object.traverse){
    /**
     * Accepts an object and a function and scans over each of the keys
     *	in the object and applies the function to each value in the object.
     *	If the value is itself a JSON object, the same function will be
     *	applied to each of the keys of the child object
     * @param {object} obj
     * @param {function} func
     * @returns {undefined}
     */
    Object.traverse = function(obj, func){
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                if(Object.isJSON(obj[key])){
                    Object.traverse(obj[key], func);
                }else{
                    func(obj[key], key, obj);
                }
            }
        }
    };
}

if(!Object.move){
    /**
     * Moves the given property [or all properties in the list] from the src object and puts it in the dest object
     *  The property is then deleted from the src object
     * @param {String/Array} prop - object property to be moved (or can be an array of properties)
     * @param {Object} src - object from which the property will be taken (and then removed)
     * @param {Object} dest - object to which the property will be added
     * @returns {undefined}
     */
    Object.move = function(props, src, dest){
        var moveProp = function(prop, src, dest){
            dest[prop] = angular.copy(src[prop]);
            delete src[prop];
        };
        if(Array.isArray(props)){
            for(var i=0; i<props.length; i++){
                moveProp(props[i], src, dest);
            }
        }else{
            moveProp(props, src, dest);
        }
    };
}

if(!Object.matches){
    /**
     * Tests whether the given element matches the given filter
     * @param {Object} elem
     * @param {Object} filter
     * @returns {Boolean}
     */
    Object.matches = function(elem, filter, strict, caseInsensitive){
        if(typeof(filter) === 'object'){
            for(var key in filter){
                if(filter.hasOwnProperty(key)){
                    if(typeof filter[key] === 'function') {
                        if (!filter[key](elem[key])) return false;
                    }else if(typeof filter[key] === 'object' && typeof elem[key] === 'object'){
                        if(!Object.matches(elem[key], filter[key])) return false;
                    }else if(caseInsensitive && typeof elem[key] === 'string' && typeof filter[key] === 'string' && elem[key].toLowerCase() === filter[key].toLowerCase()){
                        continue;
                    }else if(strict ? elem[key] !== filter[key] : elem[key] != filter[key]){
                        return false;
                    }
                }
            }
        }else{
            if(strict ? elem !== filter : elem != filter){
                return false;
            }
        }
        return true;
    };
}

if(!Object.equals){
    if(angular.equals){
        Object.equals = angular.equals;
    }else{
        Object.equals = function(obj1, obj2){
            if(obj1 === null && obj2 === null) return true;
            if(!obj1 || !obj2) return false;
            for(var key in obj1){
                if(obj1.hasOwnProperty(key)){
                    if(!obj2[key] || obj2[key] !== obj1[key]){
                        return false;
                    }
                }
            }
            return true;
        };
    }
}

if(!Object.isEmpty){
    Object.isEmpty = function(obj){
        if(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    return false; // if we get here, the object has at least one property
                }
            }
        }
        return true;
    };
}

if(!Object.firstKey){
    Object.firstKey = function(obj){
        for(var key in obj) return key;
    };
}

if(!Object.forEach){
    Object.forEach = function(obj, func){
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                if(func(obj[key], key) === false) break;
            }
        }
    }
}

if(!Object.exists){
    Object.exists = function(obj, filter, recursive){
        if(!obj || !filter) return obj;
        var exists = false;
        Object[recursive ? 'traverse' : 'forEach'](obj, function(val){
            if(val === filter){
                exists = true;
                return false;
            }
        });
        return exists;
    }
}

if(!Object.all){
    Object.all = function(obj, filter, recursive){
        if(!obj || !filter) return obj;
        var all = true;
        Object[recursive ? 'traverse' : 'forEach'](obj, function(val){
            if(val !== filter){
                return all = false;
            }
        });
        return all;
    }
}
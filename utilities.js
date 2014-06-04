//OBJECTS
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




//ARRAYS
if(!Array.find){
	/**
	 * Will find and return all elements in the given array that match the given
	 *    filter, and return a new array containing the results.
	 * The filter can be one of two things:
	 *    1) A primitive value to compare for equality against all elements in the array.
	 *    2) An object that contains keys where the key/value pairs will be compared against
	 *       each element in the array.  Assumes that the array is an array of object elements.
	 * The onlyOne parameter specifies whether a single result should be returned
	 * It returns a new array with the resulting matched elements
	 * @param {type} array
	 * @param {type} filter
	 * @param {boolean} onlyOne
	 * @returns {Array|Array.find.array|@exp;results@pro;length}
	 */
	Array.find = function(array, filter, onlyOne, indexes, caseInsensitive){
		if(!array || !filter) return array;
		var results = [];
		for(var i=0; i<array.length; i++){
            if(Object.matches(array[i], filter, null, caseInsensitive)){
                if(onlyOne && indexes) return i;
                else if(indexes) results.push(i);
                else if(onlyOne) return array[i];
                else results.push(array[i]);
            }
		}
		return results.length ? results : null;
	};
}

if(!Array.findOne){
	Array.findOne = function(array, filter, caseInsensitive){
		return Array.find(array, filter, true, false, caseInsensitive);
	};
}

if(!Array.findIndexes){
	Array.findIndexes = function(array, filter, caseInsensitive){
		return Array.find(array, filter, false, true, caseInsensitive);
	};
}

if(!Array.findIndex){
	Array.findIndex = function(array, filter, caseInsensitive){
		return Array.find(array, filter, true, true, caseInsensitive);
	};
}

if(!Array.count){
	Array.count = function(array, filter){
		return (Array.find(array, filter) || []).length;
	};
}

if(!Array.replaceAll){
	Array.replaceAll = function(array, filter, newObj){
		var indexes = Array.findIndexes(array, filter);
		if(!indexes) return array;
		for(var i=0; i<indexes.length; i++){
			array[indexes[i]] = newObj;
		}
		return array;
	};
}
if(!Array.replace){
	Array.replace = function(array, filter, newObj){
		var index = Array.findIndex(array, filter);
		array[index] = newObj;
		return array;
	};
}

if(!Array.setOne){
	Array.setOne = function(array, filter, values){
		if(!array || !filter || ! values) return array;
		var index = Array.findIndex(array, filter);
		for(var key in values){
			if(values.hasOwnProperty(key)){
				array[index][key] = values[key];
			}
		}
		return array;
	};
}

if(!Array.setAll){
	Array.setAll = function(array, values){
		if(!array || ! values) return array;
		for(var i=0; i<array.length; i++){
			for(var key in values){
				if(values.hasOwnProperty(key)){
					array[i][key] = values[key];
				}
			}
		}
		return array;
	};
}

if(!Array.sortBy){
	/**
	 * Sorts the given array of objects by the given property.  Assumes that the
	 *     array is an array of objects (ie: [{prop1:'somestr'},{prop1:'someotherstr'}] )
	 * @param {Array} array
	 * @param {String} property
	 * @returns {Array.sortBy.array|Boolean}
	 */
    (function(){
        var by, thenBy;
        var sortAscending = function(a, b){
            return a[by] > b[by] ? 1 : ((a[by] == b[by] && thenBy) ? (a[thenBy] > b[thenBy] ? 1 : -1) : -1);
        };
        var sortDescending = function(a, b){
            return a[by] < b[by] ? 1 : ((a[by] == b[by] && thenBy) ? (a[thenBy] > b[thenBy] ? 1 : -1) : -1);
        };
        Array.sortBy = function(array, field, nextField, reverse){
            if(!array) return false;
            if(!field) return array;
            by = field;
            thenBy = nextField;
            array.sort(reverse ? sortDescending : sortAscending);
            return array;
        };
    })();
}

if(!Array.remove){
	/**
	 * Will remove one element in the given array that matches the given
	 *    filter, and return a new array containing the remaining elements.  
	 * The filter can be one of two things:
	 *    1) A primitive value to compare for equality against all elements in the array.
	 *    2) An object that contains keys where the key/value pairs will be compared against
	 *       each element in the array.  Assumes that the array is an array of object elements.
	 * It returns a new array with the resulting matched elements
	 * @param {type} array
	 * @param {type} filter
	 * @returns {Array|Array.find.array|@exp;results@pro;length}
	 */
	Array.remove = function(array, filter){
		var index = Array.findIndex(array, filter);
		if(typeof(index) != undefined && index > -1){
			array.splice(index, 1);
		}
		return array;
	};
}

if(!Array.removeAll){
	/**
	 * Will remove all elements in the given array that match the given
	 *    filter, and return a new array containing the remaining elements.  
	 * The filter can be one of two things:
	 *    1) A primitive value to compare for equality against all elements in the array.
	 *    2) An object that contains keys where the key/value pairs will be compared against
	 *       each element in the array.  Assumes that the array is an array of object elements.
	 * It returns a new array with the resulting matched elements
	 * @param {type} array
	 * @param {type} filter
	 * @returns {Array|Array.find.array|@exp;results@pro;length}
	 */
	Array.removeAll = function(array, filter){
		var indexes = Array.findIndexes(array, filter) || [];
		for(var i=0; i<indexes.length; i++){
			array.splice(i, 1);
		}
		return array;
	};
}

if(!Array.addToSet){
	/**
	 * This will treat the given array as a set and will only add the remaining parameters to the array
	 *	if and only if said parameters are not already in the array
	 * Example:
	 *		var array = ['one','two'];
	 *		Array.addToSet(array, 'one', 'two', 'three'); // 'three' is the only 
	 *		console.log(array); // prints out: ['one','two','three']
	 * @returns Array
	 */
	Array.addToSet = function(){
		var array = arguments[0];
		for(var i=0; i<arguments.length; i++){
			if(!Array.findOne(array, arguments[i])){ // if the element isn't already in the array
				array.push(arguments[i]); // add the element to the end of the array
			}
		}
		return array;
	};
}

if(!Array.exists){
	Array.exists = function(array, filter){
		return Array.findIndex(array, filter) !== null;
	};
}

if(!Array.removeDups){
	Array.removeDups = function(array, filter){
        var foundAtLeastOne = false, newArray = new Array().concat(array);
		for(var i=0; i<array.length; i++){
            if(!foundAtLeastOne || !Object.matches(array[i], filter)){
                newArray.push(array[i]);
                foundAtLeastOne = true;
            }
        }
        return array;
	};
}

if(!Array.removeProp){
    Array.removeProp = function(array, filter, fields){
        if(!array || !fields) return false;
        if(!Array.isArray(fields)) fields = [fields];
        if(filter && !Object.isEmpty(filter)){
            var indexes = Array.findIndexes(array, filter) || [];
            for(var i=0; i<indexes.length; i++){
                for(var j=0; j<fields.length; j++){
                    delete array[indexes[i]][fields[j]];
                }
            }
        }else{
            for(var i=0; i<array.length; i++){
                for(var j=0; j<fields.length; j++){
                    delete array[i][fields[j]];
                }
            }
        }
        return array;
    };
}

if(!Array.sortNumerically){
    Array.sortNumerically = function(array){
        return array.sort(function(a,b){return a-b;});
    };
}

if(!Array.random){
    Array.random = function(array){
        return array[Math.floor(Math.random() * array.length)];
    };
}

if(!Array.toObject){
    Array.toObject = function(array, key){
        if(!array || !key) return null;
        var obj = {};
        for(var i=0; i<array.length; i++){
            obj[array[i][key]] = array[i];
        }
        return obj;
    }
}

if(!Array.shuffle){
    // stolen from http://css-tricks.com/snippets/javascript/shuffle-array/
    Array.shuffle = function(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
}



// STRINGS
if(!String.format){
	String.format = function(){
		if(!arguments || arguments.length == 0) return '';
		if(arguments.length == 1) return arguments[0] + '';
		var args = arguments, result = '';
        (args[0]+'').split(/{(\d+)}/).forEach(function(part){
            result += (!part || isNaN(part)) ? part : args[(parseInt(part)+1 < args.length) ? parseInt(part)+1 : args.length-1];
        });
        return result;
	};
}

if(!String.normalize){
	String.normalize = function(str){
        if(!str) return str;
		var parts = (str + '').split(/[:\-_]/), result = '';
        for(var i=1; i<parts.length; i++){
            if(parts[i]){
                parts[i].charAt(0).toUpperCase();
                result += parts[i];
            }
        }
        return result;
	};
}

if(!String.capitalize){
    String.capitalize = function(str){
        if(!str || !str.length || typeof str !== 'string') return str;
        if(str.length === 1) return str.toUpperCase();
        return str[0].toUpperCase() + (str.substring(1, str.length).toLowerCase());
    }
}

if(!String.toCamel){
    String.toCamel = function(str, splitBy){
        var parts = str.split(splitBy || ' '), result = parts[0];
        if(!parts || !parts.length || parts.length === 1) return str;
        for(var i=1; i<parts.length; i++){
            result += String.capitalize(parts[i]);
        }
        return result;
    }
}

if(!String.toDashes){
    String.toDashes = function(str, splitBy){
        var parts = str.split(splitBy || ' '), result = parts[0];
        if(!parts || !parts.length || parts.length === 1) return str;
        for(var i=1; i<parts.length; i++){
            result += '-' + parts[i].toLowerCase();
        }
        return result;
    }
}



// FUNCTIONS
if(!Function.getName){
	Function.getName = function(func){
		if(!func) return false;
		var str = func.toString();
		var name = str.substring(8, str.indexOf('(')).trim() || null;
		return name;
	};
}


// NUMBERS
if(!Number.random){
    Number.random = function(min, max){
        min = min || 0;
        max = max || 1;
        return Math.floor(Math.random() * (max - min)) + min;
    };
}


// DATES
if(!Date.isAfter){
    Date.isAfter = function(d1, d2){
        if(!d1) return false;
        d2 = d2 || new Date();
        return new Date(d1) > new Date(d2);
    }
}

if(!Date.isBefore){
    Date.isBefore = function(d1, d2){
        if(!d1) return false;
        d2 = d2 || new Date();
        return new Date(d1) < new Date(d2);
    }
}

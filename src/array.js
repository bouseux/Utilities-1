if(!Array.each){
    /**
     * Iterates over each element in an array by calling the callback function for each element.
     * The callback will receive the element as its first parameter and the element's index as the second.
     * NOTE: You can break out of the loop by returning false from the callback
     * @param {Array} array source array over which to iterate
     * @param {Function} callback will receive both the array element and its index as passed parameters
     * @returns {boolean}
     */
    Array.each = function(array, callback){
        if(!array || !('length' in array) || !callback) return array;
        for(var i=0; i<array.length; i++){
            if(callback(array[i], i) === false) return false;
        }
        return true;
    }
}

if(!Array.copy){
    /**
     * Returns a deep copy of the source array (or can be any javascript type)
     * @param {Array|*} source
     * @returns {Array|*}
     */
    Array.copy = function(source){
        if(!JSON) return source;
        return JSON.parse(JSON.stringify(source));
    }
}

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
     * @param {Array} array
     * @param {Object|boolean|string|number} filter
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
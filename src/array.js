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
    Array.find = function(array, filter, onlyOne, indexes, caseInsensitive, max){
        if(!array || !filter) return array;
        var results = [];
        for(var i=0; i<array.length; i++){
            if(Object.matches(array[i], filter, null, caseInsensitive)){
                if(onlyOne && indexes) return i;
				else if(onlyOne) return array[i];
                else if(indexes) results.push(i);
                else results.push(array[i]);
				if(max && results.length === max) break;
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
    Array.findIndexes = function(array, filter, caseInsensitive, max){
        return Array.find(array, filter, false, true, caseInsensitive, max);
    };
}

if(!Array.findIndex){
    Array.findIndex = function(array, filter, caseInsensitive){
        return Array.find(array, filter, true, true, caseInsensitive);
    };
}

if(!Array.count){
    Array.count = function(array, filter){
        return (Array.find(array, filter, false, true) || []).length;
    };
}

if(!Array.replace){
    Array.replace = function(array, filter, newObj){
        var indexes = Array.findIndexes(array, filter);
        if(!indexes) return array;
        for(var i=0; i<indexes.length; i++){
            array[indexes[i]] = newObj;
        }
        return array;
    };
}

if(!Array.replaceOne){
	Array.replaceOne = function(array, filter, newObj){
		var index = Array.findIndex(array, filter);
		array[index] = newObj;
		return array;
	};
}

if(!Array.sortBy){
    (function(){
        var by, thenBy;
        var sortAscending = function(a, b){
            return a[by] > b[by] ? 1 : ((a[by] == b[by] && thenBy) ? (a[thenBy] > b[thenBy] ? 1 : -1) : -1);
        };
        var sortDescending = function(a, b){
            return a[by] < b[by] ? 1 : ((a[by] == b[by] && thenBy) ? (a[thenBy] > b[thenBy] ? 1 : -1) : -1);
        };

		/**
		 * Sorts the given array of objects by the given property.  Assumes that the
		 *     array is an array of objects (ie: [{prop1:'somestr'},{prop1:'someotherstr'}] )
		 * @param {Array} array
		 * @param {String} property
		 * @returns {Array.sortBy.array|Boolean}
		 */
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
	Array.remove = function(array, filter){
		var indexes = Array.findIndexes(array, filter) || [];
		for(var i=0; i<indexes.length; i++){
			array.splice(i, 1);
		}
		return array;
	};
}

if(!Array.removeOne){
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
    Array.removeOne = function(array, filter){
        var index = Array.findIndex(array, filter);
        if(typeof(index) != undefined && index > -1){
            array.splice(index, 1);
        }
        return array;
    };
}

if(!Array.exists){
	/**
	 * Returns a boolean whether or not the filter value exists in the source array
	 * @param array
	 * @param filter
	 * @returns {boolean}
	 */
    Array.exists = function(array, filter){
        return Array.findIndex(array, filter) !== null;
    };
}

if(!Array.unique){
	/**
	 * Removes any duplicate elements from the source array so that only unique elements remain
	 * @param array
	 * @param filter
	 * @returns {Array}
	 */
    Array.unique = function(array){
		if(!array) return array;
        var found = [];
        for(var i=0; i<array.length; i++){
            if(!Array.exists(found, array[i])){
				found.push(array[i]);
				array[found.length-1] = found[found.length-1];
			}
        }
		array.length = found.length;
        return array;
    };
}

if(!Array.sortNumerically){
	/**
	 * Peforms a numeric sort on the source array
	 * @param array
	 * @returns {Array}
	 */
    Array.sortNumerically = function(array){
        return array.sort(function(a,b){return a-b;});
    };
}

if(!Array.random){
	/**
	 * Returns a random element from the array, without removing it
	 * @param {Array} array
	 * @returns {*}
	 */
    Array.random = function(array){
        return array[Math.floor(Math.random() * array.length)];
    };
}

if(!Array.last){
	/**
	 * Returns the last element in the array, without removing it
	 * @param {Array} array
	 * @returns {*}
	 */
	Array.last = function(array){
		return array[array.length - 1];
	};
}

if(!Array.sum){
	/**
	 * Returns the sum of all elements in the array
	 * NOTE: This is the result of the performing the addition operator on all elements,
	 *    which means the sum will be a numeric value for a numeric array or a concatenated
	 *    string for a string array, etc.
	 * @param {Array} array
	 * @returns {*}
	 */
	Array.sum = function(array){
		if(!array || !array.reduce) return array;
		return array.reduce(function(a,b){
			return a + b;
		}, 0);
	}
}

if(!Array.min){
	/**
	 * Returns the minimum element in the array (without removing it)
	 * NOTE: This is the result of the performing the less than operator on all elements
	 * @param {Array} array
	 * @returns {*}
	 */
	Array.min = function(array){
		if(!array || !array.reduce) return array;
		return array.reduce(function(a, b){
			return b < a ? b : a;
		});
	}
}

if(!Array.max){
	/**
	 * Returns the maximum element in the array (without removing it)
	 * NOTE: This is the result of the performing the greater than operator on all elements
	 * @param {Array} array
	 * @returns {*}
	 */
	Array.max = function(array){
		if(!array || !array.reduce) return array;
		return array.reduce(function(a, b){
			return b > a ? b : a;
		});
	}
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
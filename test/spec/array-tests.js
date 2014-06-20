describe('Array', function(){
    var objects, numbers, strings, mixed, result, expected;

    describe('.each()', function () {
		var array, spy, falsy = null;

		beforeEach(function(){
		    array = [{key:'value1'},{key:'value2'},{key:'value3'},{key:'value4'}];
			spy = jasmine.createSpyObj('spy',['callback']);
		});

		it('should return the array if the array is falsy', function(){
		    var res = Array.each(falsy, spy.callback);
			expect(res).toEqual(falsy);
		});

		it('should return the array if a falsy callback is given', function(){
			var res = Array.each(array, falsy);
			expect(res).toEqual(array);
		});
		
		it('should call the callback function for each item in the array', function(){
		    Array.each(array, spy.callback);
			expect(spy.callback.calls.count()).toEqual(array.length);
		});

		it('should pass each item in the array as the first parameter to the callback', function(){
			Array.each(array, spy.callback);
			for(var i=0; i<array.length; i++){
				expect(spy.callback.calls.argsFor(i)).toContain(array[i]);
			}
		});

		it('should pass the index for each item in the array as the second parameter to the callback', function(){
			Array.each(array, spy.callback);
			for(var i=0; i<array.length; i++){
				expect(spy.callback.calls.argsFor(i)).toContain(i);
			}
		});

		it('should break out of the loop if the callback returns false', function(){
			spy.callback2 = function(item, index){
				if(index >= 2){
					return false;
				}
			};
			spyOn(spy, 'callback2').and.callThrough();
		    Array.each(array, spy.callback2);
			expect(spy.callback2.calls.count()).toEqual(3);
			expect(spy.callback2.calls.count()).toBeLessThan(array.length);
		});

    });

	describe('.copy()', function () {
		var array;

		beforeEach(function(){
		    array = [{key:'value1'},{key:'value2'},{key:'value3'},{key:'value4'}];
		});

		it('should return the original array if JSON is not defined', function(){
		    var json = JSON;
			JSON = undefined;
			var copy = Array.copy(array);
			expect(copy).toBe(array);
			JSON = json;
		});

		it('should return a new object reference', function(){
			var copy = Array.copy(array);
			expect(copy).not.toBe(array);
			expect(copy).toEqual(array);
		});

		it('should return an array that has the same length as the original', function(){
			var copy = Array.copy(array);
			expect(copy.length).toEqual(array.length);
		});

		it('should return new object references for every item in the array', function(){
			var copy = Array.copy(array);
			for(var i=0; i<array.length; i++){
				expect(copy[i]).not.toBe(array[i]);
				expect(copy[i]).toEqual(array[i]);
			}
		});
	});

    describe('.find()', function(){

        beforeEach(function(){
            objects = [
                {key1: 'value1', key2: 'value2', key3: 'value3'},
                {key1: 'value2', key2: 'value3', key3: 'value1'},
                {key1: 'value3', key2: 'value1', key3: 'value2'},
                {key1: 'value2', key2: 'value3', key3: 'value1'}
            ];
            numbers = [1,2,3,4,5,6,7,8,9,1.1,1.2,1.3,1.4,1.5,4];
            strings = ['string1','string2','string3','string4','string4','string5'];
            mixed = [1,'string1',{key1: 'value1'},5,'string2',{key2: 'value2'}];

        });

		describe('basic', function () {

			it('should return an array if the filter matches', function(){
				result = Array.find(numbers, 1);
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(numbers, 1.3);
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(numbers, 4);
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(strings, 'string2');
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(strings, 'string4');
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(mixed, 1);
				expect(result).toEqual(jasmine.any(Array));

				result = Array.find(mixed, 'string2');
				expect(result).toEqual(jasmine.any(Array));
			});

			it('should return null if the filter does not match', function(){
				result = Array.find(numbers, 100);
				expect(result).toBeNull();

				result = Array.find(numbers, 12.34);
				expect(result).toBeNull();

				result = Array.find(strings, 'string7');
				expect(result).toBeNull();

				result = Array.find(mixed, 10);
				expect(result).toBeNull();

				result = Array.find(mixed, 'string7');
				expect(result).toBeNull();
			});

			it('should find all elements in the array where the simple filter matches', function(){
				result = Array.find(numbers, 1);
				expected = [1];
				expect(result).toEqual(expected);

				result = Array.find(numbers, 1.3);
				expected = [1.3];
				expect(result).toEqual(expected);

				result = Array.find(numbers, 4);
				expected = [4, 4];
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string2');
				expected = ['string2'];
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string4');
				expected = ['string4','string4'];
				expect(result).toEqual(expected);

				result = Array.find(mixed, 1);
				expected = [1];
				expect(result).toEqual(expected);

				result = Array.find(mixed, 'string2');
				expected = ['string2'];
				expect(result).toEqual(expected);
			});

			it('should find all elements in the array where all keys in the filter object match', function(){
				result = Array.find(objects, {key2: 'value2'});
				expected = [objects[0]];
				expect(result).toEqual(expected);

				result = Array.find(objects, {key2: 'value1', key3: 'value2'});
				expected = [objects[2]];
				expect(result).toEqual(expected);

				result = Array.find(objects, {key1: 'value2'});
				expected = [objects[1],objects[3]];
				expect(result).toEqual(expected);
			});

			it('should return null if the filter object does not match', function(){
				result = Array.find(objects, {key2: 'value5'});
				expect(result).toBeNull();

				result = Array.find(objects, {key2: 'value1', key3: 'value5'});
				expect(result).toBeNull();

				result = Array.find(objects, {key1: 'value5'});
				expect(result).toBeNull();
			});

		});

		describe('onlyOne', function () {

			it('should return the first matching result for simple filters', function(){
				result = Array.find(numbers, 1, true);
				expected = 1;
				expect(result).toEqual(expected);

				result = Array.find(numbers, 1.3, true);
				expected = 1.3;
				expect(result).toEqual(expected);

				result = Array.find(numbers, 4, true);
				expected = 4;
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string2', true);
				expected = 'string2';
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string4', true);
				expected = 'string4';
				expect(result).toEqual(expected);

				result = Array.find(mixed, 1, true);
				expected = 1;
				expect(result).toEqual(expected);

				result = Array.find(mixed, 'string2', true);
				expected = 'string2';
				expect(result).toEqual(expected);
			});

		});

		describe('indexes', function () {

			it('should return the index of the first matching result for simple filters', function(){
				result = Array.find(numbers, 1.5, false, true);
				expected = [numbers.indexOf(1.5)];
				expect(result).toEqual(expected);

				result = Array.find(numbers, 5, false, true);
				expected = [numbers.indexOf(5)];
				expect(result).toEqual(expected);

				result = Array.find(numbers, 4, false, true);
				expected = [numbers.indexOf(4), numbers.length-1];
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string2', false, true);
				expected = [strings.indexOf('string2')];
				expect(result).toEqual(expected);

				result = Array.find(strings, 'string4', false, true);
				expected = [strings.indexOf('string4'), strings.lastIndexOf('string4')];
				expect(result).toEqual(expected);

				result = Array.find(mixed, 1, false, true);
				expected = [mixed.indexOf(1)];
				expect(result).toEqual(expected);

				result = Array.find(mixed, 'string2', false, true);
				expected = [mixed.indexOf('string2')];
				expect(result).toEqual(expected);
			});

		});





    });

    describe('.findOne()', function(){
        var objects, numbers, strings, mixed, result, expected;

        beforeEach(function(){
            objects = [
                {key1: 'value1', key2: 'value2', key3: 'value3'},
                {key1: 'value2', key2: 'value3', key3: 'value1'},
                {key1: 'value3', key2: 'value1', key3: 'value2'},
                {key1: 'value2', key2: 'value3', key3: 'value1'}
            ];
            numbers = [1,2,3,4,5,6,7,8,9,1.1,1.2,1.3,1.4,1.5,4];
            strings = ['string1','string2','string3','string4','string4','string5'];
            mixed = [1,'string1',{key1: 'value1'},5,'string2',{key2: 'value2'}];

        });



    });

    describe('.replaceAll()', function(){
        var objects, numbers, strings, mixed, result, expected;

        beforeEach(function(){
            objects = [
                {key1: 'value1', key2: 'value2', key3: 'value3'},
                {key1: 'value2', key2: 'value3', key3: 'value1'},
                {key1: 'value3', key2: 'value1', key3: 'value2'},
                {key1: 'value2', key2: 'value3', key3: 'value1'}
            ];
            numbers = [1,2,3,4,5,6,7,8,9,1.1,1.2,1.3,1.4,1.5,4];
            strings = ['string1','string2','string3','string4','string4','string5'];
            mixed = [1,'string1',{key1: 'value1'},5,'string2',{key2: 'value2'},5];

        });

        it('should NOT replace any values if the simple filter does NOT match', function(){
            result = Array.replaceAll(numbers, 100, null);
            expect(result).toEqual(numbers);
            result = Array.replaceAll(strings, 'string7', null);
            expect(result).toEqual(strings);
            result = Array.replaceAll(mixed, 'string7', null);
            expect(result).toEqual(mixed);
        });

        it('should replace all values if the simple filter matches', function(){
            Array.replaceAll(numbers, 2, null);
            expect(numbers[1]).toBeNull();
            Array.replaceAll(numbers, 4, null);
            expect(numbers[3]).toBeNull();
            expect(numbers[numbers.length-1]).toBeNull();
            Array.replaceAll(strings, 'string3', null);
            expect(strings[2]).toBeNull();
            Array.replaceAll(strings, 'string4', null);
            expect(strings[3]).toBeNull();
            expect(strings[4]).toBeNull();
            Array.replaceAll(mixed, 'string1', null);
            expect(mixed[1]).toBeNull();
            Array.replaceAll(mixed, 5, null);
            expect(mixed[3]).toBeNull();
            expect(mixed[6]).toBeNull();
        });

        it('should replace all values if the filter object matches', function(){
            Array.replaceAll(objects, {key1: 'value3'}, {});
            expect(objects[2]).toEqual({});
            Array.replaceAll(objects, {key3: 'value3'}, {});
            expect(objects[0]).toEqual({});
            Array.replaceAll(objects, {key1: 'value2'}, {});
            expect(objects[0]).toEqual({});
            expect(objects[2]).toEqual({});
        });

    });

    describe('.sortBy()', function(){
        var objects;

        beforeEach(function(){
            objects = [
                {key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4'},
                {key1: 'value2', key2: 'value3', key3: 'value1', key4: 'value3'},
                {key1: 'value3', key2: 'value1', key3: 'value2', key4: 'value2'},
                {key1: 'value2', key2: 'value3', key3: 'value1', key4: 'value1'}
            ];
        });

        it('should return false if no array is supplied', function(){
            expect(Array.sortBy(undefined, undefined)).toEqual(false);
        });

        it('should return the original array if no "by" field is supplied', function(){
            var result = Array.sortBy(objects, undefined);
            expect(result).toEqual(objects);
        });

        it('should sort the array of objects based on the field provided', function(){
            var expected = Array.copy(objects).reverse();
            var result = Array.sortBy(objects, 'key4');
            expect(result).toEqual(expected);
        });

        it('should sort the array of objects based on the field and thenBy field provided', function(){
            var expected = [objects[0], objects[3], objects[1], objects[2]];
            var result = Array.sortBy(objects, 'key1', 'key4');
            expect(result).toEqual(expected);
        });

    });

    describe('.removeAll()', function(){

        beforeEach(function(){
            objects = [ //length = 4
                {key1: 'value1', key2: 'value2', key3: 'value3'},
                {key1: 'value2', key2: 'value3', key3: 'value1'},
                {key1: 'value3', key2: 'value1', key3: 'value2'},
                {key1: 'value2', key2: 'value3', key3: 'value1'}
            ];
            numbers = [1,2,3,4,5,6,7,8,9,1.1,1.2,1.3,1.4,1.5,4]; // length = 15
            strings = ['string1','string2','string3','string4','string4','string5']; // length = 6
            mixed = [1,'string1',{key1: 'value1'},5,'string2',{key2: 'value2'},5]; // length = 7
        });

        it('should return the original array if the filter does not match', function(){
            var orig = Array.copy(numbers);
            Array.removeAll(numbers, 100);
            expect(numbers).toEqual(orig);
            orig = Array.copy(strings);
            Array.removeAll(strings, 'string7');
            expect(strings).toEqual(orig);
            orig = Array.copy(mixed);
            Array.removeAll(mixed, 'string7');
            expect(mixed).toEqual(orig);
        });

        it('should remove all elements that match the given filter', function(){
            Array.removeAll(numbers, 2);
            expect(numbers.length).toEqual(14);
            Array.removeAll(numbers, 4);
            expect(numbers.length).toEqual(12);
            Array.removeAll(strings, 'string2');
            expect(strings.length).toEqual(5);
            Array.removeAll(strings, 'string4');
            expect(strings.length).toEqual(3);
            Array.removeAll(mixed, {key1: 'value1'});
            expect(mixed.length).toEqual(6);
            Array.removeAll(mixed, 5);
            expect(mixed.length).toEqual(4);
        });

    });

});
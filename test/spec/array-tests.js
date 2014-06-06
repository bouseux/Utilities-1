describe('Array', function(){
    var objects, numbers, strings, mixed, result, expected;

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

        it('should return an array if the filter matches', function(){
            result = Array.find(numbers, 1);
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(numbers, 1.3);
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(numbers, 4);
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(strings, 'string2');
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(strings, 'string4');
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(mixed, 1);
            expect(Array.isArray(result)).toEqual(true);
            result = Array.find(mixed, 'string2');
            expect(Array.isArray(result)).toEqual(true);
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
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(numbers, 1.3);
            expected = [1.3];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(numbers, 4);
            expected = [4, 4];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(strings, 'string2');
            expected = ['string2'];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(strings, 'string4');
            expected = ['string4','string4'];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(mixed, 1);
            expected = [1];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(mixed, 'string2');
            expected = ['string2'];
            expect(angular.equals(result, expected)).toEqual(true);
        });

        it('should find all elements in the array where all keys in the filter object match', function(){
            result = Array.find(objects, {key2: 'value2'});
            expected = [objects[0]];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(objects, {key2: 'value1', key3: 'value2'});
            expected = [objects[2]];
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.find(objects, {key1: 'value2'});
            expected = [objects[1],objects[3]];
            expect(angular.equals(result, expected)).toEqual(true);
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

        it('should only return the first matching result for simple filters', function(){
            result = Array.findOne(numbers, 1);
            expected = 1;
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(numbers, 1.3);
            expected = 1.3;
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(numbers, 4);
            expected = 4;
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(strings, 'string2');
            expected = 'string2';
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(strings, 'string4');
            expected = 'string4';
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(mixed, 1);
            expected = 1;
            expect(angular.equals(result, expected)).toEqual(true);
            result = Array.findOne(mixed, 'string2');
            expected = 'string2';
            expect(angular.equals(result, expected)).toEqual(true);
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
            expect(angular.equals(result, numbers)).toEqual(true);
            result = Array.replaceAll(strings, 'string7', null);
            expect(angular.equals(result, strings)).toEqual(true);
            result = Array.replaceAll(mixed, 'string7', null);
            expect(angular.equals(result, mixed)).toEqual(true);
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
            expect(angular.equals(objects[2], {})).toEqual(true);
            Array.replaceAll(objects, {key3: 'value3'}, {});
            expect(angular.equals(objects[0], {})).toEqual(true);
            Array.replaceAll(objects, {key1: 'value2'}, {});
            expect(angular.equals(objects[0], {})).toEqual(true);
            expect(angular.equals(objects[2], {})).toEqual(true);
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
            expect(angular.equals(result, objects)).toEqual(true);
        });

        it('should sort the array of objects based on the field provided', function(){
            var expected = angular.copy(objects).reverse();
            var result = Array.sortBy(objects, 'key4');
            expect(angular.equals(result, expected)).toEqual(true);
        });

        it('should sort the array of objects based on the field and thenBy field provided', function(){
            var expected = [objects[0], objects[3], objects[1], objects[2]];
            var result = Array.sortBy(objects, 'key1', 'key4');
            expect(angular.equals(result, expected)).toEqual(true);
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
            var orig = angular.copy(numbers);
            Array.removeAll(numbers, 100);
            expect(angular.equals(numbers, orig)).toEqual(true);
            orig = angular.copy(strings);
            Array.removeAll(strings, 'string7');
            expect(angular.equals(strings, orig)).toEqual(true);
            orig = angular.copy(mixed);
            Array.removeAll(mixed, 'string7');
            expect(angular.equals(mixed, orig)).toEqual(true);
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
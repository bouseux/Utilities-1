describe('String', function(){

    describe('.format()', function(){
        var someString = 'some string',
            result,
            stringType = 'string';

        beforeEach(function(){

        });

        it('should return an empty string if no parameters are passed in', function(){
            expect(String.format()).toEqual('');
        });

        it('should return the original string if only one paramter is passed in', function(){
            expect(String.format(someString)).toEqual(someString);
        });

        it('should return a string regardless of the type of input', function(){
            result = String.format(12345);
            expect(typeof result).toEqual(stringType);
            result = String.format(new Date());
            expect(typeof result).toEqual(stringType);
            result = String.format(function(){});
            expect(typeof result).toEqual(stringType);
        });

        it('should insert a single value if only one placeholder exists in the input', function(){
            var input = 'you have {0} alert(s)';
            expect(String.format(input, 3)).toEqual('you have 3 alert(s)');
        });

        it('should not change the original input in any way', function(){
            var input = 'you have {0} alert(s)';
            String.format(input, 3);
            expect(input).toEqual('you have {0} alert(s)');
        });

        it('should insert multiple values if multiple placeholders exists in the input', function(){
            var input = 'you have {0} alert{1}';
            expect(String.format(input, 3, 's')).toEqual('you have 3 alerts');
            expect(String.format(input, 1, '')).toEqual('you have 1 alert');
            input = 'there are {0} jobs in {1} locations in {2} states';
            expect(String.format(input, 8, 5, 2)).toEqual('there are 8 jobs in 5 locations in 2 states');
            expect(String.format(input, 'eight', 'five', 'two')).toEqual('there are eight jobs in five locations in two states');
        });

    });

});
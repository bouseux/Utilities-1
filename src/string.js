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
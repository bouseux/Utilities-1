if(!Function.getName){
    Function.getName = function(func){
        if(!func) return false;
        var str = func.toString();
        var name = str.substring(8, str.indexOf('(')).trim() || null;
        return name;
    };
}
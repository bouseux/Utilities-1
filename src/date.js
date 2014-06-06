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
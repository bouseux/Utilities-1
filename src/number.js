if(!Number.random){
    Number.random = function(min, max){
        min = min || 0;
        max = max || 1;
        return Math.floor(Math.random() * (max - min)) + min;
    };
}
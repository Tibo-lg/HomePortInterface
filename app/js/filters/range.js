angular.module('app').filter('range', function () {
    return function (input, min, max, step) {
        var i = 0;
        var rMin = parseInt(min);
        var rMax = parseInt(max);
        var rStep = parseInt(step);
        for (i = rMin; i <= rMax; i++) {
            input.push(i);
        }
        return input;
    };
});

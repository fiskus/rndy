extend = function(childConstructor, parentConstructor) {
    var temporaryConstructor = function() {};
    temporaryConstructor.prototype = parentConstructor.prototype;

    childConstructor.prototype = new temporaryConstructor();
    childConstructor.prototype.constructor = childConstructor;

    childConstructor._super = parentConstructor.prototype;
};

"use strict";

/**
 * Copies the value of `other[propertyName]` to `self` provided that propertyName exists in `other`.  If it does 
 * not, a default value will be set on `self` if no value already exists for that property.
 * 
 * @param {Object} self
 * @param {Object} other
 * @param {String} propertyName
 * @param {mixed} defaultValue
 */
exports.setProperty = function(self, other, propertyName, defaultValue) {
	if (other && typeof other[propertyName] !== "undefined") {
		self[propertyName] = other[propertyName];
	}
	else if (typeof self[propertyName] === "undefined") {
		self[propertyName] = defaultValue;
	}
};

/**
 * Get the class name of an object isntance.
 *  
 * @param {Object} instance
 * @return {String}
 */
exports.getClassName = function(instance) {
	return instance.constructor.toString().match(/\w+ (\w+)/)[1];
};

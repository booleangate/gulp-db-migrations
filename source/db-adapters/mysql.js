"use strict";

var mysql = require("mysql"),
	AbstractAdapter = require("./abstract.js");

function MysqlAdapter(config) {
	this.configure(config);
}


require("util").inherits(MysqlAdapter, AbstractAdapter);


MysqlAdapter.prototype.connect = function() {
	this.connection = mysql.createConnection({
		host: this.host,
		user: this.username,
		password: this.password
	});
	
	this.connection.connect();
};

MysqlAdapter.prototype.executeScript = function(script, onComplete) {
	this.connection.query(script, queryCallback(onComplete));
};

MysqlAdapter.prototype.startTransaction = function(onComplete) {
	this.connection.query("START TRANSACTION", queryCallback(onComplete));
};  

MysqlAdapter.prototype.commit = function(onComplete) {
	this.connection.query("COMMIT", queryCallback(onComplete));
};

MysqlAdapter.prototype.rollback = function(onComplete) {
	this.connection.query("ROLLBACK", queryCallback(onComplete));
};

function queryCallback(onComplete) {
	return function(error) {
		if (error) {
			throw error;
		}
		
		onComplete();
	};
}

module.exports = MysqlAdapter;

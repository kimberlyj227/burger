const connection = require("../config/connection.js");

let printQuestionMarks = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

let objToSql = (ob) => {
    let arr = [];
    for (var key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key} = ${value}`);
        }
    }
    return arr.toString();
}

const orm = {


    all: function (tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) throw err;
            cb(result);
        })
    },


    create: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },

    // 'UPDATE burgers SET devoured = undefined WHERE id = 4'
    update: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, vals, (err, result) => {
            if (err) throw err;
            cb(result);
        });

    },

    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE "
        queryString += condition;
        console.log(queryString);
        connection.query(queryString, (err, result) => {
          if (err) throw err;
          cb(result);
        })
      }

};

module.exports = orm;
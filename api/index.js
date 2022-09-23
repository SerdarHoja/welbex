const express = require("express");
const app = express();

module.exports = {
    path: "/api",
    handler: app,
};
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "welbex",
    password: "serdar",
});
connection.connect(function(err) {
    if (err) {
        return console.error("error: " + err.message);
    } else {
        app.get("/list", (req, res) => {
            let sql = "SELECT * from welbex";
            connection.query(sql, function(error, row, fields) {
                if (error) {
                    console.log(error);
                }
                let dat = [];
                for (let i = 0; i < row.length; i++) {
                    dat.push({
                        date: row[i].date,
                        title: row[i].title,
                        quantity: row[i].quantity,
                        distance: row[i].distance,
                    });
                }
                ret = JSON.stringify(dat);
                res.send(ret);
            });
        });
        app.get("/listByFilter", (req, res) => {
            console.log("test", req.query.columnName);
            if (req.query.columnName == "date") {
                column_name = "DATE(date)";
            }

            if (req.query.columnName == "title") {
                column_name = "title";
            }

            if (req.query.columnName == "quantity") {
                column_name = "quantity";
            }

            if (req.query.columnName == "distance") {
                column_name = "distance";
            }

            if (req.query.type == "equal") {
                operation = "=";
            }
            if (req.query.type == "like") {
                operation = " " + "LIKE" + " ";
            }
            if (req.query.type == "more") {
                operation = ">";
            }
            if (req.query.type == "less") {
                operation = "<";
            }
            value = req.query.value;
            if (operation == " " + "LIKE" + " ") {
                value = "%" + value + "%";
            }

            let sql =
                "SELECT * from welbex where " +
                column_name +
                " " +
                operation +
                " " +
                "'" +
                value +
                "'";
            console.log({ sql });
            connection.query(sql, function(error, row, fields) {
                if (error) {
                    console.log(error);
                }
                let dat = [];
                for (let i = 0; i < row.length; i++) {
                    dat.push({
                        date: row[i].date,
                        title: row[i].title,
                        quantity: row[i].quantity,
                        distance: row[i].distance,
                    });
                }
                ret = JSON.stringify(dat);
                res.send(ret);
            });
        });
    }
});
// connection.end();
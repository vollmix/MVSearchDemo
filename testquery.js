var marklogic = require("marklogic");
var conn = require("./routes/env.js").connection;

var db = marklogic.createDatabaseClient(conn);
var qb = marklogic.queryBuilder;

// This would likely come from a text box in the UI
var queryString = "Oregon"
db.documents.query(
    qb.where(
        qb.collection("housedata"))
                    .calculate(qb.facet('state'))
                    .withOptions({ categories: 'none' })


).result( function(results) {
    console.log(JSON.stringify(results, null, 2));
}, function (error) {
    console.log(JSON.stringify(error, null, 2));
});
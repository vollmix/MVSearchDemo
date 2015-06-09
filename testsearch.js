var marklogic = require("marklogic");
var conn = require("./routes/env.js").connection;

var db = marklogic.createDatabaseClient(conn);
var qb = marklogic.queryBuilder;



db.documents.query(
    qb.where(
        qb.word(qb.field('state'), 'Washington')
    )
)
.stream().
  on("data", function (document) {
    console.log(document);
}).
  on("error", function (error) {
    console.error(error)
});

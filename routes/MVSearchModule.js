var marklogic = require("marklogic");
var conn = require("./env.js").connection

var qb = marklogic.queryBuilder;
var db = marklogic.createDatabaseClient(conn);

module.exports = function () {
    
    // MarkLogic
    return {
        // Keyword Search through parsing the input string
        Keysearch : function (request, response) {
            
            try {
                var searchString = "";
                if (request.body.SearchString) {
                    searchString = request.body.SearchString;
                }
                
                db.documents.query(
                    qb.where(
                        qb.collection("housedata"),
                        qb.parsedFrom(searchString))
                            .orderBy(qb.sort('price'))
                                //.slice(qb.snippet())
                                //.withOptions({ categories: ['content', 'metadata'] })
                                //.withOptions({categories: ['content']})
                )
                    .result(function (documents) {
                    if (documents.length > 0) {
                        response.render('index', { search : 'KeyWord' , session : request.session, results : documents, searchString : searchString }); 
                        response.end();
                    } else {
                        response.render('index', { search: 'NoDocs', session : request.session, searchString : searchString});
                        response.end();
                    }
                });
            } catch (e) {
                response.render('index', { error : true , exception : e });
                response.end();
            }
        },
        
        // do search and order the results by relevance get all meta data in snippet format
        KeysearchRel : function (request, response) {            
            try {
                var searchString = "";
                if (request.body.RelSearchString) {
                    searchString = request.body.RelSearchString;
                }
                
                db.documents.query(
                    qb.where(
                        qb.collection("housedata"),
                        qb.parsedFrom(searchString))
                        .orderBy(qb.sort(qb.score(), "descending"))
                                .slice(qb.snippet())
                                .withOptions({ categories: ['content', 'metadata'] })
                                //.withOptions({categories: ['content']})
                )
                    .result(function (documents) { //documents[].results[].score
                    if (documents[0].total > 0) {
                        var thedata = documents[0]; // extract the stats snippet

                        var thedocs = new Array(thedata.total-1);  // just for the documnts                        
                        for (i = 1 ; i <= thedata.total; i++){
                            thedocs[i - 1] = documents[i];
                        }


                        response.render('index', { search : 'KeyWordRel' , session : request.session, results : thedocs, resdata : thedata, searchString : searchString });
                        response.end();
                    } else {
                        response.render('index', { search: 'NoDocs', session : request.session, searchString : searchString });
                        response.end();
                    }
                });
            } catch (e) {
                response.render('index', { error : true , exception : e });
                response.end();
            }

        },    
        
        //retrieve all docs matching a facet through a field search over a field index
        FieldSearch : function (request, response) {
            try {
                var state = "";
                var searchString = "";
                var query;
                var query2;
                if (request.body.FacetButton) {
                    searchString = (request.body.FacetButton).replace(" ", "");
                    query = JSON.stringify(searchString).split(":");
                    query2 = query[0].split("\"");
                    state = query[0];

                }
                
                db.documents.query(
                    qb.where(
                        qb.word(qb.field('state'), state)
                    )
                )
                    .result(function (documents) {
                    if (documents.length > 0) {
                        response.render('index', { search : 'FieldSearch' , session : request.session, results : documents , searchString : state});
                        response.end();
                    } else {
                        response.render('index', { search: 'NoDocs', session : request.session , searchString : state });
                        response.end();
                    }
                });
            } catch (e) {
                response.render('index', { error : true , exception : e });
                response.end();
            }



        },

         // retrieve the facets for the state firld range index store the result in session state
        FacetSearch : function (request, response, facetString) {
            try {
                db.documents.query(
                    qb.where(
                        qb.collection("housedata"))
                    .calculate(qb.facet(facetString))
                    .withOptions({ categories: 'none' })

                )
                    .result(function (documents) {
                    if (documents.length > 0) {
                        request.session['facets'] = documents[0];
                        response.render('index', { search : 'Facet' , session : request.session, searchString : facetString });
                        response.end();
                    } else {
                        response.render('index', { title: 'NoDocs', session : request.session });
                        response.end();
                    }
                });
            } catch (e) {
                response.render('index', { error : true , exception : e });
                response.end();
            }



        },

    }
}

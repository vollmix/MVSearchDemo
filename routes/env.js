var dev = {
    database: "SearchDemo", // Each connection can specify its own database
    host: "localhost",     // The host against which queries will be run
    port: 8000,            // By default port 8000 accepts Client API requests
    user: "vollmix",        // A user with at least the rest-writer role
    password:"Pasing.123",  // Probably not your password
    authType: "basic" ,    // The default auth
    ssl: false
}

// Another connection. Change the module.exports below to 
// use it without having to change consuming code.
var test = {
    database: "Documents",
    host: "acceptance.example.com",
    port: 9116,
    user: "app-writer",
    password: "********",
    authType: "DIGEST"
}

module.exports = {
    connection: dev       // Export the development connection
}
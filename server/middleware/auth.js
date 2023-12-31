const jwt = require("jsonwebtoken");
require('dotenv').config();
 

module.exports = async (request, response, next) => {
    try {
        //   get the token from the authorization header
        const token = await request.headers.authorization.split(" ")[ 1 ];
console.log("token1",token);
        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, process.env.JWTPRIVATEKEY);
  console.log("Generated token",decodedToken);
        // retrieve the user details of the logged in user
        const user = await decodedToken;
      
        // pass the user down to the endpoints here
        request.user = user;

        // pass down functionality to the endpoint
        next();

    } catch (error) {
        response.status(401).json({
            error: "Invalid request!",
        });
    }
};

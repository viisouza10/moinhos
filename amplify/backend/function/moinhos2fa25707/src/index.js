

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    // const id = eq.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH
    const pets = ['zeus', 'apollo', 'bella', 'cocoa', 'charlie']
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify({
            pets,
            event
          }),
    };
};

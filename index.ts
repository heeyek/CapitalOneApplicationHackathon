import * as AWS from 'aws-sdk';

AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
};
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getPurchases, getPurchasesSortedHighToLowToday, getTopThreePurchasesToday} from "./service/capitalOneService";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello World Panda'
    };

    console.log('BELOW IS THE EVENT');
    console.log(JSON.stringify(event));

    if (event.httpMethod === 'POST') {

    }

    if (event.httpMethod === 'PUT') {

    }

    if (event.httpMethod === 'GET') {
        console.log('GET Method is called');

        if (event.resource === '/purchases/{accountId}/daily/top' && event.pathParameters != null) {
            const sortedPurchases = await getTopThreePurchasesToday(event.pathParameters.accountId);
            console.log(`Result from getTopThreePurchasesToday with ${JSON.stringify(sortedPurchases)}`);
            return {
                statusCode: 200,
                body: JSON.stringify(sortedPurchases)
            };
        }

        if (event.path.includes('/getPurchases') && event.pathParameters != null) {
            const purchases = await getPurchasesSortedHighToLowToday(event.pathParameters.accountId);
            console.log(`Result from getPurchases with ${JSON.stringify(purchases)}`);
            return {
                statusCode: 200,
                body: JSON.stringify(purchases)
            }
        }
    }

    return response;
};
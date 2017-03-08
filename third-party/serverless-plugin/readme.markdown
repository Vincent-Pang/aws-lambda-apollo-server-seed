Credit for the code goes to Nacho García (@nachoab)

###Instructions

- Place the `api-gateway-auth-plugin` folder into the `node_modules` folder of your project.
- Add the following to your "serverless.yml" file (at root level, i.e. no indentation)

```
plugins:
  - api-gateway-auth-plugin
```

- Then simply change the desired events:

```
foobar:
    handler: foobar.myMethod
    timeout: 30
    events:
      - http:
          path: do-something/{where}/{when}
          method: GET
          useIAMAuth: true
      - http:
          path: do-something-else
          method: POST
          useIAMAuth: true
          invokeWithCallerCredentials: true
```

###Testing

You can run the following command to perform a "dry run":

```
serverless deploy --noDeploy
```

This will create all the relevent files in the `.serverless` directory:

```
cd .serverless
```

Then you can inspect the `cloudformation-template-update-stack.json` file. If you search for `AWS_IAM` you should find matching results:

```
"ApiGatewayMethodDoDashsomethingDashelsePost": {
      "Type": "AWS::ApiGateway::Method",
      "Properties": {
        "HttpMethod": "POST",
        "RequestParameters": {},
        "ResourceId": {
          "Ref": "ApiGatewayResourceFoobar"
        },
        "RestApiId": {
          "Ref": "ApiGatewayRestApi"
        },
        "AuthorizationType": "AWS_IAM",
```
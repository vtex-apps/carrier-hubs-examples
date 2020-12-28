# Label Emitter Example

A reference app that implements the builder for label emitter apps and exports the API that integrates with the VTEX label emitter hub.

Requirements for an IO app that emit labels:
- Use the Node or Dotnet and vtex.carrier-label-emitter builders,
- Export the API that is called by the vtex.carrier-label-emitter app.

### vtex.carrier-label-emitter builder
Along with the Node or Dotnet builder, the use of the vtex.carrier-label-emitter builder is what makes the app as a label-issuing type, and thus be detected by our hub. The steps to use the builder:

1. Add builder vtex.carrier-label-emitter: 0.x to the list of builders, in the file manifest.json. Ex:
```
"builders": {
    "node": "6.x",
    "vtex.carrier-label-emitter": "0.x"
}
```
2. Create the vtex.carrier-label-emitter folder at the root of the project, and inside it create the configuration.json file. This file must contain the name of the type of label that will be displayed to the customer or user. File format:
```
{
  "labelOptions": [
    {
      "optionName": string
    }
  ]
}
```

### API

#### /labels
Route that generates a file that contains one or more tags referring to the packages sent to the app. The response from the endpoint should be just an url to access the generated file.

- Method: POST
- Input sent by the hub ([typing details](https://github.com/vtex-apps/carrier-hubs-examples/blob/main/label-emitter-example/node/typings/typings.d.ts#L185)):
```
{
	"account": Account,
	"packages": Package[],
	"originAddress": OriginAddress
}
```
- Expected output:
```
{
	"url": string
}
```
- Example route definition in the service.json file of a Node or Dotnet app:
```
"getLabels": {
      "path": "/labels",
      "public": false,
      "access": "authorized",
      "policies": [
        {
          "effect": "allow",
          "actions": [
            "post"
          ],
          "principals": [
            "vrn:apps:*:{{account}}:{{workspace}}:app/vtex.carrier-label-emitter@*"
          ]
        }
      ]
    }
```

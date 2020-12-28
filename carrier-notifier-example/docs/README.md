# Notifier Example

A reference app that implements the builder for carrier notifying apps and that exports the API that integrates with the VTEX notification hub.

Requirements for an IO app that notifies carriers:
- Use the Node or Dotnet and vtex.carrier-notifier builders,
- Export the API that is called by the vtex.carrier-notifier app.


## vtex.carrier-notifier builder
Along with the Node or Dotnet builder, the use of the vtex.carrier-notifier builder is what makes the app as a notifier type, and thus be detected by our hub. The steps to use the builder:

1. Add builder vtex.carrier-notifier: 0.x to the list of builders, in the file manifest.json. Ex:
```
"builders": {
    "node": "6.x",
    "vtex.carrier-notifier": "0.x"
}
```
2. Create the vtex.carrier-notifier folder at the root of the project, and inside it create the configuration.json file. This file must contain the name of the notified carrier, which will be displayed to the customer or user. File format:
```
{
  "notificationOptions": [
    {
      "carrierName": string
    }
  ]
}
```

## API

### /notify
Notifies the carrier of an order for dispatch. The dispatched packages are sent on the request, and aslo the tax information of the carrier that will be notified and the contact email. The answer must be the tracking information and the generated id referring to the notification made to the carrier, per package.
- Method: POST
- Input sent by the hub ([typing details](https://github.com/vtex-apps/carrier-hubs-examples/blob/main/carrier-notifier-example/node/typings/typings.d.ts#L187)):
```
{
	"dispatchOrder": DispatchOrder,
	"account": LicenseManagerAccount,
	"email": string
}
```
- Expected output: a map whose keys are the package ids, and the value is an object containing the tracking information and the package notification id.
```
{
	<id_pacote> : {
		"tracking": {
			"number": string,
			"url": string
		},
		"notification": {
			"id": string
		}
	}
}
```
- Example route definition in the service.json file of a Node or Dotnet app:
```
"notify": {
      "path": "/notify",
      "public": false,
      "access": "authorized",
      "policies": [
        {
          "effect": "allow",
          "actions": [
            "post"
          ],
          "principals": [
            "vrn:apps:*:{{account}}:{{workspace}}:app/vtex.carrier-notifier@*"
          ]
        }
      ]
    }
```
### /notfis
Generates a Notification file based on the package and store data that are received by the App. In this case, there is no direct notification with the carrier, only the generation of the file.
- Method: POST
- Input sent by the hub: ([typing details](https://github.com/vtex-apps/carrier-hubs-examples/blob/main/carrier-notifier-example/node/typings/typings.d.ts#L193))
```
{
	"packages": Package[],
	"account": LicenseManagerAccount
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
"generateNotfis": {
      "path": "/notfis",
      "public": false,
      "access": "authorized",
      "policies": [
        {
          "effect": "allow",
          "actions": [
            "post"
          ],
          "principals": [
            "vrn:apps:*:{{account}}:{{workspace}}:app/vtex.carrier-notifier@*"
          ]
        }
      ]
    }
```

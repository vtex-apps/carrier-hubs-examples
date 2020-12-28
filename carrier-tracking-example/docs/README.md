# Tracking Example

A reference app that implements the builder for carrier tracking apps and that exports the API that integrates with the VTEX tracking hub.

Requirements for an IO app that tracking packages:
- Use the Node or Dotnet and vtex.carrier-tracking builders,
- Export the API that is called by the vtex.carrier-tracking app.

The tracking apps can be called every X minutes, with the request to update the events of a list of tracking codes, for packages that are still pending delivery.

### vtex.carrier-tracking builder
Along with the Node or Dotnet builder, the use of the vtex.carrier-tracking builder is what makes the app as a tracking type, and thus be detected by our hub. The steps to use the builder:

1. Add builder vtex.carrier-tracking: 0.x to the list of builders, in the file manifest.json. Ex:
```
"builders": {
    "node": "6.x",
    "vtex.carrier-tracking": "0.x"
}
```
2. Create the vtex.carrier-tracking folder at the root of the project, and inside it create the configuration.json file. This file must contain the name of the carrier that will do the tracking, which will be displayed to the customer or user. File format:
```
{
  "trackingOptions": [
    {
      "carrierName": "vtexcorreios"
    }
  ]
}
```

### API

#### /notify
Endpoint called by the hub to obtain the tracking events for a set of tracking codes.

- Method: POST
- Input sent by the hub:
```
[
  {
    "trackingNumber": string
  }
]
```
- Expected output: a map whose keys are the package ids, and the value is an object containing the tracking information and the package notification id.
```
{
  <packageId>: {
		"packageId": string,
    "deliveredDate": Date,
    "events": [
      {
        "city": string,
        "date": Date,
        "description": string,
        "state": string
      }
    ],
    "hasReturnedToSender": bool,
    "isDelivered": bool
  }
}
```
- Example route definition in the service.json file of a Node or Dotnet app:
```
"GetTrackingEvents": {
      "path": "/tracking",
      "public": false,
      "access": "authorized",
      "policies": [
        {
          "effect": "allow",
          "actions": [
            "post"
          ],
          "principals": [
            "vrn:apps:*:{{account}}:{{workspace}}:app/vtex.carrier-tracking@*"
          ]
        }
      ]
    }
```

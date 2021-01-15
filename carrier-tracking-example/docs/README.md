# Tracking App

## Before you start

VTEX Log connects carriers and store owners to deliver better freight costs, and a simpler and smarter logistics operation. Our VTEX Log UI uses the following steps during a package's tracking process:
- **Notification:** our OMS notifies the carrier that a package is being dispatched.
- **Label:** tracking label is issued.
- **Tracking:** tracking of the package begins, and is repeated in cycles, until its final delivery.

For *carriers* to integrate with VTEX Log's Hub, our main system, it is necessary to develop apps in VTEX IO. The carrier's apps integrate with the hub, that in turn are connected to other VTEX systems, fulfilling the steps cited above.

For the integration, carriers should develop VTEX IO apps only for the `Notification` and `Tracking` steps. The `Label` app will be developed internally by the VTEX Log team, our partners. Apps should be developed by following the model files included in this repository:
- [Notification app model](https://github.com/vtex-apps/carrier-hubs-examples/tree/main/carrier-notifier-example)
- [Tracking app model](https://github.com/vtex-apps/carrier-hubs-examples/tree/main/carrier-tracking-example)

The app's developement is associated to **API routes** that should also be developed by the carrier for the app to function fully. Check out our [API Reference]() for more details about all API calls.

## Tracking App Model

This is an example app that implements the builder for carrier tracking apps. It also exports the API that integrates with the VTEX Log's tracking hub. The Tracking Apps can be called every X minutes, with the request to update the events of a list of tracking codes, for packages that are still pending delivery.

Requirements for an IO app for tracking:
- Use the *Node* or *Dotnet* and *vtex.carrier-notifier* builders.
- Export the API that is called by the *vtex.carrier-notifier* app.

Follow the instructions below, to model your carrier app according to this example.

### vtex.carrier-tracking builder
Along with the *Node* or *Dotnet* builder, the use of the `vtex.carrier-tracking` builder is what makes the app as a tracking type, and thus be detected by our hub. The steps to use the builder are the following:

1. Add builder `vtex.carrier-tracking: 0.x` to the list of builders, in the file `manifest.json`. 
Ex:
```
"builders": {
    "node": "6.x",
    "vtex.carrier-tracking": "0.x"
}
```
2. Create the `vtex.carrier-tracking` folder at the *root* of the project.
 Whithin it, create the `configuration.json` file. 
 This file must contain the name of the carrier that will do the tracking, which will be displayed to the customer or user.  File format:
```
{
  "trackingOptions": [
    {
      "carrierName": "vtexcorreios"
    }
  ]
}
```

### API routes

#### Tracking Events: /tracking

> Check out the [API Reference]() for full details.

This endpoint is called by the hub to  obtain the tracking events of a series of tracking numbers. The expected response is an object contaning the tracking information and the package's notification ID for every `packageID`.

**1. Input sent by the hub**:
```
[
  {
    "trackingNumber": string
  }
]
```
**2. Expected output:** a map whose keys are the package ids, and the value is an object containing the tracking information and the package's `notificationId`.
```
{
  <trackingNumber>: {
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
**3. Example route definition in the `service.json` file of a Node or Dotnet app**:
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

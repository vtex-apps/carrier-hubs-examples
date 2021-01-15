# Label Emitter App

## Before you start

VTEX Log connects carriers and store owners to deliver better freight costs, and a simpler and smarter logistics operation. Our VTEX Log UI uses the following steps during a package's tracking process:
- **Notification:** our OMS notifies the carrier that a package is being dispatched.
- **Label:** tracking label is issued.
- **Tracking:** tracking of the package begins, and is repeated in cycles, until its final delivery.For *carriers* to integrate with VTEX Log's Hub, our main system, it is necessary to develop apps in VTEX IO. The carrier's apps integrate with the hub, that in turn are connected to other VTEX systems, fulfilling the steps cited above.

For the integration, carriers should develop VTEX IO apps only for the `Notification` and `Tracking` steps. The `Label` app will be developed internally by the VTEX Log team, our partners. Apps should be developed by following the model files included in this repository:
- [Notification app model](https://github.com/vtex-apps/carrier-hubs-examples/tree/main/carrier-notifier-example)
- [Tracking app model](https://github.com/vtex-apps/carrier-hubs-examples/tree/main/carrier-tracking-example)

The app's developement is associated to **API routes** that should also be developed by the carrier for the app to function fully. Check out our [API Reference]() for more details about all API calls.

## Label Emitter App Model

This is an example app that implements the builder for label emitter apps and exports the API that integrates with the VTEX label emitter hub.

Requirements for an IO app that notifies carriers:
- Use the *Node* or *Dotnet* and *vtex.carrier-label-emitter* builders.
- Export the API that is called by the *vtex.carrier-label-emitter* app.

Follow the instructions below, to model your carrier app according to this example.

### vtex.carrier-label-emitter builder
Along with the *Node* or *Dotnet* builder, the use of the `vtex.carrier-label-emitter` builder is what makes the app as a label-issuing type, and thus be detected by our hub. The steps to use the builder:

1. Add builder `vtex.carrier-label-emitter: 0.x` to the list of builders, in the file `manifest.json`.
Ex:
```
"builders": {
    "node": "6.x",
    "vtex.carrier-label-emitter": "0.x"
}
```
2. Create the `vtex.carrier-label-emitter` folder at the *root* of the project.
Whithin it, create the `configuration.json` file.
This file must contain the name of the type of label that will be displayed to the customer or user.
File format:
```
{
  "labelOptions": [
    {
      "optionName": string
    }
  ]
}
```

### API Routes

#### Emit Label: /labels

> Check out the [API Reference]() for full details.

This endpoint generates a file that contains one or more labels from the packages sent to the app. This endpoint's response is an url providing access to the generated label file.

**1.Input sent by the hub**: ([typing details](https://github.com/vtex-apps/carrier-hubs-examples/blob/main/label-emitter-example/node/typings/typings.d.ts#L185))
```
{
	"sender": JuridicPerson,
	"packages": Package[]
}
```

**2. Expected output**:
```
{
	"url": string
}
```

**3. Example route definition in the service.json file of a Node or Dotnet app**:
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

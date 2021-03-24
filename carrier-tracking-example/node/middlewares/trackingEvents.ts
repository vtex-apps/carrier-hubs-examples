import { json } from 'co-body'

export async function trackingEvents(ctx: Context, next: () => Promise<any>) {
  const { clients: { google } } = ctx

  const content = await json(ctx.req) as TrackingRequest[]
  console.log(content.length)

  //access a external service (remember to add the policy on manifest.json)
  const googleResponse = await google.Get()
  console.log(googleResponse != null)

  //access settings by account
  const appSettings = await ctx.clients.apps.getAppSettings(
    '' + process.env.VTEX_APP_ID
  )
  console.log(appSettings)

  ctx.status = 200
  ctx.body = {
    "OL589419015BR": {
      "deliveredDate": "2020-09-28T16:15:00.0000000-03:00",
      "events": [
        {
          "city": "BRASILIA",
          "date": "2020-09-28T16:15:00.0000000-03:00",
          "description": "Objeto entregue ao destinatário",
          "state": "DF"
        },
        {
          "city": "BRASILIA",
          "date": "2020-09-28T11:20:00.0000000-03:00",
          "description": "Objeto saiu para entrega ao destinatário",
          "state": "DF"
        },
        {
          "city": "BRASILIA",
          "date": "2020-09-03T15:41:00.0000000-03:00",
          "description": "Objeto ainda não chegou à unidade",
          "state": "DF"
        },
        {
          "city": "BRASILIA",
          "date": "2020-08-22T04:55:00.0000000-03:00",
          "description": "Objeto em trânsito - por favor aguarde",
          "state": "DF"
        },
        {
          "city": "CAJAMAR",
          "date": "2020-08-19T02:59:00.0000000-03:00",
          "description": "Objeto em trânsito - por favor aguarde",
          "state": "SP"
        },
        {
          "city": "SAO PAULO",
          "date": "2020-08-18T10:50:00.0000000-03:00",
          "description": "Objeto em trânsito - por favor aguarde",
          "state": "SP"
        },
        {
          "city": "SAO PAULO",
          "date": "2020-08-17T11:43:00.0000000-03:00",
          "description": "Objeto postado",
          "state": "SP"
        }
      ],
      "hasReturnedToSender": false,
      "isDelivered": true
    }
  }

  await next()
}

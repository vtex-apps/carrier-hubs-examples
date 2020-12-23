import { json } from 'co-body'

export async function generateLabels(ctx: Context, next: () => Promise<any>) {

  const content = await json(ctx.req) as LabelsContent
  console.log(content.packages.length)

  ctx.status = 200
  ctx.body = {
    url: "Not implemented"
  }

  await next()
}

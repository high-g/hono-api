import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { prisma } from './lib/prisma'

const app = new Hono()

const PostSchema = z.object({
  title: z.string().min(1, 'タイトルは1文字以上必要です'),
  content: z.string().optional(),
  authorId: z.number().int(),
})

const routes = app
  .get('/posts', async (c) => {
    const posts = await prisma.post.findMany({
      include: { author: true },
    })
    return c.json(posts)
  })
  .post('/posts', zValidator('json', PostSchema), async (c) => {
    const body = c.req.valid('json')
    const post = await prisma.post.create({ data: body })
    return c.json(post, 201)
  })
  .get('/posts/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const post = await prisma.post.findUnique({ where: { id }, include: { author: true } })
    return c.json(post)
  })

export type AppType = typeof routes

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

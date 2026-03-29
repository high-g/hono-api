import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { prismaPostsRoutes } from './routes/prismaPosts'

const app = new Hono()

app.route('/posts', prismaPostsRoutes)

export type AppType = typeof app

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

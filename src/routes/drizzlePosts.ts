import { Hono } from 'hono'
import { db } from '../lib/drizzle'
import { posts } from '../../drizzle/schema'

export const drizzlePostRoutes = new Hono().get('/', async (c) => {
  const allPosts = await db.query.posts.findMany({
    with: { author: true },
  })
  return c.json(allPosts)
})

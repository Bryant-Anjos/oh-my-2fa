import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'

import TwoFactorAuthenticationRoutes from './routes/TwoFactorAuthenticationRoutes'

const _2FARoutes = new TwoFactorAuthenticationRoutes()

export default class App {
  constructor(
    private readonly server = new Elysia()
      .use(cors())
      .use(swagger({ path: '/docs', exclude: ['/docs', '/docs/json'] }))
      .use(_2FARoutes.create),
  ) {}

  start(port: number, callback?: () => void) {
    this.server.listen(port)
    callback?.()
  }

  get hostname() {
    return this.server.server?.hostname
  }
}

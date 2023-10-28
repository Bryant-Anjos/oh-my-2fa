import { renderToReadableStream } from 'react-dom/server'
import TwoFactorAuthentication from './model/2FA'
import SecretKey from './model/SecretKey'

const _2FA = new TwoFactorAuthentication(new SecretKey('30cda297ae57'))

console.log(_2FA.generateOTP(new Date(1698464402167)))
console.log(_2FA.generateOTP(new Date(1698464402167)))
console.log(_2FA.generateOTP(new Date(1698464403167)))
console.log(_2FA.isValidOTP('166582', new Date(1698464402167)))
console.log(_2FA.isValidOTP('166582', new Date(1698464403167)))

Bun.serve({
  port: 3333,
  async fetch(req: Request) {
    const url = new URL(req.url)

    if (url.pathname.startsWith('/dist/')) {
      const publicFilePath = url.pathname.substring(1)
      return new Response(Bun.file(publicFilePath))
    }

    const Component = (await import('./pages/_layout')).default
    const stream = await renderToReadableStream(
      <Component route={url.pathname} />,
      {
        bootstrapModules: ['/dist/main.js'],
      },
    )
    return new Response(stream, {
      headers: { 'Content-Type': 'text/html' },
    })
  },
})

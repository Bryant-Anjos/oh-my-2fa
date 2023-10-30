import { edenTreaty } from '@elysiajs/eden'
import App from '@oh-my-2fa/api'

const client = edenTreaty<App>('http://localhost:3333')

const secret = await client.secret.post()

console.log('secret', secret.data)

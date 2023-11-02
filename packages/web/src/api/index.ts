import { edenTreaty } from '@elysiajs/eden'
import Api from '@oh-my-2fa/api'

const api = edenTreaty<Api>('http://localhost:3333')

export default api

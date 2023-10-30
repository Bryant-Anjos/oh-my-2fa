import App from './app'

const app = new App()

export const port = 3333

app.start(port, () => {
  console.log(`🦊 Elysia is running at ${app.hostname}:${port}`)
})

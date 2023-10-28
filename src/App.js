export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Oh My 2FA</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

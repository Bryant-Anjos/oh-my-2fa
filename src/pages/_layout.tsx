import React, { Suspense } from 'react'

import App from '../App'

const router = new Bun.FileSystemRouter({
  style: 'nextjs',
  dir: './src/pages',
})

type RouterContextProps = {
  navigate(route: string): void
}

export const RouterContext = React.createContext({} as RouterContextProps)

function Router({ route }: { route: string }) {
  const Component = React.lazy<React.FC>(
    () => import(router.match(route)?.filePath ?? './index'),
  )

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component />
    </Suspense>
  )
}

export default function Layout({ route }: { route: string }) {
  return (
    <App>
      <Router route={route} />
    </App>
  )
}

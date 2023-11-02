import React from 'react'

import { GetOTPUseCase } from '@oh-my-2fa/core'

const ONE_MINUTE = 60 * 1000

export default function HomePage() {
  const [otp, setOtp] = React.useState('')

  React.useEffect(() => {
    function repeatEvery(func: () => void, interval: number) {
      func()
      const now = new Date()
      const delay = interval - (now.getTime() % interval)

      function start() {
        func()
        const intervalId = setInterval(func, interval)
        return () => clearInterval(intervalId)
      }

      const timeoutId = setTimeout(start, delay)
      return () => clearTimeout(timeoutId)
    }

    const unsubscribe = repeatEvery(timeChanged, ONE_MINUTE)

    return () => unsubscribe()
  }, [])

  function generateOTP() {
    const date = new Date()
    const secret = 'd97af3cea06b'
    return new GetOTPUseCase().execute({ date, secret })
  }

  function timeChanged() {
    generateOTP().then(setOtp)
  }

  return <p>Otp: {otp}</p>
}

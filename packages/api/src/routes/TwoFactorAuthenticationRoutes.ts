import { Elysia, t } from 'elysia'
import { rateLimit } from 'elysia-rate-limit'

import {
  CreateSecretKeyUseCase, GetOTPUseCase, ValidateOTPUseCase,
} from '@oh-my-2fa/core'

import TwoFactorAuthenticationController from '../controllers/TwoFactorAuthenticationController'

const createSecretKeyUseCase = new CreateSecretKeyUseCase()
const getOTPUseCase = new GetOTPUseCase()
const validateOTPUseCase = new ValidateOTPUseCase()
const _2FAController = new TwoFactorAuthenticationController(
  createSecretKeyUseCase,
  getOTPUseCase,
  validateOTPUseCase,
)

const ONE_MINUTE = 60000
const REQUESTS_ALLOWED = 5

export default class TwoFactorAuthenticationRoutes {
  create(app: Elysia) {
    return app
      .post('/secret', _2FAController.createSecretKey)
      .get('/otp/:secret', _2FAController.getOneTimePassword)
      .use(rateLimit({ duration: ONE_MINUTE, max: REQUESTS_ALLOWED }))
      .post('/otp/:secret', _2FAController.validateOneTimePassword, {
        body: t.Object({
          otp: t.String(),
        }),
      })
  }
}

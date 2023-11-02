import { SecretKey, TwoFactorAuthentication } from '@oh-my-2fa/core'

import GetOTPDTO from '../DTO/GetOTPDTO'
import UseCase from './UseCase'

export default class GetOTPUseCase
  implements UseCase<GetOTPDTO, Promise<string>>
{
  execute({ date, secret }: GetOTPDTO): Promise<string> {
    const secretKey = new SecretKey(secret)
    const _2FA = new TwoFactorAuthentication(secretKey)
    return _2FA.generateOTP(date)
  }
}

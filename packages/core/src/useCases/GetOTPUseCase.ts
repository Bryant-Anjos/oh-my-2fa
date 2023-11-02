import GetOTPDTO from '../DTO/GetOTPDTO'
import UseCase from './UseCase'
import TwoFactorAuthentication from '../model/2FA'
import SecretKey from '../model/SecretKey'

export default class GetOTPUseCase
  implements UseCase<GetOTPDTO, Promise<string>>
{
  execute({ date, secret }: GetOTPDTO): Promise<string> {
    const secretKey = new SecretKey(secret)
    const _2FA = new TwoFactorAuthentication(secretKey)
    return _2FA.generateOTP(date)
  }
}

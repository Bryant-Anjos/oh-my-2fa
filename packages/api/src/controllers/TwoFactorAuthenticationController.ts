import { GetOTPDTO, UseCase, ValidateOTPDTO } from '@oh-my-2fa/core'

export default class TwoFactorAuthenticationController {
  constructor(
    private readonly createSecretKeyUseCase: UseCase<void, string>,
    private readonly getOTPUseCase: UseCase<GetOTPDTO, Promise<string>>,
    private readonly validateOTPUseCase: UseCase<
      ValidateOTPDTO,
      Promise<boolean>
    >,
  ) {}

  createSecretKey = () => {
    return this.createSecretKeyUseCase.execute()
  }

  getOneTimePassword = ({
    params: { secret },
  }: {
    params: { secret: string }
  }) => {
    const date = new Date()
    return this.getOTPUseCase.execute({ secret, date })
  }

  validateOneTimePassword = ({
    params: { secret },
    body: { otp },
  }: {
    params: { secret: string }
    body: { otp: string }
  }) => {
    const date = new Date()
    return this.validateOTPUseCase.execute({ secret, otp, date })
  }
}

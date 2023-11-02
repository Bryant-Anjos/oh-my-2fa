import { SecretKey } from '@oh-my-2fa/core'

import UseCase from './UseCase'

export default class CreateSecretKeyUseCase implements UseCase<void, string> {
  execute() {
    const secretKey = new SecretKey()
    return secretKey.value
  }
}

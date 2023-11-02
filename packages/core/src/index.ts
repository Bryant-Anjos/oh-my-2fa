import _GetOTPDTO from './DTO/GetOTPDTO'
import _ValidateOTPDTO from './DTO/ValidateOTPDTO'
import _UseCase from './useCases/UseCase'

export type GetOTPDTO = _GetOTPDTO
export type ValidateOTPDTO = _ValidateOTPDTO
export type UseCase<I, O> = _UseCase<I, O>

export { default as TwoFactorAuthentication } from './model/2FA'
export { default as SecretKey } from './model/SecretKey'

export { default as CreateSecretKeyUseCase } from './useCases/CreateSecretKeyUseCase'
export { default as GetOTPUseCase } from './useCases/GetOTPUseCase'
export { default as ValidateOTPUseCase } from './useCases/ValidateOTPUseCase'

import SecretKey from './SecretKey'

export default class TwoFactorAuthentication {
  constructor(private readonly secretKey: SecretKey) {}

  async generateOTP(date: Date): Promise<string> {
    const timestamp = this.getTimestamp(date)
    const secretKey = this.secretKey.value
    const value = `${secretKey}:${timestamp}`
    const hash = await this.hashValue(value)
    const otp = this.convertHexToOtp(hash)
    return otp
  }

  getTimestamp(date: Date): string {
    const time = date.getTime()
    const timeAtStartOfMinute = Math.floor(time / 60000) * 60000
    const timestamp = timeAtStartOfMinute.toString()
    return timestamp
  }

  async isValidOTP(otp: string, date = new Date()): Promise<boolean> {
    return otp === (await this.generateOTP(date))
  }

  private async hashValue(value: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(value)
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  private convertHexToOtp(hex: string): string {
    const number = BigInt(parseInt(hex, 16))
    const otp = number.toString().padStart(6, '0').slice(0, 6)
    return otp
  }
}

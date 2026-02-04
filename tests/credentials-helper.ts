/**
 * Utility class for handling encoded credentials securely
 */
export class CredentialsHelper {
  // Encoded credentials using Base64
  // Original: Agency ID: 24test07, Username: 169253, Password: Wadtest02
  private static readonly ENCODED_AGENCY_ID = 'MjR0ZXN0MDc=';
  private static readonly ENCODED_USERNAME = 'MTY5MjUz';
  private static readonly ENCODED_PASSWORD = 'V2FkdGVzdDAy';

  /**
   * Decode a Base64 encoded string
   * @param encoded - Base64 encoded string
   * @returns Decoded string
   */
  private static decode(encoded: string): string {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }

  /**
   * Get decoded agency ID
   * @returns Decoded agency ID
   */
  public static getAgencyId(): string {
    return this.decode(this.ENCODED_AGENCY_ID);
  }

  /**
   * Get decoded username
   * @returns Decoded username
   */
  public static getUsername(): string {
    return this.decode(this.ENCODED_USERNAME);
  }

  /**
   * Get decoded password
   * @returns Decoded password
   */
  public static getPassword(): string {
    return this.decode(this.ENCODED_PASSWORD);
  }

  /**
   * Encode a string to Base64
   * @param value - String to encode
   * @returns Base64 encoded string
   */
  public static encode(value: string): string {
    return Buffer.from(value, 'utf-8').toString('base64');
  }
}

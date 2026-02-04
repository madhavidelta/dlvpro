/**
 * Test script to verify credential encoding and decoding
 */
import { CredentialsHelper } from './credentials-helper';

console.log('=== Testing Credentials Helper ===\n');

// Test decoding
console.log('Decoded Credentials:');
console.log(`Agency ID: ${CredentialsHelper.getAgencyId()}`);
console.log(`Username: ${CredentialsHelper.getUsername()}`);
console.log(`Password: ${CredentialsHelper.getPassword()}`);

console.log('\n=== Testing Encoding ===\n');

// Test encoding
const testAgencyId = '24test07';
const testUsername = '169253';
const testPassword = 'Wadtest02';

console.log('Original values:');
console.log(`Agency ID: ${testAgencyId}`);
console.log(`Username: ${testUsername}`);
console.log(`Password: ${testPassword}`);

console.log('\nEncoded values:');
console.log(`Agency ID: ${CredentialsHelper.encode(testAgencyId)}`);
console.log(`Username: ${CredentialsHelper.encode(testUsername)}`);
console.log(`Password: ${CredentialsHelper.encode(testPassword)}`);

console.log('\n=== Verification ===\n');

// Verify encoding/decoding works correctly
const isValid = 
  CredentialsHelper.getAgencyId() === testAgencyId &&
  CredentialsHelper.getUsername() === testUsername &&
  CredentialsHelper.getPassword() === testPassword;

console.log(`Credentials match: ${isValid ? '✓ PASS' : '✗ FAIL'}`);

if (isValid) {
  console.log('\nAll credentials are correctly encoded and can be decoded successfully!');
} else {
  console.log('\nCredential verification failed!');
  process.exit(1);
}

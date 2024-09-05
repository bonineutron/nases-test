import CryptoJS from 'crypto-js';

let secretKey: string = import.meta.env.VITE_SECRET_KEY;

export function objectEncrypt<T>(data: T): string | null {
   try {
      // Encrypt the JSON representation of the data using AES encryption.
      let encryptData: string = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

      return encryptData;
   } catch (error: unknown) {
      // Log any errors that occur during encryption.
      console.error('Crypto-js encrypt error:', error);

      return null;
   }
}

export function objectDecrypt<T>(data: string): T | null {
   try {
      // Decrypt the encrypted data using AES decryption.
      let bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(data, secretKey);
      // Parse the decrypted bytes into a Record<string, string>.
      let decryptData: T = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return decryptData;
   } catch (error: unknown) {
      // Log any errors that occur during decryption.
      console.error('Crypto-js decrypt error:', error);

      return null;
   }
}

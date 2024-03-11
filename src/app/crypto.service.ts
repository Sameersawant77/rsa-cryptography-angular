import { Injectable } from '@angular/core';
import { Crypto } from '@peculiar/webcrypto';
import { environment } from '../environments/environment';

let Buffer: any;

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private crypto: Crypto;

  constructor() {
    this.crypto = new Crypto();
  }

  public async encrypt(plainText: string): Promise<string> {
    const pkcs8 = Buffer.from('key', 'base64');
    try {
      const publicKey = await this.crypto.subtle.importKey(
        'pkcs8',
        // Uint8Array.from(
        //   atob(key),
        //   (c) => c.charCodeAt(0)
        // ),
        pkcs8,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256',
        },
        true,
        ['encrypt']
      );

      const encrypted = await this.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP',
        },
        publicKey,
        new TextEncoder().encode(plainText)
      );

      return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    } catch (err) {
      throw err;
    }
  }

  public async decrypt(encryptedText: string): Promise<string> {
    const pkcs8 = Buffer.from('key', 'base64');
    try {
      const privateKey = await this.crypto.subtle.importKey(
        'pkcs8',
        // Uint8Array.from(
        //   atob(key),
        //   (c) => c.charCodeAt(0)
        // ),
        pkcs8,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256',
        },
        true,
        ['decrypt']
      );

      const decrypted = await this.crypto.subtle.decrypt(
        {
          name: 'RSA-OAEP',
        },
        privateKey,
        Uint8Array.from(atob(encryptedText), (c) => c.charCodeAt(0))
      );

      return new TextDecoder().decode(decrypted);
    } catch (err) {
      throw err;
    }
  }
}

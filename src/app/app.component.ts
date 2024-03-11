import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div>
      <h2>Standalone Component</h2>
      <button (click)="encrypt()">Encrypt</button>
      <button (click)="decrypt()">Decrypt</button>
      <p>Encrypted Text: {{ encryptedText }}</p>
      <p>Decrypted Text: {{ decryptedText }}</p>
    </div>
  `,
})
export class AppComponent {
  encryptedText: string = '';
  decryptedText: string = '';

  constructor(private cryptoService: CryptoService) {}

  async encrypt() {
    const plainText = 'Hello, World!';
    this.encryptedText = await this.cryptoService.encrypt(plainText);
  }

  async decrypt() {
    if (!this.encryptedText) {
      console.error('No encrypted text to decrypt.');
      return;
    }
    this.decryptedText = await this.cryptoService.decrypt(this.encryptedText);
  }
}

export async function encryptSecure(plaintext: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const keyData = await crypto.subtle.digest('SHA-256', encoder.encode(key));
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, 'AES-CBC', false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, data);

  const ivB64 = btoa(String.fromCharCode(...iv));
  const cipherB64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  return btoa(`${ivB64}::${cipherB64}`);
}

export async function decryptSecure(encryptedBase64: string, key: string): Promise<string> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const decoded = atob(encryptedBase64);
  const [ivB64, cipherB64] = decoded.split('::');

  const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
  const cipher = Uint8Array.from(atob(cipherB64), c => c.charCodeAt(0));

  const keyData = await crypto.subtle.digest('SHA-256', encoder.encode(key));
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, 'AES-CBC', false, ['decrypt']);

  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, cipher);
  return decoder.decode(decrypted);
}

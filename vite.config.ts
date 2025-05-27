// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DevPayrCrypto',
      fileName: (format) => `devpayr-crypto.${format}.js`
    }
  }
});

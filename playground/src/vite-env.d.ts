/// <reference types="vite/client" />

// Type declarations for Vite's ?raw imports
declare module '*.tsx?raw' {
  const content: string;
  export default content;
}

declare module '*.ts?raw' {
  const content: string;
  export default content;
}

declare module '*.jsx?raw' {
  const content: string;
  export default content;
}

declare module '*.js?raw' {
  const content: string;
  export default content;
}

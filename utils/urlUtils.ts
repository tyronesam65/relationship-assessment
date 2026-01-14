
/**
 * Unicode-safe Base64 encoding
 */
export const encodeData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Use TextEncoder to handle Unicode characters correctly
    const bytes = new TextEncoder().encode(jsonString);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.error('Encoding error:', e);
    return '';
  }
};

/**
 * Unicode-safe Base64 decoding
 */
export const decodeData = (base64: string): any => {
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonString = new TextDecoder().decode(bytes);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Decoding error:', e);
    return null;
  }
};

/**
 * Robust base URL detection
 */
export const getSharableBaseUrl = (): string => {
  let url = window.location.href.split('?')[0].split('#')[0];
  
  // Handle blob URLs which are common in some preview environments
  // blob:https://example.com/uuid -> https://example.com/
  if (url.startsWith('blob:')) {
    url = url.replace('blob:', '');
    // If it ends with a UUID-like path after stripping blob, 
    // it might still be un-sharable, but this is our best shot.
  }
  
  return url;
};

/**
 * Check if the current environment is likely a sharable public URL
 */
export const isEnvironmentSharable = (): boolean => {
  const url = window.location.href;
  if (url.startsWith('blob:') || url.startsWith('file:') || url.includes('localhost') || url.includes('127.0.0.1')) {
    return false;
  }
  return true;
};

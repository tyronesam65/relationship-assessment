
/**
 * Compression maps for shorter URLs
 */
const LIKERT_MAP: Record<string, string> = {
  'Strongly Disagree': '1',
  'Disagree': '2',
  'Neutral': '3',
  'Agree': '4',
  'Strongly Agree': '5',
};

const REVERSE_LIKERT: Record<string, string> = {
  '1': 'Strongly Disagree', '2': 'Disagree', '3': 'Neutral', '4': 'Agree', '5': 'Strongly Agree'
};

/**
 * Packs a list of mixed answers into a compact string
 */
export const packAnswers = (answers: (number | string | null)[]): string => {
  return answers.map(a => {
    if (a === null) return '0';
    if (typeof a === 'number') return String.fromCharCode(96 + a); // 1-10 -> a-j
    return LIKERT_MAP[a as string] || '0';
  }).join('');
};

/**
 * Unpacks a compact string back into a list of answers
 */
export const unpackAnswers = (str: string): (number | string | null)[] => {
  return str.split('').map(c => {
    if (c === '0') return null;
    if (c >= 'a' && c <= 'j') return c.charCodeAt(0) - 96;
    return REVERSE_LIKERT[c] || null;
  });
};

/**
 * Unicode-safe Base64 encoding
 */
export const encodeData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
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
  if (url.startsWith('blob:')) {
    url = url.replace('blob:', '');
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

// src/utils.ts
export function useNonce() {
  // Assuming the nonce is set as a meta tag in the document head
  const metaTag = document.querySelector('meta[name="nonce"]');
  return metaTag ? metaTag.getAttribute('content') : null;
}
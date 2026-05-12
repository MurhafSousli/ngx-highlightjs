/**
 * Enable usage of the library together with "trusted-types" HTTP Content-Security-Policy (CSP)
 *
 * Can be added to angular.json -> serve -> options -> headers to try it out in DEV mode
 * "Content-Security-Policy": "trusted-types ngx-highlightjs; require-trusted-types-for 'script'"
 *
 * Read more...
 * Angular Security: https://angular.io/guide/security#enforcing-trusted-types
 * Trusted Types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types
 */

interface NgxTrustedTypePolicyFactory {
  createPolicy(name: string, rules: { createHTML: (s: string) => string }): NgxTrustedTypePolicy;
}

interface NgxTrustedTypePolicy {
  createHTML(input: string): string;
}

let policy: NgxTrustedTypePolicy | undefined;

function getPolicy(): NgxTrustedTypePolicy | undefined {
  if (!policy) {
    try {
      policy = (window as Window & { trustedTypes?: NgxTrustedTypePolicyFactory })
        .trustedTypes?.createPolicy('ngx-highlightjs', { createHTML: (s: string) => s });
    } catch {
      // fallback
    }
  }
  return policy;
}

export function trustedHTMLFromStringBypass(html: string): string {
  return getPolicy()?.createHTML(html) || html;
}

// Export for testing only
export function _resetTrustedTypesPolicyForTests() {
  policy = undefined;
}

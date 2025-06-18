import { trustedHTMLFromStringBypass, _resetTrustedTypesPolicyForTests } from '../trusted-types';

describe('trustedHTMLFromStringBypass', () => {
  let trustedTypesSpy: jasmine.Spy;

  beforeEach(() => {
    _resetTrustedTypesPolicyForTests(); // Ensure policy is cleared between tests
  });

  afterEach(() => {
    if (trustedTypesSpy) {
      trustedTypesSpy.and.callThrough();
    }
  });

  it('should use trustedTypes policy to create HTML when available', () => {
    const mockCreatePolicy = jasmine.createSpy('createPolicy').and.callFake((_name, rules) => ({
      createHTML: rules.createHTML
    }));

    trustedTypesSpy = spyOnProperty(window as any, 'trustedTypes', 'get').and.returnValue({
      createPolicy: mockCreatePolicy
    });

    const html = '<div>Test</div>';
    const result = trustedHTMLFromStringBypass(html);
    expect(result.toString()).toBe(html);
    expect(mockCreatePolicy).toHaveBeenCalledWith('ngx-highlightjs', jasmine.any(Object));
  });

  it('should return plain HTML when trustedTypes is not available', () => {
    trustedTypesSpy = spyOnProperty(window as any, 'trustedTypes', 'get').and.returnValue(undefined);

    const html = '<span>Fallback</span>';
    const result = trustedHTMLFromStringBypass(html);
    expect(result).toBe(html);
  });

  it('should fallback to plain HTML if createPolicy throws', () => {
    trustedTypesSpy = spyOnProperty(window as any, 'trustedTypes', 'get').and.returnValue({
      createPolicy: () => { throw new Error('Policy already exists'); }
    });

    const html = '<b>Throw Test</b>';
    const result = trustedHTMLFromStringBypass(html);
    expect(result).toBe(html);
  });
});

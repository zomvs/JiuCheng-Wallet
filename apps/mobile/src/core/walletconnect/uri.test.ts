import {
  isCubeXWalletConnectDeeplink,
  parseWalletConnectUri,
  parseWalletConnectUriFromLink,
} from './uri';

const WC_URI =
  'wc:abc123@2?relay-protocol=irn&symKey=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

describe('walletconnect uri', () => {
  it('accepts raw wc uri', () => {
    expect(parseWalletConnectUri(WC_URI).uri).toBe(WC_URI);
  });

  it('extracts encoded uri params from deep links', () => {
    const link = `cubex://walletconnect?uri=${encodeURIComponent(WC_URI)}`;
    expect(parseWalletConnectUri(link).uri).toBe(WC_URI);
    expect(parseWalletConnectUriFromLink(link)).toBe(WC_URI);
  });

  it('identifies CubeX WalletConnect deeplink targets', () => {
    const link = `cubex://walletconnect?uri=${encodeURIComponent(WC_URI)}`;
    expect(isCubeXWalletConnectDeeplink(link)).toBe(true);
    expect(
      isCubeXWalletConnectDeeplink(
        `cubex://wc?uri=${encodeURIComponent(WC_URI)}`,
      ),
    ).toBe(true);
    expect(isCubeXWalletConnectDeeplink(`cubex://walletconnect`)).toBe(true);
    expect(
      isCubeXWalletConnectDeeplink(
        'cubex://walletconnect?uri=wc%3Aabc123%402%3Frelay-protocol%3Dirn',
      ),
    ).toBe(true);
    expect(
      isCubeXWalletConnectDeeplink(
        `cubex://clear-app-cache?uri=${encodeURIComponent(WC_URI)}`,
      ),
    ).toBe(false);
    expect(
      isCubeXWalletConnectDeeplink(
        `https://walletconnect?uri=${encodeURIComponent(WC_URI)}`,
      ),
    ).toBe(false);
  });

  it('rejects empty and malformed input', () => {
    expect(() => parseWalletConnectUri('')).toThrow(
      'WalletConnect URI 不能為空。',
    );
    expect(() => parseWalletConnectUri('https://cubex.invalid')).toThrow(
      'WalletConnect URI 必須以 wc:<topic>@2 開頭。',
    );
    expect(() =>
      parseWalletConnectUri('wc:abc123@2?relay-protocol=irn'),
    ).toThrow('WalletConnect URI 缺少 symKey 或 relay-protocol。');
  });
});

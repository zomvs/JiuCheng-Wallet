import React from 'react';
import { View } from 'react-native';

import { useThemeStyles } from '@/hooks/theme';
import { createGetStyles, makeDebugBorder } from '@/utils/styles';

// import FooterComponentForUpgrade from './FooterComponentForUpgrade';
import { useSafeSizes } from '@/hooks/useAppLayout';

import {
  createGlobalBottomSheetModal,
  removeGlobalBottomSheetModal,
} from '@/components/GlobalBottomSheetModal';
import { MODAL_NAMES } from '@/components/GlobalBottomSheetModal/types';

import AutoLockView from '@/components/AutoLockView';
import WebView from 'react-native-webview';

export function useShowUserAgreementLikeModal() {
  const openedModalIdRef = React.useRef<string>('');
  const viewTermsOfUse = React.useCallback(() => {
    openedModalIdRef.current = createGlobalBottomSheetModal({
      name: MODAL_NAMES.TIP_TERM_OF_USE,
      title: '',
      bottomSheetModalProps: {
        onDismiss: () => {
          removeGlobalBottomSheetModal(openedModalIdRef.current);
          openedModalIdRef.current = '';
        },
      },
    });
  }, []);

  const openedModal2IdRef = React.useRef<string>('');
  const viewPrivacyPolicy = React.useCallback(() => {
    openedModal2IdRef.current = createGlobalBottomSheetModal({
      name: MODAL_NAMES.TIP_PRIVACY_POLICY,
      title: '',
      bottomSheetModalProps: {
        onDismiss: () => {
          removeGlobalBottomSheetModal(openedModal2IdRef.current);
          openedModal2IdRef.current = '';
        },
      },
    });
  }, []);

  return {
    viewPrivacyPolicy,
    viewTermsOfUse,
  };
}

const makeLegalDocument = (title: string, content: string) => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        color: #192945;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        margin: 0;
        padding: 24px 20px 48px;
      }
      h1 { font-size: 24px; line-height: 32px; margin: 0 0 20px; }
      h2 { font-size: 17px; line-height: 24px; margin: 24px 0 8px; }
      p { color: #5b6275; font-size: 15px; line-height: 23px; margin: 0 0 12px; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    ${content}
  </body>
</html>`;

const PRIVACY_POLICY_HTML = makeLegalDocument(
  'XiaoHua Wallet Privacy Policy',
  `
    <h2>Your keys stay with you</h2>
    <p>XiaoHua Wallet stores wallet credentials and preferences locally on your device. We cannot recover your seed phrase, private keys, or password.</p>
    <h2>Network requests</h2>
    <p>The app connects to blockchain networks and service providers to display balances, submit transactions, and provide wallet features. Those providers may process technical request data under their own policies.</p>
    <h2>Your choices</h2>
    <p>You can clear local app data or stop using the app at any time. Always back up your wallet credentials before removing the app.</p>
  `,
);

const TERMS_OF_USE_HTML = makeLegalDocument(
  'XiaoHua Wallet Terms of Use',
  `
    <h2>Self-custody responsibility</h2>
    <p>You are solely responsible for protecting your seed phrase, private keys, password, and devices. XiaoHua Wallet cannot reverse transactions or recover lost credentials.</p>
    <h2>Blockchain risks</h2>
    <p>Blockchain transactions are irreversible and may involve smart-contract, market, network, and third-party risks. Review every transaction carefully before signing.</p>
    <h2>Use at your own risk</h2>
    <p>The software is provided without guarantees of uninterrupted availability. By continuing, you confirm that you understand and accept these risks.</p>
  `,
);

export function UserAgreementLikeModalInner({ html }: { html: string }) {
  const { styles } = useThemeStyles(getStyles);

  const { safeOffBottom } = useSafeSizes();

  return (
    <AutoLockView
      as="BottomSheetView"
      style={[styles.container, { paddingBottom: safeOffBottom }]}>
      <View style={styles.topContainer}>
        {/* <View style={styles.titleArea}>
          <Text style={styles.title}>New Version</Text>
          <Text style={styles.subTitle}>{remoteVersion.version}</Text>
        </View> */}
        <View style={[styles.bodyScrollerContainer]}>
          <WebView
            style={styles.webviewInst}
            startInLoadingState
            allowsFullscreenVideo={false}
            allowsInlineMediaPlayback={false}
            nestedScrollEnabled
            source={{ html }}
          />
        </View>
      </View>
      {/* <FooterComponentForUpgrade style={[styles.footerComponent]} /> */}
    </AutoLockView>
  );
}

export function TipPrivacyPolicyInner() {
  return <UserAgreementLikeModalInner html={PRIVACY_POLICY_HTML} />;
}

export function TipTermOfUseModalInner() {
  return <UserAgreementLikeModalInner html={TERMS_OF_USE_HTML} />;
}

const getStyles = createGetStyles(colors => {
  return {
    container: {
      flexDirection: 'column',
      position: 'relative',
      height: '100%',
    },

    topContainer: {
      paddingTop: 8,
      height: '100%',
      flexShrink: 1,
    },

    titleArea: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginBottom: 12,
    },

    title: {
      color: colors['neutral-title1'],
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '600',
    },

    subTitle: {
      color: colors['neutral-body'],
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '400',
      marginTop: 12,
    },

    bodyScrollerContainer: {
      flexShrink: 2,
      height: '100%',
    },

    webviewInst: {
      width: '100%',
      height: '100%',
    },

    footerComponent: {
      height: 100,
      flexShrink: 0,
    },
  };
});

import React, { useCallback, useEffect, useState } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import {
  BOTTOM_BUTTON_GAP,
  BOTTOM_BUTTON_SINGLE_HEIGHT,
  BOTTOM_BUTTON_TITLE_STYLE,
  BOTTOM_BUTTON_TOP_OFFSET,
  RootNames,
  getBottomButtonBottomOffset,
} from '@/constant/layout';
import { keyringServiceApi } from '@/core/serviceApi/keyring';
import { setReportActionTs } from '@/core/serviceApi/preference';
import { useTheme2024 } from '@/hooks/theme';
import { navigateDeprecated } from '@/utils/navigation';
import { Button } from '@/components2024/Button';
import { useMemoizedFn } from 'ahooks';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { createGetStyles2024 } from '@/utils/styles';
import TouchableText from '@/components/Touchable/TouchableText';
import {
  ProcDataType,
  useCreateAddressProc,
  useImportAddressProc,
} from '@/hooks/address/useNewUser';
import { isNonPublicProductionEnv } from '@/constant';
import { resetNavigationTo, useRabbyAppNavigation } from '@/hooks/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { REPORT_TIMEOUT_ACTION_KEY } from '@/core/utils/reportTimeoutAction';
import { Text } from '@/components/Typography';
import ChevronRightSmallCC from '@/assets/icons/common/chevron-right-small-cc.svg';
import { E2E_ID } from '@/constant/e2e';
import { makeTestIDProps } from '@/utils/makeTestIDProps';
import { ensureWalletUnlockedForAction } from '@/utils/walletUnlock';
import XiaoHuaMark from '@/assets/icons/brand/xiaohua-mark.svg';
import { BrandWordmark } from '@/components2024/Brand/BrandWordmark';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HERO_ASPECT_RATIO = 0.88;

const HeroIllustration = () => {
  const { styles } = useTheme2024({ getStyle });
  const heroHeight = Math.ceil(SCREEN_WIDTH * HERO_ASPECT_RATIO);

  return (
    <View style={[styles.heroContainer, { height: heroHeight }]}>
      <View style={styles.heroGlowPrimary} />
      <View style={styles.heroGlowSecondary} />
      <View style={styles.heroCardBack} />
      <View style={styles.heroCard}>
        <View style={styles.heroMarkHalo}>
          <XiaoHuaMark width={88} height={88} />
        </View>
        <View style={styles.heroChainRow}>
          {['ETH', 'BTC', 'SOL'].map((chain, index) => (
            <View
              key={chain}
              style={[
                styles.heroChainPill,
                index === 1 && styles.heroChainPillActive,
              ]}>
              <Text
                style={[
                  styles.heroChainText,
                  index === 1 && styles.heroChainTextActive,
                ]}>
                {chain}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

function NewUserGetStartedScreen() {
  const { styles, colors2024, isLight } = useTheme2024({ getStyle });
  const { t } = useTranslation();
  const navigation = useRabbyAppNavigation();

  const [getStarted, setGetStarted] = useState<{
    localHasAccounts: boolean;
    processedInit: boolean;
  }>({
    localHasAccounts: false,
    processedInit: false,
  });

  const handleGoToHome = useCallback(async () => {
    if (!getStarted.processedInit) {
      return;
    }

    navigateDeprecated(RootNames.StackRoot, { screen: RootNames.Home });
  }, [getStarted.processedInit]);

  const { startCreateAddressProc, resetCreateAddressProc } =
    useCreateAddressProc();
  const { resetImportAddressProc } = useImportAddressProc();

  useFocusEffect(
    useCallback(() => {
      resetCreateAddressProc();
      resetImportAddressProc();
    }, [resetCreateAddressProc, resetImportAddressProc]),
  );

  const handleGoToCreate = useCallback(async () => {
    if (!getStarted.processedInit) {
      return;
    }
    if (!(await ensureWalletUnlockedForAction())) {
      return;
    }

    startCreateAddressProc(ProcDataType.Seed, '');
    void setReportActionTs(
      REPORT_TIMEOUT_ACTION_KEY.CLICK_CREATE_NEW_ADDRESS,
    ).catch(console.error);
    navigateDeprecated(RootNames.SetupWallet);
  }, [getStarted.processedInit, startCreateAddressProc]);

  const handleGoToImport = useCallback(async () => {
    if (!getStarted.processedInit) {
      return;
    }
    void setReportActionTs(REPORT_TIMEOUT_ACTION_KEY.CLICK_HAVE_ADDRESS).catch(
      console.error,
    );
    navigateDeprecated(RootNames.SelectImportMethod);
  }, [getStarted.processedInit]);

  const handleGoToSyncExtension = useCallback(async () => {
    if (!getStarted.processedInit) {
      return;
    }

    navigateDeprecated(RootNames.ImportRabbyWallet);
    void setReportActionTs(
      REPORT_TIMEOUT_ACTION_KEY.CLICK_SCAN_SYNC_EXTENSION,
    ).catch(console.error);
  }, [getStarted.processedInit]);

  const initAccounts = useMemoizedFn(async () => {
    setGetStarted(prev => ({ ...prev, processedInit: false }));
    try {
      const accounts = await keyringServiceApi.getAllVisibleAccountsArray();
      setGetStarted(prev => ({ ...prev, localHasAccounts: !!accounts.length }));
      if (accounts?.length) {
        resetNavigationTo(navigation, 'Home');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGetStarted(prev => ({ ...prev, processedInit: true }));
    }
  });

  useFocusEffect(
    useCallback(() => {
      initAccounts();
    }, [initAccounts]),
  );

  const { bottom, top } = useSafeAreaInsets();

  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 600,
      easing: Easing.bezier(0.7, -0.4, 0.4, 1.4),
    });
  }, [logoOpacity]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  const contentProgress = useSharedValue(1);

  useEffect(() => {
    contentProgress.value = 0;
    contentProgress.value = withTiming(1, {
      duration: 600,
      easing: Easing.bezier(0.7, -0.4, 0.4, 1.4),
    });
  }, [contentProgress]);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(contentProgress.value, [0, 1], [60, 0]),
      },
    ],
  }));

  return (
    <View style={styles.screen}>
      {/* Header with logo - positioned right next to status bar, horizontally centered */}
      <View style={[styles.logoWrapper, { top: top + 6 }]}>
        <Animated.View style={logoAnimatedStyle}>
          <BrandWordmark
            color={colors2024['neutral-title-1']}
            iconSize={30}
            textStyle={styles.logoText}
          />
        </Animated.View>
      </View>

      <View style={styles.contentContainer}>
        {/* Hero Illustration - crops from top on short screens */}
        <HeroIllustration />

        <Animated.View
          style={[contentAnimatedStyle, { flexShrink: 0, flexGrow: 1 }]}>
          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={styles.title}>{t('page.getStart.welcomeTitle')}</Text>
            <Text style={styles.subtitle}>{t('global.appDescription')}</Text>
          </View>

          {/* Spacer to push bottom actions to screen bottom */}
          <View style={styles.spacer} />

          {/* Bottom Actions */}
          <View
            style={[
              styles.bottomActions,
              {
                flexShrink: 0,
                paddingBottom: getBottomButtonBottomOffset(bottom),
              },
            ]}>
            {!getStarted.localHasAccounts ? (
              <>
                <TouchableOpacity
                  style={styles.syncLink}
                  disabled={
                    !getStarted.processedInit || getStarted.localHasAccounts
                  }
                  onPress={handleGoToSyncExtension}>
                  <View style={styles.syncLinkContent}>
                    <Text style={styles.syncLinkText}>
                      {t('page.getStart.alreadyUseRabby')}
                    </Text>
                    <ChevronRightSmallCC
                      color={colors2024['neutral-secondary']}
                    />
                  </View>
                </TouchableOpacity>
                <Button
                  type="primary"
                  title={t('page.getStart.createNewAddress')}
                  height={BOTTOM_BUTTON_SINGLE_HEIGHT}
                  titleStyle={BOTTOM_BUTTON_TITLE_STYLE}
                  disabled={
                    !getStarted.processedInit || getStarted.localHasAccounts
                  }
                  onPress={handleGoToCreate}
                />
                <Button
                  disabled={
                    !getStarted.processedInit || getStarted.localHasAccounts
                  }
                  type="ghost"
                  title={t('page.getStart.alreadyHaveAddress')}
                  height={BOTTOM_BUTTON_SINGLE_HEIGHT}
                  titleStyle={BOTTOM_BUTTON_TITLE_STYLE}
                  onPress={handleGoToImport}
                  buttonStyle={styles.secondaryButton}
                  {...makeTestIDProps(E2E_ID.onboarding.welcomeImportExisting)}
                />
              </>
            ) : (
              <Button
                type="primary"
                title={t('page.getStart.goToHome') || 'Go to Home'}
                height={BOTTOM_BUTTON_SINGLE_HEIGHT}
                titleStyle={BOTTOM_BUTTON_TITLE_STYLE}
                disabled={
                  !getStarted.processedInit || !getStarted.localHasAccounts
                }
                onPress={handleGoToHome}
              />
            )}

            {isNonPublicProductionEnv && (
              <TouchableText
                style={[
                  styles.testLink,
                  { color: colors2024['orange-default'] },
                ]}
                disabled={
                  !getStarted.processedInit || getStarted.localHasAccounts
                }
                onPress={() => {
                  navigation.dispatch(
                    StackActions.push(RootNames.StackSettings, {
                      screen: RootNames.Settings,
                      params: {},
                    }),
                  );
                }}>
                {'(Test Only) Enter Settings >'}
              </TouchableText>
            )}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const getStyle = createGetStyles2024(ctx => ({
  screen: {
    flex: 1,
    backgroundColor: ctx.colors['neutral-card1'],
  },
  logoWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 19,
    lineHeight: 24,
  },
  contentContainer: {
    flex: 1,
  },
  heroContainer: {
    width: SCREEN_WIDTH,
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 36,
  },
  heroGlowPrimary: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.72,
    height: SCREEN_WIDTH * 0.72,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: ctx.isLight ? '#E8EAFF' : '#242A56',
    top: 24,
    left: -42,
  },
  heroGlowSecondary: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.58,
    height: SCREEN_WIDTH * 0.58,
    borderRadius: SCREEN_WIDTH,
    backgroundColor: ctx.isLight ? '#DDF8F1' : '#123D39',
    right: -58,
    bottom: 4,
  },
  heroCardBack: {
    position: 'absolute',
    width: 220,
    height: 184,
    borderRadius: 40,
    backgroundColor: ctx.isLight ? '#B9C1FF' : '#3A4382',
    transform: [{ rotate: '11deg' }, { translateX: 28 }],
  },
  heroCard: {
    width: 234,
    height: 194,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: ctx.isLight ? '#FFFFFF' : '#1E2030',
    borderWidth: 1,
    borderColor: ctx.isLight ? '#E1E4FF' : '#434966',
    shadowColor: '#5367FF',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: ctx.isLight ? 0.18 : 0.3,
    shadowRadius: 28,
    elevation: 10,
  },
  heroMarkHalo: {
    width: 108,
    height: 108,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ctx.isLight ? '#F0F2FF' : '#2A2E48',
  },
  heroChainRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroChainPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: ctx.isLight ? '#F1F2F8' : '#2B2E3C',
  },
  heroChainPillActive: {
    backgroundColor: '#5367FF',
  },
  heroChainText: {
    color: ctx.colors2024['neutral-secondary'],
    fontSize: 11,
    fontWeight: '700',
  },
  heroChainTextActive: {
    color: '#FFFFFF',
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '800',
    fontSize: 36,
    textAlign: 'center',
    color: ctx.colors2024['neutral-title-1'],
    paddingTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    color: ctx.colors2024['neutral-secondary'],
  },
  spacer: {
    flex: 1,
    minHeight: 16,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingTop: BOTTOM_BUTTON_TOP_OFFSET,
    gap: BOTTOM_BUTTON_GAP,
  },
  secondaryButton: {
    backgroundColor: ctx.colors2024['brand-light-1'],
    borderWidth: 0,
  },
  syncLink: {
    marginBottom: 8,
  },
  syncLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  syncLinkText: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: ctx.colors2024['neutral-secondary'],
  },
  testLink: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
}));

export default NewUserGetStartedScreen;

import React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { View } from 'react-native';

import XiaoHuaMark from '@/assets/icons/brand/xiaohua-mark.svg';
import { Text } from '@/components/Typography';

type BrandWordmarkProps = {
  color: string;
  direction?: 'row' | 'column';
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function BrandWordmark({
  color,
  direction = 'row',
  iconSize = 34,
  style,
  textStyle,
}: BrandWordmarkProps) {
  const isColumn = direction === 'column';

  return (
    <View
      style={[
        {
          alignItems: 'center',
          flexDirection: isColumn ? 'column' : 'row',
          gap: isColumn ? 12 : 10,
        },
        style,
      ]}>
      <XiaoHuaMark width={iconSize} height={iconSize} />
      <Text
        style={[
          {
            color,
            fontFamily: 'SF Pro Rounded',
            fontSize: isColumn ? 24 : 22,
            fontWeight: '800',
            lineHeight: isColumn ? 30 : 28,
          },
          textStyle,
        ]}>
        XiaoHua Wallet
      </Text>
    </View>
  );
}

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

type LoadingProps = {
  color?: string;
};
export function Loading({ color }: LoadingProps) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      color={color ? color : theme.colors.main}
      size="large"
      style={{ flex: 1 }}
    />
  );
}

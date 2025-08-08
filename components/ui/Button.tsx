import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  mode?: 'flat';
  style?: object;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  mode,
  style,
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 8,
    borderRadius: 4,
  },
  flat: { backgroundColor: 'transparent' },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary100,
  },
});

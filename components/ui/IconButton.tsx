import { Pressable, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type IconButtonProps = {
  icon: string;
  size?: number;
  color?: string;
  style?: object;
  onPress: () => void;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  style,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={style || styles.buttonContainer}>
        <Icon
          name={icon}
          size={size || 24}
          color={color || 'white'}
          onPress={onPress}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    borderRadius: 24,
    margin: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
});

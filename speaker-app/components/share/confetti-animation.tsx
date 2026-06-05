import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA',
  '#F472B6', '#34D399', '#60A5FA', '#FBBF24',
  '#F87171', '#818CF8', '#FB923C', '#2DD4BF',
];

const NUM_CONFETTI = 50;

// Pre-generate random values for each piece
const PIECES_DATA = Array.from({ length: NUM_CONFETTI }, (_, i) => ({
  id: i,
  delay: Math.random() * 600,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  startX: Math.random() * SCREEN_WIDTH,
  drift: (Math.random() - 0.5) * 180,
  size: 6 + Math.random() * 8,
  isCircle: Math.random() > 0.5,
  duration: 2500 + Math.random() * 2000,
  rotations: 3 + Math.random() * 7,
}));

const ConfettiPiece = ({
  delay,
  color,
  startX,
  drift,
  size,
  isCircle,
  duration,
  rotations,
}: (typeof PIECES_DATA)[0]) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.quad),
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-30, SCREEN_HEIGHT + 50]);
    const translateX = interpolate(progress.value, [0, 1], [0, drift]);
    const rotate = `${interpolate(progress.value, [0, 1], [0, rotations * 360])}deg`;
    const opacity = interpolate(progress.value, [0, 0.7, 1], [1, 1, 0]);
    const scale = interpolate(progress.value, [0, 0.1, 1], [0, 1, 0.6]);

    return {
      transform: [
        { translateY },
        { translateX },
        { rotate },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: startX,
          top: 0,
          width: size,
          height: isCircle ? size : size * 0.4,
          backgroundColor: color,
          borderRadius: isCircle ? size / 2 : 1,
        },
        animatedStyle,
      ]}
    />
  );
};

const ConfettiAnimation: React.FC = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {PIECES_DATA.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
    overflow: 'visible',
  },
});

export default ConfettiAnimation;

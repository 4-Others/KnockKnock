import * as React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {variables} from '../../../style/variables';
import Lottie from 'lottie-react-native';

const Success: React.FC = () => {
  const animationRef = React.useRef<Lottie>(null);
  React.useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  return (
    <SafeAreaView>
      <Lottie
        ref={animationRef}
        onLayout={() => animationRef.current?.play()}
        speed={1}
        autoPlay
        loop
        source={require('front/assets/animations/dlf10_vXUtMkIcnZ.json')}
      />
      <Text style={styles.text}>회원가입이</Text>
      <Text style={styles.text}>정상적으로 완료됐습니다!</Text>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  text: {
    fontFamily: variables.font_4,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
});

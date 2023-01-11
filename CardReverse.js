import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const CardReverse = ({ isMirrored, shadowOpacity = 0 }) => {
  return (
    <>
      <View style={styles.wrapper}>
        <View style={[styles.shadow, { opacity: shadowOpacity }]} />
        <FastImage
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3587/3587842.png',
          }}
          style={styles.reverseIcon}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCCD3',
  },
  reverseIcon: {
    height: 140,
    width: 140,
  },
  shadow: {
    position: 'absolute',
    zIndex: 100,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
});

export default CardReverse;

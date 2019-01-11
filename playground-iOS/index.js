import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

class RNHighScores extends React.Component {
  render() {
    var contents = this.props['scores'].map((score) => (
      <Text key={score.name}>
        {score.name}:{score.value}
        {'\n'}
      </Text>
    ));
    return (
      <View style={styles.container}>
        <Text style={{
                        mariginTop: 10, 
                        left: 20,
                        // borderColor: '#000000', 
                        // borderStyle: 'solid',
                        // borderColor: 'rgb(33,77,222)',
                        // backgroundColor: 'rgb(228,61,36)',
                        // borderRadius: 16, 
                        
                        fontSize: 20,
                        width: 300,

                        lineHeight: 25, 
                        height: 200,

                        top: 28,
                        right: 15,
                        textAlign: 'center',
                        overflow: 'hidden',
                        
                    }}
                    numberOfLines={0}
                    ellipsizeMode='tail'
                    >腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司腾讯科技股份有限公司</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores);
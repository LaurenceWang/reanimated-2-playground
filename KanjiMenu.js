import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, {
  useState
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useKanjiCards from './data/Kanjitab';

const { KanjiCards } = useKanjiCards();

const NotEmptyText = ({ style, text }) => {
  return (text !== '' && <Text style={style}>{text}</Text>);
}

const dotColor = (data, item) => {
  switch (data[item].test) {
    case 0:
      return 'green';

    case 1: case 2: case 3:
      return 'orange';

    case 4: case 5:
      return 'red';
  }
}

const Item = ({ item, onPress, backgroundColor, textColor, dotColor, text }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item}</Text><Text style={[{ color: dotColor }, { alignSelf: 'flex-end' }, { fontSize: 30 }, { top: -30 }]}>✪</Text>
    {(text !== '' && Object.keys(KanjiCards).includes(item)) &&
      <>
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Lecture"]} />
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Trad"]} />
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Mnemotechnique"]} />
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Combinaison"]} />
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Littéral"]} />
        <NotEmptyText style={[styles.text]} text={KanjiCards[item]["Traduction"]} />
      </>}
  </TouchableOpacity>
);

const KanjiMenu = ({ data, onBack }) => {
  const [selectedId, setSelectedId] = useState();
  const renderItem = ({ item }) => {
    const backgroundColor = item === selectedId ? '#FDA3AF' : '#FFCCD3';
    const color = item === selectedId ? 'black' : 'black';
    const hello = item === selectedId ? 'hello' : '';

    return (
      <View>
     
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        dotColor={dotColor(data, item)}
        text={hello}
      />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
       <Button title="Back" onPress={onBack} color="#FDA3AF" style={styles.btn}></Button>
      {data && <FlatList
        data={Object.keys(data)}
        renderItem={renderItem}
        extraData={selectedId}
      />}
    </SafeAreaView>
  );
  
        
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 100,
    marginBottom: "-200%",
    width: "100%",

  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default KanjiMenu;

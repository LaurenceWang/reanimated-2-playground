import { StyleSheet, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Chapter from './Chapter';
import StartButton from './StartButton';
import KanjiButton from './KanjiButton';
import KanjiMenu from './KanjiMenu';
import TrophyButton from './TrophyButton';
import TrophyMenu from './TrophyMenu';
import CreditsButton from './CreditsButton';
import CreditsMenu from './CreditsMenu';
import Config from './gameconfig';
import GameOver from './data/gameover';
import GameOverScreen from './GameOverScreen';

export default function AnimatedStyleUpdateExample() {
  const [chapNum, setChapNum] = useState(0);
  const [kanji, setKanji] = useState(null);
  const [reload, setReload] = useState(true);
  const [gameOverText, setGameOverText] = useState('');
  const [gameOverIcon, setGameOverIcon] = useState('');
  const [gameSave, setGameSave] = useState();

  const [showStartButton, setShowStartButton] = useState(true);
  const [showChapter, setShowChapter] = useState(false);
  const [showKanjiButton, setShowKanjiButton] = useState(true);
  const [showKanjiMenu, setShowKanjiMenu] = useState(false);
  const [showTrophyButton, setShowTrophyButton] = useState(true);
  const [showTrophyMenu, setShowTrophyMenu] = useState(false);
  const [showCreditsButton, setShowCreditsButton] = useState(true);
  const [showCreditsMenu, setShowCreditsMenu] = useState(false);
  const [showGameOverScreen, setShowGameOverScreen] = useState(false);
  const [showClearBtn, setShowClearBtn] = useState(true);

  const resetStates = () => {
    setShowStartButton(false);
    setShowKanjiButton(false);
    setShowTrophyButton(false);
    setShowCreditsButton(false);
    setShowGameOverScreen(false);
    setGameOverIcon('');
    setShowKanjiMenu(false);
    setShowChapter(false);
    setShowClearBtn(false);
  }

  const onStartKanji = () => {
    setTimeout(() => {
      resetStates();
      setShowKanjiMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  useEffect(() => {
    console.log("Screen > show clear button: " + showClearBtn);
  }, [showClearBtn]);

  useEffect(() => {
    console.log("menu ? ");
    console.log(kanji);
  }, [showKanjiMenu])

  const onStartChapter = () => {
    setTimeout(() => {
      resetStates();
      setShowChapter(true);
    }, 500);
  };

  const onGameOverScreen = (text, icon) => {
    setTimeout(() => {
      resetStates();
      setShowGameOverScreen(true);
      // console.log('Screen > onGameOverScreen > text : ' + text);
      setGameOverText(text);
      // console.log('Screen > onGameOverScreen > icon : ' + icon);
      setGameOverIcon(icon);
      clearSave(false);
      setTimeout(() => {
        onMenuReturn();
      }, 2000);
      setChapNum(0);
    }, 500);
  }

  const onMenuReturn = () => {

    resetStates();
    setShowClearBtn(true);
    setShowStartButton(true);
    setShowKanjiButton(true);
    setShowTrophyButton(true);
    setShowCreditsButton(true);
    setShowChapter(false);
    setShowKanjiMenu(false);
    //setChapNum(0);
    setReload(true);

  }

  const onStartTrophy = () => {
    setTimeout(() => {
      resetStates();
      setShowTrophyMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  const onStartCredits = () => {
    setTimeout(() => {
      resetStates();
      setShowCreditsMenu(true);
      setShowClearBtn(false);
    }, 500);
  }

  const save = async (key, data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(`Couldn't save data. Error: ${data}`);
      // saving error
    }
  }

  const loadGameSave = (ws, pc, pu, cc, im,st) => {
    let wSave = {};
    wSave.ws = ws;
    wSave.pc = pc;
    wSave.pu = pu,
    wSave.cc = cc;
    wSave.im = im;
    wSave.st = st;

    setGameSave(wSave);
  }

  /*const clearSave = () => save(Config.kanjiKey, {}).then(() => {
    console.log("Clear successful");
    setReload(true);
  });*/

  const clearSave = (clearKanji) => {
    if (clearKanji) {
      save(Config.kanjiKey, {}).then(() => {
        console.log("Clear kanji save successful");
      });
    }
    save(Config.worldKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.chapCardKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.chapUnitKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.curCardKey, {}).then(() => {
      console.log("Clear successful");
    });
    save(Config.curIdMemoKey, {}).then(() => {
      console.log("Clear successful");
    });
    setReload(true);
  }


  const load = async (key) => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      console.log("keys :");
      console.info(keys);
      if (!(keys.includes(key))) {
        console.info("Initializing kanjis...");
        clearSave(true);
        console.info("Initialization success.");
      }

      const jsonValue = await AsyncStorage.getItem(key);
      console.debug("Load > Value: ");
      console.debug(jsonValue);
      console.debug(typeof (jsonValue))

      return (jsonValue !== null) ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(`Couldn't load data. Error: ${data}`);
      // error reading value
    }
  }

  //clearSave(true);

  useEffect(async () => {
    if (reload) {
      const tmp = await load(Config.kanjiKey);
      const ws = await load(Config.worldKey);
      const pc = await load(Config.chapCardKey);
      const pu = await load(Config.chapUnitKey);
      const cc = await load(Config.curCardKey);
      const im = await load(Config.curIdMemoKey);
      const st = await load(Config.curStat);
      loadGameSave(ws, pc, pu, cc, im, st);
      setKanji(tmp);
      setReload(false);
    }
  }, [reload]);

  const increment = () => {
    console.log("increment??");
    setChapNum(chapNum + 1);
  }


  return (
    <View>
      {showClearBtn && <Button onPress={() => clearSave(true)} title="Clear game saving" color="#eb5267" />}
      {showKanjiButton && <KanjiButton onPress={onStartKanji} />}
      {showKanjiMenu && <KanjiMenu data={kanji} onBack={onMenuReturn} />}
      {showTrophyButton && <TrophyButton onPress={onStartTrophy} />}
      {showTrophyMenu && <TrophyMenu />}
      {showCreditsButton && <CreditsButton onPress={onStartCredits} />}
      {showCreditsMenu && <CreditsMenu />}
      {showStartButton && <StartButton onPress={onStartChapter} />}
      {showChapter && <Chapter chapNum={chapNum} endChap={increment} onGameOverScreen={onGameOverScreen} kanjiProgression={kanji} gameSave={gameSave} save={save} onBack={onMenuReturn} />}
      {showGameOverScreen && <GameOverScreen text={gameOverText} iconURI={gameOverIcon} />}
    </View >
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardWrapper: {
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    width: '100%',
    height: 170,
    backgroundColor: '#ccc',
  },
});

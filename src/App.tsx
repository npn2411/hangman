import { useState } from 'react';
import { HomeScreen, SelectTopicScreen } from './components';
import { InGameScreen } from './components/InGameScreen';

export interface Topic {
  id: number;
  name: string;
  img?: string;
  words: string[];
}

const App = () => {
  const INIT_TOPIC: Topic = {
    id: 0,
    name: '',
    words: [],
  };

  const [gameStart, setGameStart] = useState(false);
  const [selectTopicScreen, setSelectTopicScreen] = useState(false);
  const [topic, setTopic] = useState<Topic>(INIT_TOPIC);

  const handleStarGame = () => {
    setGameStart(true);
    setSelectTopicScreen(true);
  };

  return (
    <div className="App">
      {!gameStart ? (
        <HomeScreen handleStarGame={handleStarGame} />
      ) : selectTopicScreen ? (
        <SelectTopicScreen
          topic={topic}
          setTopic={setTopic}
          setSelectTopicScreen={setSelectTopicScreen}
        />
      ) : (
        <InGameScreen
          topic={topic}
          setSelectTopicScreen={setSelectTopicScreen}
          setGameStart={setGameStart}
        />
      )}
    </div>
  );
};

export default App;

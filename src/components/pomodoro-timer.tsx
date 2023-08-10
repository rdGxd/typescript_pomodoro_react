// Importando as dependências necessárias
import { useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';

// Definindo a interface para as propriedades do componente
interface Props {
  defaultPomodoroTime: number;
}

// Definindo o componente PomodoroTimer
export function PomodoroTimer(props: Props): JSX.Element {
  // Definindo o estado do contador principal do pomodoro
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  // Utilizando o hook useInterval para atualizar o contador a cada segundo
  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  // Renderizando o componente com a contagem regressiva formatada em segundosToTime
  return <div>Olá mundo {secondsToTime(mainTime)}!</div>;
}

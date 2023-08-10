// Importando as dependências necessárias
import { useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

// Definindo a interface para as propriedades do componente
interface Props {
  defaultPomodoroTime: number; // Propriedade que define o tempo inicial do contador
}

// Definindo o componente PomodoroTimer
export function PomodoroTimer(props: Props): JSX.Element {
  // Definindo o estado do contador principal do pomodoro usando o valor fornecido nas props
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);

  // Utilizando o hook useInterval para atualizar o contador a cada segundo
  useInterval(() => {
    setMainTime(mainTime - 1); // Decrementa o tempo a cada chamada do intervalo
  }, 1000);

  // Renderizando o componente com a contagem regressiva formatada em segundosToTime
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      {/* Renderiza o componente Timer com o tempo atual */}
      <Button text="teste" onClick={() => console.log(1)} />
      {/* Renderiza um botão de teste */}
    </div>
  );
}

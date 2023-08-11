// Importando as dependências necessárias
import { useState } from 'react';
import { useInterval } from '../hooks/use-interval'; // Importando o hook personalizado useInterval
import { Button } from './button'; // Importando o componente Button
import { Timer } from './timer'; // Importando o componente Timer

// Definindo a interface para as propriedades do componente
interface Props {
  pomodoroTime: number; // Tempo inicial do contador do Pomodoro
  shortRestTime: number; // Tempo mínimo de descanso
  longRestTime: number; // Tempo máximo de descanso
  cycles: number; // Número de ciclos
}

// Definindo o componente PomodoroTimer
export function PomodoroTimer(props: Props): JSX.Element {
  // Definindo o estado do contador principal do Pomodoro usando o valor fornecido nas props
  const [mainTime, setMainTime] = useState(props.pomodoroTime);

  // Utilizando o hook useInterval para atualizar o contador a cada segundo
  useInterval(() => {
    setMainTime(mainTime - 1); // Decrementa o tempo a cada chamada do intervalo
  }, 1000);

  // Renderizando o componente PomodoroTimer
  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      {/* Renderiza o componente Timer com o tempo atual */}
      <Timer mainTime={mainTime} />
      {/* Renderiza botões de teste */}
      <div className="controls">
        <Button text="teste" onClick={() => console.log(1)} />{' '}
        <Button text="teste" onClick={() => console.log(1)} />{' '}
        <Button text="teste" onClick={() => console.log(1)} />
      </div>

      {/* Exibe detalhes adicionais */}
      <div className="details">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
    </div>
  );
}

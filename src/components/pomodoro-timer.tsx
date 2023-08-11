// Importando as dependências necessárias
import { useEffect, useState } from 'react';
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
  const [timeCounting, setTimeCounting] = useState(false); // Estado para controlar pausa/play do timer
  const [working, setWorking] = useState(false); // Estado para controlar fase de trabalho/descanso

  // Efeito para adicionar classe CSS quando a fase de trabalho estiver ativa
  useEffect(() => {
    if (working) document.body.classList.add('working'); // Adiciona classe CSS
    else document.body.classList.remove('working'); // Remove classe CSS
  }, [working]);

  // Utilizando o hook useInterval para atualizar o contador a cada segundo
  useInterval(
    () => {
      if (timeCounting) setMainTime(mainTime - 1); // Decrementa o tempo apenas se estiver contando
    },
    timeCounting ? 1000 : null, // Intervalo de 1 segundo se contando, caso contrário, nulo
  );

  // Função para configurar a fase de trabalho
  const configureWorking = () => {
    setTimeCounting(true); // Inicia a contagem
    setWorking(true); // Define a fase de trabalho como ativa
  };

  // Renderizando o componente PomodoroTimer
  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'working' : 'resting'}</h2>
      {/* Renderiza o componente Timer com o tempo atual */}
      <Timer mainTime={mainTime} />
      {/* Renderiza botões de controle */}
      <div className="controls">
        <Button text="Work" onClick={() => configureWorking()} />{' '}
        {/* Botão para iniciar a fase de trabalho */}
        <Button text="teste" onClick={() => console.log(1)} />{' '}
        {/* Botão de teste */}
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)} // Alterna entre pausa/play
        />
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

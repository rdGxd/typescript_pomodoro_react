// Importando as dependências necessárias
import { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval'; // Importando o hook personalizado useInterval
import { Button } from './button'; // Importando o componente Button
import { Timer } from './timer'; // Importando o componente Timer

// Importando os arquivos de som
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3'); // Som de início
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3'); // Som de término

// Criando objetos de áudio com os arquivos importados
const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
  const [working, setWorking] = useState(false); // Estado para controlar fase de trabalho
  const [resting, setResting] = useState(false); // Estado para controlar fase de descanso

  // Efeito para adicionar/remover classe CSS quando a fase de trabalho ou descanso estiver ativa
  useEffect(() => {
    if (working) {
      document.body.classList.add('working'); // Adiciona classe CSS de trabalho
      document.body.classList.remove('resting'); // Remove classe CSS de descanso
    } else if (resting) {
      document.body.classList.remove('working'); // Remove classe CSS de trabalho
      document.body.classList.add('resting'); // Adiciona classe CSS de descanso
    } else {
      document.body.classList.remove('working', 'resting'); // Remove ambas as classes
    }
  }, [working, resting]);

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
    setResting(false); // Define a fase de descanso como inativa
    setMainTime(props.pomodoroTime); // Define o tempo inicial do contador
    audioStartWorking.play(); // Toca o som de início de trabalho
  };

  // Função para configurar a fase de descanso
  const configureResting = (isLong: boolean) => {
    setTimeCounting(true); // Inicia a contagem
    setWorking(false); // Define a fase de trabalho como inativa
    setResting(true); // Define a fase de descanso como ativa
    if (isLong) {
      setMainTime(props.longRestTime); // Define o tempo de descanso longo
    } else {
      setMainTime(props.shortRestTime); // Define o tempo de descanso curto
    }
    audioStopWorking.play(); // Toca o som de término de trabalho
  };

  // Renderizando o componente PomodoroTimer
  return (
    <div className="pomodoro">
      <h2>You are: {working ? 'working' : 'resting'}</h2>
      {/* Renderiza o componente Timer com o tempo atual */}
      <Timer mainTime={mainTime} />
      {/* Renderiza botões de controle */}
      <div className="controls">
        <Button text="Work" onClick={() => configureWorking()} />
        {/* Botão para iniciar a fase de trabalho */}
        <Button text="Rest" onClick={() => configureResting(false)} />
        {/* Botão para iniciar a fase de descanso curto */}
        <Button
          className={!working && !resting ? 'hidden' : ''}
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

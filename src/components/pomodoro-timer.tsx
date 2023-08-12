// Importando as dependências necessárias
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval'; // Importando o hook personalizado useInterval

import { secondsToTime } from '../utils/seconds-to-time';
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
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  // Utilizando o hook useInterval para atualizar o contador a cada segundo
  useInterval(
    () => {
      if (timeCounting) setMainTime(mainTime - 1); // Decrementa o tempo apenas se estiver contando
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null, // Intervalo de 1 segundo se contando, caso contrário, nulo
  );

  // Função para configurar a fase de trabalho
  const configureWorking = useCallback(() => {
    setTimeCounting(true); // Inicia a contagem
    setWorking(true); // Define a fase de trabalho como ativa
    setResting(false); // Define a fase de descanso como inativa
    setMainTime(props.pomodoroTime); // Define o tempo inicial do contador
    audioStartWorking.play(); // Toca o som de início de trabalho
  }, [
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime,
    props.pomodoroTime,
  ]);

  // Função para configurar a fase de descanso
  const configureRest = useCallback(
    (isLong: boolean) => {
      setTimeCounting(true); // Inicia a contagem
      setWorking(false); // Define a fase de trabalho como inativa
      setResting(true); // Define a fase de descanso como ativa
      if (isLong) {
        setMainTime(props.longRestTime); // Define o tempo de descanso longo
      } else {
        setMainTime(props.shortRestTime); // Define o tempo de descanso curto
      }
      audioStopWorking.play(); // Toca o som de término de trabalho
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  // Efeito para adicionar/remover classe CSS quando a fase de trabalho ou descanso estiver ativa
  useEffect(() => {
    if (working) document.body.classList.add('working'); // Adiciona classe CSS de trabalho

    if (resting) document.body.classList.remove('working'); // Remove classe CSS de trabalho

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);

    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    numberOfPomodoros,
    completedCycles,
    props.cycles,
    configureRest,
    setCyclesQtdManager,
    configureWorking,
  ]);

  // Renderizando o componente PomodoroTimer
  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      {/* Renderiza o componente Timer com o tempo atual */}
      <Timer mainTime={mainTime} />
      {/* Renderiza botões de controle */}
      <div className="controls">
        <Button text="Work" onClick={() => configureWorking()} />
        {/* Botão para iniciar a fase de trabalho */}
        <Button text="Rest" onClick={() => configureRest(false)} />
        {/* Botão para iniciar a fase de descanso curto */}
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)} // Alterna entre pausa/play
        />
      </div>

      {/* Exibe detalhes adicionais */}
      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Números de pomodoros concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}

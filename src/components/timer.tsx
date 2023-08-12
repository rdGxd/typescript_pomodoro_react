import { secondsToMinutes } from '../utils/seconds-to-minutes'; // Importa a função de conversão de segundos para tempo formatado

// Definindo a interface para as propriedades do componente Timer
interface Props {
  mainTime: number; // Propriedade que representa o tempo principal (em segundos) a ser exibido
}

// Componente Timer que exibe o tempo formatado
export function Timer(props: Props): JSX.Element {
  return (
    <div className="timer">
      {/* Renderiza o tempo formatado na classe "timer" usando a função secondsToMinutes */}
      {secondsToMinutes(props.mainTime)}
    </div>
  );
}

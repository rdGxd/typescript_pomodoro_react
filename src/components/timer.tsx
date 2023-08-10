import { secondsToTime } from '../utils/seconds-to-time'; // Importa a função de conversão de segundos para tempo formatado

// Definindo a interface para as propriedades do componente Timer
interface Props {
  mainTime: number; // Propriedade que representa o tempo principal (em segundos) a ser exibido
}

// Componente Timer que exibe o tempo formatado
export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsToTime(props.mainTime)}</div>; // Renderiza o tempo formatado na classe "timer"
}

/*
Neste código, um componente chamado Timer é definido. Ele recebe uma propriedade mainTime que representa o tempo principal em segundos a ser exibido. O componente renderiza o valor convertido de mainTime usando a função secondsToTime importada do arquivo seconds-to-time e o exibe dentro de uma <div> com a classe CSS "timer". Isso permite que o tempo seja exibido de forma formatada no local onde o componente Timer é utilizado.
*/

import { zeroLeft } from './zero-left';

// Função que converte segundos para formato de horas, minutos e segundos (hh:mm:ss)
export function secondsToTime(seconds: number): string {
  // Calcula as horas dividindo os segundos por 3600 e aplicando a função zeroLeft para formatação
  const hours = zeroLeft(Math.floor(seconds / 3600));

  // Calcula os minutos dividindo os segundos por 60 e aplicando a função zeroLeft para formatação
  const min = zeroLeft(Math.floor((seconds / 60) % 60));

  // Calcula os segundos restantes após calcular as horas e os minutos, aplicando a função zeroLeft
  const sec = zeroLeft(Math.floor(seconds % 60));

  // Retorna a representação formatada em horas, minutos e segundos (hh:mm:ss)
  return `${hours}h:${min}m:${sec}s`;
}

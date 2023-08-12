import { zeroLeft } from './zero-left';

// Função que converte segundos para formato de minutos e segundos (mm:ss)
export function secondsToMinutes(seconds: number): string {
  // Calcula os minutos dividindo os segundos por 60 e aplicando a função zeroLeft para formatação
  const min = zeroLeft(Math.floor((seconds / 60) % 60));

  // Calcula os segundos restantes após calcular os minutos e aplica a função zeroLeft
  const sec = zeroLeft(Math.floor(seconds % 60));

  // Retorna a representação formatada em minutos e segundos (mm:ss)
  return `${min}:${sec}`;
}

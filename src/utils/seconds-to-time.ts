// Função que converte um valor de segundos para o formato 'minutos:segundos'
export function secondsToTime(seconds: number): string {
  // Função interna que adiciona um zero à esquerda se necessário
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');

  // Calculando os minutos (parte inteira da divisão por 60) e aplicando o zero à esquerda
  const min = zeroLeft((seconds / 60) % 60);

  // Calculando os segundos (resto da divisão por 60) e aplicando o zero à esquerda
  const sec = zeroLeft((seconds % 60) % 60);

  // Retornando a representação formatada 'minutos:segundos'
  return `${min}:${sec}`;
}

// Esta função secondsToTime recebe um valor em segundos e o converte para o formato "minutos:segundos", aplicando zeros à esquerda conforme necessário para manter a formatação correta.

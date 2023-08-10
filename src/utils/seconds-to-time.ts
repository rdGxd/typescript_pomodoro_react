// Convertendo segundos para tempo
export function secondsToTime(seconds: number): string {
  // Criando um zero a esquerda
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');

  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${min}:${sec}`;
}

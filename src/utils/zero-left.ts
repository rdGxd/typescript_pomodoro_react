// Função que adiciona um zero à esquerda se o número for menor que 10
const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');

// Exporta a função zeroLeft para ser usada em outros módulos
export { zeroLeft };

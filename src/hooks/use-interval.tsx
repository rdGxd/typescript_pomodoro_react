import { useEffect, useRef } from 'react';

// Um hook personalizado que cria um intervalo de tempo para a execução de uma função callback.
export function useInterval<C extends CallableFunction>(
  callback: C, // A função que será chamada a cada intervalo
  delay: number | null, // O intervalo de tempo entre chamadas (em milissegundos) ou null para interromper o intervalo
): void {
  const savedCallback = useRef<C>(); // Referência para a função callback

  // Memoriza a função de callback mais recente.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Configura o intervalo.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current(); // Executa a função callback se estiver definida
    }
    if (delay !== null) {
      const id = setInterval(tick, delay); // Configura um intervalo com a função tick e o atraso especificado
      return () => clearInterval(id); // Limpa o intervalo quando o componente é desmontado ou o intervalo é alterado
    }
  }, [delay]);
}

/*
Este hook personalizado useInterval permite que você execute uma função de callback em intervalos regulares. Ele memoriza a função de callback mais recente usando o hook useRef, garantindo que a função correta seja chamada mesmo se o componente for renderizado novamente com uma nova função de callback. Em seguida, configura um intervalo usando o setInterval e executa a função de callback a cada intervalo. Quando o intervalo é interrompido (delay é definido como null ou o componente é desmontado), ele limpa o intervalo usando clearInterval para evitar vazamentos de memória.
*/

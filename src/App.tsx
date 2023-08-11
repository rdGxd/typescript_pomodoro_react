// Importando o componente PomodoroTimer do local especificado
import { PomodoroTimer } from './components/pomodoro-timer';

// Função principal do aplicativo
function App(): JSX.Element {
  return (
    <div className="container">
      {/* Renderiza o componente PomodoroTimer com as propriedades configuradas */}
      <PomodoroTimer
        pomodoroTime={1500} // Tempo do Pomodoro em segundos (25 minutos)
        shortRestTime={300} // Tempo de descanso curto em segundos (5 minutos)
        longRestTime={900} // Tempo de descanso longo em segundos (15 minutos)
        cycles={4} // Número de ciclos (Pomodoros) por ciclo completo
      />
    </div>
  );
}

export default App; // Exporta a função App como componente principal

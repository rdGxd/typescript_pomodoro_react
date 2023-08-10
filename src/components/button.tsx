// Definindo a interface para as propriedades do componente Button
interface Props {
  text: string; // O texto a ser exibido no botão
  onClick?: () => void; // Uma função de retorno de chamada que será executada quando o botão for clicado (opcional)
  className?: string; // Uma classe CSS adicional para personalização (opcional)
}

// Componente Button que renderiza um botão
export function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.text} {/* Renderiza o texto fornecido nas props */}
    </button>
  );
}

/*
Neste código, é definido um componente chamado Button. Ele recebe três propriedades:

text: Uma string que representa o texto a ser exibido no botão.
onClick (opcional): Uma função de retorno de chamada que será executada quando o botão for clicado.
className (opcional): Uma classe CSS adicional para estilização personalizada do botão.
O componente renderiza um botão HTML <button> e utiliza as propriedades fornecidas para definir o texto, a função de clique (onClick) e a classe CSS (className) do botão. Isso permite criar botões reutilizáveis e flexíveis, personalizados de acordo com as necessidades do aplicativo.

O componente renderiza um botão HTML <button> e utiliza as propriedades fornecidas para definir o texto, a função de clique (onClick) e a classe CSS (className) do botão. Isso permite criar botões reutilizáveis e flexíveis, personalizados de acordo com as necessidades do aplicativo.
*/

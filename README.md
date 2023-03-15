<a href="https://focustation.netlify.app/"><h1 align="center">Focustation</h1></a>

<p align="center">
    <img src="https://img.shields.io/badge/license-MIT-green">
    <img src="https://img.shields.io/badge/npm-v9.5.1-blue">
    <img src= "https://img.shields.io/badge/vue-3-blue">
</p>

## Descrição
O Focustation é um aplicativo simples desenvolvido com Vue.js, Composition API e CSS3. Seu objetivo é ajudar os usuários a se concentrarem em seus estudos/trabalhos, criando uma estação de trabalho. Ele inclui um timer baseado na técnica Pomodoro, uma área para listar tarefas, outra área com um vídeo do YouTube e um gerador de imagens de gatinhos, usando uma API de terceiros.

![Imagem Focustation](https://github.com/jfdsn/Focustation/blob/main/public/Imgs/fullapp.png)


##  :hammer: Funcionalidades

- `Timer`: Componente que implementa um timer baseado na técnica de pomodoro. O timer alterna entre as fases de trabalho e descanso, tocando um sinal sonoro ao final de cada fase. Os tempos padrão para trabalho e descanso podem ser personalizados por meio de um input range.

- `ScheduleList`:  Este componente é usado para inserir e exibir uma lista dinâmica de tarefas a serem realizadas no dia/semana. O usuário pode inserir as tarefas por meio de um input de texto e a lista não ordenada é atualizada automaticamente à medida que novas tarefas são adicionadas. O botão com sinal "-" de cada item é usado para retirar a tarefa da lista.

- `CatGenerator`: Componente responsável por renderizar uma imagem aleatória de gato obtida por meio de uma API. É composto por uma tag img e um botão com a função de buscar uma nova imagem na API.

- `Video`: Renderiza um video do youtube em um iframe baseado na URL default. O input é responsável por trocar o vídeo apresentado ao inserir uma nova URL válida. A ideia é reproduzir vídeos com audios que ajudem a manter o foco, como lofi ou sons de natureza.

## :gear: Configurações

Para usar esta aplicação, basta baixar o projeto ou clonar este repositório. Feito isso, acesse a pasta focus-app e execute o comando no terminal:
```sh
    npm install
```
Após instalar todas dependencias, é possível executar o arquivo em modo de desenvolvimento pelo comando:
```sh
    npm run dev
``` 
A aplicação irá abrir na porta 5173. Acesse localhost:5173 para visualizá-la. Para gerar a versão de produção utilize o comando:
```sh
    npm run build
```

## :heavy_check_mark: Técnicas e tecnologias utilizadas

- `Vue 3`
- `JavaScript`
- `Composition api`
- `Nodejs`
- `Vite`
- `npm`

## :link: Créditos

- `Random.cat Api`: https://aws.random.cat/meow
- `Documentação Vue`: https://vuejs.org/guide/introduction.html

## :smile: Autor

- `Jônathan Faria`








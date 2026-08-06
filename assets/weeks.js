(function (root) {
  "use strict";

  root.AcademyWeeks = [
    {
      id: "week-01",
      number: 1,
      title: "Tecnologia está em todo lugar",
      theme: "Minha jornada de aprendizagem",
      duration: "25 minutos",
      emoji: "💻",
      summary: "Reconheça tecnologias do cotidiano e descubra como elas resolvem problemas.",
      objective: "Identificar tecnologias, suas finalidades e os cuidados necessários ao utilizá-las.",
      concepts: [
        ["Não é só computador", "Uma ponte, uma vacina e um semáforo também usam tecnologia."],
        ["Existe uma necessidade", "Pessoas criam ferramentas para comunicar, transportar, cuidar ou construir."],
        ["Podemos avaliar", "Toda solução pode ter benefícios, limites e impactos nas pessoas."]
      ],
      practice: "Escolha um objeto ao seu redor. Explique qual problema ele resolve, quem se beneficia e um cuidado necessário ao utilizá-lo.",
      prompts: ["O que é?", "Para que serve?", "Quem se beneficia?", "Que cuidado exige?"],
      transcript: "Quando ouvimos a palavra tecnologia, podemos pensar em celulares e computadores. Mas tecnologia é toda aplicação de conhecimento criada para resolver um problema. O semáforo organiza o trânsito, uma geladeira conserva alimentos e um lápis ajuda a registrar ideias. Ao analisar uma tecnologia, pergunte: qual problema ela resolve, quem ela ajuda e quais cuidados exige?",
      questions: [
        ["Qual frase explica melhor o que é tecnologia?", ["Somente aparelhos conectados à internet", "Conhecimento aplicado para resolver problemas", "Qualquer objeto que custa caro"], 1, "Tecnologia é conhecimento aplicado. Ela pode existir com ou sem computador."],
        ["Qual item também pode ser considerado uma tecnologia?", ["Um lápis", "Apenas um videogame", "Somente um robô"], 0, "O lápis foi criado para resolver a necessidade de escrever e desenhar."],
        ["Antes de avaliar uma tecnologia, qual pergunta é útil?", ["Ela tem a cor mais bonita?", "Qual problema ela resolve?", "Ela é a mais nova de todas?"], 1, "Entender o problema ajuda a avaliar utilidade, benefícios e limites."],
        ["Um semáforo é tecnologia porque...", ["organiza o trânsito usando uma solução criada por pessoas", "sempre possui internet", "é usado somente por cientistas"], 0, "O semáforo aplica conhecimento e regras para organizar o trânsito."],
        ["Qual atitude representa uso responsável?", ["Ignorar riscos", "Compartilhar dados pessoais", "Observar benefícios, limites e cuidados"], 2, "Uso responsável considera benefícios, impactos e segurança."],
        ["Qual necessidade uma geladeira ajuda a resolver?", ["Conservar alimentos", "Aumentar a velocidade da internet", "Organizar o trânsito"], 0, "A geladeira ajuda a conservar alimentos em baixa temperatura."],
        ["Tecnologia precisa obrigatoriamente de eletricidade?", ["Sim, sempre", "Não, ferramentas simples também são tecnologias", "Somente durante o dia"], 1, "Tecnologias como lápis, roda e alavanca não precisam de eletricidade."],
        ["Ao comparar duas soluções, o que devemos considerar?", ["Apenas o preço", "Somente a aparência", "Finalidade, benefícios, limites e segurança"], 2, "Uma boa comparação usa vários critérios relevantes."],
        ["Quem cria tecnologias?", ["Somente computadores", "Pessoas que aplicam conhecimento", "Apenas personagens de filmes"], 1, "Tecnologias são desenvolvidas por pessoas e equipes."],
        ["Qual é um exemplo de cuidado digital?", ["Usar senha forte e proteger dados pessoais", "Informar a senha aos amigos", "Clicar em qualquer link"], 0, "Senhas fortes e proteção de dados reduzem riscos." ]
      ]
    },
    {
      id: "week-02",
      number: 2,
      title: "Por dentro do computador",
      theme: "Hardware e componentes",
      duration: "30 minutos",
      emoji: "🧩",
      summary: "Descubra como CPU, memória, armazenamento e outros componentes trabalham juntos.",
      objective: "Reconhecer os principais componentes de um computador e relacionar cada um à sua função.",
      concepts: [
        ["CPU processa", "Executa instruções e coordena operações do computador."],
        ["RAM trabalha agora", "Mantém temporariamente os dados dos programas em uso."],
        ["SSD guarda", "Armazena arquivos e programas mesmo quando o computador é desligado."]
      ],
      practice: "Desenhe um computador e ligue cada componente à sua função. Depois explique o caminho entre abrir um programa, processar informações e salvar um arquivo.",
      prompts: ["Quem processa?", "Quem guarda agora?", "Quem armazena?", "Quem fornece energia?"],
      transcript: "Um computador funciona como uma equipe. A CPU executa instruções, a memória RAM mantém dados usados naquele momento e o SSD guarda arquivos por mais tempo. A placa-mãe conecta os componentes, a fonte fornece energia e a placa de vídeo processa imagens. Um componente isolado não faz todo o trabalho: equilíbrio e compatibilidade são importantes.",
      questions: [
        ["Qual é a principal função da CPU?", ["Executar instruções", "Guardar arquivos sem energia", "Exibir papel impresso"], 0, "A CPU processa instruções e coordena operações."],
        ["A memória RAM guarda dados principalmente...", ["durante o uso dos programas", "para sempre, sem energia", "apenas em papel"], 0, "A RAM mantém temporariamente dados que estão em uso."],
        ["Qual componente armazena arquivos mesmo desligado?", ["SSD", "RAM", "Ventoinha"], 0, "O SSD é um dispositivo de armazenamento persistente."],
        ["Qual componente conecta CPU, RAM e outros dispositivos?", ["Placa-mãe", "Mouse", "Monitor"], 0, "A placa-mãe permite a comunicação entre os componentes."],
        ["Para que serve a fonte de alimentação?", ["Fornecer energia adequada", "Traduzir textos", "Criar conexão Wi-Fi sozinha"], 0, "A fonte converte e distribui energia para o computador."],
        ["Qual componente é especializado em processar imagens?", ["Placa de vídeo", "Teclado", "Gabinete"], 0, "A GPU da placa de vídeo processa gráficos e imagens."],
        ["Mais memória RAM pode ajudar quando...", ["muitos programas estão abertos", "o monitor está desligado", "a cadeira está baixa"], 0, "Mais RAM pode melhorar o trabalho simultâneo de programas."],
        ["O que significa verificar compatibilidade?", ["Confirmar que os componentes funcionam juntos", "Escolher tudo pela cor", "Comprar sempre o mais caro"], 0, "Encaixes, padrões e capacidades precisam ser compatíveis."],
        ["Para estudo e navegação, qual escolha costuma ser equilibrada?", ["Componentes compatíveis com a necessidade", "Apenas a peça mais cara", "Ignorar armazenamento"], 0, "A necessidade de uso deve orientar um conjunto equilibrado."],
        ["Antes de abrir um computador, qual cuidado é essencial?", ["Desligar da energia e ter supervisão", "Molhar as peças", "Usar qualquer ferramenta sozinho"], 0, "Equipamentos devem ser manuseados desligados e com supervisão responsável."]
      ]
    },
    {
      id: "week-03",
      number: 3,
      title: "Organização financeira",
      theme: "Escolhas, orçamento e privacidade",
      duration: "30 minutos",
      emoji: "🪙",
      summary: "Planeje um orçamento e perceba que produtos gratuitos também podem ter custos indiretos.",
      objective: "Organizar receita, gastos e poupança, justificando escolhas de consumo consciente.",
      concepts: [
        ["Receita e gasto", "Receita é o dinheiro recebido; gasto é o valor utilizado."],
        ["Poupar tem propósito", "Guardar parte do dinheiro ajuda a alcançar objetivos e enfrentar imprevistos."],
        ["Grátis pode ter custo", "Alguns serviços usam publicidade, atenção ou dados como fonte de receita."]
      ],
      practice: "Distribua R$ 120 entre poupança, necessidades e lazer. Confira a soma, calcule as porcentagens e explique suas escolhas sem usar dados financeiros reais.",
      prompts: ["Quanto guardar?", "Do que preciso?", "O que desejo?", "A soma está correta?"],
      transcript: "Um orçamento é um plano para usar recursos. Primeiro identificamos quanto temos; depois distribuímos entre necessidades, desejos, poupança e reserva. Também devemos investigar custos indiretos. Um aplicativo sem preço pode exibir anúncios ou coletar dados. Consumo consciente significa entender a troca, comparar alternativas e proteger informações pessoais.",
      questions: [
        ["O que é receita?", ["Dinheiro recebido", "Todo objeto comprado", "Uma senha"], 0, "Receita é um valor que entra no orçamento."],
        ["O que é gasto?", ["Valor usado para comprar ou pagar algo", "Dinheiro que sempre aumenta", "Um tipo de computador"], 0, "Gasto é uma saída de recursos."],
        ["Qual é uma vantagem de planejar antes de comprar?", ["Comparar escolhas e evitar falta de dinheiro", "Eliminar todos os desejos", "Nunca mais precisar calcular"], 0, "Planejamento ajuda a priorizar e prever consequências."],
        ["Se R$ 60 de R$ 120 forem guardados, qual percentual foi poupado?", ["25%", "50%", "75%"], 1, "60 dividido por 120 é 0,5, ou 50%."],
        ["Qual opção descreve uma necessidade?", ["Algo essencial no contexto da pessoa", "Tudo que aparece em propaganda", "Sempre o produto mais caro"], 0, "Necessidades são essenciais, mas dependem do contexto."],
        ["Um aplicativo gratuito pode gerar receita por meio de...", ["anúncios ou serviços adicionais", "nenhuma fonte possível", "notas escolares"], 0, "Publicidade e compras adicionais são modelos comuns."],
        ["Qual dado não deve ser usado numa atividade pública?", ["Endereço real da criança", "Preço fictício", "Nome de uma categoria"], 0, "Endereço é dado pessoal e não é necessário para o exercício."],
        ["O que é consumo consciente?", ["Avaliar necessidade, custo e impacto", "Comprar rapidamente", "Ignorar condições"], 0, "Consumo consciente envolve informação e reflexão."],
        ["Uma reserva financeira ajuda principalmente a...", ["lidar com imprevistos", "compartilhar senhas", "aumentar anúncios"], 0, "Uma reserva cria proteção para situações não planejadas."],
        ["Qual orçamento está correto para uma receita de R$ 120?", ["R$ 60 + R$ 40 + R$ 20", "R$ 80 + R$ 60", "R$ 100 + R$ 50"], 0, "60 + 40 + 20 resulta exatamente em R$ 120." ]
      ]
    },
    {
      id: "week-04",
      number: 4,
      title: "Algoritmos no cotidiano",
      theme: "Instruções, decisões e fluxogramas",
      duration: "30 minutos",
      emoji: "🔀",
      summary: "Transforme tarefas do dia a dia em instruções claras, ordenadas e testáveis.",
      objective: "Criar e revisar algoritmos simples com sequência, decisão, repetição, início e fim.",
      concepts: [
        ["Sequência", "Passos organizados na ordem necessária para alcançar um resultado."],
        ["Decisão", "Uma condição escolhe entre caminhos, como: se chover, use guarda-chuva."],
        ["Revisão", "Testar o algoritmo revela instruções ausentes ou ambíguas." ]
      ],
      practice: "Escreva um algoritmo para preparar um sanduíche no papel. Peça a alguém para simular exatamente os passos e revise qualquer instrução ambígua.",
      prompts: ["Onde começa?", "Qual é a ordem?", "Existe uma decisão?", "Quando termina?"],
      transcript: "Um algoritmo é uma sequência de instruções para realizar uma tarefa ou resolver um problema. As instruções precisam ser claras e estar na ordem correta. Decisões usam condições para escolher caminhos, e repetições evitam escrever o mesmo passo muitas vezes. Ao testar um algoritmo, encontramos ambiguidades e podemos melhorá-lo.",
      questions: [
        ["O que é um algoritmo?", ["Uma sequência de instruções", "Somente um computador", "Uma peça de hardware"], 0, "Algoritmo é uma sequência organizada de instruções."],
        ["Por que a ordem dos passos pode ser importante?", ["Alguns passos dependem dos anteriores", "Para usar mais papel", "Porque toda ordem funciona igual"], 0, "Dependências fazem com que certas ações precisem acontecer antes."],
        ["Qual instrução é mais clara?", ["Faça aquilo", "Coloque duas fatias de pão no prato", "Termine de algum jeito"], 1, "Uma instrução clara informa ação, objeto e quantidade quando necessário."],
        ["Em um fluxograma, uma decisão normalmente cria...", ["dois ou mais caminhos", "apenas uma decoração", "uma senha pública"], 0, "A resposta à condição define o próximo caminho."],
        ["Qual frase representa uma condição?", ["Se chover, leve guarda-chuva", "Pão e queijo", "Fim"], 0, "A palavra 'se' apresenta uma condição e uma ação correspondente."],
        ["Para que serve uma repetição?", ["Executar um passo várias vezes", "Apagar o início", "Esconder instruções"], 0, "Repetições representam ações que se repetem."],
        ["O que fazer quando uma instrução é ambígua?", ["Reescrever com mais precisão", "Ignorar o problema", "Excluir todo o algoritmo"], 0, "Revisar e detalhar torna o resultado mais previsível."],
        ["Qual elemento indica que o processo terminou?", ["Fim", "Talvez", "Preço"], 0, "O fim marca a conclusão do fluxo."],
        ["Testar um algoritmo significa...", ["seguir os passos e observar o resultado", "apenas ler o título", "decorar sem compreender"], 0, "A execução permite encontrar erros e oportunidades de melhoria."],
        ["Qual sequência faz sentido ao preparar um sanduíche?", ["Separar ingredientes, montar e servir", "Servir, comprar e começar", "Terminar antes de iniciar"], 0, "A sequência respeita as dependências naturais da tarefa." ]
      ]
    }
  ];
}(typeof globalThis !== "undefined" ? globalThis : this));

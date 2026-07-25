# Arquitetura do Projeto

## 1. Visão Geral

O Academy Tech Kids é um projeto educacional de mentoria voltado para adolescentes de 12 e 13 anos.

A proposta é organizar uma jornada de aprendizagem leve, prática e progressiva, conectando conteúdos escolares com tecnologia, internet, games, idiomas, educação financeira e pensamento lógico.

O projeto utiliza arquivos em Markdown para organizar conteúdos, atividades, orientações, acompanhamento e evolução dos alunos.

---

## 2. Objetivo da Arquitetura

A arquitetura do projeto foi definida para permitir:

* Organização clara dos materiais.
* Reutilização das atividades.
* Evolução contínua do conteúdo.
* Versionamento por meio do Git.
* Colaboração entre mentores e educadores.
* Expansão futura para site, dashboard, portal e recursos de Inteligência Artificial.

---

## 3. Fluxo do Programa

O funcionamento do programa segue o fluxo abaixo:

```text
Planejamento semanal
        │
        ▼
Entrega das atividades
        │
        ▼
Estudo individual
        │
        ▼
Execução dos exercícios
        │
        ▼
Encontro com o mentor
        │
        ▼
Apresentação e revisão
        │
        ▼
Feedback
        │
        ▼
Registro da evolução
        │
        ▼
Próxima semana
```

---

## 4. Papéis e Responsabilidades

### Mentor

O mentor é responsável por:

* Planejar a semana.
* Entregar e explicar as atividades.
* Acompanhar a participação.
* Tirar dúvidas.
* Corrigir exercícios.
* Dar feedback.
* Estimular autonomia e curiosidade.
* Registrar a evolução dos alunos.

### Aluno

O aluno é responsável por:

* Organizar o material.
* Realizar as atividades.
* Anotar dúvidas.
* Participar do encontro semanal.
* Apresentar o que aprendeu.
* Respeitar os prazos combinados.
* Buscar evolução contínua.

### Responsáveis

Os responsáveis podem apoiar o projeto por meio de:

* Incentivo à rotina de estudos.
* Apoio na organização do ambiente.
* Acompanhamento do compromisso.
* Comunicação com o mentor.
* Respeito ao ritmo individual de cada aluno.

---

## 5. Estrutura do Repositório

```text
academy-tech-kids/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── docs/
├── curriculum/
├── weekly/
├── templates/
├── challenges/
├── certificates/
├── resources/
├── assets/
└── .github/
```

### `docs/`

Contém a documentação geral do projeto.

Exemplos:

* Arquitetura.
* Metodologia.
* Guias.
* Avaliação.
* Gamificação.
* Privacidade.
* Roadmap.

### `curriculum/`

Contém a organização dos conteúdos por área de conhecimento.

Exemplos:

* Português.
* Matemática.
* Educação financeira.
* Inglês.
* Espanhol.
* Tecnologia.

### `weekly/`

Contém o conteúdo organizado por semana.

Exemplo:

```text
weekly/
├── week-01/
├── week-02/
├── week-03/
└── week-04/
```

Cada semana pode conter objetivos, atividades, desafios e orientações para o mentor.

### `templates/`

Contém modelos reutilizáveis.

Exemplos:

* Planejamento semanal.
* Registro de progresso.
* Feedback do mentor.
* Roteiro de reunião.
* Desafio.
* Certificado.

### `challenges/`

Contém desafios extras de lógica, tecnologia, criatividade e resolução de problemas.

### `certificates/`

Contém modelos de certificados e reconhecimentos.

### `resources/`

Contém links, referências, ferramentas e materiais complementares.

### `assets/`

Contém imagens, diagramas, ícones e arquivos visuais.

### `.github/`

Contém arquivos relacionados à organização do projeto no GitHub.

Exemplos:

* Modelos de Issues.
* Modelo de Pull Request.
* Configurações de contribuição.
* Fluxos de automação futuros.

---

## 6. Organização das Semanas

Cada semana deve seguir uma estrutura semelhante:

```text
Semana
├── Objetivo
├── Conteúdo
├── Atividade de Português
├── Atividade de Matemática
├── Atividade de Inglês
├── Atividade de Espanhol
├── Atividade de Tecnologia
├── Desafio
├── Revisão
└── Encontro com o mentor
```

Essa padronização facilita a criação, aplicação e manutenção dos materiais.

---

## 7. Ciclo de Aprendizagem

O ciclo de aprendizagem será baseado em seis etapas:

```text
Aprender
   ↓
Praticar
   ↓
Explicar
   ↓
Criar
   ↓
Receber feedback
   ↓
Melhorar
```

O aluno não deve apenas consumir conteúdo.

Ele deve praticar, explicar o que aprendeu, aplicar o conhecimento e melhorar com base no feedback recebido.

---

## 8. Acompanhamento

A evolução será registrada por meio de:

* Participação.
* Entrega das atividades.
* Organização.
* Esforço.
* Comunicação.
* Autonomia.
* Evolução ao longo do tempo.

O projeto não deve comparar os alunos entre si.

Cada aluno deve ser avaliado com base na própria evolução.

---

## 9. Segurança e Privacidade

O repositório público não deve armazenar:

* Nome completo dos alunos.
* Escola.
* Endereço.
* Fotografias.
* Notas reais.
* Avaliações individuais.
* Informações pessoais.
* Dados de saúde.
* Informações familiares.

Dados individuais devem permanecer fora do repositório público.

---

## 10. Arquitetura Atual

A versão inicial utiliza uma arquitetura baseada em conteúdo estático:

```text
GitHub
   │
   ▼
Arquivos Markdown
   │
   ├── Documentação
   ├── Currículo
   ├── Atividades
   ├── Templates
   └── Desafios
```

Essa abordagem permite começar de forma simples, com baixo custo e fácil manutenção.

---

## 11. Evolução Futura

O projeto poderá evoluir gradualmente.

### Fase 1 — Conteúdo em Markdown

* Documentação.
* Currículo.
* Atividades semanais.
* Templates.
* Acompanhamento manual.

### Fase 2 — GitHub Pages

* Site público.
* Navegação entre conteúdos.
* Visual mais amigável.
* Área institucional do projeto.

### Fase 3 — Dashboard

* Progresso das atividades.
* Indicadores.
* Pontuação.
* Medalhas.
* Evolução por competência.

### Fase 4 — Inteligência Artificial

* Geração de atividades.
* Sugestões por faixa etária.
* Personalização por dificuldade.
* Apoio ao mentor.
* Revisão de textos.
* Criação de desafios.

### Fase 5 — Portal Educacional

* Área do aluno.
* Área do mentor.
* Login.
* Histórico.
* Gamificação.
* Certificados.
* Relatórios.

---

## 12. Princípios da Arquitetura

O projeto seguirá os seguintes princípios:

* Simplicidade.
* Clareza.
* Segurança.
* Privacidade.
* Reutilização.
* Evolução gradual.
* Documentação.
* Inclusão.
* Aprendizagem prática.
* Respeito ao ritmo individual.

---

## 13. Status

* Documento: Arquitetura do Projeto.
* Versão: 1.0.
* Status: Inicial.
* Formato atual: Markdown.
* Próxima evolução: Metodologia e currículo.


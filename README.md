# 📱 Redesign do App Universitário

##  Objetivo da Ideia
O novo aplicativo não pretende substituir o portal do aluno nem outras plataformas institucionais.  
O objetivo é centralizar funcionalidades realmente utilizadas no dia a dia presencial do estudante, reduzindo atritos da rotina acadêmica dentro do campus.

A proposta transforma o aplicativo em um **hub universitário moderno, rápido, intuitivo e funcional**.

---
## RM 
- 565065 - Augusto Barcelos Barros
- 556197 - Caio Felipe de Lima Bezerra
- 555541 - Juan Francisco Alves Muradas
- 555931 - Lucas Derenze Simidu
- 554873 - Sofia Fernandes

##  Resumo das Ideias Apresentadas

###  Painel Acadêmico (Evolução de Notas e Faltas)
A área atualmente informativa passaria a ser um painel completo de acompanhamento, contendo:
- Limite de faltas antes de reprovação  
- Simulador de média final  
- Cálculo de quanto precisa tirar nas próximas avaliações  
- Previsão de aprovação/reprovação  
- Simulação de cenários  

**Objetivo:**  
Reduzir dúvidas e ansiedade ao longo do semestre.

---

###  Campus (Uso dos Espaços Físicos)
O app ajudaria o aluno a se locomover e planejar melhor o uso da infraestrutura.

**Funcionalidades:**
- Mapa interativo por andar  
  - Salas livres  
  - Laboratórios disponíveis  
  - Áreas de estudo  
  - Cafeterias  
  - Serviços  
- Reserva de espaços:
  - Salas de estudo/grupo  
  - Laboratórios  
  - Espaços de projeto  
- Reservas visíveis na home  
- Expiração automática das reservas  

**Objetivo:**  
Evitar deslocamentos desnecessários e incertezas.

---

###  Comunidade Acadêmica
Recursos voltados à colaboração entre alunos.

**Funcionalidades:**
- Busca de colegas com filtros:
  - Turma  
  - Disciplina  
  - Semestre  
  - Campus  
- Área de projetos (Challenge):
  - Publicação de projetos  
  - Anexos de apresentação  
  - Links de repositório  
  - Tecnologias utilizadas  
  - Busca por integrantes  

**Objetivo:**  
Fortalecer networking e dar visibilidade aos projetos.

---

###  Avisos Relevantes (Notificações Contextuais)
Notificações inteligentes e situacionais.

**Exemplos:**
- Mudança de sala  
- Aula cancelada  
- Prazo de entrega próximo  
- Reserva prestes a acabar  

**Funcionalidades adicionais:**
- Habilitar/desabilitar categorias  
- Configurar antecedência dos avisos  

**Objetivo:**  
Evitar perda de informações importantes.

---

###  ID Digital
Carteirinha estudantil digital mantida e otimizada.

**Melhorias:**
- Carregamento instantâneo  
- Funcionamento offline após primeiro acesso  
- Sincronização automática  
- Redução de erros de carregamento  

**Objetivo:**  
Garantir acesso rápido e confiável à identificação.

---

###  Otimização e Performance

**Propostas técnicas:**
- Armazenamento local de dados  
- Sincronização em segundo plano  
- Carregamento instantâneo  
- Funcionamento parcial offline  

**Resultado esperado:**
- Maior velocidade  
- Menos travamentos  
- Melhor experiência dentro do campus  

---

### Redesign UX/UI

**Melhorias:**
- Layout minimalista  
- Menos etapas para ações  
- Ícones padronizados  
- Navegação com 4–5 abas principais  
- Hierarquia visual clara  
- Home mais objetiva:
  - Próximas aulas  
  - Reservas ativas  
  - Avisos importantes  
  - Resumo de notas e faltas  

**Objetivo:**  
Tornar o uso mais intuitivo e rápido.

---

### Widgets e Problema de “Sem Conexão”

**Solução proposta:**
- Cache local de dados  
- Atualização em background  
- Exibição da última informação sincronizada  
- Status discreto (ex: “Atualizado há 5 min”)  
- Erro apenas quando não houver dados disponíveis  

**Resultado esperado:**
- Widgets mais confiáveis  
- App mais rápido  
- Melhor experiência com internet instável  

---

## Login

A tela de login é responsável por autenticar o usuário e permitir acesso seguro ao aplicativo.

O acesso será realizado utilizando as **credenciais institucionais do aluno**.  
Após autenticação válida, o sistema permitirá acesso às funcionalidades, mantendo a sessão ativa para uso contínuo no campus.

A tela deverá ser:
- Simples  
- Rápida  
- Segura  

###  Funcionalidades
- Autenticação com credenciais institucionais  
- Manutenção de sessão ativa  
- Recuperação de senha  
- Feedback de erro em caso de falha de autenticação  

###  Objetivo
Garantir acesso seguro ao aplicativo e identificar corretamente o usuário dentro do sistema acadêmico.
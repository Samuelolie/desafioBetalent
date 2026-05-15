# 🛒 Test Documentation - Sauce Demo (UI)

Este documento detalha a estratégia de testes, cenários e análises para a plataforma de e-commerce **Sauce Demo**.

---

## 📋 1. Plano de Testes

**Objetivo:** Garantir a estabilidade das funcionalidades críticas de e-commerce, desde a autenticação até a finalização do pedido.
**Ferramentas:** Testes Manuais com documentação em Markdown.
**Ambiente:** [Sauce Demo](https://www.saucedemo.com/)

---

## 🛣️ 2. Cenários de Teste (BDD)

### 2.1 Autenticação
*   **CT01 - Login com sucesso:**
    *   **Dado** que acesso a página de login
    *   **Quando** insiro credenciais válidas (`standard_user` / `secret_sauce`)
    *   **Então** sou redirecionado para a página de inventário.
*   **CT02 - Login com usuário bloqueado:**
    *   **Dado** que insiro o usuário `locked_out_user`
    *   **Quando** tento realizar o login
    *   **Então** visualizo a mensagem de erro: "Epic sadface: Sorry, this user has been locked out."
*   **CT03 - Login com usuário com bug:**
    *   **Dado** que insiro o usuário `locked_out_user`
    *   **Quando** tento realizar o login
    *   **Então** visualizo a mensagem de erro: "Epic sadface: Sorry, this user has been locked out."
*   **CT04 - Logout:**
    *   **Dado** que estou logado
    *   **Quando** clico em "Logout" no menu lateral
    *   **Então** retorno para a página de login inicial.

### 2.2 Gerenciamento de Produtos & Carrinho
*   **CT05 - Ordenação por Preço:**
    *   **Dado** que estou na lista de produtos
    *   **Quando** seleciono a ordenação "Price (low to high)"
    *   **Então** o primeiro item deve ser o de valor mais baixo ($7.99).
*   **CT06 - Gestão de Itens no Carrinho:**
    *   **Dado** que adiciono dois itens ao carrinho
    *   **Quando** removo um item ainda na tela de inventário ou dentro do carrinho
    *   **Então** o contador do carrinho deve atualizar instantaneamente.

### 2.3 Fluxo de Checkout
*   **CT07 - Compra com sucesso (E2E):**
    *   **Dado** que possuo itens no carrinho e sigo para o Checkout
    *   **Quando** preencho as informações de envio e clico em "Finish"
    *   **Então** visualizo a tela "Thank you for your order!" com o agradecimento pelo pedido.
*   **CT08 - Validação de campos obrigatórios:**
    *   **Dado** que estou na tela "Checkout: Your Information"
    *   **Quando** tento prosseguir com campos vazios
    *   **Então** o sistema deve exibir mensagens de erro informando qual campo é obrigatório.
### 2.4 Navegação Páginas
*   **CT09 - Navegar entre as páginas**
    *   **Dado** que estou na lista de produtos
    *   **Quando** clico em about
    *   **Então** devo ser redirecionado para a página de about com a url "https://saucelabs.com/"

---

## 📊 3. Execução e Resultados (Casos de Teste)

Nesta seção, apresento o status de execução de cada cenário mapeado, com links diretos para as evidências (screenshots e vídeos) armazenadas no repositório.

| ID | Cenário | Resultado Esperado | Status | Evidência (Clique para abrir) |
|:---|:---|:---|:---:|:---|
| **CT01** | Login com sucesso | Acesso à vitrine de produtos e exibição do título "Products". | ✅ Pass |
| **CT02** | Login com usuário bloqueado | Exibição da mensagem de erro de usuário bloqueado. | ✅ Pass |
| **CT03** | Login com usuário com problema | Identificação de inconsistências visuais (usuário problem_user). | ✅ Pass |
| **CT04** | Logout do sistema | Encerramento da sessão e retorno à página de login. | ✅ Pass |
| **CT05** | Ordenação de preço | Ordenação correta dos itens do menor para o maior preço. | ✅ Pass |
| **CT06** | Gestão de itens no carrinho | Atualização correta do contador e fluxo visual. | ✅ Pass | 
| **CT07** | Compra com sucesso (E2E) | Conclusão do fluxo de checkout com sucesso. | ✅ Pass |
| **CT08** | Validação de campos obrigatórios | Exibição de alertas ao tentar prosseguir com campos vazios. | ✅ Pass |
| **CT09** | Navegar entre as páginas | Redirecionamento correto para o link externo da Sauce Labs. | ✅ Pass |

---

## 🐞 4. Análise de Bugs, Riscos e Melhorias

### 🔍 Bugs Identificados
*    **Bug:** Identificado que o usuário `problem_user` possui links de imagens quebrados na vitrine, prejudicando a experiência visual.

### ⚠️ Análise de Riscos
*   **Risco de Performance:** O site pode apresentar lentidão ao carregar a lista de produtos com o usuário `performance_glitch_user`, o que pode levar à desistência da compra em conexões lentas.

### 💡 Sugestões de Melhorias
1.  **Acessibilidade:** Adicionar atributos `aria-label` nos botões de remover itens para melhor leitura por leitores de tela.
2.  **UX:** Incluir uma confirmação visual (toast ou pop-up) ao adicionar um item ao carrinho, além da mudança no ícone superior.

---

## 📱 5. Diferenciais (Nível 2)
*   **Responsividade:** Testes realizados simulando com 400x830 no layout (Layout adaptável).
*   **Automação:** Scripts desenvolvidos em Playwright localizados na pasta `/automation`.
# 🎯 Desafio Técnico QA Testing - UI & API Testing

Este repositório contém a solução completa para o desafio técnico de Quality Assurance, focado na validação de qualidade para aplicações Web (UI) e serviços backend (API). 

O projeto foi estruturado para atender e superar os requisitos de **Nível 1 (Obrigatório)** e **Nível 2 (Diferencial)**, entregando documentação detalhada, pensamento crítico, análise de riscos e automação robusta.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas
* **UI Testing:** Playwright, JavaScript (ESM - ECMAScript Modules), Node.js
* **API Testing:** Insomnia (Request Chaining & Test Scripts nativos)
* **Design Pattern:** Page Object Model (POM)
* **Documentação:** Markdown (BDD/Gherkin)

---

## 📂 Estrutura do Repositório

O projeto está dividido em documentação analítica e automação em código:

```text
📦 desafio-qa
 ┣ 📂 automation/                 # Automação de UI com Playwright
 ┃ ┣ 📂 tests/
 ┃ ┃ ┣ 📂 e2e/                    # Scripts de teste (Specs)
 ┃ ┃ ┗ 📂 pages/                  # Page Objects (POM)
 ┃ ┣ 📜 playwright.config.js      # Configurações globais e report HTML
 ┃ ┗ 📜 package.json              
 ┣ 📂 Evidência Front UI/         # Capturas de tela e vídeos das execuções manuais
 ┣ 📂 Evidência Back    /         # Capturas de tela das execuções manuais
 ┣ 📜 CenariosFront.md            # Plano de testes, BDD e bugs da UI (Sauce Demo)
 ┣ 📜 CenariosAPI.md              # Plano de testes e cenários da API (Restful-Booker)
 ┣ 📜 collection.json             # Collection do Insomnia (com scripts de automação)
 ┗ 📜 README.md                   # Instruções de execução do projeto
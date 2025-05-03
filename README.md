# Calendário 2025 com Eventos

Um calendário interativo que permite gerenciar eventos por dia com persistência de dados.

## 📋 Descrição

Este projeto é um calendário dinâmico onde você pode adicionar e visualizar eventos em dias específicos. Os dados são salvos no navegador usando localStorage, mantendo seus eventos mesmo após fechar a página.

## 🚀 Instruções de Uso

1. **Clique em qualquer dia do calendário**
2. **Digite o evento no campo de input**
3. **Pressione Enter ou clique no botão "+" para adicionar**
4. **Clique no "X" para remover um evento**
5. **Seus eventos são salvos automaticamente**

## 🔧 API Utilizada

### localStorage API

A API do navegador `localStorage` permite armazenamento persistente de dados:

```javascript
// Salvar dados
localStorage.setItem('chave', JSON.stringify(dados));

// Recuperar dados
const dados = JSON.parse(localStorage.getItem('chave'));

// Estrutura dos eventos:
{
  "2025-janeiro-15": ["Evento 1", "Evento 2"],
  "2025-março-20": ["Evento importante"]
}
```

## 💾 Persistência de Dados

- Os eventos são armazenados automaticamente no navegador
- Os dados permanecem mesmo após fechamento do navegador
- Cada dia tem sua própria lista de eventos
- A estrutura utiliza strings de data como chaves

## 🛠️ Estrutura do Projeto

O projeto utiliza:
- HTML5 para estrutura
- CSS3 para estilização
- JavaScript ES6+ para funcionalidade
- localStorage para persistência

## 📝 Exemplo de Uso

```javascript
// Adicionar um evento
const eventos = JSON.parse(localStorage.getItem('eventos')) || {};
const dataKey = `${ano}-${mes}-${dia}`;
if (!eventos[dataKey]) eventos[dataKey] = [];
eventos[dataKey].push('Novo evento');
localStorage.setItem('eventos', JSON.stringify(eventos));

// Visualizar eventos de um dia
const eventos = JSON.parse(localStorage.getItem('eventos'));
const eventosDodia = eventos[dataKey] || [];
```
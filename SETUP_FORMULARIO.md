# Formulário via Google Forms

O questionário usa o **Google Forms** incorporado no site. As respostas vão direto para sua conta do Google.

---

## Como configurar (rápido)

### 1. Criar o formulário

1. Acesse [forms.google.com](https://forms.google.com)
2. Clique em **+ Em branco**
3. Adicione suas perguntas, por exemplo:
   - "Podemos nos encontrar?"
   - "O que você sente por mim?"
   - "Quer conversar?"
4. (Opcional) Em **Configurações** → **Respostas**, marque **"Coletar endereços de e-mail"** se quiser saber quem respondeu

### 2. Vincular ao Google Sheets (para ver as respostas)

1. No formulário, clique na aba **Respostas**
2. Clique no ícone **Google Sheets** (planilha) para criar uma planilha vinculada
3. As respostas passarão a aparecer nessa planilha automaticamente

### 3. Pegar o link para incorporar

1. Clique em **Enviar** (canto superior direito)
2. Clique no ícone **</>** (incorporar)
3. Copie a **URL** que aparece em `src="..."`  
   Exemplo: `https://docs.google.com/forms/d/e/1FAIpQLSeXXXXXXXX/viewform?embedded=true`

### 4. Colar no projeto

Abra `src/content/siteContent.ts` e preencha:

```ts
export const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/SUA_ID/viewform?embedded=true';
```

Para o link "Ver respostas" funcionar na página Respostas:

```ts
export const GOOGLE_RESPONSES_LINK = 'https://docs.google.com/spreadsheets/d/SUA_PLANILHA_ID';
```

(A URL da planilha aparece quando você abre a planilha criada no passo 2.)

---

## Pronto!

- **Questionário**: a pessoa acessa o site e responde no formulário incorporado
- **Respostas**: você vê na planilha do Google ou clicando em "Ver respostas no Google Sheets" no menu do site

Sem Supabase, sem configuração extra. Só precisa da sua conta Google.

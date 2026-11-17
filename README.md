# Site FMEA Engineering

Site estático (HTML/CSS/JS) hospedado na Vercel. Convertido do site PHP original da agência.

- Páginas: arquivos `.html` na raiz e nas pastas `servicos/`, `setores/`, `blog/`. A Vercel serve sem a extensão (`/contato`, `/servicos/inspecoes`).
- Imagens, CSS e JS: `assets/`.
- Formulário de contato: `api/contact.js` (função da Vercel, envia e-mail pelo Resend; variáveis RESEND_API_KEY, CONTACT_NOTIFY_TO, CONTACT_FROM_EMAIL).
- Cabeçalho e rodapé estão repetidos em cada página (antes vinham de `includes/` do PHP). Para mudar o menu ou o rodapé, altere em todas as páginas.

Qualquer alteração enviada para a branch `main` vai para o ar automaticamente. Pull requests geram um link de prévia.

A versão anterior em Next.js/TypeScript está preservada na branch `nextjs-versao-anterior`.

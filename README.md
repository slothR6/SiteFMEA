# FMEA Engineering - Site institucional

Projeto institucional em Next.js (App Router) com formulario de contato tecnico protegido por Turnstile, persistencia em Firestore e envio de email via Resend.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Cloudflare Turnstile
- Firebase Firestore + Firebase Admin SDK
- Resend

## Como ajustar o tamanho da logo no cabeçalho

Arquivo principal da logo:
- `components/SiteLogo.tsx`

Onde ela é usada no cabeçalho:
- `components/SiteHeader.tsx` (componente `<SiteLogo />`)

O tamanho atual é controlado principalmente por:
- Classe do container da imagem em `SiteLogo.tsx`: `h-10 w-[120px]`
- Propriedade `sizes` do `next/image`: `sizes="120px"` (deve acompanhar a largura definida)

Como alterar sem quebrar layout:
1. Ajuste `h-10` e `w-[120px]` no `<span className="relative ...">` de `SiteLogo.tsx`.
2. Atualize `sizes` para o mesmo valor de largura (ex.: se usar `w-[140px]`, use `sizes="140px"`).
3. Teste desktop e mobile para garantir que a barra do header continua com bom espaçamento lateral.

Evite alterar:
- `fill` no componente `Image` (ele depende do container com `position: relative`).
- `className="shrink-0"` no uso da logo em `SiteHeader.tsx` (evita compressão em telas menores).
- Estrutura do `Link` da logo (mantém área de clique e alinhamento consistentes).

## Como rodar localmente

```bash
npm install --legacy-peer-deps
npm run dev
```

Acesse `http://localhost:3000`.

## Setup do formulario de contato (Firestore + Resend)

1. Crie um projeto no Firebase
- Acesse o Firebase Console e crie um projeto.

2. Ative o Firestore
- No Firebase Console, habilite o Firestore Database para o projeto.

3. Crie uma Service Account e configure env vars no Next.js
- Em `Project settings > Service accounts`, gere/chame uma chave para o service account.
- Nao commite JSON da chave no repositorio.
- Configure as variaveis:

```bash
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@seu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

4. Configure Resend e variaveis da aplicacao
- Crie uma API key no painel da Resend.
- Verifique o dominio de envio na Resend antes de ir para producao.
- Configure as variaveis:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_NOTIFY_TO=contato@empresa.com;suporte@empresa.com
CONTACT_NOTIFY_CC=gestao@empresa.com
CONTACT_FROM_EMAIL=FMEA <contato@fmea.net.br>
NEXT_PUBLIC_SITE_URL=https://fmeaengineering.com.br
TURNSTILE_SECRET_KEY=sua_chave_privada_turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=sua_chave_publica_turnstile
DEBUG_CONTACT=false
```

Observacoes:
- `CONTACT_NOTIFY_TO` e obrigatoria.
- `CONTACT_NOTIFY_TO` e `CONTACT_NOTIFY_CC` aceitam um email, lista separada por `,`/`;` ou JSON array.
- Em producao, `CONTACT_FROM_EMAIL` e obrigatoria e deve usar dominio verificado na Resend.
- Em desenvolvimento, se `CONTACT_FROM_EMAIL` estiver ausente, o backend usa fallback local e registra aviso no log.
- Se `CONTACT_FROM_EMAIL` for informado com formato invalido, o endpoint retorna indisponivel em producao.
- Se `RESEND_API_KEY` nao estiver configurada, o endpoint retorna indisponivel.
- `NEXT_PUBLIC_SITE_URL` deve incluir protocolo (`https://`).
- `DEBUG_CONTACT=true` habilita logs de diagnostico da rota `/api/contact`.

5. Teste e monitoramento
- A submissao e salva em `contactSubmissions`.
- O email e enviado diretamente no backend para `CONTACT_NOTIFY_TO`.
- Opcionalmente, o envio e auditado em `mailLogs`.

## Build e producao

```bash
npm run build
npm run start
```

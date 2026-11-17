// FMEA Engineering — API de contato (Vercel Function)
// Substitui o antigo api/contact.php. Envia o e-mail pelo Resend (https://resend.com).
// Variáveis de ambiente na Vercel (as mesmas da versão Next.js anterior):
//   RESEND_API_KEY      (obrigatória)
//   CONTACT_NOTIFY_TO   destinatário(s), separados por "," ou ";"
//   CONTACT_NOTIFY_CC   cópia (opcional)
//   CONTACT_FROM_EMAIL  remetente em domínio verificado no Resend (ex.: FMEA <contato@fmeaengineering.com.br>)

function parseList(value) {
  return String(value || '')
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validarCnpj(cnpj) {
  cnpj = String(cnpj).replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  const calc = (pesos) => {
    const soma = pesos.reduce((s, p, i) => s + Number(cnpj[i]) * p, 0);
    const r = soma % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return Number(cnpj[12]) === calc([5,4,3,2,9,8,7,6,5,4,3,2]) &&
         Number(cnpj[13]) === calc([6,5,4,3,2,9,8,7,6,5,4,3,2]);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método não permitido.' });
  }

  const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  // Honeypot anti-spam
  if (data.website) {
    return res.status(200).json({ ok: true, message: 'Solicitação recebida com sucesso!' });
  }

  const requesterName = String(data.requesterName || '').trim();
  const company = String(data.company || '').trim();
  const cnpj = String(data.cnpj || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();

  const errors = [];
  if (requesterName.length < 3) errors.push('Nome inválido.');
  if (company.length < 2) errors.push('Empresa inválida.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('E-mail inválido.');
  if (!validarCnpj(cnpj)) errors.push('CNPJ inválido.');
  if (message.length < 20 || message.length > 2000) errors.push('Mensagem deve ter entre 20 e 2000 caracteres.');
  if (errors.length) {
    return res.status(422).json({ ok: false, message: errors.join(' ') });
  }

  const quando = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const text = [
    'Nova solicitação técnica recebida via site.', '',
    '----------------------------------------------',
    `Nome:    ${requesterName}`,
    `Empresa: ${company}`,
    `CNPJ:    ${cnpj}`,
    `E-mail:  ${email}`,
    '----------------------------------------------',
    'Mensagem:', message,
    '----------------------------------------------',
    `Data/hora: ${quando} (Brasília)`,
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'FMEA Site <contato@fmeaengineering.com.br>',
        to: parseList(process.env.CONTACT_NOTIFY_TO).length ? parseList(process.env.CONTACT_NOTIFY_TO) : ['contato@fmeaengineering.com.br'],
        cc: parseList(process.env.CONTACT_NOTIFY_CC).length ? parseList(process.env.CONTACT_NOTIFY_CC) : undefined,
        reply_to: `${requesterName} <${email}>`,
        subject: `[FMEA] Nova solicitação de ${requesterName}`,
        text,
      }),
    });
    if (!r.ok) throw new Error(await r.text());
    return res.status(200).json({ ok: true, message: 'Solicitação enviada com sucesso! Retornaremos em breve.' });
  } catch (e) {
    console.error('Falha ao enviar e-mail:', e);
    return res.status(500).json({ ok: false, message: 'Não foi possível enviar sua mensagem. Tente novamente ou entre em contato por e-mail.' });
  }
};

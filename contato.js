/* CONTATO — opção simples com mailto, sem servidor, API ou FormSubmit.
   O navegador abre o programa de e-mail do visitante. O envio NÃO é automático. */
(() => {
  'use strict';

  const formulario = document.getElementById('contato-form');
  const aviso = document.getElementById('contato-status');
  if (!formulario || !aviso) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;

    const nome = document.getElementById('contato-nome').value.trim();
    const email = document.getElementById('contato-email').value.trim();
    const mensagem = document.getElementById('contato-mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      aviso.hidden = false;
      aviso.textContent = 'Preencha seu nome, e-mail e mensagem antes de continuar.';
      return;
    }

    const assunto = `Contato pelo portfólio - ${nome}`;
    const corpo = [
      `Nome: ${nome}`,
      `E-mail para resposta: ${email}`,
      '',
      'Mensagem:',
      mensagem
    ].join('\n');

    const destinatario = 'luchensse@gmail.com';
    const url = `mailto:${destinatario}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

    aviso.hidden = false;
    aviso.textContent = 'Seu aplicativo de e-mail será aberto. Confira a mensagem e clique em Enviar nele. O formulário não envia automaticamente.';

    // Abre o aplicativo de e-mail escolhido no sistema (Outlook, Mail, Gmail configurado etc.).
    window.location.href = url;
  });
})();
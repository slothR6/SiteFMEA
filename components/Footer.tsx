export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="container flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} FMEA Engineering. Todos os direitos reservados.</p>
        <p>Engenharia aplicada para decisões estratégicas.</p>
      </div>
    </footer>
  );
}

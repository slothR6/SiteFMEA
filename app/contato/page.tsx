import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContatoPage() {
  return (
    <main className="bg-slate-50 py-20">
      <div className="container grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold">Entre em contato</h1>
          <p className="text-slate-600">
            Compartilhe o desafio técnico da sua operação. Nossa equipe retornará com um plano inicial de diagnóstico.
          </p>
        </div>
        <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Input placeholder="Nome" name="nome" required />
          <Input placeholder="E-mail corporativo" name="email" type="email" required />
          <Input placeholder="Empresa" name="empresa" required />
          <Textarea placeholder="Descreva o seu desafio" name="mensagem" required />
          <Button className="w-full">Enviar mensagem</Button>
        </form>
      </div>
    </main>
  );
}

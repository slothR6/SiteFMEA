import { AlertTriangle, Microscope, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data";

const icons = [AlertTriangle, Microscope, Workflow];

export function Services() {
  return (
    <section className="py-20">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Serviços de Engenharia Aplicada</h2>
          <p className="text-slate-600">Soluções técnicas para decisões estratégicas com segurança e previsibilidade.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index];
            return (
              <Card key={service.title} className="border-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <Icon className="h-10 w-10 text-[#0E7C66]" />
                  <CardTitle className="pt-4 text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { sectorsData } from "@/lib/data";

type Sector = keyof typeof sectorsData;

const sectors = Object.keys(sectorsData) as Sector[];

export function SectorsDashboard() {
  const [activeSector, setActiveSector] = useState<Sector>("Energia");

  return (
    <section className="bg-slate-50 py-20">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Dashboard de Setores</h2>
          <p className="text-slate-600">Visão comparativa de performance técnica por vertical de atuação.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeSector === sector ? "bg-[#0E7C66] text-white" : "bg-white text-slate-700"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        <motion.div
          key={activeSector}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[300px] rounded-2xl border border-slate-200 bg-white p-4 md:p-6"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sectorsData[activeSector]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#0E7C66" strokeWidth={3} dot={{ fill: "#0E7C66" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}

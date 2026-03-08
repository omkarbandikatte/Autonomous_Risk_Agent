"use client";

import { useState } from "react";
import { MOCK_SUPPLIERS } from "@/lib/data/mock-suppliers";
import { Button } from "@/components/ui/button";
import { Users, MapPin, TrendingUp, Upload, FileSpreadsheet, Plus, Globe, Search, ArrowRight, Zap, Target, Activity } from "lucide-react";
import { AddSupplierModal } from "@/components/dashboard/add-supplier-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function SuppliersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = (newSupplier: any) => {
    setSuppliers([newSupplier, ...suppliers]);
  };

  return (
    <div className="space-y-10 p-2 sm:p-6 lg:p-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-glow-purple" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Node Registry Alpha</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Supply Chain Universe</h1>
          <p className="text-sm font-bold text-muted-foreground/40 max-w-2xl mt-1">
            Global supplier mapping and dependency orchestration dashboard. Define the skeleton of your network.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-white/5 bg-white/2 hover:bg-white/5 font-black text-[10px] uppercase tracking-widest gap-2"
            onClick={() => alert('Feature incoming: Drag & Drop CSV/Excel processing')}
          >
            <Upload className="w-4 h-4 text-muted-foreground/40" />
            Collective Upload
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-white/5 bg-white/2 hover:bg-white/5 font-black text-[10px] uppercase tracking-widest gap-2"
            onClick={() => alert('API Integration: Fetching from ERP Systems')}
          >
            <Activity className="w-4 h-4 text-accent/60" />
            Sync ERP/API
          </Button>
          <Button
            className="h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-glow-purple/20 font-black text-[10px] uppercase tracking-widest gap-2 px-6"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Register Node
          </Button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Nodes", value: suppliers.length, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Geographical Units", value: new Set(suppliers.map(s => s.location)).size, icon: Globe, color: "text-accent", bg: "bg-accent/10" },
          { label: "Critical Dependencies", value: suppliers.filter(s => s.criticality === "high").length, icon: Target, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Active Connections", value: suppliers.reduce((acc, s) => acc + s.dependents.length, 0), icon: Activity, color: "text-green-500", bg: "bg-green-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-white/5 bg-white/2 p-6 backdrop-blur-3xl shadow-xl hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3.5 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Database Container */}
      <div className="rounded-4xl border border-white/5 bg-white/2 backdrop-blur-3xl shadow-2xl relative overflow-hidden group/container">
        <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-5">
          <FileSpreadsheet className="w-48 h-48 text-primary" />
        </div>

        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white/90">Supplier Intelligence Node</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 mt-1 px-0.5">Filtering across {suppliers.length} encrypted entities</p>
          </div>
          <div className="relative w-full md:w-80">
            <Input
              placeholder="Search by Name, Geo or Category..."
              className="h-12 rounded-2xl bg-white/3 border-white/5 font-bold pl-11 text-xs text-white/80 placeholder:text-muted-foreground/20"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/20" />
          </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Entity Protocol</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Category</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Node Status</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">Criticality</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Risk Index</th>
                <th className="py-5 px-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/2">
              <AnimatePresence>
                {filteredSuppliers.map((supplier, idx) => (
                  <motion.tr
                    key={supplier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/5 transition-colors group/row"
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 border border-white/5 flex items-center justify-center font-black text-xs text-primary/60 group-hover/row:scale-110 transition-transform">
                          {supplier.name.substring(0, 1)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white/90">{supplier.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe className="w-3 h-3 text-muted-foreground/40" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{supplier.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        {supplier.category}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-glow-${supplier.status === 'healthy' ? 'cyan' : 'purple'}`}
                          style={{ backgroundColor: supplier.status === 'healthy' ? '#22d3ee' : '#facc15' }} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${supplier.status === 'healthy' ? 'text-accent' : 'text-yellow-500'
                          }`}>
                          {supplier.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <div className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                        supplier.criticality === "high" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                          supplier.criticality === "medium" ? "bg-orange-500/10 border-orange-500/20 text-orange-500" :
                            "bg-green-500/10 border-green-500/20 text-green-500"
                      )}>
                        {supplier.criticality}
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex justify-between items-center px-0.5">
                          <span className="text-[8px] font-black uppercase text-muted-foreground/20">{supplier.riskScore}% Factor</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${supplier.riskScore}%` }}
                            className={`h-full ${supplier.riskScore > 60 ? "bg-red-500" :
                              supplier.riskScore > 40 ? "bg-orange-500" : "bg-green-500"
                              } shadow-glow-purple`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <Button variant="ghost" size="sm" className="rounded-xl font-black text-[9px] uppercase tracking-widest text-muted-foreground/40 hover:text-white hover:bg-white/5">
                        Analyze Deeply Node
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-white/2 border-t border-white/5 flex items-center justify-between relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 italic">Displaying {filteredSuppliers.length} of {suppliers.length} active nodes</p>
          <div className="flex gap-2">
            <Button disabled variant="outline" size="sm" className="rounded-xl border-white/5 bg-white/3 font-black text-[8px] uppercase px-4 opacity-40">Previous</Button>
            <Button disabled variant="outline" size="sm" className="rounded-xl border-white/5 bg-white/3 font-black text-[8px] uppercase px-4 opacity-40">Next Hub</Button>
          </div>
        </div>
      </div>

      <AddSupplierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSupplier}
      />
    </div>
  );
}

const cn = (...classes: any) => classes.filter(Boolean).join(' ');

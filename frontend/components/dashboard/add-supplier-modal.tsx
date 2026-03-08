"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Plus, Globe, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddSupplierModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (supplier: any) => void;
}

export function AddSupplierModal({ isOpen, onClose, onAdd }: AddSupplierModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        category: "Electronics",
        location: "",
        criticality: "medium",
        productCategories: "",
        annualVolume: "",
        leadTime: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd({
            ...formData,
            id: `SUP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            riskScore: 0,
            status: "healthy",
            dependents: [],
            dependencies: [],
            productCategories: formData.productCategories.split(',').map(s => s.trim()),
            annualVolume: Number(formData.annualVolume),
            leadTime: Number(formData.leadTime),
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-background border border-white/5 rounded-4xl shadow-2xl overflow-hidden glass-darker overflow-y-auto max-h-[90vh]"
                    >
                        <div className="p-8 border-b border-white/5 bg-white/2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                    <Plus className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight">Register New Supplier Node</h2>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Autonomous Network Integration</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground/40" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Supplier Name</Label>
                                    <Input
                                        required
                                        placeholder="e.g. NeoSystems Ltd"
                                        className="h-12 rounded-xl bg-white/5 border-white/5 font-bold"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Category</Label>
                                    <select
                                        className="w-full h-12 rounded-xl bg-white/5 border border-white/5 font-bold px-4 text-white appearance-none focus:outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {["Electronics", "Semiconductors", "Raw Materials", "Logistics", "Chemicals", "Energy"].map(c => (
                                            <option key={c} value={c} className="bg-background">{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Geographic Location</Label>
                                    <div className="relative">
                                        <Input
                                            required
                                            placeholder="e.g. Singapore"
                                            className="h-12 rounded-xl bg-white/5 border-white/5 font-bold pl-10"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        />
                                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Criticality Level</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {["low", "medium", "high"].map(level => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, criticality: level })}
                                                className={`h-11 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.criticality === level
                                                        ? "bg-primary border-primary text-white shadow-glow-purple/20"
                                                        : "bg-white/3 border-white/5 text-muted-foreground/40 hover:bg-white/5"
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Product Segments (Comma separated)</Label>
                                <div className="relative">
                                    <Input
                                        placeholder="e.g. Lithium-Ion, Batteries, Cooling Systems"
                                        className="h-12 rounded-xl bg-white/5 border-white/5 font-bold pl-10"
                                        value={formData.productCategories}
                                        onChange={e => setFormData({ ...formData, productCategories: e.target.value })}
                                    />
                                    <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Annual Volume ($)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5000000"
                                        className="h-12 rounded-xl bg-white/5 border-white/5 font-bold"
                                        value={formData.annualVolume}
                                        onChange={e => setFormData({ ...formData, annualVolume: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Avg Lead Time (Days)</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="e.g. 45"
                                            className="h-12 rounded-xl bg-white/5 border-white/5 font-bold pl-10"
                                            value={formData.leadTime}
                                            onChange={e => setFormData({ ...formData, leadTime: e.target.value })}
                                        />
                                        <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="flex-1 h-14 rounded-2xl border-white/5 bg-white/3 hover:bg-white/5 font-black text-xs uppercase tracking-widest"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black text-xs uppercase tracking-widest gap-2 shadow-glow-purple/20"
                                >
                                    <Save className="w-4 h-4" />
                                    Register Node
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

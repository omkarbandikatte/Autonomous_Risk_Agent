"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Shield, Globe, Database, Network } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SupplyGuardLogo } from "@/components/ui/logo";

export default function AuthPage() {
    const [step, setStep] = useState(1); // 1: Login/Sign-up choice, 2: Auth Details, 3: Onboarding
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        companyName: "",
        industry: "Manufacturing",
        role: "Supply Chain Manager",
    });

    const industries = ["Manufacturing", "Logistics", "Retail", "Healthcare", "Energy", "Automotive"];
    const roles = ["Supply Chain Manager", "Operations Manager", "Risk Analyst", "Admin", "Procurement Lead"];

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Finalize Onboarding
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-6 sm:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-md w-full relative z-10">
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="group mb-6">
                        <SupplyGuardLogo imageClassName="h-32 w-32" />
                    </Link>
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-white tracking-tighter">
                            {step === 1 ? "Initialize Protocol" : step === 2 ? "Identity Verification" : "Autonomous Setup"}
                        </h1>
                        <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest mt-2 px-10">
                            {step === 1 ? "Secure access to the neural network" : step === 2 ? "Verifying authorized credentials" : "Configuring your supply node"}
                        </p>
                    </div>
                </div>

                <div className="p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant={!isSignUp ? "default" : "outline"}
                                        className="h-14 rounded-2xl font-black text-xs uppercase"
                                        onClick={() => setIsSignUp(false)}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant={isSignUp ? "default" : "outline"}
                                        className="h-14 rounded-2xl font-black text-xs uppercase"
                                        onClick={() => setIsSignUp(true)}
                                    >
                                        Sign Up
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest px-1">Email</Label>
                                        <Input
                                            placeholder="email@company.com"
                                            className="h-12 rounded-xl bg-white/5 border-white/5 font-bold"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest px-1">Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            className="h-12 rounded-xl bg-white/5 border-white/5 font-bold"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest glow-purple/20 gap-2"
                                    onClick={handleNext}
                                >
                                    {isSignUp ? "Create Account" : "Access Network"}
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 py-4"
                            >
                                <div className="flex flex-col items-center gap-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse relative">
                                        <Shield className="w-10 h-10 text-primary" />
                                        <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black mb-2 px-6 tracking-tight leading-7">Authorized Personnel Detected</h3>
                                        <p className="text-xs font-bold text-muted-foreground/60 px-6">Your credentials match established biometric signatures.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {["Multi-Factor Auth: Active", "Encryption: AES-256", "Protocol: HyperSync"].map((stat, i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-purple" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/80">{stat}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest glow-purple/20 gap-2"
                                    onClick={handleNext}
                                >
                                    Confirm Identity
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest px-1">Entity Name</Label>
                                        <Input
                                            placeholder="Titanium Logistics Corp"
                                            className="h-12 rounded-xl bg-white/5 border-white/5 font-bold"
                                            value={formData.companyName}
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest px-1">Industry Type</Label>
                                            <select
                                                className="w-full h-12 rounded-xl bg-white/5 border border-white/5 font-bold px-4 text-white appearance-none h-14 focus:outline-none"
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            >
                                                {industries.map(ind => <option key={ind} value={ind} className="bg-background text-foreground">{ind}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest px-1">Node Role</Label>
                                            <select
                                                className="w-full h-12 rounded-xl bg-white/5 border border-white/5 font-bold px-4 text-white appearance-none h-14 focus:outline-none"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            >
                                                {roles.map(role => <option key={role} value={role} className="bg-background text-foreground">{role}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 py-2">
                                    {[Globe, Database, Network].map((Icon, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/3 border border-white/5">
                                            <Icon className="w-4 h-4 text-primary/60" />
                                            <div className="w-4 h-1 bg-primary/20 rounded-full overflow-hidden">
                                                <motion.div
                                                    animate={{ width: ["0%", "100%", "0%"] }}
                                                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest glow-purple/20 gap-2"
                                    onClick={handleNext}
                                >
                                    Synchronize Data
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer info */}
                <div className="mt-8 flex justify-between items-center px-4">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors italic">
                            {"<"} Back
                        </button>
                    ) : (
                        <div />
                    )}
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/20 italic">
                        Step {step} of 3
                    </p>
                </div>
            </div>
        </div>
    );
}

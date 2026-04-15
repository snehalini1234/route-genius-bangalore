import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock, Wallet, Lightbulb, Leaf, Footprints, Car, Bus, Train, Bike,
  ArrowRight, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const transportModes = [
  { id: "walk", label: "Walking", icon: Footprints },
  { id: "auto", label: "Auto/Cab", icon: Car },
  { id: "bus", label: "BMTC Bus", icon: Bus },
  { id: "metro", label: "Namma Metro", icon: Train },
  { id: "cycle", label: "Cycling", icon: Bike },
];

const Preferences = () => {
  const navigate = useNavigate();
  const [timePriority, setTimePriority] = useState([50]);
  const [costPriority, setCostPriority] = useState([50]);
  const [safetyPriority, setSafetyPriority] = useState([70]);
  const [preferWellLit, setPreferWellLit] = useState(true);
  const [showCarbon, setShowCarbon] = useState(true);
  const [selectedModes, setSelectedModes] = useState<string[]>(["walk", "auto", "metro"]);

  const toggleMode = (id: string) => {
    setSelectedModes((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: "var(--gradient-dark)" }}>
      <div className="max-w-2xl mx-auto">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Your Route Preferences</h1>
          <p className="text-muted-foreground">Tell us how you like to travel in Bangalore</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          {/* Transport Modes */}
          <motion.div variants={item} className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Preferred Transport Modes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {transportModes.map((mode) => {
                const active = selectedModes.includes(mode.id);
                return (
                  <button
                    key={mode.id}
                    onClick={() => toggleMode(mode.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 bg-muted/30 text-muted-foreground hover:border-border"
                    }`}
                  >
                    <mode.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Priority Sliders */}
          <motion.div variants={item} className="glass rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Priority Settings</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <Label className="text-foreground/80">Time Priority</Label>
                </div>
                <span className="text-sm text-primary font-medium">{timePriority[0]}%</span>
              </div>
              <Slider value={timePriority} onValueChange={setTimePriority} max={100} step={5} className="w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" />
                  <Label className="text-foreground/80">Cost Priority</Label>
                </div>
                <span className="text-sm text-primary font-medium">{costPriority[0]}%</span>
              </div>
              <Slider value={costPriority} onValueChange={setCostPriority} max={100} step={5} className="w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <Label className="text-foreground/80">Safety Priority</Label>
                </div>
                <span className="text-sm text-primary font-medium">{safetyPriority[0]}%</span>
              </div>
              <Slider value={safetyPriority} onValueChange={setSafetyPriority} max={100} step={5} className="w-full" />
            </div>
          </motion.div>

          {/* Toggle Options */}
          <motion.div variants={item} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-medium text-foreground">Well-Lit Routes</p>
                  <p className="text-sm text-muted-foreground">Prefer streets with better lighting</p>
                </div>
              </div>
              <Switch checked={preferWellLit} onCheckedChange={setPreferWellLit} />
            </div>

            <div className="h-px bg-border/50" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Carbon Tracking</p>
                  <p className="text-sm text-muted-foreground">Show emissions & suggest greener options</p>
                </div>
              </div>
              <Switch checked={showCarbon} onCheckedChange={setShowCarbon} />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Button
              onClick={handleContinue}
              className="w-full gradient-bg text-primary-foreground font-semibold h-12 text-base hover:opacity-90 transition-opacity"
            >
              Continue to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preferences;

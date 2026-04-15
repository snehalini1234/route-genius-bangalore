import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Navigation, Footprints, Car, Train, Bus, Bike, Clock, Wallet,
  Leaf, ArrowRight, RotateCcw, Zap, Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RouteMap from "@/components/RouteMap";

interface RouteSegment {
  mode: string;
  icon: React.ElementType;
  instruction: string;
  distance: string;
  duration: string;
  cost: number;
  carbon: number;
}

interface RouteSuggestion {
  id: string;
  label: string;
  tag: string;
  totalTime: string;
  totalCost: number;
  totalCarbon: number;
  segments: RouteSegment[];
  waitTime?: string;
}

const mockRoutes: RouteSuggestion[] = [
  {
    id: "1",
    label: "Fastest Multi-Modal",
    tag: "AI Recommended",
    totalTime: "28 min",
    totalCost: 85,
    totalCarbon: 120,
    waitTime: "Ola ~4 min wait",
    segments: [
      { mode: "Walk", icon: Footprints, instruction: "Walk to 12th Main", distance: "300m", duration: "4 min", cost: 0, carbon: 0 },
      { mode: "Auto", icon: Car, instruction: "Auto to Indiranagar Metro", distance: "3.2 km", duration: "12 min", cost: 65, carbon: 95 },
      { mode: "Metro", icon: Train, instruction: "Metro to MG Road", distance: "4.5 km", duration: "8 min", cost: 20, carbon: 15 },
      { mode: "Walk", icon: Footprints, instruction: "Walk shortcut to destination", distance: "400m", duration: "4 min", cost: 0, carbon: 0 },
    ],
  },
  {
    id: "2",
    label: "Budget Friendly",
    tag: "Lowest Cost",
    totalTime: "45 min",
    totalCost: 30,
    totalCarbon: 60,
    segments: [
      { mode: "Walk", icon: Footprints, instruction: "Walk to bus stop", distance: "500m", duration: "6 min", cost: 0, carbon: 0 },
      { mode: "Bus", icon: Bus, instruction: "BMTC 500D to MG Road", distance: "7 km", duration: "30 min", cost: 30, carbon: 60 },
      { mode: "Walk", icon: Footprints, instruction: "Walk to destination", distance: "600m", duration: "9 min", cost: 0, carbon: 0 },
    ],
  },
  {
    id: "3",
    label: "Green Route",
    tag: "Lowest Carbon",
    totalTime: "35 min",
    totalCost: 10,
    totalCarbon: 8,
    segments: [
      { mode: "Cycle", icon: Bike, instruction: "Yulu bike to Metro", distance: "2 km", duration: "10 min", cost: 10, carbon: 3 },
      { mode: "Metro", icon: Train, instruction: "Metro to MG Road", distance: "5 km", duration: "10 min", cost: 0, carbon: 5 },
      { mode: "Walk", icon: Footprints, instruction: "Walk to destination", distance: "800m", duration: "15 min", cost: 0, carbon: 0 },
    ],
  },
];

const Dashboard = () => {
  const [from, setFrom] = useState("Koramangala 4th Block");
  const [to, setTo] = useState("MG Road");
  const [routes, setRoutes] = useState<RouteSuggestion[] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setSelectedRoute(null);
    setTimeout(() => {
      setRoutes(mockRoutes);
      setLoading(false);
    }, 1200);
  };

  const selected = routes?.find((r) => r.id === selectedRoute);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-primary" />
            <Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className="pl-10 bg-muted/50 border-border/50" />
          </div>
          <div className="flex-1 relative">
            <Navigation className="absolute left-3 top-3 w-4 h-4 text-accent" />
            <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className="pl-10 bg-muted/50 border-border/50" />
          </div>
          <Button onClick={handleSearch} disabled={loading} className="gradient-bg text-primary-foreground font-semibold hover:opacity-90">
            {loading ? <RotateCcw className="w-4 h-4 animate-spin" /> : <>Find Routes <ArrowRight className="ml-2 w-4 h-4" /></>}
          </Button>
        </div>
      </motion.div>

      {/* Routes */}
      <AnimatePresence>
        {routes && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4 md:grid-cols-3">
            {routes.map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedRoute(route.id)}
                className={`glass rounded-2xl p-5 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedRoute === route.id ? "border-primary glow-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">{route.label}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    route.tag === "AI Recommended" ? "bg-primary/20 text-primary" :
                    route.tag === "Lowest Cost" ? "bg-accent/20 text-accent" :
                    "bg-secondary text-secondary-foreground"
                  }`}>{route.tag}</span>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {route.totalTime}
                  </div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Wallet className="w-3.5 h-3.5 text-primary" />
                    ₹{route.totalCost}
                  </div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                    {route.totalCarbon}g
                  </div>
                </div>

                {route.waitTime && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Timer className="w-3 h-3" />
                    {route.waitTime}
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  {route.segments.map((seg, j) => (
                    <div key={j} className="flex items-center gap-1">
                      <div className={`p-1.5 rounded-lg ${j === 0 ? "bg-primary/20" : "bg-muted"}`}>
                        <seg.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {j < route.segments.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Route Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{selected.label} — Step by Step</h2>
            </div>

            <div className="space-y-0">
              {selected.segments.map((seg, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="p-2 rounded-xl bg-primary/15">
                      <seg.icon className="w-5 h-5 text-primary" />
                    </div>
                    {i < selected.segments.length - 1 && (
                      <div className="w-px flex-1 bg-border/50 my-1" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-foreground text-sm">{seg.instruction}</p>
                    <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{seg.distance}</span>
                      <span>{seg.duration}</span>
                      {seg.cost > 0 && <span>₹{seg.cost}</span>}
                      {seg.carbon > 0 && <span>{seg.carbon}g CO₂</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!routes && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-muted/50 mb-4">
            <Map className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Enter your start and destination to find the smartest route</p>
        </motion.div>
      )}
    </div>
  );
};

const Map = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

export default Dashboard;

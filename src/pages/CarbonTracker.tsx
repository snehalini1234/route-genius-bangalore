import { motion } from "framer-motion";
import { Leaf, TrendingDown, Award, Footprints, Car, Train, Bus, Bike } from "lucide-react";

const stats = [
  { label: "CO₂ Saved This Week", value: "1.2 kg", icon: TrendingDown, color: "text-primary" },
  { label: "Green Routes Taken", value: "8", icon: Leaf, color: "text-accent" },
  { label: "Eco Rank", value: "Top 15%", icon: Award, color: "text-primary" },
];

const modeEmissions = [
  { mode: "Walking", icon: Footprints, emission: "0 g/km", bar: 0 },
  { mode: "Cycling", icon: Bike, emission: "3 g/km", bar: 5 },
  { mode: "Metro", icon: Train, emission: "15 g/km", bar: 15 },
  { mode: "Bus", icon: Bus, emission: "45 g/km", bar: 35 },
  { mode: "Auto/Cab", icon: Car, emission: "120 g/km", bar: 85 },
];

const CarbonTracker = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Carbon Tracker</h1>
        <p className="text-muted-foreground text-sm">Track and reduce your travel emissions</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
          >
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-5">Emissions by Transport Mode</h2>
        <div className="space-y-4">
          {modeEmissions.map((item) => (
            <div key={item.mode} className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-primary/15">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item.mode}</span>
                  <span className="text-sm text-muted-foreground">{item.emission}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.bar}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full rounded-full gradient-bg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6 border-primary/30"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-primary/15 animate-pulse-glow">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">AI Tip</h3>
            <p className="text-sm text-muted-foreground">
              Switching your Koramangala → MG Road commute from auto to Metro + walk saves{" "}
              <span className="text-primary font-medium">~95g CO₂</span> per trip. That's{" "}
              <span className="text-primary font-medium">2 kg/month</span> — equivalent to planting a small tree! 🌱
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarbonTracker;

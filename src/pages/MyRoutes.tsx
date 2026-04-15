import { motion } from "framer-motion";
import { Clock, Wallet, Leaf, Footprints, Car, Train, ArrowRight, Star } from "lucide-react";

const savedRoutes = [
  {
    id: "1",
    from: "Koramangala",
    to: "MG Road",
    time: "28 min",
    cost: 85,
    carbon: 120,
    modes: ["Walk", "Auto", "Metro", "Walk"],
    starred: true,
    lastUsed: "Today",
  },
  {
    id: "2",
    from: "HSR Layout",
    to: "Whitefield",
    time: "55 min",
    cost: 45,
    carbon: 80,
    modes: ["Bus", "Metro", "Walk"],
    starred: false,
    lastUsed: "Yesterday",
  },
  {
    id: "3",
    from: "Jayanagar",
    to: "Electronic City",
    time: "40 min",
    cost: 120,
    carbon: 200,
    modes: ["Auto", "Metro"],
    starred: true,
    lastUsed: "2 days ago",
  },
];

const MyRoutes = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">My Routes</h1>
        <p className="text-muted-foreground text-sm">Your saved and recent routes</p>
      </motion.div>

      <div className="space-y-3">
        {savedRoutes.map((route, i) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 cursor-pointer hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  {route.from} <ArrowRight className="w-3.5 h-3.5 text-primary" /> {route.to}
                </div>
                <span className="text-xs text-muted-foreground">{route.lastUsed}</span>
              </div>
              <Star className={`w-4 h-4 ${route.starred ? "text-accent fill-accent" : "text-muted-foreground"}`} />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" /> {route.time}
              </div>
              <div className="flex items-center gap-1 text-foreground">
                <Wallet className="w-3.5 h-3.5 text-primary" /> ₹{route.cost}
              </div>
              <div className="flex items-center gap-1 text-foreground">
                <Leaf className="w-3.5 h-3.5 text-primary" /> {route.carbon}g
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyRoutes;

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, MapPin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [liveTracking, setLiveTracking] = useState(true);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Profile</h2>
        </div>
        <div className="space-y-3">
          <div>
            <Label className="text-foreground/80 text-sm">Name</Label>
            <Input defaultValue="Bangalore Commuter" className="bg-muted/50 border-border/50 mt-1" />
          </div>
          <div>
            <Label className="text-foreground/80 text-sm">Home Location</Label>
            <Input defaultValue="Koramangala 4th Block" className="bg-muted/50 border-border/50 mt-1" />
          </div>
          <div>
            <Label className="text-foreground/80 text-sm">Work Location</Label>
            <Input defaultValue="MG Road" className="bg-muted/50 border-border/50 mt-1" />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Route Alerts</p>
            <p className="text-xs text-muted-foreground">Get notified about delays & better routes</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Live Tracking</p>
            <p className="text-xs text-muted-foreground">Share location for real-time suggestions</p>
          </div>
          <Switch checked={liveTracking} onCheckedChange={setLiveTracking} />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Button className="gradient-bg text-primary-foreground font-semibold hover:opacity-90">
          Save Changes
        </Button>
      </motion.div>
    </div>
  );
};

export default SettingsPage;

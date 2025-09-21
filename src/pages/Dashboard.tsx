import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, UserCheck } from "lucide-react";
import TouristRegistration from "@/components/TouristRegistration";
import AgentDashboard from "@/components/AgentDashboard";

const Dashboard = () => {
  const [userType, setUserType] = useState<'tourist' | 'agent' | null>(null);

  if (userType === 'tourist') {
    return <TouristRegistration />;
  }

  if (userType === 'agent') {
    return <AgentDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Tourism Tracker
          </h1>
          <p className="text-muted-foreground mb-8">
            Secure and smart tourism monitoring system
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => setUserType('tourist')}
            className="w-full h-16 bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg"
          >
            <Users className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Tourist Registration</div>
              <div className="text-sm opacity-90">Register and get your QR code</div>
            </div>
          </Button>

          <Button
            onClick={() => setUserType('agent')}
            variant="outline"
            className="w-full h-16 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-lg"
          >
            <UserCheck className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Agent Dashboard</div>
              <div className="text-sm text-muted-foreground">Monitor and assist tourists</div>
            </div>
          </Button>
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-success bg-success/10">
              <Shield className="w-3 h-3 mr-1" />
              Secure
            </Badge>
            <Badge variant="secondary" className="text-primary bg-primary/10">
              Real-time
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Powered by advanced geofencing and QR technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
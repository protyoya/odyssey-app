import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle, 
  X,
  Siren
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: 'sos' | 'geofence' | 'emergency';
  touristName: string;
  message: string;
  location: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
}

interface CriticalAlertsProps {
  compact?: boolean;
}

const CriticalAlerts: React.FC<CriticalAlertsProps> = ({ compact = false }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { toast } = useToast();

  // Mock alerts data
  useEffect(() => {
    const mockAlerts: Alert[] = [
      {
        id: "1",
        type: "sos",
        touristName: "Michael Brown",
        message: "Emergency assistance requested - Lost and unable to find way back",
        location: "Barcelona Old Town, Spain",
        timestamp: "2 minutes ago",
        priority: "high",
        status: "active"
      },
      {
        id: "2",
        type: "geofence",
        touristName: "Emma Johnson",
        message: "Tourist moved outside designated safe zone",
        location: "Near Colosseum, Rome",
        timestamp: "5 minutes ago",
        priority: "medium",
        status: "acknowledged"
      },
      {
        id: "3",
        type: "emergency",
        touristName: "Sarah Davis",
        message: "Medical emergency - Requesting immediate assistance",
        location: "Amsterdam Central, Netherlands",
        timestamp: "12 minutes ago",
        priority: "high",
        status: "resolved"
      },
      {
        id: "4",
        type: "geofence",
        touristName: "David Wilson",
        message: "Approaching restricted area boundary",
        location: "Checkpoint Charlie, Berlin",
        timestamp: "18 minutes ago",
        priority: "low",
        status: "active"
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
      )
    );
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged",
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: 'resolved' } : alert
      )
    );
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved",
    });
  };

  const handleDismiss = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.filter(alert => alert.id !== alertId)
    );
    toast({
      title: "Alert Dismissed",
      description: "Alert has been removed from the list",
    });
  };

  const getAlertIcon = (type: string, priority: string) => {
    if (priority === 'high') {
      return <Siren className="w-5 h-5 text-destructive animate-pulse" />;
    }
    switch (type) {
      case 'sos':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'geofence':
        return <MapPin className="w-5 h-5 text-warning" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="animate-pulse">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-warning text-warning-foreground">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const displayAlerts = compact ? activeAlerts.slice(0, 3) : alerts;

  if (compact) {
    return (
      <div className="space-y-3">
        {displayAlerts.length === 0 ? (
          <div className="text-center py-4">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No active alerts</p>
          </div>
        ) : (
          displayAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-destructive shadow-card">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    {getAlertIcon(alert.type, alert.priority)}
                    <Button
                      onClick={() => handleDismiss(alert.id)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{alert.touristName}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {getPriorityBadge(alert.priority)}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        
        {activeAlerts.length > 3 && (
          <div className="text-center pt-2">
            <span className="text-xs text-muted-foreground">
              +{activeAlerts.length - 3} more alerts
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">All Clear</h3>
          <p className="text-sm text-muted-foreground">No critical alerts at this time</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <Card key={alert.id} className={`shadow-card border-l-4 ${
            alert.priority === 'high' ? 'border-l-destructive' : 
            alert.priority === 'medium' ? 'border-l-warning' : 'border-l-muted'
          }`}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type, alert.priority)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{alert.touristName}</h4>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(alert.status)}
                    <Button
                      onClick={() => handleDismiss(alert.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {alert.status === 'active' && (
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button
                      onClick={() => handleAcknowledge(alert.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Acknowledge
                    </Button>
                    <Button
                      onClick={() => handleResolve(alert.id)}
                      variant="default"
                      size="sm"
                      className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:border-primary"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CriticalAlerts;
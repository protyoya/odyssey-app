import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Phone, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyButtonProps {
  touristName: string;
  location: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ touristName, location }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleEmergency = () => {
    setShowForm(true);
  };

  const handleSubmitSOS = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please describe your emergency situation",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate sending SOS alert
    setTimeout(() => {
      // Store in localStorage for the agent dashboard to pick up
      const existingAlerts = JSON.parse(localStorage.getItem('sosAlerts') || '[]');
      const newAlert = {
        id: Date.now().toString(),
        type: 'sos',
        touristName,
        message,
        location,
        timestamp: new Date().toISOString(),
        priority: 'high',
        status: 'active'
      };
      
      existingAlerts.unshift(newAlert);
      localStorage.setItem('sosAlerts', JSON.stringify(existingAlerts));

      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowForm(false);

      toast({
        title: "SOS Alert Sent",
        description: "Emergency services have been notified. Help is on the way.",
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <Card className="border-success shadow-card">
        <CardHeader className="bg-success/10 rounded-t-lg">
          <CardTitle className="text-success flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            SOS Alert Sent
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Badge className="bg-success text-success-foreground animate-pulse">
              Emergency Services Notified
            </Badge>
            <p className="text-sm text-muted-foreground">
              Your emergency alert has been sent to local authorities and our monitoring team. 
              Help is on the way. Stay calm and in a safe location if possible.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-success text-success-foreground hover:bg-success/90"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Alert
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showForm) {
    return (
      <Card className="border-destructive shadow-card animate-pulse">
        <CardHeader className="bg-destructive/10 rounded-t-lg">
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency SOS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="emergency-message" className="text-foreground font-medium">
                Describe your emergency
              </Label>
              <Textarea
                id="emergency-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide details about your emergency situation, location, and what help you need..."
                className="mt-2 min-h-[100px] border-destructive/30 focus:border-destructive"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {message.length}/500 characters
              </div>
            </div>

            <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
              <p className="text-xs text-warning">
                ⚠️ This will immediately alert emergency services and our monitoring team.
                Only use this button in genuine emergency situations.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSubmitSOS}
                disabled={isSubmitting || !message.trim()}
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isSubmitting ? (
                  "Sending Alert..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send SOS Alert
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Emergency Assistance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            In case of emergency, press the button below to immediately alert authorities and our monitoring team.
          </p>
          
          <Button
            onClick={handleEmergency}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-glow transition-all duration-300 h-14 text-lg font-semibold animate-pulse"
          >
            <Phone className="w-6 h-6 mr-3" />
            EMERGENCY SOS
          </Button>

          <div className="text-center">
            <Badge variant="outline" className="text-muted-foreground">
              24/7 Emergency Response
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyButton;
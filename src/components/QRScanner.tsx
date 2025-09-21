import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Scan, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScan: (touristData: any) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState<'camera' | 'upload' | null>(null);
  const [manualData, setManualData] = useState("");
  const { toast } = useToast();

  // Simulate QR scanning
  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockTouristData = {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1-555-0123",
        passport: "AB123456789",
        destination: "Paris, France",
        duration: "7 days"
      };
      
      onScan(mockTouristData);
      setIsScanning(false);
      setScanMethod(null);
      
      toast({
        title: "QR Code Scanned Successfully",
        description: "Tourist information retrieved",
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd process the uploaded QR code image
      simulateScan();
    }
  };

  const handleManualEntry = () => {
    try {
      const touristData = JSON.parse(manualData);
      onScan(touristData);
      setManualData("");
      toast({
        title: "Data Parsed Successfully",
        description: "Tourist information loaded",
      });
    } catch (error) {
      toast({
        title: "Invalid Data Format",
        description: "Please enter valid JSON data",
        variant: "destructive",
      });
    }
  };

  if (isScanning) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="relative mx-auto w-32 h-32 border-2 border-primary rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 animate-pulse"></div>
          <div className="absolute inset-2 border border-primary/50 rounded animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <Scan className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Scanning QR Code...</h3>
          <p className="text-sm text-muted-foreground">Please hold the code steady</p>
          <Badge variant="secondary" className="text-primary">
            <Camera className="w-3 h-3 mr-1" />
            Camera Active
          </Badge>
        </div>
        
        <Button 
          onClick={() => setIsScanning(false)}
          variant="outline"
          size="sm"
        >
          Cancel
        </Button>
      </div>
    );
  }

  if (!scanMethod) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Scan Tourist QR Code</h3>
          <p className="text-sm text-muted-foreground">Choose a scanning method</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => setScanMethod('camera')}
            className="h-24 bg-gradient-hero hover:shadow-glow transition-all duration-300 flex-col"
          >
            <Camera className="w-8 h-8 mb-2" />
            <span>Use Camera</span>
          </Button>
          
          <Button
            onClick={() => setScanMethod('upload')}
            variant="outline"
            className="h-24 border-primary/30 hover:border-primary transition-smooth flex-col"
          >
            <Upload className="w-8 h-8 mb-2" />
            <span>Upload Image</span>
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="manual-data" className="text-foreground font-medium">
            Paste QR Code Data (JSON)
          </Label>
          <Input
            id="manual-data"
            value={manualData}
            onChange={(e) => setManualData(e.target.value)}
            placeholder='{"name": "John Doe", "email": "...", ...}'
            className="font-mono text-xs"
          />
          <Button
            onClick={handleManualEntry}
            disabled={!manualData.trim()}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Parse Data
          </Button>
        </div>
      </div>
    );
  }

  if (scanMethod === 'camera') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Camera Scanner</h3>
          
          {/* Camera preview simulation */}
          <div className="relative mx-auto w-64 h-64 border-2 border-primary rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="absolute inset-4 border border-primary/30 rounded-lg">
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary/50" />
              </div>
            </div>
            
            {/* Scanning overlay */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-primary animate-pulse"></div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Position the QR code within the frame
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={simulateScan}
            className="flex-1 bg-gradient-hero hover:shadow-glow transition-all duration-300"
          >
            <Scan className="w-4 h-4 mr-2" />
            Start Scanning
          </Button>
          <Button
            onClick={() => setScanMethod(null)}
            variant="outline"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  if (scanMethod === 'upload') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload QR Code Image</h3>
          <p className="text-sm text-muted-foreground">Select an image file containing the QR code</p>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <Label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-primary hover:text-primary/80 font-medium">
              Choose file
            </span>
            <span className="text-muted-foreground"> or drag and drop</span>
          </Label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>

        <Button
          onClick={() => setScanMethod(null)}
          variant="outline"
          className="w-full"
        >
          Back to Options
        </Button>
      </div>
    );
  }

  return null;
};

export default QRScanner;
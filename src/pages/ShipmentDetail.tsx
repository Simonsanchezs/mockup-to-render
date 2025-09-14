import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const ShipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("En tránsito");

  // Mock data - in real app would fetch based on id
  const shipment = {
    id: "ENV-001",
    origin: "Medellín",
    destination: "Bogotá",
    priority: "Alta",
    status: "En tránsito",
    weight: "25 kg",
  };

  const handleBack = () => {
    navigate("/shipments");
  };

  const handleUpdateStatus = () => {
    // Mock update functionality
    console.log("Updating status to:", selectedStatus);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold">Detalle de envío</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Detalle del envío {shipment.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Origen:</h3>
                      <p className="text-muted-foreground">{shipment.origin}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Prioridad:</h3>
                      <p className="text-muted-foreground">{shipment.priority}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Peso:</h3>
                      <p className="text-muted-foreground">{shipment.weight}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Destino:</h3>
                      <p className="text-muted-foreground">{shipment.destination}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Estado:</h3>
                      <Badge className="bg-status-transit text-white" variant="secondary">
                        {shipment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Update Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Actualizar Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En tránsito">En tránsito</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Novedad">Novedad</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="w-full" onClick={handleUpdateStatus}>
                  Actualizar Estado
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShipmentDetail;
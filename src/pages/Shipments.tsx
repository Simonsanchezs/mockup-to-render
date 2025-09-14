import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const Shipments = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  const [shipments] = useState([
    {
      id: "ENV-001",
      origin: "Medellín",
      destination: "Bogotá",
      weight: "25 kg",
      priority: "Alta",
      status: "En tránsito",
      statusColor: "bg-status-transit",
    },
    {
      id: "ENV-002",
      origin: "Medellín",
      destination: "Cali",
      weight: "18 kg",
      priority: "Normal",
      status: "Pendiente",
      statusColor: "bg-status-pending",
    },
    {
      id: "ENV-003",
      origin: "Cali",
      destination: "Bogotá",
      weight: "32 kg",
      priority: "Normal",
      status: "Entregado",
      statusColor: "bg-status-delivered",
    },
    {
      id: "ENV-004",
      origin: "Medellín",
      destination: "Barranquilla",
      weight: "12 kg",
      priority: "Normal",
      status: "Novedad",
      statusColor: "bg-status-novedad",
    },
  ]);

  const handleEdit = (shipment: any) => {
    setSelectedShipment(shipment);
    setShowEditModal(true);
  };

  const handleView = (shipmentId: string) => {
    navigate(`/shipments/${shipmentId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de envíos</h1>
          <Button onClick={() => setShowCreateModal(true)} className="bg-status-delivered hover:bg-status-delivered/90">
            <Plus className="w-4 h-4 mr-2" />
            Crear envío
          </Button>
        </div>

        <Card className="shadow-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.weight}</TableCell>
                    <TableCell>{shipment.priority}</TableCell>
                    <TableCell>
                      <Badge className={`text-white ${shipment.statusColor}`} variant="secondary">
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(shipment.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(shipment)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Create Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Envío</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <Input placeholder="Ciudad de origen" />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <Input placeholder="Ciudad de destino" />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="transito">En tránsito</SelectItem>
                    <SelectItem value="entregado">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Peso</Label>
                <Input placeholder="Peso en kg" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowCreateModal(false)}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar envío {selectedShipment?.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <Input defaultValue={selectedShipment?.origin} />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <Input defaultValue={selectedShipment?.destination} />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Input defaultValue={selectedShipment?.priority} />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input defaultValue={selectedShipment?.status} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Peso</Label>
                <Input defaultValue={selectedShipment?.weight} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowEditModal(false)}>
                Actualizar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Shipments;
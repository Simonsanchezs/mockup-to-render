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
import { CitySelector } from "@/components/CitySelector";
import Layout from "@/components/Layout";

const Shipments = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  // Form states for create modal
  const [createForm, setCreateForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    priority: "Normal",
  });

  // Form states for edit modal
  const [editForm, setEditForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    priority: "",
    status: "",
  });

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
    setEditForm({
      origin: shipment.origin,
      destination: shipment.destination,
      weight: shipment.weight,
      priority: shipment.priority,
      status: shipment.status,
    });
    setShowEditModal(true);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
    setCreateForm({
      origin: "",
      destination: "",
      weight: "",
      priority: "Normal",
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditForm({
      origin: "",
      destination: "",
      weight: "",
      priority: "",
      status: "",
    });
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Envío</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <CitySelector
                  value={createForm.origin}
                  onValueChange={(value) => setCreateForm({ ...createForm, origin: value })}
                  placeholder="Seleccionar ciudad de origen"
                />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <CitySelector
                  value={createForm.destination}
                  onValueChange={(value) => setCreateForm({ ...createForm, destination: value })}
                  placeholder="Seleccionar ciudad de destino"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select
                  value={createForm.priority}
                  onValueChange={(value) => setCreateForm({ ...createForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground">Pendiente (predeterminado)</span>
                </div>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Peso</Label>
                <Input
                  placeholder="Peso en kg"
                  value={createForm.weight}
                  onChange={(e) => setCreateForm({ ...createForm, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCreateModalClose}>
                Cancelar
              </Button>
              <Button onClick={handleCreateModalClose}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar envío {selectedShipment?.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Origen</Label>
                <CitySelector
                  value={editForm.origin}
                  onValueChange={(value) => setEditForm({ ...editForm, origin: value })}
                  placeholder="Seleccionar ciudad de origen"
                />
              </div>
              <div className="space-y-2">
                <Label>Destino</Label>
                <CitySelector
                  value={editForm.destination}
                  onValueChange={(value) => setEditForm({ ...editForm, destination: value })}
                  placeholder="Seleccionar ciudad de destino"
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridad</Label>
                <Select
                  value={editForm.priority}
                  onValueChange={(value) => setEditForm({ ...editForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En tránsito">En tránsito</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="Novedad">Novedad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Peso</Label>
                <Input
                  placeholder="Peso en kg"
                  value={editForm.weight}
                  onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleEditModalClose}>
                Cancelar
              </Button>
              <Button onClick={handleEditModalClose}>
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
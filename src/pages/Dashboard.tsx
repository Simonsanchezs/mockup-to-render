import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const metrics = [
    { title: "Total", value: "40", subtitle: "Envíos Totales", variant: "default" },
    { title: "Pendientes", value: "20", subtitle: "Por procesar", variant: "secondary" },
    { title: "En tránsito", value: "6", subtitle: "En camino", variant: "default" },
    { title: "En novedad", value: "2", subtitle: "Con inconveniente", variant: "secondary" },
    { title: "Entregados", value: "12", subtitle: "Completados", variant: "default" },
  ];

  const recentShipments = [
    { id: "ENV-001", route: "Medellín → Bogotá", status: "En tránsito", statusColor: "bg-status-transit" },
    { id: "ENV-002", route: "Medellín → Cali", status: "Pendiente", statusColor: "bg-status-pending" },
    { id: "ENV-003", route: "Cali → Bogotá", status: "Entregado", statusColor: "bg-status-delivered" },
    { id: "ENV-004", route: "Medellín → Barranquilla", status: "Novedad", statusColor: "bg-status-novedad" },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.subtitle}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Shipments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Envíos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{shipment.id}</div>
                    <div className="text-sm text-muted-foreground">{shipment.route}</div>
                  </div>
                  
                  <Badge 
                    className={`text-white ${shipment.statusColor}`}
                    variant="secondary"
                  >
                    {shipment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
"use client"

import { useState } from 'react'
import { 
  BarChart3, 
  Home, 
  Users, 
  ShoppingCart, 
  Settings, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Bed,
  Bath,
  Square,
  TrendingUp,
  DollarSign,
  Calendar,
  Bell,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DashboardProps {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddProperty, setShowAddProperty] = useState(false)

  const properties = [
    {
      id: 1,
      title: "Apartamento Luxuoso no Centro",
      price: 850000,
      address: "Rua das Flores, 123 - Centro",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      status: "Disponível",
      views: 245,
      interested: 12
    },
    {
      id: 2,
      title: "Casa Moderna com Piscina",
      price: 1200000,
      address: "Av. dos Jardins, 456 - Bairro Nobre",
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      status: "Vendido",
      views: 189,
      interested: 8
    }
  ]

  const stats = {
    totalProperties: 15,
    activeProperties: 12,
    soldProperties: 3,
    totalViews: 2847,
    totalInterested: 156,
    monthlyRevenue: 45000
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'properties', label: 'Meus Imóveis', icon: Home },
    { id: 'interested', label: 'Interessados', icon: Users },
    { id: 'sales', label: 'Vendas', icon: ShoppingCart },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 mb-2 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie seus imóveis e acompanhe suas vendas
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              onClick={() => setShowAddProperty(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Imóvel
            </Button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total de Imóveis</p>
                      <p className="text-3xl font-bold">{stats.totalProperties}</p>
                    </div>
                    <Home className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Receita Mensal</p>
                      <p className="text-3xl font-bold">{formatPrice(stats.monthlyRevenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total de Visualizações</p>
                      <p className="text-3xl font-bold">{stats.totalViews}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Novo interessado no Apartamento Luxuoso</p>
                      <p className="text-sm text-gray-600">João Silva demonstrou interesse - há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Casa Moderna foi vendida</p>
                      <p className="text-sm text-gray-600">Venda concluída por R$ 1.200.000 - há 1 dia</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6">
            {/* Properties List */}
            <div className="grid gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{property.title}</h3>
                          <Badge 
                            variant={property.status === 'Disponível' ? 'default' : 'secondary'}
                            className={property.status === 'Disponível' ? 'bg-green-500' : ''}
                          >
                            {property.status}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.address}
                        </p>

                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            {property.bedrooms} quartos
                          </span>
                          <span className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            {property.bathrooms} banheiros
                          </span>
                          <span className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            {property.area}m²
                          </span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-blue-600">
                            <Eye className="w-4 h-4 inline mr-1" />
                            {property.views} visualizações
                          </span>
                          <span className="text-green-600">
                            <Users className="w-4 h-4 inline mr-1" />
                            {property.interested} interessados
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 mb-4">
                          {formatPrice(property.price)}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddProperty && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Adicionar Novo Imóvel</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddProperty(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Imóvel</Label>
                    <Input id="title" placeholder="Ex: Apartamento Moderno..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input id="price" type="number" placeholder="850000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input id="address" placeholder="Rua, número, bairro, cidade..." />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Quartos</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 quarto</SelectItem>
                        <SelectItem value="2">2 quartos</SelectItem>
                        <SelectItem value="3">3 quartos</SelectItem>
                        <SelectItem value="4">4+ quartos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Banheiros</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 banheiro</SelectItem>
                        <SelectItem value="2">2 banheiros</SelectItem>
                        <SelectItem value="3">3 banheiros</SelectItem>
                        <SelectItem value="4">4+ banheiros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área (m²)</Label>
                    <Input id="area" type="number" placeholder="120" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Descreva as características do imóvel..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddProperty(false)}
                  >
                    Cancelar
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                    Adicionar Imóvel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
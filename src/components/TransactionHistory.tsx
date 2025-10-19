"use client"

import { useState } from 'react'
import { Calendar, MapPin, DollarSign, CheckCircle, Clock, AlertCircle, Eye, Download, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface TransactionHistoryProps {
  user: any
}

export default function TransactionHistory({ user }: TransactionHistoryProps) {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    {
      id: 'TXN-001',
      property: {
        title: "Apartamento Luxuoso no Centro",
        address: "Rua das Flores, 123 - Centro",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop"
      },
      type: 'purchase',
      status: 'completed',
      amount: 850000,
      date: '2024-01-15',
      completedDate: '2024-01-20',
      broker: 'João Silva',
      documents: ['Contrato', 'Escritura', 'ITBI'],
      rating: 5
    },
    {
      id: 'TXN-002',
      property: {
        title: "Casa Moderna com Piscina",
        address: "Av. dos Jardins, 456 - Bairro Nobre",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop"
      },
      type: 'sale',
      status: 'in_progress',
      amount: 1200000,
      date: '2024-01-10',
      broker: 'Maria Santos',
      documents: ['Proposta', 'Documentação'],
      progress: 75
    },
    {
      id: 'TXN-003',
      property: {
        title: "Loft Industrial no Centro",
        address: "Rua Industrial, 987 - Centro Histórico",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop"
      },
      type: 'rental',
      status: 'pending',
      amount: 3500,
      date: '2024-01-05',
      broker: 'Carlos Oliveira',
      documents: ['Contrato de Locação'],
      monthlyRent: true
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'pending':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in_progress':
        return 'Em Andamento'
      case 'pending':
        return 'Pendente'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'purchase':
        return 'Compra'
      case 'sale':
        return 'Venda'
      case 'rental':
        return 'Aluguel'
      default:
        return type
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesPeriod = filterPeriod === 'all' || 
                         (filterPeriod === 'recent' && new Date(transaction.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesStatus && matchesPeriod
  })

  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'completed').length,
    inProgress: transactions.filter(t => t.status === 'in_progress').length,
    totalValue: transactions.reduce((sum, t) => sum + t.amount, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Histórico de Transações
            </h1>
            <p className="text-gray-600">
              Acompanhe todas as suas transações imobiliárias
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Transações</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Concluídas</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Em Andamento</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valor Total</p>
                  <p className="text-2xl font-bold text-purple-600">{formatPrice(stats.totalValue)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por imóvel, endereço ou ID da transação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="in_progress">Em Andamento</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="recent">Últimos 30 dias</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-6">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={transaction.property.image}
                      alt={transaction.property.title}
                      className="w-full h-32 lg:h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {transaction.property.title}
                          </h3>
                          <Badge className={getStatusColor(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{getStatusLabel(transaction.status)}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {transaction.property.address}
                        </p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>ID: {transaction.id}</span>
                          <span>•</span>
                          <span>{getTypeLabel(transaction.type)}</span>
                          <span>•</span>
                          <span>Corretor: {transaction.broker}</span>
                        </div>
                      </div>

                      <div className="text-right mt-4 sm:mt-0">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(transaction.amount)}
                          {transaction.monthlyRent && <span className="text-sm text-gray-600">/mês</span>}
                        </p>
                        <p className="text-sm text-gray-600">
                          Iniciado em {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </p>
                        {transaction.completedDate && (
                          <p className="text-sm text-green-600">
                            Concluído em {new Date(transaction.completedDate).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar for In Progress Transactions */}
                    {transaction.status === 'in_progress' && transaction.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progresso da transação</span>
                          <span>{transaction.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${transaction.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Documents and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-sm text-gray-600 mb-2">Documentos:</p>
                        <div className="flex flex-wrap gap-2">
                          {transaction.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Documentos
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contato
                        </Button>
                      </div>
                    </div>

                    {/* Rating for Completed Transactions */}
                    {transaction.status === 'completed' && transaction.rating && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Sua avaliação:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < transaction.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Avaliar Novamente
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all' 
                ? 'Nenhuma transação encontrada' 
                : 'Nenhuma transação ainda'
              }
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all'
                ? 'Tente ajustar os filtros para encontrar suas transações.'
                : 'Suas transações imobiliárias aparecerão aqui quando você começar a negociar.'
              }
            </p>
            {!(searchTerm || filterStatus !== 'all' || filterPeriod !== 'all') && (
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                Explorar Imóveis
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
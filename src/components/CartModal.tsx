"use client"

import { useState } from 'react'
import { X, Minus, Plus, Trash2, CreditCard, MapPin, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: any[]
  onUpdateCart: (items: any[]) => void
}

export default function CartModal({ isOpen, onClose, cartItems, onUpdateCart }: CartModalProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')

  const mockCartItems = [
    {
      id: 1,
      title: "Apartamento Luxuoso no Centro",
      price: 850000,
      address: "Rua das Flores, 123 - Centro",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      quantity: 1,
      type: "Compra"
    },
    {
      id: 2,
      title: "Casa Moderna com Piscina",
      price: 1200000,
      address: "Av. dos Jardins, 456 - Bairro Nobre",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
      quantity: 1,
      type: "Compra"
    }
  ]

  const items = cartItems.length > 0 ? cartItems : mockCartItems

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    onUpdateCart(updatedItems)
  }

  const removeItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    onUpdateCart(updatedItems)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleCheckout = () => {
    // Simular processo de checkout
    alert('Pedido realizado com sucesso! Entraremos em contato em breve.')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 slide-in-from-right-4 duration-300">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              {showCheckout ? 'Finalizar Pedido' : 'Carrinho de Compras'}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {!showCheckout ? (
            <div className="space-y-6">
              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Seu carrinho está vazio
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Adicione imóveis ao seu carrinho para continuar
                  </p>
                  <Button onClick={onClose}>
                    Continuar Navegando
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                  <p className="text-sm text-gray-600 flex items-center mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {item.address}
                                  </p>
                                  <Badge variant="secondary" className="mt-2">
                                    {item.type}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <span className="font-medium">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-blue-600">
                                    {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Cart Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxa de documentação</span>
                        <span>{formatPrice(5000)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ITBI (estimado)</span>
                        <span>{formatPrice(getTotalPrice() * 0.02)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">
                          {formatPrice(getTotalPrice() + 5000 + (getTotalPrice() * 0.02))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                      Continuar Navegando
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                      onClick={() => setShowCheckout(true)}
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Checkout Form */
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informações de Pagamento</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Método de Pagamento</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="financing">Financiamento Bancário</SelectItem>
                            <SelectItem value="cash">À Vista</SelectItem>
                            <SelectItem value="installments">Parcelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="delivery-date">Data Preferida para Visita</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="delivery-date"
                            type="date"
                            className="pl-10"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferred-time">Horário Preferido</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Select>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Manhã (9h - 12h)</SelectItem>
                              <SelectItem value="afternoon">Tarde (14h - 17h)</SelectItem>
                              <SelectItem value="evening">Noite (18h - 20h)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">Nome</Label>
                          <Input id="first-name" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Sobrenome</Label>
                          <Input id="last-name" placeholder="Seu sobrenome" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="(11) 99999-9999" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
                    <Card className="border border-gray-200">
                      <CardContent className="p-4 space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              <p className="text-xs text-gray-600">{item.address}</p>
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {item.type}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-sm">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatPrice(getTotalPrice())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxa de documentação</span>
                            <span>{formatPrice(5000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>ITBI (estimado)</span>
                            <span>{formatPrice(getTotalPrice() * 0.02)}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-bold text-base">
                            <span>Total</span>
                            <span className="text-blue-600">
                              {formatPrice(getTotalPrice() + 5000 + (getTotalPrice() * 0.02))}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Próximos Passos</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Entraremos em contato em até 24h</li>
                      <li>• Agendaremos a visita no imóvel</li>
                      <li>• Auxiliaremos com documentação</li>
                      <li>• Acompanharemos todo o processo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCheckout(false)}
                >
                  Voltar ao Carrinho
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Confirmar Pedido
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
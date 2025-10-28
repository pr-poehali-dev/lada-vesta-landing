import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  features: string[];
  color: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Чехлы на Лада Веста Премиум 1',
    price: '12 900 ₽',
    image: 'https://cdn.poehali.dev/files/7f680f4e-e02a-49b8-b97b-b37b7654dd3b.jpg',
    features: ['Экокожа премиум класса', 'Вышивка VESTA', 'Ромбовидная стёжка', 'Полный комплект'],
    color: 'Черный с белыми вставками'
  },
  {
    id: 2,
    name: 'Чехлы на Лада Веста Премиум 2',
    price: '13 900 ₽',
    image: 'https://cdn.poehali.dev/files/9e9977e4-c1bf-4d80-9aa5-a8ee66b28e51.jpg',
    features: ['Спортивный дизайн', 'Вышивка VESTA', 'Оранжевые вставки', 'Полный комплект'],
    color: 'Черный с оранжевыми вставками'
  },
  {
    id: 3,
    name: 'Чехлы на Лада Веста Люкс с Сотами',
    price: '14 900 ₽',
    image: 'https://cdn.poehali.dev/files/738659c5-0fb5-4451-8a33-ec8cbc6495ba.jpg',
    features: ['Уникальная сотовая перфорация', 'Вентиляция спины', 'Серые вставки', 'Полный комплект'],
    color: 'Черный с серыми сотами'
  }
];

const reviews = [
  {
    name: 'Алексей М.',
    rating: 5,
    text: 'Отличные чехлы! Сидят как влитые на Весту. Качество экокожи на высоте, выглядят дорого.',
    date: '15 октября 2024'
  },
  {
    name: 'Дмитрий К.',
    rating: 5,
    text: 'Взял черные с оранжевой строчкой - в салоне смотрятся супер! Легко чистятся, не скользят.',
    date: '8 октября 2024'
  },
  {
    name: 'Михаил П.',
    rating: 5,
    text: 'Установка заняла 40 минут. Инструкция понятная. Качество превзошло ожидания за эту цену!',
    date: '1 октября 2024'
  }
];

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо за заказ!\n\nТовар: ${selectedProduct?.name}\nИмя: ${formData.name}\nТелефон: ${formData.phone}\n\nМы свяжемся с вами в ближайшее время!`);
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src="https://cdn.poehali.dev/files/797d38ca-9108-42c1-9843-b62d544e149b.png" alt="FRANK" className="h-10 mix-blend-lighten" />
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('hero')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('products')} className="hover:text-primary transition-colors">Товары</button>
              <button onClick={() => scrollToSection('order')} className="hover:text-primary transition-colors">Заказ</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors">Отзывы</button>
            </div>
            <a href="tel:+79991234567" className="flex items-center gap-2 text-primary">
              <Icon name="Phone" size={20} />
              <span className="hidden sm:inline">+7 (999) 123-45-67</span>
            </a>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Премиум чехлы<br />для <span className="text-primary">Лада Веста</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Экокожа высшего качества • Идеальная посадка • Быстрая установка
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('products')}>
                Выбрать чехлы
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => scrollToSection('order')}>
                Заказать звонок
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            {[
              { icon: 'Shield', title: 'Гарантия 2 года', desc: 'На все товары' },
              { icon: 'Truck', title: 'Доставка по РФ', desc: 'От 1 дня' },
              { icon: 'Clock', title: 'Установка 40 мин', desc: 'Простая инструкция' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur hover:bg-card transition-all hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <Icon name={item.icon as any} className="mx-auto mb-4 text-primary" size={40} />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши модели</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Выберите идеальный вариант для вашей Весты</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, idx) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="aspect-square overflow-hidden bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>
                  <p className="text-sm text-muted-foreground mb-4">{product.color}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="text-secondary mt-0.5" size={18} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedProduct(product);
                      scrollToSection('order');
                    }}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Преимущества экокожи</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Почему наши чехлы лучше обычных</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Sparkles',
                title: 'Не впитывает запахи',
                desc: 'Экокожа не впитывает посторонние запахи, легко очищается влажной салфеткой'
              },
              {
                icon: 'Droplet',
                title: 'Водоотталкивающая',
                desc: 'Материал не пропускает воду, защищает родную обивку от пятен'
              },
              {
                icon: 'Thermometer',
                title: 'Не трескается',
                desc: 'Выдерживает температуры от -40°C до +60°C без деформации'
              },
              {
                icon: 'Heart',
                title: 'Гипоаллергенная',
                desc: 'Безопасна для здоровья, не вызывает аллергических реакций'
              }
            ].map((item, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon as any} className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Видеообзор установки</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Смотрите, как просто установить чехлы самостоятельно</p>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted/50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Play" className="text-primary ml-1" size={40} />
                  </div>
                  <p className="text-muted-foreground">Видеоинструкция по установке чехлов FRANK</p>
                  <p className="text-sm text-muted-foreground/70">Длительность: 8 минут</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { step: '1', title: 'Подготовка', desc: 'Распакуйте чехлы и убедитесь в комплектности' },
              { step: '2', title: 'Установка', desc: 'Следуйте простой инструкции из видео' },
              { step: '3', title: 'Готово!', desc: 'Наслаждайтесь новым интерьером салона' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Оформить заказ</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Заполните форму и мы свяжемся с вами</p>
          
          <Card>
            <CardContent className="p-8">
              {selectedProduct && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-4">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{selectedProduct.name}</h3>
                      <p className="text-xl font-bold text-primary">{selectedProduct.price}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="product">Выберите модель</Label>
                  <select 
                    id="product"
                    className="w-full mt-2 bg-background border border-input rounded-md px-4 py-2"
                    value={selectedProduct?.id || ''}
                    onChange={(e) => setSelectedProduct(products.find(p => p.id === Number(e.target.value)) || null)}
                    required
                  >
                    <option value="">Выберите чехлы</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name} - {product.price}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input 
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="comment">Комментарий (необязательно)</Label>
                  <Textarea 
                    id="comment"
                    placeholder="Укажите предпочтительное время звонка или дополнительные пожелания"
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg py-6">
                  Отправить заказ
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Отзывы клиентов</h2>
          <p className="text-center text-muted-foreground text-lg mb-12">Что говорят наши покупатели</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.15}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-primary fill-primary" size={18} />
                    ))}
                  </div>
                  <p className="mb-4 text-foreground/90">{review.text}</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="https://cdn.poehali.dev/files/797d38ca-9108-42c1-9843-b62d544e149b.png" alt="FRANK" className="h-12 mb-4 mix-blend-lighten" />
              <p className="text-muted-foreground">Премиум чехлы из экокожи для Лада Веста</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@vestacovers.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Работаем</h4>
              <p className="text-muted-foreground">Пн-Вс: 9:00 - 21:00</p>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm border-t border-border pt-8">
            © 2024 FRANK. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
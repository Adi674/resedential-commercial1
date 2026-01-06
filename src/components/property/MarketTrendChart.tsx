import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { marketTrendData } from '@/data/mockData';
import { TrendingUp } from 'lucide-react';

const MarketTrendChart: React.FC = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Market Trend Analysis
          </h3>
          <p className="text-sm text-muted-foreground">Price per sq.ft over the last 12 months</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">₹6,500</div>
          <div className="text-sm text-green-600 flex items-center justify-end gap-1">
            <TrendingUp className="w-4 h-4" />
            +54% YoY
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={marketTrendData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price/sq.ft']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(221, 83%, 53%)"
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">1 Year Ago</div>
          <div className="font-semibold">₹4,200</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">6 Months Ago</div>
          <div className="font-semibold">₹5,100</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Current</div>
          <div className="font-semibold text-primary">₹6,500</div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrendChart;

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEventStore } from "@/lib/store/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ExpenseTracker() {
  const { events, expenses, addExpense } = useEventStore();
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [formData, setFormData] = useState({
    eventId: "",
    description: "",
    amount: "",
    category: "",
    date: ""
  });

  const eventExpenses = expenses.filter(expense => expense.eventId === selectedEvent);
  const selectedEventData = events.find(event => event.id === selectedEvent);
  
  const totalExpenses = eventExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = selectedEventData ? selectedEventData.budget - totalExpenses : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.eventId) {
      setFormData(prev => ({ ...prev, eventId: selectedEvent }));
    }

    addExpense({
      ...formData,
      eventId: selectedEvent,
      amount: parseFloat(formData.amount)
    });

    setFormData({
      eventId: selectedEvent,
      description: "",
      amount: "",
      category: "",
      date: ""
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Select Event</Label>
        <Select onValueChange={setSelectedEvent}>
          <SelectTrigger>
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent>
            {events.map(event => (
              <SelectItem key={event.id} value={event.id}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedEvent && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Event Budget</h3>
              <p className="text-2xl font-bold">₹{selectedEventData?.budget.toLocaleString() || 0}</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Total Expenses</h3>
              <p className="text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString()}</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Remaining Budget</h3>
              <p className="text-2xl font-bold text-green-600">₹{remainingBudget.toLocaleString()}</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Expense description"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="refreshments">Refreshments</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Expense
                </Button>
              </form>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Expense History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="text-right">₹{expense.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
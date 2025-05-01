"use client";

import Button from "@/components/common/Button";

export default function HomePage() {

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Restoran Buyurtma Tizimi</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Tez va oson buyurtma berish uchun tizimga kiring yoki ro‘yxatdan o‘ting.
      </p>
      <div className="p-4">
        <h1 className="text-red-500">Salom, Dunyo!</h1>
       
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Primary Button
      </Button>
      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 ml-2">
        Secondary Button
      </Button>
      <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ml-2">
        Destructive Button
      </Button>
      <div className="space-x-4">
        <Button asChild className="bg-[red]">
          <a href="/sign-in">Kirish</a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-secondary hover:bg-secondary/90"
        >
          <a href="/sign-up">Ro‘yxatdan O‘tish</a>
        </Button>
      </div>
    </div>
  );
}

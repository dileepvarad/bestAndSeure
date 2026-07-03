import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newPackage = await prisma.package.create({
      data: {
        name: data.name,
        type: data.type,
        priceKm: parseFloat(data.priceKm),
        startingPrice: parseFloat(data.startingPrice),
        seats: parseInt(data.seats),
        fuel: data.fuel,
        image: data.image,
        features: data.features,
        bestFor: data.bestFor,
        badge: data.badge || null,
      }
    });
    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

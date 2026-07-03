import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.package.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const updated = await prisma.package.update({
      where: { id },
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
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

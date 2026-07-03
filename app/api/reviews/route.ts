import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public GET for approved reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// Public POST to submit a new review
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newReview = await prisma.review.create({
      data: {
        name: data.name,
        location: data.location || 'Visakhapatnam',
        rating: parseInt(data.rating) || 5,
        text: data.text,
        trip: data.trip,
        date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        isApproved: false, // Requires admin approval
      }
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

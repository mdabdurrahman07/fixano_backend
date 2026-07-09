import { BookingStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { IReviewPayload } from './review.interface';

const createReview = async (payload: IReviewPayload, customerId: string) => {
  const { rating, comment, bookingId } = payload;
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    },
    include: {
      reviews: true
    }
  });
  if (!booking) {
    throw new Error('Booking not found');
  }
  if (booking.customerId !== customerId) {
    throw new Error('You are not authorized to review this booking');
  }

  if (booking.status !== BookingStatus.PAID) {
    throw new Error(`Cannot review a booking that is not completed. Current status: ${booking.status}`);
  }
  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      booking: { connect: { id: bookingId } },
      customer: { connect: { id: customerId } },
      technician: { connect: { id: booking.technicianId } }
    }
  });
  return review;
};

const deleteReview = async (reviewId: string, customerId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  });

  if (!review) {
    throw new Error('Review not found');
  }
  if (review.customerId !== customerId) {
    throw new Error('You are not authorized to delete this review');
  }

  await prisma.review.delete({
    where: {
      id: review.id
    }
  });
};

export const reviewService = {
  createReview,
  deleteReview
};

import { BookingStatus } from '../../../generated/prisma/enums';
import { prisma } from '../../lib/prisma';
import { IReviewPayload } from './review.interface';

const createReview = async (
  payload: IReviewPayload,
  customerId: string
) => {
  const { rating, comment, bookingId } = payload;

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const result = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        review: true,
        technician: {
          select: {
            id: true,
            avgRating: true,
            totalReviews: true,
          },
        },
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.customerId !== customerId) {
      throw new Error("You are not authorized to review this booking");
    }

    if (booking.status !== BookingStatus.PAID) {
      throw new Error(
        `Cannot review a booking that is not completed. Current status: ${booking.status}`
      );
    }

    if (booking.review) {
      throw new Error("You have already reviewed this booking");
    }

    const review = await tx.review.create({
      data: {
        rating,
        comment,
        booking: {
          connect: {
            id: bookingId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
        technician: {
          connect: {
            id: booking.technicianId,
          },
        },
      },
    });

    const oldTotal = booking.technician.totalReviews;
    const oldAverage = booking.technician.avgRating;

    const newTotal = oldTotal + 1;

    const newAverage =
      (oldAverage * oldTotal + rating) / newTotal;

    await tx.technician.update({
      where: {
        id: booking.technicianId,
      },
      data: {
        avgRating: newAverage,
        totalReviews: {
          increment: 1,
        },
      },
    });

    return review;
  });

  return result;
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
const getAllReview = async (customerId: string) => {
  const review = await prisma.review.findMany({
    where: {
      OR: [
        {
          customerId
        },
        {
          technician: {
            userId: customerId
          }
        }
      ]
    },
    include: {
      customer: {
        select: {
          name: true
        }
      },
      technician: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  if (!review) {
    throw new Error('Review not found');
  }
  // returning the review
  return review;
};

export const reviewService = {
  createReview,
  deleteReview,
  getAllReview
};

import { BookingStatus, PaymentStatus } from '../../../generated/prisma/enums';
import config from '../../config/config.dotenv';
import { prisma } from '../../lib/prisma';
import { stripe } from '../../lib/stripe';

const createCheckoutSessionService = async (customerId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    },
    include: {
      payment: true
    }
  });
  if (!booking) {
    throw new Error('Booking not found');
  }
  if (booking.customerId !== customerId) {
    throw new Error('You are not authorized to pay for this booking');
  }
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error(`Booking is not payable in its current status${booking.status}`);
  }
  if (booking.payment) {
    if (booking.payment.status === PaymentStatus.COMPLETED) {
      throw new Error('This booking has already been paid');
    }
    // if (booking.payment.status === PaymentStatus.PENDING) {
    //   throw new Error('A payment is already in progress for this booking, Please complete or cancel it first');
    // }
  }
  // paid amount
  const paidTotalAmount = Math.round(Number(booking.totalAmount) * 100);

  // session

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: paidTotalAmount,
          product_data: {
            name: `Booking Payment - ${booking.id}`
          }
        },
        quantity: 1
      }
    ],
    success_url: `${config.app_url}/payment?success=true`,
    cancel_url: `${config.app_url}/payment?success=false`,
    metadata: {
      bookingId: booking.id,
      customerId
    }
  });

  // console.log('session', session);

  const paymentIntentPlaceHolder = `pending_${session.id}`;

  // if (!session.payment_intent) {
  //   throw new Error('Stripe did not provide a payment intent for this session');
  // }

  await prisma.payment.upsert({
    where: {
      bookingId
    },
    update: {
      status: PaymentStatus.PENDING,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentPlaceHolder,
      amount: Number(booking.totalAmount)
    },
    create: {
      amount: paidTotalAmount,
      status: PaymentStatus.PENDING,
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentPlaceHolder,
      booking: {
        connect: { id: bookingId }
      },
      user: {
        connect: { id: customerId }
      }
    }
  });

  return { url: session.url };
};

const handleWebhookService = async () => {};

const handlePaymentStatusService = async () => {};

export const paymentService = {
  createCheckoutSessionService,
  handleWebhookService,
  handlePaymentStatusService
};

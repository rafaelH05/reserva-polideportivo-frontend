export class Booking{
    constructor(
        public userId: number,
        public facilityId: number,
        public start_time: string,
        public end_time: string,
        public created_at: string,
        public paytmentStatus?: string,
        public cancelledAt?: string,
        public bookingId?: number
    ) {}
}
export interface ParkingSession {
  id?: string;
  licesePlateNumber: string;
  enteredAt: Date;
  exitedAt?: Date;
  status: 'active' | 'completed';
}
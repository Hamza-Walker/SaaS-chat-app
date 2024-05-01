interface Item {
	id: string;
	// Include other item properties as needed
  }
export interface Subscription {
	id: string;
	cancel_at_period_end: boolean;
	created: number;
	current_period_start: number;
	items: Item[];
	latest_invoice: string; // Assuming 'latest_invoice' is a string identifier
	metadata: Record<string, unknown>; // Use Record for dynamic metadata
	payment_method: string;
	prices: any[]; // Consider defining a Price interface if possible
	price: number;
	product: string;
	quantity: number;
	status: string;
	stripeLink: string;
	canceled_at: number;
	cancel_at: number;
	current_period_end: number;
	ended_at: number;
	trial_start: number;
	trial_end: number;
	role: string;
  }
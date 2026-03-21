export interface Application {
  id: string;
  travelDestination: string;
  createdAt: string;
  status: 'pending' | 'in-process' | 'approved' | 'rejected';
  adminNote?: string | null;
}
 
export interface RecentApplication {
  iconBackground: string;
  icon:           string;
  title:          string;
  date:           string;
  originalStatus:   Application['status'];
  statusLabel:      string;
  statusBackground: string;
  statusTextColor:  string;
}
 
export interface QuickActionCard {
  backgroundColor: string;
  Icon:            string;
  title:           string;
  Navigate:        () => void;
}
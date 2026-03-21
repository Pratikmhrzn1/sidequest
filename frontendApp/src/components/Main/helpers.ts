import { COLORS } from '../../constants/Colors';
import type { Application, RecentApplication } from './types';
 
export const getResponsiveValue = (
  width: number,
  small: number,
  medium: number,
  large: number,
): number => {
  if (width < 375) return small;
  if (width < 768) return medium;
  return large;
};
 
export const formatDate = (dateString: string): string => {
  const date   = new Date(dateString);
  const day    = date.getDate();
  const month  = date.toLocaleString('en-GB', { month: 'short' });
  const year   = date.getFullYear();
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th';
  return `${day}${suffix} ${month}, ${year}`;
};
 
 
type AppStatus = Application['status'];
 
const STATUS_LABEL: Record<AppStatus, string> = {
  'pending':    'In Process',
  'in-process': 'In Process',
  'approved':   'Approved',
  'rejected':   'Rejected',
};
 
const STATUS_BG: Record<AppStatus, string> = {
  'pending':    COLORS.status.pending.bg,
  'in-process': COLORS.status.pending.bg,
  'approved':   COLORS.status.approved.bg,
  'rejected':   COLORS.status.rejected.bg,
};
 
const STATUS_TEXT: Record<AppStatus, string> = {
  'pending':    COLORS.status.pending.text,
  'in-process': COLORS.status.pending.text,
  'approved':   COLORS.status.approved.text,
  'rejected':   COLORS.status.rejected.text,
};
 
const STATUS_ICON: Record<AppStatus, string> = {
  'pending':    COLORS.status.pending.icon,
  'in-process': COLORS.status.pending.icon,
  'approved':   COLORS.status.approved.icon,
  'rejected':   COLORS.status.rejected.icon,
};
 
// ─── Build display list ───────────────────────────────────────────────────────
export const buildRecentApplications = (
  applications: Application[],
  fallbackDestination: string,
): RecentApplication[] => {
  if (applications.length > 0) {
    return applications.map(app => ({
      iconBackground:   STATUS_ICON[app.status],
      icon:             'https://i.imgur.com/W3wKSvN.png',
      title:            app.travelDestination,
      date:             formatDate(app.createdAt),
      originalStatus:   app.status,           
      statusLabel:      STATUS_LABEL[app.status],
      statusBackground: STATUS_BG[app.status],
      statusTextColor:  STATUS_TEXT[app.status],
    }));
  }
 
  return [{
    iconBackground:   COLORS.status.pending.icon,
    icon:             'https://i.imgur.com/W3wKSvN.png',
    title:            fallbackDestination,
    date:             formatDate(new Date().toISOString()),
    originalStatus:   'pending',
    statusLabel:      'In Process',
    statusBackground: COLORS.status.pending.bg,
    statusTextColor:  COLORS.status.pending.text,
  }];
};
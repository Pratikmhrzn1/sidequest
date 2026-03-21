// ─── Base palette ─────────────────────────────────────────────────────────────
const PRIMARY   = '#013E9A';
const SUCCESS   = '#10B981';   // residence field / approved status
const PURPLE    = '#8B5CF6';   // destination field
const BLUE      = '#3B82F6';   // nationality field
const DARK_CARD = '#033374ff'; // quick-action cards

// ─── Status colors ────────────────────────────────────────────────────────────
export const STATUS = {
  approved: { bg: '#d4edda', text: '#155724', icon: '#04ff29' },
  rejected: { bg: '#f8d7da', text: '#721c24', icon: '#6387fe' },
  pending:  { bg: '#fef3c7', text: '#b45309', icon: '#6387fe' },
};

// ─── Field accent colors ──────────────────────────────────────────────────────
export const FIELD_COLORS = {
  residence:   SUCCESS,
  destination: PURPLE,
  nationality: BLUE,
};

// ─── Main theme ───────────────────────────────────────────────────────────────
export const COLORS = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  primary:     PRIMARY,
  primaryDark: '#012d73',         // pressed / shadow tint
  darkCard:    DARK_CARD,         // quick-action card backgrounds

  // ── Semantic ───────────────────────────────────────────────────────────────
  success:  SUCCESS,
  purple:   PURPLE,
  blue:     BLUE,
  skyBlue:  'skyblue',            // hero banner background
  info:     '#00d0ff',            // "View All" links

  // ── Neutrals ───────────────────────────────────────────────────────────────
  white:       '#ffffff',
  background:  '#f5f5f5',         // screen background
  card:        '#ffffff',         // card background
  inputBg:     '#f8f9fa',         // selected box / input background
  border:      '#e2e6ea',         // card borders
  borderLight: '#eee',            // suggestion list borders
  divider:     '#f0f0f0',         // list item dividers

  // ── Text ───────────────────────────────────────────────────────────────────
  textPrimary:   '#222222',
  textSecondary: '#333333',
  textMuted:     '#666666',
  textHint:      '#999999',
  textLight:     '#aaaaaa',
  textOnDark:    '#ffffff',       // text on primary-colored backgrounds
  textSubtitle:  '#BFDBFE',       // app bar subtitle (TravelDetails header)

  // ── App bar ────────────────────────────────────────────────────────────────
  appBar:        PRIMARY,
  appBarVisa:    '#4507f0',       // VisaRequirement screen app bar

  // ── Status ─────────────────────────────────────────────────────────────────
  status: STATUS,

  // ── Field accents ──────────────────────────────────────────────────────────
  fields: FIELD_COLORS,

  // ── Light / dark theme objects (for useColorScheme users) ──────────────────
  light: {
    text:             '#11181C',
    background:       '#f5f5f5',
    tint:             PRIMARY,
    icon:             '#687076',
    tabIconDefault:   '#687076',
    tabIconSelected:  PRIMARY,
    headerBackground: PRIMARY,
    cardBackground:   '#ffffff',
    border:           '#e0e0e0',
    subtitleText:     '#687076',
  },
  dark: {
    text:             '#ECEDEE',
    background:       '#151718',
    tint:             '#ffffff',
    icon:             '#9BA1A6',
    tabIconDefault:   '#9BA1A6',
    tabIconSelected:  '#ffffff',
    headerBackground: '#1D3D47',
    cardBackground:   '#1e2022',
    border:           '#2c2f31',
    subtitleText:     '#9BA1A6',
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const SPACING = {
  xs:  4,
  s:   8,
  m:   16,
  l:   24,
  xl:  32,
  xxl: 48,
};

// ─── Typography ───────────────────────────────────────────────────────────────
export const FONTS = {
  regular: 'System',
  bold:    'System',
  size: {
    xs:   11,
    s:    12,
    m:    14,
    l:    16,
    xl:   18,
    xxl:  22,
    xxxl: 28,
  },
  weight: {
    regular:    '400' as const,
    medium:     '500' as const,
    semibold:   '600' as const,
    bold:       '700' as const,
    extraBold:  '800' as const,
  },
};
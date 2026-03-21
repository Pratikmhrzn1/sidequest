import React from 'react';
import { Home, PlaneTakeoff, Globe } from 'lucide-react-native';
import type { FieldKey } from './types';
 
interface Props {
  fieldKey: FieldKey;
  size: number;
  color?: string;
}
export function FieldIcon({ fieldKey, size, color = '#fff' }: Props) {
  switch (fieldKey) {
    case 'residence':
      return <Home size={size} color={color} />;
    case 'destination':
      return <PlaneTakeoff size={size} color={color} />;
    case 'nationality':
      return <Globe size={size} color={color} />;
  }
}
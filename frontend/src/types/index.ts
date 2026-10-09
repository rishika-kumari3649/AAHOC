export type UserRole = 
  | 'admin'
  | 'operations'
  | 'doctor'
  | 'nurse'
  | 'reception'
  | 'laboratory'
  | 'pharmacy'
  | 'billing'
  | 'patient';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: string;
}

export interface PanelConfig {
  role: UserRole;
  title: string;
  description: string;
  basePath: string;
  navItems: NavItem[];
}
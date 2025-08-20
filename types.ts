
import type React from 'react';

export interface ArchitectureItem {
  id: string;
  component: string;
  tech: string;
  paradigm: string;
  icon: React.ReactNode;
}

export interface ArchitectureSection {
  title: string;
  color: string;
  items: ArchitectureItem[];
}

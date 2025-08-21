# API Reference

This document provides a complete reference for the VerseFlow Architecture Visualizer data structures, components, and interfaces.

## 📋 Table of Contents

1. [Data Types](#data-types)
2. [Component Interfaces](#component-interfaces)
3. [Data Structure](#data-structure)
4. [Component API](#component-api)
5. [Utility Functions](#utility-functions)

## 🔧 Data Types

### Core Types

```typescript
// types.ts
export interface ArchitectureItem {
  id: string;
  component: string;
  tech: string;
  icon: React.ReactElement;
  paradigm: string;
}

export interface ArchitectureSection {
  title: string;
  color: string;
  items: ArchitectureItem[];
}

export type ArchitectureData = ArchitectureSection[];
```

### Extended Types

```typescript
// Extended interfaces for future enhancements
export interface ArchitectureItemExtended extends ArchitectureItem {
  // Optional fields for enhanced functionality
  category?: 'frontend' | 'backend' | 'data' | 'infrastructure';
  complexity?: 'low' | 'medium' | 'high';
  learningCurve?: 'easy' | 'moderate' | 'steep';
  maturity?: 'experimental' | 'stable' | 'mature';
  performance?: 'low' | 'medium' | 'high';
  scalability?: 'low' | 'medium' | 'high';
  resources?: {
    documentation?: string[];
    tutorials?: string[];
    examples?: string[];
  };
  alternatives?: string[];
  useCases?: string[];
  pros?: string[];
  cons?: string[];
}

export interface TechnologyMetrics {
  githubStars?: number;
  npmDownloads?: number;
  communitySize?: number;
  jobMarketDemand?: 'low' | 'medium' | 'high';
  lastUpdated?: Date;
}

export interface DeploymentInfo {
  containerSize?: string;
  memoryUsage?: string;
  cpuUsage?: string;
  startupTime?: string;
  buildTime?: string;
}
```

## 🎨 Component Interfaces

### ArchitectureCard Component

```typescript
// components/ArchitectureCard.tsx
interface ArchitectureCardProps {
  item: ArchitectureItem;
  onLearnMore: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showIcon?: boolean;
  showTech?: boolean;
}

interface ArchitectureCardState {
  isHovered: boolean;
  isLoading: boolean;
}

// Usage example
<ArchitectureCard
  item={architectureItem}
  onLearnMore={() => setSelectedItem(item)}
  variant="default"
  showIcon={true}
  showTech={true}
/>
```

### DetailModal Component

```typescript
// components/DetailModal.tsx
interface DetailModalProps {
  item: ArchitectureItem;
  onClose: () => void;
  isOpen?: boolean;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

interface DetailModalState {
  isClosing: boolean;
  activeTab?: 'overview' | 'details' | 'examples' | 'resources';
}

// Usage example
<DetailModal
  item={selectedItem}
  onClose={() => setSelectedItem(null)}
  isOpen={!!selectedItem}
  size="medium"
  closeOnOverlayClick={true}
/>
```

### Icon Components

```typescript
// components/Icons.tsx
interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  style?: React.CSSProperties;
}

// Individual icon interfaces
export const ReactIcon: React.FC<IconProps>;
export const TypeScriptIcon: React.FC<IconProps>;
export const GoIcon: React.FC<IconProps>;
export const RustIcon: React.FC<IconProps>;
export const ElixirIcon: React.FC<IconProps>;
export const PythonIcon: React.FC<IconProps>;
export const KotlinIcon: React.FC<IconProps>;
export const PostgresqlIcon: React.FC<IconProps>;
export const ElasticsearchIcon: React.FC<IconProps>;
export const RedisIcon: React.FC<IconProps>;
export const KubernetesIcon: React.FC<IconProps>;
export const TerraformIcon: React.FC<IconProps>;
export const FlutterIcon: React.FC<IconProps>;
export const ClickHouseIcon: React.FC<IconProps>;
export const GenericTechIcon: React.FC<IconProps>;

// Usage example
<GoIcon className="h-12 w-12 text-blue-500" size="lg" />
```

## 📊 Data Structure

### Architecture Data Schema

```typescript
// data/architectureData.ts
export const ARCHITECTURE_DATA: ArchitectureData = [
  {
    title: "Frontend Suite (Client-Side)",
    color: "bg-sky-400",
    items: [
      {
        id: "web-app",
        component: "Web Application",
        tech: "TypeScript & Next.js",
        icon: React.createElement(ReactIcon),
        paradigm: "Modern React application built with TypeScript for type safety and maintainability. Uses component-based architecture with reusable UI components, state management, and responsive design patterns. Implements server-side rendering with Next.js for improved SEO and performance."
      },
      {
        id: "mobile-app",
        component: "Mobile Applications (iOS & Android)",
        tech: "Dart & Flutter",
        icon: React.createElement(FlutterIcon),
        paradigm: "Cross-platform mobile development using Flutter framework. Single codebase for both iOS and Android platforms, with native performance and platform-specific UI adaptations. Implements reactive programming patterns and state management."
      }
    ]
  },
  {
    title: "Backend Suite (Server-Side Microservices)",
    color: "bg-emerald-400",
    items: [
      {
        id: "core-api",
        component: "Core API & User Services",
        tech: "Go (Golang)",
        icon: React.createElement(GoIcon),
        paradigm: "High-performance REST API built with Go. Implements clean architecture patterns, dependency injection, and comprehensive middleware for authentication, logging, and error handling."
      },
      {
        id: "audio-processing",
        component: "Audio Processing & Streaming",
        tech: "Rust",
        icon: React.createElement(RustIcon),
        paradigm: "Memory-safe audio processing service using Rust. Handles media transcoding, waveform generation, and real-time audio streaming with zero-copy optimizations."
      }
    ]
  },
  {
    title: "Data & Persistence Layer",
    color: "bg-purple-400",
    items: [
      {
        id: "postgresql",
        component: "Primary Relational Database",
        tech: "PostgreSQL",
        icon: React.createElement(PostgreSQLIcon),
        paradigm: "ACID-compliant relational database with advanced features like JSON support, full-text search, and custom data types for music metadata storage."
      },
      {
        id: "elasticsearch",
        component: "Search & Discovery Database",
        tech: "Elasticsearch",
        icon: React.createElement(ElasticsearchIcon),
        paradigm: "Distributed search engine for music discovery, recommendation algorithms, and real-time analytics with advanced querying capabilities."
      }
    ]
  },
  {
    title: "Infrastructure & DevOps",
    color: "bg-orange-400",
    items: [
      {
        id: "kubernetes",
        component: "Containerization & Orchestration",
        tech: "Docker & Kubernetes",
        icon: React.createElement(KubernetesIcon),
        paradigm: "Container orchestration platform for microservices deployment, auto-scaling, and service mesh management with zero-downtime deployments."
      },
      {
        id: "terraform",
        component: "Infrastructure as Code (IaC)",
        tech: "Terraform",
        icon: React.createElement(TerraformIcon),
        paradigm: "Declarative infrastructure provisioning with version control, enabling reproducible and scalable cloud resource management."
      }
    ]
  }
];
```

### Section Categories

```typescript
// Data organization by categories
type SectionCategory = 
  | 'Frontend Suite (Client-Side)'
  | 'Backend Suite (Server-Side Microservices)'
  | 'Data & Persistence Layer'
  | 'Infrastructure & DevOps';

// Color scheme mapping
const SECTION_COLORS: Record<SectionCategory, string> = {
  'Frontend Suite (Client-Side)': 'bg-sky-400',
  'Backend Suite (Server-Side Microservices)': 'bg-emerald-400',
  'Data & Persistence Layer': 'bg-purple-400',
  'Infrastructure & DevOps': 'bg-orange-400'
};
```

### Item ID Reference

```typescript
// Complete list of item IDs for reference
type ItemId = 
  // Frontend
  | 'web-app'
  | 'mobile'
  // Backend
  | 'core-api'
  | 'audio-processing'
  | 'real-time-collab'
  | 'data-science'
  | 'ecommerce'
  // Data Layer
  | 'db-primary'
  | 'db-analytics'
  | 'db-search'
  | 'db-cache'
  // Infrastructure
  | 'infra-cloud'
  | 'infra-container'
  | 'infra-iac'
  | 'infra-ci-cd';
```

## 🔧 Component API

### Main App Component

```typescript
// App.tsx
interface AppProps {
  data?: ArchitectureData;
  theme?: 'dark' | 'light';
  initialSection?: string;
}

interface AppState {
  selectedItem: ArchitectureItem | null;
  activeSection: string | null;
  searchQuery: string;
  filteredData: ArchitectureData;
}

// Main application component
const App: React.FC<AppProps> = ({ 
  data = ARCHITECTURE_DATA,
  theme = 'dark',
  initialSection 
}) => {
  // Component implementation
};
```

### Hook APIs

```typescript
// Custom hooks for state management
export const useArchitectureData = () => {
  const [data, setData] = useState<ArchitectureData>(ARCHITECTURE_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterByCategory = useCallback((category: string) => {
    // Filter implementation
  }, [data]);

  const searchItems = useCallback((query: string) => {
    // Search implementation
  }, [data]);

  return {
    data,
    loading,
    error,
    filterByCategory,
    searchItems
  };
};

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState<ArchitectureItem | null>(null);

  const openModal = useCallback((item: ArchitectureItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  return {
    isOpen,
    selectedItem,
    openModal,
    closeModal
  };
};
```

## 🛠️ Utility Functions

### Data Manipulation

```typescript
// utils/dataUtils.ts
export const findItemById = (
  data: ArchitectureData, 
  id: string
): ArchitectureItem | undefined => {
  for (const section of data) {
    const item = section.items.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
};

export const getItemsByTechnology = (
  data: ArchitectureData,
  technology: string
): ArchitectureItem[] => {
  const items: ArchitectureItem[] = [];
  for (const section of data) {
    items.push(...section.items.filter(item => 
      item.tech.toLowerCase().includes(technology.toLowerCase())
    ));
  }
  return items;
};

export const getSectionByTitle = (
  data: ArchitectureData,
  title: string
): ArchitectureSection | undefined => {
  return data.find(section => section.title === title);
};

export const getAllTechnologies = (data: ArchitectureData): string[] => {
  const technologies = new Set<string>();
  for (const section of data) {
    for (const item of section.items) {
      technologies.add(item.tech);
    }
  }
  return Array.from(technologies).sort();
};
```

### Styling Utilities

```typescript
// utils/styleUtils.ts
export const getResponsiveGridClasses = (itemCount: number): string => {
  const baseClasses = "grid gap-6";
  
  if (itemCount <= 2) {
    return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
  } else if (itemCount <= 4) {
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`;
  } else {
    return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
  }
};

export const getSectionColorClasses = (color: string): {
  indicator: string;
  accent: string;
  hover: string;
} => {
  const colorMap = {
    'bg-sky-400': {
      indicator: 'bg-sky-400',
      accent: 'text-sky-300',
      hover: 'hover:border-sky-400'
    },
    'bg-emerald-400': {
      indicator: 'bg-emerald-400',
      accent: 'text-emerald-300',
      hover: 'hover:border-emerald-400'
    },
    'bg-purple-400': {
      indicator: 'bg-purple-400',
      accent: 'text-purple-300',
      hover: 'hover:border-purple-400'
    },
    'bg-orange-400': {
      indicator: 'bg-orange-400',
      accent: 'text-orange-300',
      hover: 'hover:border-orange-400'
    }
  };

  return colorMap[color as keyof typeof colorMap] || colorMap['bg-sky-400'];
};
```

### Performance Utilities

```typescript
// utils/performanceUtils.ts
import { useMemo, useCallback } from 'react';

export const useMemoizedArchitectureData = (
  data: ArchitectureData,
  searchQuery?: string,
  categoryFilter?: string
) => {
  return useMemo(() => {
    let filteredData = data;

    if (searchQuery) {
      filteredData = data.map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.paradigm.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0);
    }

    if (categoryFilter) {
      filteredData = filteredData.filter(section => 
        section.title === categoryFilter
      );
    }

    return filteredData;
  }, [data, searchQuery, categoryFilter]);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

## 🎯 Event Handling

### Component Events

```typescript
// Event handler types
type CardClickHandler = (item: ArchitectureItem) => void;
type ModalCloseHandler = () => void;
type SearchHandler = (query: string) => void;
type FilterHandler = (category: string) => void;

// Event interfaces
interface ComponentEvents {
  onItemSelect?: CardClickHandler;
  onModalClose?: ModalCloseHandler;
  onSearch?: SearchHandler;
  onFilter?: FilterHandler;
  onSectionChange?: (section: string) => void;
}

// Usage in components
const handleItemClick: CardClickHandler = useCallback((item) => {
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'item_view', {
      event_category: 'architecture',
      event_label: item.id,
      value: 1
    });
  }
  
  // Open modal
  setSelectedItem(item);
}, []);
```

## 📱 Responsive Behavior

### Breakpoint Reference

```typescript
// Tailwind CSS breakpoints used in the application
const BREAKPOINTS = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices  
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px' // 2X Extra large devices
} as const;

// Responsive grid configurations
const GRID_CONFIGS = {
  mobile: 'grid-cols-1',
  tablet: 'sm:grid-cols-2',
  desktop: 'lg:grid-cols-3',
  widescreen: 'xl:grid-cols-4'
} as const;
```

### Responsive Component Behavior

```typescript
// Component behavior at different screen sizes
interface ResponsiveBehavior {
  mobile: {
    modal: 'fullscreen';
    grid: 'single-column';
    navigation: 'drawer';
  };
  tablet: {
    modal: 'centered';
    grid: 'two-column';
    navigation: 'tabs';
  };
  desktop: {
    modal: 'centered';
    grid: 'multi-column';
    navigation: 'inline';
  };
}
```

## 🔍 Search and Filtering

### Search API

```typescript
interface SearchOptions {
  query: string;
  fields?: ('component' | 'tech' | 'paradigm')[];
  caseSensitive?: boolean;
  fuzzy?: boolean;
}

interface FilterOptions {
  category?: SectionCategory;
  technology?: string[];
  complexity?: ('low' | 'medium' | 'high')[];
}

// Search function signature
export const searchArchitectureData = (
  data: ArchitectureData,
  options: SearchOptions
): ArchitectureData => {
  // Implementation
};

// Filter function signature
export const filterArchitectureData = (
  data: ArchitectureData,
  options: FilterOptions
): ArchitectureData => {
  // Implementation
};
```

## 🧪 Testing Interfaces

### Test Utilities

```typescript
// Test helper types and functions
export interface TestProps {
  testId?: string;
  'aria-label'?: string;
  role?: string;
}

export const createMockArchitectureItem = (
  overrides?: Partial<ArchitectureItem>
): ArchitectureItem => ({
  id: 'test-item',
  component: 'Test Component',
  tech: 'Test Technology',
  icon: React.createElement('div'),
  paradigm: 'Test paradigm description',
  ...overrides
});

export const createMockArchitectureData = (
  itemCount = 2
): ArchitectureData => [
  {
    title: 'Test Section',
    color: 'bg-blue-400',
    items: Array.from({ length: itemCount }, (_, index) => 
      createMockArchitectureItem({
        id: `test-item-${index}`,
        component: `Test Component ${index + 1}`
      })
    )
  }
];
```

---

*This API reference provides complete documentation for all interfaces, types, and functions in the VerseFlow Architecture Visualizer. Use this as a reference when extending or modifying the application.*
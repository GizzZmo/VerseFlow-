
import React from 'react';
import type { ArchitectureSection } from '../types';
import {
  NextJsIcon,
  FlutterIcon,
  GoIcon,
  RustIcon,
  ElixirIcon,
  PythonIcon,
  KotlinIcon,
  PostgresqlIcon,
  ClickhouseIcon,
  ElasticsearchIcon,
  RedisIcon,
  KubernetesIcon,
  TerraformIcon,
  GenericTechIcon,
} from '../components/Icons';

export const ARCHITECTURE_DATA: ArchitectureSection[] = [
  {
    title: 'Frontend Suite (Client-Side)',
    color: 'bg-sky-400',
    items: [
      {
        id: 'webapp',
        component: 'Web Application',
        tech: 'TypeScript & Next.js',
        icon: React.createElement(NextJsIcon),
        paradigm:
          "TypeScript enforces static typing, drastically reducing runtime errors and improving code maintainability, a key tenet of modern software engineering. Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG), which are critical for fast initial page loads and Search Engine Optimization (SEO) of artist profiles and tracks. The component-based architecture of React allows for reusable and testable UI elements.",
      },
      {
        id: 'mobile',
        component: 'Mobile Applications (iOS & Android)',
        tech: 'Dart & Flutter',
        icon: React.createElement(FlutterIcon),
        paradigm:
          'Flutter enables the development of high-performance, natively compiled applications for mobile, web, and desktop from a single codebase. This significantly reduces development and maintenance time. Its reactive UI paradigm (similar to React) is well-suited for dynamic, data-driven interfaces. Dart\'s Ahead-of-Time (AOT) compilation provides performance that is virtually indistinguishable from native apps.',
      },
    ],
  },
  {
    title: 'Backend Suite (Server-Side Microservices)',
    color: 'bg-emerald-400',
    items: [
      {
        id: 'core-api',
        component: 'Core API & User Services',
        tech: 'Go (Golang)',
        icon: React.createElement(GoIcon),
        paradigm:
          'Go is designed for high-concurrency and networking. Its lightweight concurrency model (goroutines and channels), based on the academic Communicating Sequential Processes (CSP) paradigm, is perfect for handling tens of thousands of simultaneous API requests for user data, track info, and community posts. It compiles to a single, small binary with no external dependencies, making it ideal for lean Docker containers.',
      },
      {
        id: 'audio-processing',
        component: 'Audio Processing & Streaming',
        tech: 'Rust',
        icon: React.createElement(RustIcon),
        paradigm:
          'This service handles CPU-intensive tasks like audio transcoding (e.g., `.wav` to adaptive bitrate HLS/DASH streams), metadata extraction (BPM, key), and content fingerprinting. Rust provides C/C++ level performance with guaranteed memory safety through its novel Ownership and Borrowing model. This "fearless concurrency" prevents common bugs in systems programming, which is critical when processing user-uploaded media.',
      },
      {
        id: 'real-time-collab',
        component: 'Real-time Collaboration & Messaging',
        tech: 'Elixir',
        icon: React.createElement(ElixirIcon),
        paradigm:
          'The BEAM VM is a masterpiece of distributed, fault-tolerant systems design. Elixir leverages this foundation to build low-latency, massively concurrent applications. It is based on the Actor Model, where lightweight, isolated processes communicate via messages. This is the ideal paradigm for building the real-time chat, notifications, and collaborative workspace features of VerseFlow, ensuring high availability and responsiveness.',
      },
      {
        id: 'data-science',
        component: 'Data Science & Analytics',
        tech: 'Python',
        icon: React.createElement(PythonIcon),
        paradigm:
          'Python is the undisputed leader in data science and machine learning due to its extensive ecosystem of libraries like TensorFlow, PyTorch, scikit-learn, and Pandas. This service will run machine learning models for the "FlowState" recommendation engine (using collaborative filtering and deep learning on audio features), power the analytics dashboard, and identify breakout artists for the A&R Spotlight.',
      },
      {
        id: 'ecommerce',
        component: 'E-commerce & Payments',
        tech: 'Kotlin / Java (Spring Boot)',
        icon: React.createElement(KotlinIcon),
        paradigm:
          'The Java Virtual Machine (JVM) ecosystem is mature, robust, and highly secure, making it a trusted choice for mission-critical financial applications. Spring Boot provides a battle-tested framework for building secure, transactional, and maintainable services. Kotlin, as a modern, statically typed language for the JVM, offers more concise syntax and enhanced safety features over traditional Java.',
      },
    ],
  },
  {
    title: 'Data & Persistence Layer',
    color: 'bg-purple-400',
    items: [
      {
        id: 'db-relational',
        component: 'Primary Relational Database',
        tech: 'PostgreSQL',
        icon: React.createElement(PostgresqlIcon),
        paradigm:
          'The source of truth for core structured data like user accounts, artist profiles, track metadata, and financial transactions. Its reliability, support for ACID transactions, and powerful features like JSONB columns make it a versatile foundation.',
      },
      {
        id: 'db-analytics',
        component: 'Time-Series & Analytics Database',
        tech: 'ClickHouse',
        icon: React.createElement(ClickhouseIcon),
        paradigm:
          'Powering the real-time artist analytics dashboard. ClickHouse is a columnar database (OLAP) designed to execute analytical queries on massive datasets with sub-second latency. It will store every stream, like, and listen event.',
      },
      {
        id: 'db-search',
        component: 'Search & Discovery Database',
        tech: 'Elasticsearch',
        icon: React.createElement(ElasticsearchIcon),
        paradigm:
          'Indexing all artists, tracks, and beats for fast, typo-tolerant full-text search. It will also be used to find collaborators in "The Cypher" based on skills and tags.',
      },
      {
        id: 'db-cache',
        component: 'In-Memory Cache & Message Broker',
        tech: 'Redis',
        icon: React.createElement(RedisIcon),
        paradigm:
          'Caching frequently accessed data (e.g., user sessions, popular track info) to reduce load on PostgreSQL and for real-time messaging and task queues between microservices.',
      },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    color: 'bg-orange-400',
    items: [
      {
        id: 'infra-cloud',
        component: 'Cloud Provider',
        tech: 'GCP / AWS',
        icon: React.createElement(GenericTechIcon, { className: 'h-12 w-12 text-orange-400'}),
        paradigm: 'Leveraging a major cloud provider for scalable, reliable, and secure infrastructure on demand.',
      },
       {
        id: 'infra-container',
        component: 'Containerization & Orchestration',
        tech: 'Docker & Kubernetes',
        icon: React.createElement(KubernetesIcon),
        paradigm: 'Docker packages each microservice into a portable container. Kubernetes manages, scales, and ensures the resilience of the containerized services across a cluster of machines.',
      },
       {
        id: 'infra-iac',
        component: 'Infrastructure as Code (IaC)',
        tech: 'Terraform',
        icon: React.createElement(TerraformIcon),
        paradigm: 'All infrastructure (databases, Kubernetes clusters, storage buckets) is defined and managed through version-controlled code for repeatability, auditability, and automation.',
      },
       {
        id: 'infra-ci-cd',
        component: 'CI/CD Pipeline',
        tech: 'GitHub Actions / GitLab CI',
        icon: React.createElement(GenericTechIcon, { className: 'h-12 w-12 text-gray-400'}),
        paradigm: 'Automates the testing, building, and deployment of code changes to the Kubernetes cluster, enabling rapid and reliable updates.',
      },
    ],
  },
];

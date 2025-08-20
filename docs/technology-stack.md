# Technology Stack Deep Dive

This document provides detailed analysis of each technology choice in the VerseFlow architecture, including trade-offs, alternatives, and implementation considerations.

## 🎨 Frontend Technologies

### React 19 + TypeScript

**Why React?**
- **Component-Based**: Reusable UI components reduce development time
- **Virtual DOM**: Efficient updates and excellent performance
- **Ecosystem**: Massive ecosystem of libraries and tools
- **Community**: Large community and extensive documentation
- **SSR Support**: Server-side rendering with Next.js

**Why TypeScript?**
- **Type Safety**: Catch errors at compile time
- **Developer Experience**: Better IDE support and autocomplete
- **Refactoring**: Safe code refactoring across large codebases
- **Documentation**: Types serve as living documentation
- **Team Collaboration**: Clearer interfaces between team members

**Implementation Example:**
```typescript
interface Track {
  id: string;
  title: string;
  artist: Artist;
  duration: number;
  genres: Genre[];
}

interface PlaylistProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  isLoading: boolean;
}

const Playlist: React.FC<PlaylistProps> = ({ tracks, onTrackSelect, isLoading }) => {
  return (
    <div className="playlist">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        tracks.map(track => (
          <TrackItem 
            key={track.id} 
            track={track} 
            onClick={() => onTrackSelect(track)} 
          />
        ))
      )}
    </div>
  );
};
```

**Alternatives Considered:**
- **Vue.js**: Great developer experience but smaller ecosystem
- **Angular**: Full framework but steeper learning curve
- **Svelte**: Excellent performance but newer ecosystem

### Flutter + Dart (Mobile)

**Why Flutter?**
- **Single Codebase**: One codebase for iOS and Android
- **Performance**: Compiled to native code
- **UI Consistency**: Pixel-perfect UI across platforms
- **Hot Reload**: Fast development iteration
- **Growing Ecosystem**: Rapidly expanding package ecosystem

**Why Dart?**
- **Optimized for UI**: Language designed for user interfaces
- **Null Safety**: Prevents null reference errors
- **AOT Compilation**: Fast startup and execution
- **JIT Compilation**: Hot reload during development

**Implementation Example:**
```dart
class AudioPlayer extends StatefulWidget {
  final Track track;
  final VoidCallback? onComplete;

  const AudioPlayer({Key? key, required this.track, this.onComplete}) : super(key: key);

  @override
  _AudioPlayerState createState() => _AudioPlayerState();
}

class _AudioPlayerState extends State<AudioPlayer> {
  late AudioPlayerService _audioService;
  bool _isPlaying = false;

  @override
  void initState() {
    super.initState();
    _audioService = AudioPlayerService();
    _audioService.onComplete = widget.onComplete;
  }

  Future<void> _togglePlayback() async {
    if (_isPlaying) {
      await _audioService.pause();
    } else {
      await _audioService.play(widget.track.url);
    }
    
    setState(() {
      _isPlaying = !_isPlaying;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: IconButton(
        icon: Icon(_isPlaying ? Icons.pause : Icons.play_arrow),
        onPressed: _togglePlayback,
      ),
    );
  }
}
```

**Alternatives Considered:**
- **React Native**: JavaScript-based but less performance
- **Native Development**: Better performance but double development cost
- **Xamarin**: Good for enterprise but being superseded by .NET MAUI

## ⚙️ Backend Technologies

### Go (Core API)

**Why Go?**
- **Concurrency**: Goroutines and channels for handling many requests
- **Performance**: Compiled language with fast execution
- **Simplicity**: Clean syntax and minimal concepts
- **Standard Library**: Rich standard library for web services
- **Deployment**: Single binary deployment
- **Memory Efficiency**: Low memory footprint

**Concurrency Model:**
```go
// HTTP server handling thousands of concurrent requests
func main() {
    http.HandleFunc("/api/users", handleUsers)
    http.HandleFunc("/api/tracks", handleTracks)
    
    server := &http.Server{
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }
    
    log.Fatal(server.ListenAndServe())
}

func handleUsers(w http.ResponseWriter, r *http.Request) {
    // Each request runs in its own goroutine automatically
    ctx := r.Context()
    
    // Database query with context for timeout/cancellation
    users, err := database.GetUsers(ctx)
    if err != nil {
        http.Error(w, "Internal Server Error", 500)
        return
    }
    
    json.NewEncoder(w).Encode(users)
}
```

**Memory Management:**
- Garbage collected but efficient
- Stack allocation for small objects
- Escape analysis optimizes allocations

**Alternatives Considered:**
- **Node.js**: Single-threaded event loop limitations
- **Java**: Higher memory usage and complexity
- **Python**: GIL limitations for CPU-bound tasks

### Rust (Audio Processing)

**Why Rust?**
- **Memory Safety**: No segfaults or buffer overflows
- **Performance**: Zero-cost abstractions
- **Concurrency**: Fearless concurrency through ownership
- **Ecosystem**: Growing ecosystem for audio processing
- **Reliability**: Prevents entire classes of bugs

**Ownership Model:**
```rust
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct AudioProcessor {
    config: ProcessingConfig,
    active_jobs: Arc<Mutex<HashMap<JobId, ProcessingJob>>>,
}

impl AudioProcessor {
    pub async fn process_audio(&self, input: AudioFile) -> Result<ProcessedAudio, ProcessingError> {
        let job_id = JobId::new();
        let job = ProcessingJob::new(job_id, input);
        
        // Add to active jobs
        {
            let mut jobs = self.active_jobs.lock().await;
            jobs.insert(job_id, job);
        }
        
        // Process audio
        let result = tokio::spawn(async move {
            let decoded = decode_audio(&job.input).await?;
            let processed = apply_effects(&decoded, &self.config).await?;
            let encoded = encode_audio(&processed).await?;
            Ok(encoded)
        }).await?;
        
        // Remove from active jobs
        {
            let mut jobs = self.active_jobs.lock().await;
            jobs.remove(&job_id);
        }
        
        result
    }
}

// Zero-cost abstraction for audio processing
trait AudioEffect {
    fn apply(&self, samples: &mut [f32]);
}

struct Reverb {
    decay: f32,
    delay_buffer: Vec<f32>,
}

impl AudioEffect for Reverb {
    fn apply(&self, samples: &mut [f32]) {
        // Processing logic compiled to optimal assembly
        for sample in samples.iter_mut() {
            *sample += self.get_delayed_sample() * self.decay;
            self.add_to_delay_buffer(*sample);
        }
    }
}
```

**Performance Benefits:**
- No garbage collection pauses
- Predictable memory usage
- Optimal CPU cache usage
- Compile-time optimization

**Alternatives Considered:**
- **C++**: Similar performance but memory safety issues
- **Go**: GC pauses problematic for real-time audio
- **Java**: JVM overhead for audio processing

### Elixir (Real-time Features)

**Why Elixir?**
- **Actor Model**: Lightweight processes for each connection
- **Fault Tolerance**: "Let it crash" with supervision trees
- **Scalability**: Millions of concurrent processes
- **Hot Code Swapping**: Zero-downtime deployments
- **Distribution**: Built for distributed systems

**Actor Model Implementation:**
```elixir
defmodule VerseFlow.UserConnection do
  use GenServer

  # Client API
  def start_link(user_id) do
    GenServer.start_link(__MODULE__, user_id, name: via_tuple(user_id))
  end

  def send_message(user_id, message) do
    GenServer.cast(via_tuple(user_id), {:send_message, message})
  end

  def join_room(user_id, room_id) do
    GenServer.call(via_tuple(user_id), {:join_room, room_id})
  end

  # Server Implementation
  def init(user_id) do
    state = %{
      user_id: user_id,
      rooms: MapSet.new(),
      websocket_pid: nil
    }
    {:ok, state}
  end

  def handle_cast({:send_message, message}, state) do
    if state.websocket_pid do
      send(state.websocket_pid, {:message, message})
    end
    {:noreply, state}
  end

  def handle_call({:join_room, room_id}, _from, state) do
    new_rooms = MapSet.put(state.rooms, room_id)
    VerseFlow.Room.add_user(room_id, state.user_id)
    {:reply, :ok, %{state | rooms: new_rooms}}
  end

  # Supervision
  defp via_tuple(user_id) do
    {:via, Registry, {VerseFlow.UserRegistry, user_id}}
  end
end

# Supervision tree
defmodule VerseFlow.UserSupervisor do
  use DynamicSupervisor

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def start_user_connection(user_id) do
    child_spec = {VerseFlow.UserConnection, user_id}
    DynamicSupervisor.start_child(__MODULE__, child_spec)
  end
end
```

**Scalability Characteristics:**
- Process creation: ~2.5 microseconds
- Memory per process: ~2.6 KB
- Context switching: Preemptive scheduling
- Message passing: Copy-based isolation

**Alternatives Considered:**
- **Node.js**: Single-threaded limitations
- **Go**: Good concurrency but no fault tolerance
- **Erlang**: Same VM but more verbose syntax

### Python (Data Science)

**Why Python?**
- **ML Ecosystem**: TensorFlow, PyTorch, scikit-learn
- **Data Processing**: Pandas, NumPy, Dask
- **Rapid Prototyping**: Quick iteration on algorithms
- **Community**: Largest data science community
- **Jupyter Integration**: Interactive development

**ML Pipeline Example:**
```python
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf

class MusicRecommendationPipeline:
    def __init__(self):
        self.user_embedding_model = self._build_user_model()
        self.track_embedding_model = self._build_track_model()
        self.content_vectorizer = TfidfVectorizer(max_features=5000)
        
    def _build_user_model(self):
        """Build user preference embedding model"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(512, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(256, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(128, activation='tanh')  # User embedding
        ])
        return model
    
    def _build_track_model(self):
        """Build track feature embedding model"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(256, activation='relu'),
            tf.keras.layers.Dense(128, activation='tanh')  # Track embedding
        ])
        return model
    
    def train_collaborative_filtering(self, interactions_df):
        """Train collaborative filtering model"""
        # Create user-item interaction matrix
        user_item_matrix = interactions_df.pivot_table(
            index='user_id', 
            columns='track_id', 
            values='rating',
            fill_value=0
        )
        
        # Non-negative matrix factorization
        nmf = NMF(n_components=50, random_state=42)
        user_features = nmf.fit_transform(user_item_matrix)
        item_features = nmf.components_
        
        return user_features, item_features
    
    def content_based_similarity(self, track_metadata):
        """Calculate content-based similarity"""
        # Combine text features
        content_features = track_metadata['genre'] + ' ' + \
                          track_metadata['mood'] + ' ' + \
                          track_metadata['instruments']
        
        # TF-IDF vectorization
        tfidf_matrix = self.content_vectorizer.fit_transform(content_features)
        
        # Cosine similarity
        similarity_matrix = cosine_similarity(tfidf_matrix)
        return similarity_matrix
    
    def hybrid_recommendations(self, user_id, num_recommendations=10):
        """Combine collaborative and content-based recommendations"""
        # Get collaborative filtering scores
        collab_scores = self.get_collaborative_scores(user_id)
        
        # Get content-based scores
        content_scores = self.get_content_scores(user_id)
        
        # Weighted combination
        alpha = 0.7  # Weight for collaborative filtering
        beta = 0.3   # Weight for content-based
        
        final_scores = alpha * collab_scores + beta * content_scores
        
        # Get top recommendations
        top_indices = np.argsort(final_scores)[::-1][:num_recommendations]
        return top_indices
```

**Performance Optimization:**
- NumPy for vectorized operations
- Dask for parallel computing
- GPU acceleration with CUDA
- Caching with Redis for model predictions

**Alternatives Considered:**
- **R**: Strong for statistics but limited production deployment
- **Scala**: JVM-based but smaller data science ecosystem
- **Julia**: High performance but newer ecosystem

### Kotlin/Java (E-commerce)

**Why Kotlin/Java?**
- **Enterprise Grade**: Proven in financial systems
- **Security**: Extensive security frameworks
- **Transaction Management**: ACID compliance
- **Ecosystem**: Mature payment processing libraries
- **Spring Boot**: Production-ready framework

**Payment Processing Example:**
```kotlin
@Service
@Transactional
class PaymentProcessingService(
    private val paymentRepository: PaymentRepository,
    private val fraudDetectionService: FraudDetectionService,
    private val paymentGateway: PaymentGateway,
    private val eventPublisher: ApplicationEventPublisher
) {
    
    fun processPayment(paymentRequest: PaymentRequest): PaymentResult {
        return try {
            // Fraud detection
            val fraudCheck = fraudDetectionService.analyze(paymentRequest)
            if (fraudCheck.isHighRisk) {
                return PaymentResult.rejected("High fraud risk detected")
            }
            
            // Create payment record
            val payment = Payment(
                id = UUID.randomUUID(),
                userId = paymentRequest.userId,
                amount = paymentRequest.amount,
                currency = paymentRequest.currency,
                method = paymentRequest.paymentMethod,
                status = PaymentStatus.PROCESSING,
                createdAt = Instant.now()
            )
            
            val savedPayment = paymentRepository.save(payment)
            
            // Process through payment gateway
            val gatewayResponse = paymentGateway.charge(
                amount = payment.amount,
                currency = payment.currency,
                paymentMethod = payment.method,
                idempotencyKey = payment.id.toString()
            )
            
            // Update payment status
            val finalPayment = when (gatewayResponse.status) {
                GatewayStatus.SUCCESS -> {
                    savedPayment.copy(
                        status = PaymentStatus.COMPLETED,
                        gatewayTransactionId = gatewayResponse.transactionId,
                        completedAt = Instant.now()
                    )
                }
                GatewayStatus.FAILED -> {
                    savedPayment.copy(
                        status = PaymentStatus.FAILED,
                        failureReason = gatewayResponse.errorMessage
                    )
                }
                GatewayStatus.REQUIRES_ACTION -> {
                    savedPayment.copy(
                        status = PaymentStatus.REQUIRES_ACTION,
                        actionUrl = gatewayResponse.actionUrl
                    )
                }
            }
            
            paymentRepository.save(finalPayment)
            
            // Publish event
            eventPublisher.publishEvent(
                PaymentProcessedEvent(
                    paymentId = finalPayment.id,
                    userId = finalPayment.userId,
                    status = finalPayment.status,
                    amount = finalPayment.amount
                )
            )
            
            PaymentResult.success(finalPayment)
            
        } catch (e: Exception) {
            logger.error("Payment processing failed", e)
            PaymentResult.error("Payment processing failed: ${e.message}")
        }
    }
}

// Security configuration
@Configuration
@EnableWebSecurity
class SecurityConfig {
    
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .csrf { it.disable() }
            .sessionManagement { 
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
            }
            .authorizeHttpRequests { authz ->
                authz
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/payments/**").hasRole("USER")
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            }
            .oauth2ResourceServer { oauth2 ->
                oauth2.jwt { jwt ->
                    jwt.decoder(jwtDecoder())
                       .jwtAuthenticationConverter(jwtAuthenticationConverter())
                }
            }
            .build()
    }
}
```

**Security Features:**
- Spring Security for authentication/authorization
- JWT token validation
- HTTPS/TLS encryption
- SQL injection prevention
- XSS protection

**Alternatives Considered:**
- **C#/.NET**: Good enterprise features but less payment ecosystem
- **Node.js**: JavaScript not ideal for financial systems
- **Python**: Django/Flask less enterprise-focused

## 🗄️ Data Technologies

### PostgreSQL

**Why PostgreSQL?**
- **ACID Compliance**: Critical for financial data
- **Advanced Features**: JSON, arrays, custom types
- **Performance**: Query optimization and indexing
- **Extensibility**: Custom functions and operators
- **Reliability**: Proven track record

**Advanced Features:**
```sql
-- JSON operations
SELECT 
    id,
    metadata->>'genre' as genre,
    metadata->'features'->>'tempo' as tempo
FROM tracks 
WHERE metadata @> '{"verified": true}';

-- Full-text search
CREATE INDEX tracks_search_idx ON tracks 
USING GIN(to_tsvector('english', title || ' ' || description));

SELECT id, title, ts_rank(search_vector, query) as rank
FROM tracks, plainto_tsquery('jazz piano') query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- Window functions for analytics
SELECT 
    user_id,
    track_id,
    play_count,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY play_count DESC) as rank
FROM user_track_plays
WHERE rank <= 10;  -- Top 10 tracks per user
```

**Scaling Strategies:**
- Read replicas for read-heavy workloads
- Partitioning for large tables
- Connection pooling with PgBouncer
- Query optimization and indexing

### Elasticsearch

**Why Elasticsearch?**
- **Full-Text Search**: Advanced text analysis
- **Real-Time**: Near real-time search updates
- **Scalability**: Distributed across nodes
- **Analytics**: Aggregations for dashboards
- **Flexibility**: Schema-less JSON documents

**Search Implementation:**
```json
{
  "query": {
    "bool": {
      "must": [
        {
          "multi_match": {
            "query": "jazz piano",
            "fields": ["title^2", "artist.name", "description"],
            "type": "best_fields",
            "fuzziness": "AUTO"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "release_date": {
              "gte": "2020-01-01"
            }
          }
        },
        {
          "terms": {
            "genre": ["jazz", "blues"]
          }
        }
      ]
    }
  },
  "aggs": {
    "genres": {
      "terms": {
        "field": "genre.keyword",
        "size": 10
      }
    },
    "avg_duration": {
      "avg": {
        "field": "duration_ms"
      }
    }
  },
  "highlight": {
    "fields": {
      "title": {},
      "description": {}
    }
  }
}
```

**Performance Optimization:**
- Index templates for consistent mapping
- Index lifecycle management
- Shard optimization
- Search result caching

### Redis

**Why Redis?**
- **Performance**: In-memory operations
- **Data Structures**: Lists, sets, hashes, streams
- **Pub/Sub**: Real-time messaging
- **Persistence**: Optional durability
- **Clustering**: Horizontal scaling

**Usage Patterns:**
```python
import redis
import json
from datetime import timedelta

class CacheService:
    def __init__(self):
        self.redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)
    
    def cache_user_session(self, session_id: str, user_data: dict, ttl: int = 3600):
        """Cache user session data"""
        self.redis_client.setex(
            f"session:{session_id}",
            ttl,
            json.dumps(user_data)
        )
    
    def get_user_session(self, session_id: str) -> dict:
        """Retrieve user session"""
        data = self.redis_client.get(f"session:{session_id}")
        return json.loads(data) if data else None
    
    def cache_popular_tracks(self, tracks: list, ttl: int = 300):
        """Cache popular tracks with shorter TTL"""
        pipe = self.redis_client.pipeline()
        pipe.delete("popular:tracks")
        for track in tracks:
            pipe.lpush("popular:tracks", json.dumps(track))
        pipe.expire("popular:tracks", ttl)
        pipe.execute()
    
    def publish_notification(self, channel: str, message: dict):
        """Publish real-time notification"""
        self.redis_client.publish(channel, json.dumps(message))
    
    def rate_limit_check(self, user_id: str, limit: int = 100, window: int = 3600) -> bool:
        """Rate limiting with sliding window"""
        key = f"rate_limit:{user_id}"
        current = self.redis_client.incr(key)
        
        if current == 1:
            self.redis_client.expire(key, window)
        
        return current <= limit
```

**Clustering Configuration:**
```yaml
# Redis Cluster configuration
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 10.1.1.1
cluster-announce-port 7000
cluster-announce-bus-port 17000
```

## 🚀 Infrastructure Technologies

### Docker + Kubernetes

**Why Docker?**
- **Consistency**: Same environment across dev/staging/prod
- **Isolation**: Process and resource isolation
- **Portability**: Runs anywhere Docker is supported
- **Efficiency**: Lightweight compared to VMs
- **Ecosystem**: Rich ecosystem of images

**Multi-stage Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage  
FROM node:18-alpine AS production
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
```

**Why Kubernetes?**
- **Orchestration**: Automated deployment and scaling
- **Self-Healing**: Automatic restart of failed containers
- **Service Discovery**: Built-in load balancing
- **Configuration Management**: ConfigMaps and Secrets
- **Rolling Updates**: Zero-downtime deployments

**Kubernetes Manifests:**
```yaml
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: core-api
  labels:
    app: core-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: core-api
  template:
    metadata:
      labels:
        app: core-api
    spec:
      containers:
      - name: core-api
        image: verseflow/core-api:v1.2.3
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
# Service
apiVersion: v1
kind: Service
metadata:
  name: core-api-service
spec:
  selector:
    app: core-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP

---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: core-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: core-api
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Terraform (Infrastructure as Code)

**Why Terraform?**
- **Declarative**: Describe desired state
- **Cloud Agnostic**: Works with multiple providers
- **State Management**: Tracks infrastructure state
- **Plan & Apply**: Preview changes before applying
- **Modularity**: Reusable infrastructure components

**Example Configuration:**
```hcl
# Variables
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "staging"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

# VPC Module
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "verseflow-${var.environment}"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false

  tags = {
    Environment = var.environment
    Project     = "verseflow"
  }
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = "verseflow-${var.environment}"
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # Node groups
  eks_managed_node_groups = {
    general = {
      desired_size = 2
      max_size     = 10
      min_size     = 1

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"

      k8s_labels = {
        Environment = var.environment
        NodeGroup   = "general"
      }
    }

    compute_intensive = {
      desired_size = 1
      max_size     = 5
      min_size     = 0

      instance_types = ["c5.large"]
      capacity_type  = "SPOT"

      k8s_labels = {
        Environment = var.environment
        NodeGroup   = "compute-intensive"
      }

      taints = {
        dedicated = {
          key    = "compute-intensive"
          value  = "true"
          effect = "NO_SCHEDULE"
        }
      }
    }
  }

  tags = {
    Environment = var.environment
    Project     = "verseflow"
  }
}

# RDS Database
resource "aws_db_instance" "postgres" {
  identifier = "verseflow-${var.environment}-db"

  engine         = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100
  storage_type          = "gp2"
  storage_encrypted     = true

  db_name  = "verseflow"
  username = "dbadmin"
  password = random_password.db_password.result

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  deletion_protection = var.environment == "production"
  skip_final_snapshot = var.environment != "production"

  tags = {
    Environment = var.environment
    Project     = "verseflow"
  }
}

# Outputs
output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = module.eks.cluster_endpoint
}

output "database_endpoint" {
  description = "RDS instance endpoint"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}
```

## 🔧 Build & Deployment Tools

### Vite (Frontend Build Tool)

**Why Vite?**
- **Fast Dev Server**: ES modules for instant server start
- **Hot Module Replacement**: Fast updates during development
- **Optimized Builds**: Rollup-based production builds
- **Plugin Ecosystem**: Rich plugin ecosystem
- **TypeScript Support**: Built-in TypeScript support

**Configuration:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@mui/material', '@emotion/react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### GitHub Actions (CI/CD)

**Why GitHub Actions?**
- **Native Integration**: Built into GitHub
- **Flexible Workflows**: YAML-based configuration
- **Matrix Builds**: Test multiple configurations
- **Extensive Marketplace**: Thousands of pre-built actions
- **Free Tier**: Generous free tier for open source

**Advanced Workflow:**
```yaml
name: Advanced CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      frontend: ${{ steps.changes.outputs.frontend }}
      backend: ${{ steps.changes.outputs.backend }}
      docs: ${{ steps.changes.outputs.docs }}
    steps:
    - uses: actions/checkout@v4
    - uses: dorny/paths-filter@v2
      id: changes
      with:
        filters: |
          frontend:
            - 'src/**'
            - 'package.json'
            - 'vite.config.ts'
          backend:
            - 'server/**'
            - 'go.mod'
            - 'go.sum'
          docs:
            - 'docs/**'
            - '*.md'

  test-frontend:
    needs: changes
    if: ${{ needs.changes.outputs.frontend == 'true' }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
    - uses: actions/checkout@v4
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run type-check
    - run: npm run lint
    - run: npm run test -- --coverage
    - run: npm run build
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  test-backend:
    needs: changes
    if: ${{ needs.changes.outputs.backend == 'true' }}
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
    - uses: actions/checkout@v4
    - name: Setup Go
      uses: actions/setup-go@v4
      with:
        go-version: '1.21'
    - run: go mod download
    - run: go vet ./...
    - run: go test -race -coverprofile=coverage.out ./...
    - run: go build -v ./...

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

  build-and-push:
    needs: [test-frontend, test-backend]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
    - uses: actions/checkout@v4
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/checkout@v4
    - name: Deploy to Kubernetes
      run: |
        echo "Deploying to production..."
        # kubectl commands would go here
```

---

*This technology stack represents modern, production-ready choices for building scalable applications. Each technology was selected based on specific strengths and use cases within the overall architecture.*
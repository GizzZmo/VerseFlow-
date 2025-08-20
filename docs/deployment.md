# Deployment Guide

This guide covers deploying the VerseFlow Architecture Visualizer to various environments and platforms.

## 🚀 Quick Deploy Options

### GitHub Pages (Recommended for Demo)

**Automatic Deployment:**
The project is configured for automatic deployment to GitHub Pages via GitHub Actions. Every push to `main` triggers a deployment.

**Manual Setup:**
1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Folder: `/ (root)`

2. **Update Base Path** (if using custom domain)
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/VerseFlow-/', // Your repository name
     // ... other config
   });
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy  # If you add gh-pages package
   ```

### Netlify

**Simple Deployment:**
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables** (if needed)
   ```
   NODE_VERSION=18
   ```

**Manual Deployment:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Vercel

**Automatic Deployment:**
1. **Import Project**
   - Go to [Vercel](https://vercel.com)
   - Import from GitHub

2. **Configuration** (automatic detection)
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

**Manual Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
}
```

### Docker Commands

```bash
# Build image
docker build -t verseflow-visualizer .

# Run container
docker run -p 8080:80 verseflow-visualizer

# Run with environment variables
docker run -p 8080:80 -e NODE_ENV=production verseflow-visualizer

# Docker Compose (see below)
docker-compose up -d
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # Optional: Add SSL termination with Traefik
  traefik:
    image: traefik:v2.10
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"  # Traefik dashboard
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.app.entrypoints=websecure"
      - "traefik.http.routers.app.tls.certresolver=letsencrypt"
```

## ☸️ Kubernetes Deployment

### Kubernetes Manifests

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: verseflow

---
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: verseflow-visualizer
  namespace: verseflow
  labels:
    app: verseflow-visualizer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: verseflow-visualizer
  template:
    metadata:
      labels:
        app: verseflow-visualizer
    spec:
      containers:
      - name: app
        image: verseflow/visualizer:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
# k8s/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: verseflow-visualizer-service
  namespace: verseflow
spec:
  selector:
    app: verseflow-visualizer
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP

---
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: verseflow-visualizer-ingress
  namespace: verseflow
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - verseflow.yourdomain.com
    secretName: verseflow-tls
  rules:
  - host: verseflow.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: verseflow-visualizer-service
            port:
              number: 80

---
# k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: verseflow-visualizer-hpa
  namespace: verseflow
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: verseflow-visualizer
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Deployment Commands

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n verseflow
kubectl get services -n verseflow
kubectl get ingress -n verseflow

# Scale deployment
kubectl scale deployment verseflow-visualizer --replicas=5 -n verseflow

# Rolling update
kubectl set image deployment/verseflow-visualizer app=verseflow/visualizer:v2.0.0 -n verseflow

# Monitor rollout
kubectl rollout status deployment/verseflow-visualizer -n verseflow
```

### Helm Chart

```yaml
# Chart.yaml
apiVersion: v2
name: verseflow-visualizer
description: A Helm chart for VerseFlow Architecture Visualizer
type: application
version: 0.1.0
appVersion: "1.0.0"

# values.yaml
replicaCount: 3

image:
  repository: verseflow/visualizer
  pullPolicy: IfNotPresent
  tag: "latest"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: verseflow.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: verseflow-tls
      hosts:
        - verseflow.example.com

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 50m
    memory: 64Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

```bash
# Install with Helm
helm install verseflow-visualizer ./chart -n verseflow --create-namespace

# Upgrade
helm upgrade verseflow-visualizer ./chart -n verseflow
```

## 🌐 CDN and Performance

### CloudFlare Setup

1. **Add Site to CloudFlare**
   - Add your domain to CloudFlare
   - Update nameservers

2. **Configure Settings**
   ```
   SSL/TLS: Full (strict)
   Always Use HTTPS: On
   Automatic HTTPS Rewrites: On
   Minimum TLS Version: 1.2
   ```

3. **Performance Settings**
   ```
   Auto Minify: CSS, JavaScript, HTML
   Brotli: On
   Rocket Loader: On (test first)
   Mirage: On
   Polish: Lossless
   ```

4. **Caching Rules**
   ```
   Static Assets: Cache Everything, TTL 1 year
   HTML: Cache Everything, TTL 4 hours
   ```

### AWS CloudFront

```yaml
# cloudfront-distribution.yaml (CloudFormation)
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFront distribution for VerseFlow Visualizer'

Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub 'verseflow-visualizer-${AWS::StackName}'
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
        - DomainName: !GetAtt S3Bucket.WebsiteURL
          Id: S3Origin
          CustomOriginConfig:
            HTTPPort: 80
            OriginProtocolPolicy: http-only
        Enabled: true
        DefaultRootObject: index.html
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6  # Managed-CachingOptimized
          Compress: true
        CustomErrorResponses:
        - ErrorCode: 404
          ResponseCode: 200
          ResponsePagePath: /index.html
        - ErrorCode: 403
          ResponseCode: 200
          ResponsePagePath: /index.html
        PriceClass: PriceClass_100
        ViewerCertificate:
          CloudFrontDefaultCertificate: true

Outputs:
  DistributionDomainName:
    Value: !GetAtt CloudFrontDistribution.DomainName
    Description: 'CloudFront distribution domain name'
```

## 🔒 Security Considerations

### Content Security Policy

```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://esm.sh;
  style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com;
  img-src 'self' data: https:;
  connect-src 'self';
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'none';
  frame-ancestors 'none';
">
```

### Security Headers

```nginx
# In nginx.conf
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

### Environment Variables

```bash
# Production environment variables
NODE_ENV=production
BUILD_ENV=production

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional: Error tracking
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

## 📊 Monitoring and Analytics

### Application Monitoring

```typescript
// Add to main application
// Simple error tracking
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
  // Send to monitoring service
});

// Performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
    }
  }
});
observer.observe({ entryTypes: ['measure'] });
```

### Google Analytics

```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring

```yaml
# monitoring/uptime-check.yaml (Kubernetes CronJob)
apiVersion: batch/v1
kind: CronJob
metadata:
  name: uptime-check
spec:
  schedule: "*/5 * * * *"  # Every 5 minutes
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: curl
            image: curlimages/curl:latest
            command:
            - /bin/sh
            - -c
            - |
              response=$(curl -s -o /dev/null -w "%{http_code}" https://your-domain.com)
              if [ "$response" != "200" ]; then
                echo "Site down: HTTP $response"
                exit 1
              fi
              echo "Site up: HTTP $response"
          restartPolicy: Never
```

## 🚀 CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline in `.github/workflows/ci.yml`:

### Pipeline Stages

1. **Test**: Type checking and build verification
2. **Security**: Vulnerability scanning
3. **Build**: Docker image creation
4. **Deploy**: Automatic deployment to GitHub Pages

### Manual Deployment Triggers

```bash
# Trigger deployment manually
gh workflow run ci.yml --ref main

# Deploy specific version
git tag v1.0.0
git push origin v1.0.0
```

### Environment-Specific Deployments

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
    - uses: actions/checkout@v4
    - name: Deploy to staging
      run: |
        # Deploy to staging environment
        echo "Deploying to staging..."
```

## 🔧 Troubleshooting

### Common Deployment Issues

**Build Failures:**
```bash
# Clear npm cache
npm cache clean --force

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

**Docker Issues:**
```bash
# Build with no cache
docker build --no-cache -t verseflow-visualizer .

# Debug container
docker run -it verseflow-visualizer /bin/sh

# Check logs
docker logs container-id
```

**Kubernetes Issues:**
```bash
# Check pod logs
kubectl logs -f deployment/verseflow-visualizer -n verseflow

# Debug pod
kubectl exec -it pod-name -n verseflow -- /bin/sh

# Check events
kubectl get events -n verseflow --sort-by='.lastTimestamp'
```

### Performance Issues

**Bundle Size:**
```bash
# Analyze bundle
npm run build -- --analyze

# Check for large dependencies
npx bundlephobia-cli

# Tree shake unused code
npm run build -- --treeshake
```

**Loading Performance:**
- Use CDN for static assets
- Enable gzip/brotli compression
- Implement proper caching headers
- Consider service worker for caching

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Code review completed
- [ ] Tests passing
- [ ] Build successful
- [ ] Security scan passed
- [ ] Performance tested
- [ ] Documentation updated

### Production Deployment

- [ ] Environment variables configured
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] CDN setup (if applicable)
- [ ] Monitoring configured
- [ ] Backup strategy in place

### Post-Deployment

- [ ] Site loads correctly
- [ ] All functionality working
- [ ] Performance metrics acceptable
- [ ] Error tracking active
- [ ] Analytics configured
- [ ] Team notified

---

*This deployment guide covers the most common deployment scenarios. Choose the option that best fits your infrastructure and requirements.*
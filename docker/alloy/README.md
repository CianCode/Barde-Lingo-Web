# Alloy Log Collection Setup

This directory contains Grafana Alloy configuration for collecting application logs and sending them to a remote Loki instance.

## Configuration

1. Edit `config.alloy` and replace `LOKI_VM_IP` and `LOKI_PORT` with your colleague's Loki instance details:

    ```alloy
    url = "http://YOUR_COLLEAGUE_LOKI_IP:3100/loki/api/v1/push"
    ```

2. If authentication is required, uncomment and configure the `basic_auth` section.

## What's Being Collected

- **Laravel Application Logs**: From `storage/logs/*.log`
- **Nginx Access Logs**: HTTP request logs with status codes and request details
- **Nginx Error Logs**: Nginx error messages and warnings

## Starting Alloy

```bash
# Start with the production compose file
docker compose -f docker-compose.production.yml up -d alloy

# View Alloy logs
docker logs -f barde_lingo_alloy

# Check Alloy health
curl http://localhost:12345/-/healthy
```

## Firewall Configuration

Make sure your VM can reach your colleague's Loki instance:

- Outbound traffic to Loki VM IP on port 3100 (or configured port)
- Your colleague should configure their firewall to accept connections from your VM IP

## Verifying Log Flow

1. Check Alloy is running: `docker ps | grep alloy`
2. View Alloy logs: `docker logs barde_lingo_alloy`
3. Your colleague can verify logs in Grafana by querying: `{app="barde_lingo"}`

## Labels Applied

All logs are tagged with:

- `app`: barde_lingo
- `env`: production
- `source`: barde_lingo_vm
- `type`: laravel, nginx_access, or nginx_error
- `hostname`: Your VM hostname

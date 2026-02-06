# Grafana Dashboard Ideas for Barde Lingo

## Dashboard 1: Student Activity Overview

### Panel 1: Active Students (Stat)

**Query:**

```
count(count by (context_user_id) ({source="barde_lingo_vm", type="user_interaction"}))
```

Shows total number of active students

### Panel 2: Lessons Viewed Over Time (Time Series)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Lesson Viewed"
```

### Panel 3: Exercise Success Rate (Gauge)

**Query:**

```
sum(rate({source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted" | context_correct="true" [5m]))
/
sum(rate({source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted" [5m]))
```

### Panel 4: Top Courses by Enrollment (Bar Chart)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | context_action="enrolled" | unwrap context_course_id
```

## Dashboard 2: Performance Metrics

### Panel 1: Average Exercise Score (Time Series)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted" | unwrap context_score
```

### Panel 2: Completion Rate (Gauge)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Lesson Progress" | context_status="completed"
```

### Panel 3: Average Attempts per Exercise (Stat)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted" | unwrap context_attempt_number
```

### Panel 4: Time Spent on Exercises (Histogram)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted" | unwrap context_time_spent
```

## Dashboard 3: Database Performance

### Panel 1: Slow Queries (Table)

**Query:**

```
{source="barde_lingo_vm", type="database_query"} | json | context_time > 50
```

### Panel 2: Query Count by Endpoint (Bar)

**Query:**

```
count_over_time({source="barde_lingo_vm", type="database_query"} [5m])
```

### Panel 3: Average Query Time (Time Series)

**Query:**

```
{source="barde_lingo_vm", type="database_query"} | json | unwrap context_time
```

### Panel 4: Most Expensive Queries (Table)

**Query:**

```
topk(10, sum by (context_sql) (rate({source="barde_lingo_vm", type="database_query"} | json | unwrap context_time [5m])))
```

## Dashboard 4: User Engagement

### Panel 1: Page Views Over Time (Time Series)

**Query:**

```
rate({source="barde_lingo_vm", type="navigation"} [5m])
```

### Panel 2: Most Visited Pages (Bar)

**Query:**

```
topk(10, count by (context_component) ({source="barde_lingo_vm", type="navigation"} | json))
```

### Panel 3: User Sessions (Time Series)

**Query:**

```
count by (context_session_id) ({source="barde_lingo_vm", type="navigation"} | json)
```

### Panel 4: Messages Sent (Counter)

**Query:**

```
count_over_time({source="barde_lingo_vm", type="user_interaction"} | json | message="Message Sent" [1h])
```

## Dashboard 5: Real-Time Monitoring

### Panel 1: Live User Activity (Logs)

**Query:**

```
{source="barde_lingo_vm"} | json
```

Time range: Last 5 minutes, Auto-refresh: 5s

### Panel 2: Recent Exercise Attempts (Table)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Exercise Attempted"
```

Time range: Last 15 minutes

### Panel 3: Active Features (Pie Chart)

**Query:**

```
count by (context_feature) ({source="barde_lingo_vm", type="user_interaction"} | json | message="Feature Used")
```

### Panel 4: Error Rate (Stat)

**Query:**

```
{source="barde_lingo_vm", level="error"}
```

## Dashboard 6: Teacher Analytics

### Panel 1: Student Messages to Teachers (Time Series)

**Query:**

```
{source="barde_lingo_vm", type="user_interaction"} | json | message="Message Sent" | context_recipient_role="teacher"
```

### Panel 2: Course Enrollments by Teacher (Bar)

**Query:**

```
count by (context_teacher_id) ({source="barde_lingo_vm", type="user_interaction"} | json | context_action="enrolled")
```

### Panel 3: New Conversations (Counter)

**Query:**

```
count_over_time({source="barde_lingo_vm", type="user_interaction"} | json | context_resource="conversation" | context_action="created" [24h])
```

## How to Create These Dashboards

1. Open Grafana: `http://10.129.220.11:3000`
2. Click "+" → "Create Dashboard"
3. Click "Add visualization"
4. Select "Loki" as data source
5. Paste the query
6. Configure panel settings:
    - Title
    - Visualization type (Time series, Stat, Table, etc.)
    - Time range
    - Refresh interval
7. Click "Apply"
8. Repeat for each panel
9. Save dashboard

## Variables for Interactive Dashboards

Create dashboard variables for filtering:

**User ID:**

- Query: `label_values({source="barde_lingo_vm"}, context_user_id)`
- Use in queries: `| context_user_id="$user_id"`

**Course ID:**

- Query: `label_values({source="barde_lingo_vm"}, context_course_id)`
- Use in queries: `| context_course_id="$course_id"`

**Time Range:**

- Type: Interval
- Values: 5m, 15m, 1h, 6h, 24h, 7d

## Alerting Ideas

Set up alerts for:

- Exercise success rate drops below 50%
- Slow queries (>100ms)
- No student activity for 1 hour (during school hours)
- High error rate
- Conversation response time (teachers)

## Tips

- Use `rate()` for per-second rates
- Use `count_over_time()` for event counts
- Use `unwrap` to extract numeric values
- Use `topk()` for top N results
- Combine multiple queries with math operators
- Set appropriate time ranges for better performance

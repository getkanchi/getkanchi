#!/usr/bin/env python3
"""Seed a local Kanchi database for website screenshots."""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    repo_root = Path(__file__).resolve().parents[1]
    default_kanchi_root = repo_root.parent / "kanchi"
    default_db_path = repo_root / ".capture-workbench" / "kanchi-marketing.db"

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kanchi-root", default=str(default_kanchi_root))
    parser.add_argument("--database-url")
    parser.add_argument("--database-path", default=str(default_db_path))
    return parser.parse_args()


def sqlite_url(path: Path) -> str:
    return f"sqlite:///{path.resolve()}"


def add_kanchi_to_path(kanchi_root: Path) -> None:
    agent_root = kanchi_root / "agent"
    if not agent_root.exists():
        raise SystemExit(f"Kanchi agent directory not found: {agent_root}")
    sys.path.insert(0, str(agent_root))


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    kanchi_root = Path(args.kanchi_root).resolve()
    db_path = Path(args.database_path).resolve()
    db_path.parent.mkdir(parents=True, exist_ok=True)
    database_url = args.database_url or sqlite_url(db_path)
    os.environ["DATABASE_URL"] = database_url

    add_kanchi_to_path(kanchi_root)

    from database import (  # pylint: disable=import-error,import-outside-toplevel
        ActionConfigDB,
        AppSettingDB,
        DatabaseManager,
        EnvironmentDB,
        RetryRelationshipDB,
        TaskActionDB,
        TaskActionItemDB,
        TaskDailyStatsDB,
        TaskEventDB,
        TaskLatestDB,
        TaskProgressDB,
        TaskProgressLatestDB,
        TaskRegistryDB,
        TaskResolutionDB,
        TaskRerunRelationshipDB,
        TaskStepsDB,
        WorkflowDB,
        WorkflowExecutionDB,
        WorkerEventDB,
    )
    from models import (  # pylint: disable=import-error,import-outside-toplevel
        AppSettingUpdate,
        StepDefinition,
        TaskEvent,
        TaskProgressEvent,
        TaskStepsEvent,
    )
    from services.app_config_service import AppConfigService  # pylint: disable=import-error,import-outside-toplevel
    from services.progress_service import ProgressService  # pylint: disable=import-error,import-outside-toplevel
    from services.task_service import TaskService  # pylint: disable=import-error,import-outside-toplevel

    db = DatabaseManager(database_url)
    db.run_migrations()

    now = datetime.now(timezone.utc).replace(microsecond=0)
    workflow_id = "marketing-workflow-critical-failures"
    running_task_id = "mkt-catalog-import-running"
    repairable_task_id = "mkt-payment-webhook-repairable"
    blocked_task_id = "mkt-report-archive-blocked"
    action_id = "marketing-rerun-action-001"

    with db.get_session() as session:
        reset_tables(
            session,
            [
                TaskActionItemDB,
                TaskRerunRelationshipDB,
                TaskActionDB,
                TaskResolutionDB,
                TaskProgressLatestDB,
                TaskProgressDB,
                TaskStepsDB,
                RetryRelationshipDB,
                TaskLatestDB,
                TaskEventDB,
                WorkerEventDB,
                TaskDailyStatsDB,
                WorkflowExecutionDB,
                WorkflowDB,
                ActionConfigDB,
                EnvironmentDB,
                TaskRegistryDB,
                AppSettingDB,
            ],
        )
        config_service = AppConfigService(session)
        config_service.ensure_defaults()
        seed_settings(config_service, AppSettingUpdate, now)
        seed_registry(session, TaskRegistryDB, now)
        seed_workflows(session, WorkflowDB, WorkflowExecutionDB, workflow_id, now)

        task_service = TaskService(session)
        progress_service = ProgressService(session)
        seed_task_events(
            session,
            task_service,
            TaskEvent,
            TaskLatestDB,
            now,
            repairable_task_id,
            blocked_task_id,
            running_task_id,
        )
        seed_progress(progress_service, TaskProgressEvent, TaskStepsEvent, StepDefinition, now, running_task_id)
        seed_actions(
            session,
            TaskActionDB,
            TaskActionItemDB,
            TaskRerunRelationshipDB,
            action_id,
            now,
        )

    summary = {
        "databaseUrl": database_url,
        "databasePath": str(db_path),
        "kanchiRoot": str(kanchi_root),
        "routes": {
            "dashboard": "/",
            "rerunTaskId": repairable_task_id,
            "actionId": action_id,
            "progressTask": f"/tasks/{running_task_id}",
            "workflow": f"/workflows/{workflow_id}/edit",
            "retention": "/settings/workspace",
        },
    }
    print(json.dumps(summary, indent=2))


def reset_tables(session: Any, models: list[Any]) -> None:
    for model in models:
        session.query(model).delete(synchronize_session=False)
    session.commit()


def seed_settings(config_service: Any, AppSettingUpdate: Any, now: datetime) -> None:
    settings = {
        "task_issue_summary.lookback_hours": (72, "number"),
        "data_retention.task_successful_days": (7, "number"),
        "data_retention.task_unsuccessful_days": (45, "number"),
        "data_retention.worker_events_days": (14, "number"),
        "data_retention.workflow_executions_days": (30, "number"),
        "data_retention.task_daily_stats_days": (365, "number"),
        "data_retention.schedule.enabled": (True, "boolean"),
        "data_retention.schedule.preset": ("daily", "string"),
        "data_retention.schedule.hour": (2, "number"),
        "data_retention.schedule.minute": (15, "number"),
        "data_retention.last_run": (
            {
                "status": "completed",
                "started_at": (now - timedelta(hours=6, minutes=3)).isoformat(),
                "finished_at": (now - timedelta(hours=6)).isoformat(),
                "total_deleted": 18421,
                "dry_run": False,
                "results": [
                    {
                        "key": "task_events_successful",
                        "label": "Successful task events",
                        "retention_days": 7,
                        "deleted_count": 9820,
                    },
                    {
                        "key": "task_progress_successful",
                        "label": "Successful task progress events",
                        "retention_days": 7,
                        "deleted_count": 4886,
                    },
                    {
                        "key": "worker_events",
                        "label": "Worker events",
                        "retention_days": 14,
                        "deleted_count": 3715,
                    },
                ],
            },
            "json",
        ),
    }

    for key, (value, value_type) in settings.items():
        config_service.upsert_setting(
            key,
            AppSettingUpdate(value=value, value_type=value_type),
        )


def seed_registry(session: Any, TaskRegistryDB: Any, now: datetime) -> None:
    rows = [
        ("billing.invoices.capture_payment", "Capture invoice payment", ["billing", "critical"]),
        ("catalog.sync.import_products", "Import supplier catalog", ["catalog", "long-running"]),
        ("reports.generate_month_end", "Generate month-end report", ["reports"]),
        ("inventory.reserve_stock", "Reserve stock", ["inventory"]),
        ("search.reindex_catalog", "Reindex catalog search", ["search"]),
    ]
    for index, (name, label, tags) in enumerate(rows):
        session.add(
            TaskRegistryDB(
                id=f"marketing-registry-{index}",
                name=name,
                human_readable_name=label,
                description=f"Marketing capture fixture for {label.lower()}.",
                tags=tags,
                created_at=now - timedelta(days=14),
                updated_at=now - timedelta(minutes=index * 9),
                first_seen=now - timedelta(days=14),
                last_seen=now - timedelta(minutes=index * 11),
            )
        )
    session.commit()


def seed_workflows(session: Any, WorkflowDB: Any, WorkflowExecutionDB: Any, workflow_id: str, now: datetime) -> None:
    workflow = WorkflowDB(
        id=workflow_id,
        name="Escalate critical payment failures",
        description="Notify ops, hold repeat reruns behind a circuit breaker, and keep a durable audit trail.",
        enabled=True,
        trigger_type="task.failed",
        trigger_config={"task_name_pattern": "billing.*"},
        conditions={
            "operator": "AND",
            "conditions": [
                {"field": "task_name", "operator": "contains", "value": "billing"},
                {"field": "exception", "operator": "contains", "value": "Gateway"},
            ],
        },
        actions=[
            {
                "type": "slack_notification",
                "params": {
                    "channel": "#ops-payments",
                    "message": "Payment task failed and needs review.",
                },
                "continue_on_failure": True,
            },
            {
                "type": "mark_resolved",
                "params": {"resolved_by": "workflow:critical-payment-failures"},
                "continue_on_failure": False,
            },
        ],
        circuit_breaker_config={
            "enabled": True,
            "max_executions": 3,
            "window_seconds": 900,
            "context_field": "root_id",
        },
        priority=25,
        max_executions_per_hour=12,
        cooldown_seconds=180,
        created_at=now - timedelta(days=20),
        updated_at=now - timedelta(hours=3),
        created_by="ops@example.com",
        execution_count=148,
        last_executed_at=now - timedelta(minutes=26),
        success_count=141,
        failure_count=7,
    )
    session.add(workflow)
    for offset, status in enumerate(["completed", "completed", "rate_limited"]):
        session.add(
            WorkflowExecutionDB(
                workflow_id=workflow_id,
                triggered_at=now - timedelta(minutes=28 + offset * 7),
                trigger_type="task.failed",
                trigger_event={
                    "task_id": f"mkt-workflow-event-{offset}",
                    "task_name": "billing.invoices.capture_payment",
                    "exception": "GatewayTimeout",
                    "root_id": "payment-batch-778",
                },
                status=status,
                actions_executed=[
                    {
                        "action_type": "slack_notification",
                        "status": "success",
                        "duration_ms": 84,
                    }
                ],
                started_at=now - timedelta(minutes=28 + offset * 7, seconds=-1),
                completed_at=now - timedelta(minutes=28 + offset * 7, seconds=-3),
                duration_ms=240,
                circuit_breaker_key="payment-batch-778",
                workflow_snapshot={"name": workflow.name, "priority": workflow.priority},
            )
        )
    session.commit()


def seed_task_events(
    session: Any,
    task_service: Any,
    TaskEvent: Any,
    TaskLatestDB: Any,
    now: datetime,
    repairable_task_id: str,
    blocked_task_id: str,
    running_task_id: str,
) -> None:
    placeholder = {
        "__kanchi_placeholder__": "celery_payload_truncated",
        "message": "Value truncated before reaching Kanchi.",
    }

    def event(
        task_id: str,
        task_name: str,
        event_type: str,
        at: datetime,
        *,
        args: list[Any] | None = None,
        kwargs: dict[str, Any] | None = None,
        hostname: str = "celery@worker-payments-01",
        queue: str = "critical",
        routing_key: str = "critical",
        result: Any = None,
        runtime: float | None = None,
        exception: str | None = None,
        traceback: str | None = None,
    ) -> Any:
        return task_service.save_task_event(
            TaskEvent(
                task_id=task_id,
                task_name=task_name,
                event_type=event_type,
                timestamp=at,
                args=args or [],
                kwargs=kwargs or {},
                hostname=hostname,
                worker_name=hostname,
                queue=queue,
                routing_key=routing_key,
                root_id=task_id.split("-")[0],
                result=result,
                runtime=runtime,
                exception=exception,
                traceback=traceback,
            )
        )

    task_specs = [
        (
            repairable_task_id,
            "billing.invoices.capture_payment",
            [42],
            {"invoice_id": "INV-2026-1042", "payment_token": placeholder, "retryable": True},
            "GatewayTimeout: processor did not respond within 30s",
        ),
        (
            blocked_task_id,
            "reports.generate_month_end",
            [],
            {"account_id": "northwind", "month": "2026-06"},
            "ReportArchiveLocked: archive writer is locked",
        ),
        (
            "mkt-search-index-failed",
            "search.reindex_catalog",
            ["summer-2026"],
            {"include_inactive": False},
            "IndexShardUnavailable: catalog-shard-3",
        ),
    ]

    for index, (task_id, name, args, kwargs, exception) in enumerate(task_specs):
        started = now - timedelta(minutes=18 + index * 11)
        event(task_id, name, "task-received", started - timedelta(seconds=3), args=args, kwargs=kwargs)
        event(task_id, name, "task-started", started, args=args, kwargs=kwargs)
        event(
            task_id,
            name,
            "task-failed",
            started + timedelta(seconds=37 + index * 9),
            args=args,
            kwargs=kwargs,
            runtime=37.2 + index,
            exception=exception,
            traceback=f"Traceback (most recent call last):\\n  ...\\n{exception}",
        )

    for index in range(5):
        task_id = f"mkt-email-receipt-ok-{index}"
        started = now - timedelta(minutes=4 + index * 3)
        event(
            task_id,
            "emails.send_receipt",
            "task-received",
            started - timedelta(seconds=2),
            args=[f"receipt-{9000 + index}"],
            kwargs={"locale": "en-US"},
            hostname="celery@worker-email-02",
            queue="default",
            routing_key="default",
        )
        event(
            task_id,
            "emails.send_receipt",
            "task-succeeded",
            started + timedelta(seconds=4),
            args=[f"receipt-{9000 + index}"],
            kwargs={"locale": "en-US"},
            hostname="celery@worker-email-02",
            queue="default",
            routing_key="default",
            result={"message_id": f"msg-{index}", "status": "sent"},
            runtime=3.8 + index / 10,
        )

    running_started = now - timedelta(minutes=9)
    event(
        running_task_id,
        "catalog.sync.import_products",
        "task-received",
        running_started - timedelta(seconds=2),
        args=["supplier-feed-8842"],
        kwargs={"batch_size": 500, "dry_run": False},
        hostname="celery@worker-catalog-04",
        queue="catalog",
        routing_key="catalog",
    )
    event(
        running_task_id,
        "catalog.sync.import_products",
        "task-started",
        running_started,
        args=["supplier-feed-8842"],
        kwargs={"batch_size": 500, "dry_run": False},
        hostname="celery@worker-catalog-04",
        queue="catalog",
        routing_key="catalog",
    )

    orphan_id = "mkt-inventory-reserve-orphan"
    orphaned_at = now - timedelta(minutes=34)
    orphan_event = event(
        orphan_id,
        "inventory.reserve_stock",
        "task-started",
        orphaned_at - timedelta(minutes=7),
        args=["order-7782"],
        kwargs={"warehouse": "vienna-1", "sku_count": 28},
        hostname="celery@worker-inventory-03",
        queue="inventory",
        routing_key="inventory",
    )
    orphan_event.is_orphan = True
    orphan_event.orphaned_at = orphaned_at
    latest = session.query(TaskLatestDB).filter_by(task_id=orphan_id).one_or_none()
    if latest:
        latest.is_orphan = True
        latest.orphaned_at = orphaned_at
    session.commit()

    rerun_id = "mkt-payment-rerun-succeeded"
    event(
        rerun_id,
        "billing.invoices.capture_payment",
        "task-received",
        now - timedelta(minutes=55),
        args=[41],
        kwargs={"invoice_id": "INV-2026-1041", "payment_token": "tok_safe_redacted"},
    )
    event(
        rerun_id,
        "billing.invoices.capture_payment",
        "task-succeeded",
        now - timedelta(minutes=54),
        args=[41],
        kwargs={"invoice_id": "INV-2026-1041", "payment_token": "tok_safe_redacted"},
        result={"charge_id": "ch_7782", "status": "captured"},
        runtime=4.2,
    )


def seed_progress(
    progress_service: Any,
    TaskProgressEvent: Any,
    TaskStepsEvent: Any,
    StepDefinition: Any,
    now: datetime,
    task_id: str,
) -> None:
    task_name = "catalog.sync.import_products"
    progress_service.save_steps_event(
        TaskStepsEvent(
            task_id=task_id,
            task_name=task_name,
            timestamp=now - timedelta(minutes=9),
            steps=[
                StepDefinition(key="download", label="Download feed", total=1, order=1),
                StepDefinition(key="validate", label="Validate rows", total=120000, order=2),
                StepDefinition(key="upsert", label="Upsert products", total=120000, order=3),
                StepDefinition(key="publish", label="Publish catalog snapshot", total=1, order=4),
            ],
        )
    )
    updates = [
        (12, "download", "Fetched supplier feed from S3"),
        (38, "validate", "Validated 45,600 of 120,000 rows"),
        (64, "upsert", "Upserted 76,800 products into catalog"),
    ]
    for index, (progress, step, message) in enumerate(updates):
        progress_service.save_progress_event(
            TaskProgressEvent(
                task_id=task_id,
                task_name=task_name,
                progress=progress,
                step_key=step,
                message=message,
                meta={"rows": int(progress * 1875), "batch": "supplier-feed-8842"},
                timestamp=now - timedelta(minutes=8 - index * 2),
            )
        )


def seed_actions(
    session: Any,
    TaskActionDB: Any,
    TaskActionItemDB: Any,
    TaskRerunRelationshipDB: Any,
    action_id: str,
    now: datetime,
) -> None:
    original_task_ids = [
        "mkt-payment-action-original",
        "mkt-payment-action-repaired",
        "mkt-report-action-skipped",
        "mkt-unknown-action-blocked",
    ]
    action = TaskActionDB(
        id=action_id,
        action_type="rerun",
        status="partial_success",
        initiated_by="ops@example.com",
        initiated_session_id="marketing-session",
        created_at=now - timedelta(hours=1, minutes=18),
        started_at=now - timedelta(hours=1, minutes=18),
        completed_at=now - timedelta(hours=1, minutes=17, seconds=42),
        original_task_ids=original_task_ids,
        selection_size=len(original_task_ids),
        item_total=len(original_task_ids),
        item_created=2,
        item_skipped=2,
        item_failed=0,
        summary={
            "rerun_kinds": {"replay": 1, "repaired_override": 1},
            "skip_categories": {"user_skipped": 1, "blocked_skipped": 1},
        },
    )
    session.add(action)
    items = [
        TaskActionItemDB(
            action_id=action_id,
            original_task_id=original_task_ids[0],
            original_task_name="billing.invoices.capture_payment",
            outcome="created",
            rerun_task_id="mkt-payment-rerun-succeeded",
            rerun_task_name="billing.invoices.capture_payment",
            attempted_task_id="mkt-payment-rerun-succeeded",
            submitted_args=[41],
            submitted_kwargs={"invoice_id": "INV-2026-1041", "payment_token": "tok_safe_redacted"},
            rerun_kind="replay",
            target_queue="critical",
        ),
        TaskActionItemDB(
            action_id=action_id,
            original_task_id=original_task_ids[1],
            original_task_name="billing.invoices.capture_payment",
            outcome="created",
            rerun_task_id="mkt-payment-rerun-repaired",
            rerun_task_name="billing.invoices.capture_payment",
            attempted_task_id="mkt-payment-rerun-repaired",
            submitted_args=[42],
            submitted_kwargs={"invoice_id": "INV-2026-1042", "payment_token": "tok_repaired"},
            rerun_kind="repaired_override",
            target_queue="critical",
        ),
        TaskActionItemDB(
            action_id=action_id,
            original_task_id=original_task_ids[2],
            original_task_name="reports.generate_month_end",
            outcome="user_skipped",
            reason_code="user_skipped",
            reason="Archive lock is still active; skipped until the writer drains.",
            skip_category="user_skipped",
        ),
        TaskActionItemDB(
            action_id=action_id,
            original_task_id=original_task_ids[3],
            original_task_name="unknown",
            outcome="blocked_skipped",
            reason_code="missing_task_name",
            reason="Kanchi does not have the original task name.",
            skip_category="blocked_skipped",
        ),
    ]
    session.add_all(items)
    session.add(
        TaskRerunRelationshipDB(
            original_task_id=original_task_ids[0],
            rerun_task_id="mkt-payment-rerun-succeeded",
            action_id=action_id,
            created_at=now - timedelta(hours=1, minutes=17),
            created_by="ops@example.com",
        )
    )
    session.commit()


if __name__ == "__main__":
    os.environ.setdefault("LOG_LEVEL", "WARNING")
    main()
